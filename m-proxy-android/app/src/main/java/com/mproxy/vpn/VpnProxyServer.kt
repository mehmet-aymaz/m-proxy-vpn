package com.mproxy.vpn

import android.util.Log
import java.io.InputStream
import java.io.OutputStream
import java.net.InetAddress
import java.net.InetSocketAddress
import java.net.ServerSocket
import java.net.Socket
import java.util.concurrent.Executors

object VpnProxyServer {
    private const val TAG = "VpnProxyServer"
    const val PROXY_PORT = 10808

    @Volatile
    private var isRunning = false
    private var serverSocket: ServerSocket? = null
    private val threadPool = Executors.newCachedThreadPool()

    @Synchronized
    fun start() {
        if (isRunning) return
        isRunning = true

        Thread({
            try {
                val server = ServerSocket()
                server.reuseAddress = true
                server.bind(InetSocketAddress("0.0.0.0", PROXY_PORT))
                serverSocket = server
                Log.d(TAG, "VpnProxyServer (SOCKS5 + HTTP) started listening on 0.0.0.0:$PROXY_PORT")

                while (isRunning) {
                    val clientSocket = try {
                        server.accept()
                    } catch (e: Exception) {
                        null
                    } ?: break

                    threadPool.execute {
                        handleClient(clientSocket)
                    }
                }
            } catch (e: Exception) {
                Log.e(TAG, "VpnProxyServer error: ${e.message}", e)
            } finally {
                stop()
            }
        }, "VpnProxyServer-Listener").start()
    }

    @Synchronized
    fun stop() {
        isRunning = false
        try {
            serverSocket?.close()
        } catch (_: Exception) {}
        serverSocket = null
        Log.d(TAG, "VpnProxyServer stopped.")
    }

    private fun handleClient(clientSocket: Socket) {
        try {
            clientSocket.soTimeout = 30000
            clientSocket.tcpNoDelay = true
            val clientIn = clientSocket.getInputStream()
            val clientOut = clientSocket.getOutputStream()

            val firstByte = clientIn.read()
            if (firstByte == -1) {
                clientSocket.close()
                return
            }

            if (firstByte == 5) {
                // SOCKS5 Protocol (0x05)
                handleSocks5(clientSocket, clientIn, clientOut)
            } else {
                // HTTP / HTTPS Proxy Protocol
                handleHttp(firstByte, clientSocket, clientIn, clientOut)
            }
        } catch (e: Exception) {
            Log.w(TAG, "Proxy client handler error: ${e.message}")
        } finally {
            try { clientSocket.close() } catch (_: Exception) {}
        }
    }

    private fun handleSocks5(clientSocket: Socket, clientIn: InputStream, clientOut: OutputStream) {
        // 1. SOCKS5 Auth Handshake
        val nMethods = clientIn.read()
        if (nMethods <= 0) return
        val methods = ByteArray(nMethods)
        clientIn.read(methods)

        // Respond: Version 5, No Auth (0x00)
        clientOut.write(byteArrayOf(5, 0))
        clientOut.flush()

        // 2. SOCKS5 Request
        val ver = clientIn.read()
        val cmd = clientIn.read() // 1 = CONNECT
        val rsv = clientIn.read()
        val atyp = clientIn.read() // 1 = IPv4, 3 = Domain, 4 = IPv6

        if (ver != 5 || cmd != 1) {
            clientOut.write(byteArrayOf(5, 7, 0, 1, 0, 0, 0, 0, 0, 0)) // Command not supported
            clientOut.flush()
            return
        }

        var targetHost = ""
        when (atyp) {
            1 -> {
                // IPv4 (4 bytes)
                val ipBytes = ByteArray(4)
                clientIn.read(ipBytes)
                targetHost = InetAddress.getByAddress(ipBytes).hostAddress ?: ""
            }
            3 -> {
                // Domain (1 byte len + domain)
                val domainLen = clientIn.read()
                val domainBytes = ByteArray(domainLen)
                clientIn.read(domainBytes)
                targetHost = String(domainBytes, Charsets.UTF_8)
            }
            4 -> {
                // IPv6 (16 bytes)
                val ipBytes = ByteArray(16)
                clientIn.read(ipBytes)
                targetHost = InetAddress.getByAddress(ipBytes).hostAddress ?: ""
            }
            else -> return
        }

        // Read 2-byte port (Big-Endian)
        val portHigh = clientIn.read()
        val portLow = clientIn.read()
        val targetPort = (portHigh shl 8) or portLow

        // Open outbound socket to target (routes automatically through active VPN TUN)
        val targetSocket = Socket()
        targetSocket.tcpNoDelay = true
        targetSocket.connect(InetSocketAddress(targetHost, targetPort), 10000)
        targetSocket.soTimeout = 60000

        // Send SOCKS5 success response
        clientOut.write(byteArrayOf(5, 0, 0, 1, 0, 0, 0, 0, 0, 0))
        clientOut.flush()

        // Bidirectional streaming
        val targetIn = targetSocket.getInputStream()
        val targetOut = targetSocket.getOutputStream()

        val t1 = Thread { pipeStream(clientIn, targetOut, clientSocket, targetSocket) }
        val t2 = Thread { pipeStream(targetIn, clientOut, targetSocket, clientSocket) }

        t1.start()
        t2.start()
        t1.join()
        t2.join()
    }

    private fun handleHttp(firstByte: Int, clientSocket: Socket, clientIn: InputStream, clientOut: OutputStream) {
        val firstLineRest = readLine(clientIn) ?: return
        val firstLine = firstByte.toChar() + firstLineRest

        val parts = firstLine.trim().split(" ")
        if (parts.size < 2) return

        val method = parts[0].uppercase()
        val target = parts[1]

        if (method == "CONNECT") {
            // HTTPS Tunneling (CONNECT host:port HTTP/1.1)
            val targetParts = target.split(":")
            val host = targetParts[0]
            val port = if (targetParts.size > 1) targetParts[1].toIntOrNull() ?: 443 else 443

            skipHeaders(clientIn)

            val targetSocket = Socket()
            targetSocket.tcpNoDelay = true
            targetSocket.connect(InetSocketAddress(host, port), 10000)
            targetSocket.soTimeout = 60000

            val response = "HTTP/1.1 200 Connection Established\r\n\r\n"
            clientOut.write(response.toByteArray(Charsets.UTF_8))
            clientOut.flush()

            val targetIn = targetSocket.getInputStream()
            val targetOut = targetSocket.getOutputStream()

            val t1 = Thread { pipeStream(clientIn, targetOut, clientSocket, targetSocket) }
            val t2 = Thread { pipeStream(targetIn, clientOut, targetSocket, clientSocket) }

            t1.start()
            t2.start()
            t1.join()
            t2.join()
        } else {
            // Plain HTTP
            val uri = try {
                java.net.URI(if (target.startsWith("http://")) target else "http://$target")
            } catch (_: Exception) { null }

            val host = uri?.host ?: target.substringBefore("/").substringBefore(":")
            val port = if (uri != null && uri.port != -1) uri.port else 80
            val path = if (uri != null && !uri.rawPath.isNullOrEmpty()) uri.rawPath + (if (uri.rawQuery != null) "?${uri.rawQuery}" else "") else "/"

            val targetSocket = Socket()
            targetSocket.tcpNoDelay = true
            targetSocket.connect(InetSocketAddress(host, port), 10000)
            targetSocket.soTimeout = 60000

            val targetIn = targetSocket.getInputStream()
            val targetOut = targetSocket.getOutputStream()

            val newRequestLine = "$method $path ${parts.getOrElse(2) { "HTTP/1.1" }}\r\n"
            targetOut.write(newRequestLine.toByteArray(Charsets.UTF_8))

            forwardHeaders(clientIn, targetOut)
            targetOut.flush()

            val t1 = Thread { pipeStream(clientIn, targetOut, clientSocket, targetSocket) }
            val t2 = Thread { pipeStream(targetIn, clientOut, targetSocket, clientSocket) }

            t1.start()
            t2.start()
            t1.join()
            t2.join()
        }
    }

    private fun readLine(input: InputStream): String? {
        val sb = StringBuilder()
        var c: Int
        while (input.read().also { c = it } != -1) {
            if (c == '\n'.code) {
                break
            } else if (c != '\r'.code) {
                sb.append(c.toChar())
            }
        }
        return if (sb.isEmpty() && c == -1) null else sb.toString()
    }

    private fun skipHeaders(input: InputStream) {
        while (true) {
            val line = readLine(input)
            if (line.isNullOrEmpty()) break
        }
    }

    private fun forwardHeaders(input: InputStream, output: OutputStream) {
        while (true) {
            val line = readLine(input) ?: break
            output.write((line + "\r\n").toByteArray(Charsets.UTF_8))
            if (line.isEmpty()) break
        }
    }

    private fun pipeStream(input: InputStream, output: OutputStream, src: Socket, dst: Socket) {
        val buffer = ByteArray(32768)
        try {
            var bytesRead: Int
            while (input.read(buffer).also { bytesRead = it } != -1) {
                output.write(buffer, 0, bytesRead)
                output.flush()
            }
        } catch (_: Exception) {
        } finally {
            try { src.close() } catch (_: Exception) {}
            try { dst.close() } catch (_: Exception) {}
        }
    }
}

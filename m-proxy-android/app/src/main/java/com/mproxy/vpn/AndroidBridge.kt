package com.mproxy.vpn

import android.annotation.SuppressLint
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.telephony.TelephonyManager
import android.webkit.JavascriptInterface
import android.util.Log
import java.io.File
import java.net.HttpURLConnection
import java.net.InetSocketAddress
import java.net.Socket
import java.net.URL
import java.util.concurrent.Executors

class AndroidBridge(private val context: Context) {
 
    init {
        activeInstance = this
    }

    private val mainHandler = Handler(Looper.getMainLooper())
    private val executor = Executors.newCachedThreadPool()
    private var safeAreaTopDp = 0f
    private var safeAreaBottomDp = 0f

    fun updateSafeArea(top: Float, bottom: Float) {
        safeAreaTopDp = top
        safeAreaBottomDp = bottom
        Log.d("AndroidBridge", "updateSafeArea: top=$top, bottom=$bottom")
    }

    @JavascriptInterface
    fun getSafeAreaTop(): Float {
        return safeAreaTopDp
    }

    @JavascriptInterface
    fun getSafeAreaBottom(): Float {
        return safeAreaBottomDp
    }

    @JavascriptInterface
    fun requestVpnPermission(vlessLink: String) {
        Log.d("AndroidBridge", "requestVpnPermission bridge called, vlessLink length=${vlessLink.length}")
        ProfileStorage.extractAndSaveProfile(context, vlessLink)
        val netType = detectNetworkType()
        if (netType == "YOK") {
            mainHandler.post {
                android.widget.Toast.makeText(context, "İnternet bağlantısı yok!", android.widget.Toast.LENGTH_LONG).show()
                reportError("İnternet bağlantısı yok!")
            }
            return
        }
        if (netType == "WIFI") {
            mainHandler.post {
                android.widget.Toast.makeText(context, "Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.", android.widget.Toast.LENGTH_LONG).show()
                reportError("Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.")
            }
            return
        }
        mainHandler.post {
            val act = context as? MainActivity
            Log.d("AndroidBridge", "Posting to MainActivity.requestVpnPermission, activity is: $act")
            act?.requestVpnPermission(vlessLink)
        }
    }

    @JavascriptInterface
    fun startVpn(vlessLink: String) {
        Log.d("AndroidBridge", "startVpn bridge called, vlessLink length=${vlessLink.length}")
        ProfileStorage.extractAndSaveProfile(context, vlessLink)
        val netType = detectNetworkType()
        if (netType == "YOK") {
            mainHandler.post {
                android.widget.Toast.makeText(context, "İnternet bağlantısı yok!", android.widget.Toast.LENGTH_LONG).show()
                reportError("İnternet bağlantısı yok!")
            }
            return
        }
        if (netType == "WIFI") {
            mainHandler.post {
                android.widget.Toast.makeText(context, "Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.", android.widget.Toast.LENGTH_LONG).show()
                reportError("Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.")
            }
            return
        }
        mainHandler.post {
            val intent = Intent(context, MProxyVpnService::class.java).apply {
                action = MProxyVpnService.ACTION_START
                putExtra(MProxyVpnService.EXTRA_VLESS_LINK, vlessLink)
            }
            try {
                context.startForegroundService(intent)
            } catch (e: Exception) {
                reportError("VPN başlatılamadı: ${e.message}")
            }
        }
    }

    @JavascriptInterface
    fun stopVpn() {
        mainHandler.post {
            try {
                val intent = Intent(context, MProxyVpnService::class.java).apply {
                    action = MProxyVpnService.ACTION_STOP
                }
                try {
                    context.startService(intent)
                } catch (e: Exception) {
                    try {
                        context.startForegroundService(intent)
                    } catch (_: Exception) {}
                }
            } catch (_: Exception) {}
        }
    }

    @JavascriptInterface
    fun isVpnActive(): Boolean {
        return MProxyVpnService.isActive
    }

    @JavascriptInterface
    fun getVpnStartTimestamp(): Long {
        return MProxyVpnService.startTimestamp
    }

    private fun extractHostFromVless(vlessLink: String): String? {
        try {
            if (vlessLink.startsWith("vless://", ignoreCase = true)) {
                val withoutPrefix = vlessLink.substring(8)
                val atIndex = withoutPrefix.indexOf('@')
                if (atIndex != -1) {
                    val afterAt = withoutPrefix.substring(atIndex + 1)
                    var endIndex = afterAt.length
                    val delimiters = charArrayOf(':', '/', '?', '#')
                    for (delim in delimiters) {
                        val idx = afterAt.indexOf(delim)
                        if (idx in 0 until endIndex) {
                            endIndex = idx
                        }
                    }
                    val extracted = afterAt.substring(0, endIndex).trim()
                    if (extracted.isNotEmpty()) {
                        return extracted
                    }
                }
            }
        } catch (_: Exception) {}
        return null
    }

    private fun fetchPublicIP(useVpnProxy: Boolean): String? {
        val providers = listOf(
            "https://api.ipify.org",
            "https://icanhazip.com",
            "https://ipinfo.io/ip",
            "https://wtfismyip.com/text"
        )
        val proxy = if (useVpnProxy) {
            java.net.Proxy(java.net.Proxy.Type.HTTP, InetSocketAddress("127.0.0.1", 10808))
        } else {
            java.net.Proxy.NO_PROXY
        }

        for (urlStr in providers) {
            try {
                val url = URL(urlStr)
                val conn = url.openConnection(proxy) as HttpURLConnection
                conn.connectTimeout = 3000
                conn.readTimeout = 3000
                conn.connect()
                if (conn.responseCode == 200) {
                    val stream = conn.inputStream
                    val ip = String(stream.readBytes()).trim()
                    stream.close()
                    conn.disconnect()
                    if (ip.isNotEmpty() && ip.contains(".")) {
                        return ip
                    }
                }
            } catch (e: Exception) {
                Log.w("AndroidBridge", "Failed to fetch IP from $urlStr (proxy=$useVpnProxy): ${e.message}")
            }
        }
        return null
    }

    @JavascriptInterface
    fun getCurrentIP() {
        executor.execute {
            try {
                if (MProxyVpnService.isActive) {
                    // Try to fetch public IP through the VPN proxy first
                    var ip = fetchPublicIP(true)
                    
                    if (ip == null) {
                        // Fallback: Resolve VPN server host directly
                        val host = MProxyVpnService.currentHost
                        var resolvedIp: String? = null
                        if (!host.isNullOrBlank()) {
                            try {
                                resolvedIp = java.net.InetAddress.getByName(host).hostAddress
                            } catch (e: Exception) {
                                Log.e("AndroidBridge", "DNS resolution failed for host $host: ${e.message}")
                            }
                        }
                        ip = resolvedIp
                    }
                    
                    val finalIp = ip ?: "---.---.---.---"
                    // Widget cache'e de yaz — senkronizasyon için
                    if (finalIp != "---.---.---.---") {
                        SecurityUtils.getEncryptedPrefs(context, "mproxy_widget_cache")
                            .edit().putString("cached_ip", finalIp).apply()
                    }
                    postToWeb("window.onIPResult?.('$finalIp')")
                    logToWeb("IP Adresi Güncellendi (VPN Sunucu): $finalIp", "success")
                } else {
                    // Fetch direct public IP when disconnected
                    val ip = fetchPublicIP(false) ?: "---.---.---.---"
                    // Widget cache'e de yaz
                    if (ip != "---.---.---.---") {
                        SecurityUtils.getEncryptedPrefs(context, "mproxy_widget_cache")
                            .edit().putString("cached_ip", ip).apply()
                    }
                    postToWeb("window.onIPResult?.('$ip')")
                    logToWeb("IP Adresi Güncellendi (Direkt): $ip", "info")
                }
            } catch (e: Exception) {
                Log.e("AndroidBridge", "getCurrentIP error: ${e.message}", e)
                postToWeb("window.onIPResult?.('---.---.---.---')")
                logToWeb("IP adresi alınırken hata: ${e.message}", "warn")
            }
        }
    }

    @JavascriptInterface
    fun checkUpdatesManually() {
        mainHandler.post {
            val act = context as? MainActivity
            act?.checkAppUpdate(false)
        }
    }

    @JavascriptInterface
    fun getNetworkType() {
        mainHandler.post {
            val type = detectNetworkType()
            postToWeb("window.onNetworkResult?.('$type')")
        }
    }

    @JavascriptInterface
    fun getClipboard(): String {
        val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
        val clip = clipboard.primaryClip
        return if (clip != null && clip.itemCount > 0) {
            clip.getItemAt(0).coerceToText(context).toString()
        } else {
            ""
        }
    }

    @JavascriptInterface
    fun setClipboard(text: String) {
        mainHandler.post {
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            val clip = ClipData.newPlainText("M-Proxy", text)
            clipboard.setPrimaryClip(clip)
        }
    }

    @JavascriptInterface
    fun openBatteryOptimization() {
        mainHandler.post {
            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS).apply {
                        data = Uri.parse("package:${context.packageName}")
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    }
                    context.startActivity(intent)
                    logToWeb("Sistem pil optimizasyon muafiyeti istendi.", "success")
                }
            } catch (e: Exception) {
                Log.e("AndroidBridge", "ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS failed: ${e.message}")
            }
        }
    }

    @JavascriptInterface
    fun checkBatteryOptimization(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val pm = context.getSystemService(Context.POWER_SERVICE) as android.os.PowerManager
            return pm.isIgnoringBatteryOptimizations(context.packageName)
        }
        return true
    }

    @JavascriptInterface
    fun pingServer(host: String, port: Int) {
        executor.execute {
            val startTime = System.currentTimeMillis()
            try {
                val socket = Socket()
                socket.connect(InetSocketAddress(host, port), 3000)
                socket.close()
                val latency = System.currentTimeMillis() - startTime
                postToWeb("window.onPingResult?.('$host', $port, $latency)")
                logToWeb("Ping başarılı: $host:$port -> ${latency}ms", "success")
            } catch (e: Exception) {
                postToWeb("window.onPingResult?.('$host', $port, -1)")
                logToWeb("Ping başarısız: $host:$port -> Hata: ${e.message}", "warn")
            }
        }
    }

    @JavascriptInterface
    fun downloadSpeedTest(url: String, callbackName: String) {
        executor.execute {
            logToWeb("Hız testi başlatılıyor...", "info")
            var totalBytes = 0L
            var startTime = 0L
            
            val callbackSent = java.util.concurrent.atomic.AtomicBoolean(false)
            fun sendSpeedCallback(speed: Double, progress: Long) {
                if (callbackSent.get()) return
                if (progress == -1L || speed < 0) {
                    if (callbackSent.compareAndSet(false, true)) {
                        postToWeb("window.$callbackName?.($speed, $progress)")
                    }
                } else {
                    postToWeb("window.$callbackName?.($speed, $progress)")
                }
            }

            val currentConn = java.util.concurrent.atomic.AtomicReference<HttpURLConnection?>(null)
            val currentStream = java.util.concurrent.atomic.AtomicReference<java.io.InputStream?>(null)
            val watchdog = java.util.Timer()
            watchdog.schedule(object : java.util.TimerTask() {
                override fun run() {
                    Log.w("AndroidBridge", "Download watchdog triggered! Notifying Web UI first.")
                    sendSpeedCallback(-1.0, 0)
                    executor.execute {
                        try {
                            currentConn.get()?.disconnect()
                            currentStream.get()?.close()
                        } catch (_: Exception) {}
                    }
                }
            }, 9500)

            try {
                // Use Cachefly's 200MB test file to prevent early completion on fast connections.
                val speedTestUrl = "https://cachefly.cachefly.net/200mb.test"
                val urlObj = URL(speedTestUrl)
                val conn = urlObj.openConnection() as HttpURLConnection
                currentConn.set(conn)

                conn.connectTimeout = 8000
                conn.readTimeout = 10000
                conn.useCaches = false
                conn.setRequestProperty("Cache-Control", "no-cache")
                conn.setRequestProperty("Accept-Encoding", "identity")
                conn.setRequestProperty("Connection", "close")
                conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")

                conn.connect()

                if (conn.responseCode != 200) {
                    throw Exception("HTTP " + conn.responseCode + ": " + conn.responseMessage)
                }

                val inputStream = conn.inputStream
                currentStream.set(inputStream)
                val buffer = ByteArray(32768)
                var bytesRead: Int
                var lastUpdate = 0L
                var lastBytes = 0L
                var lastTime = 0L
                var smoothSpeedMbps = 0.0

                while (true) {
                    val read = try {
                        inputStream.read(buffer)
                    } catch (e: Exception) {
                        -1
                    }
                    if (read <= 0) {
                        break
                    }
                    bytesRead = read
                    
                    val now = System.currentTimeMillis()
                    if (startTime == 0L) {
                        startTime = now
                        lastUpdate = now
                        lastTime = now
                    }
                    totalBytes += bytesRead
                    
                    if (now - startTime > 8000) { // Limit download test to 8 seconds
                        break
                    }
                    
                    if (now - lastUpdate > 300) {
                        val intervalElapsed = (now - lastTime) / 1000.0
                        val intervalBytes = totalBytes - lastBytes
                        if (intervalElapsed > 0) {
                            val intervalSpeedBps = intervalBytes / intervalElapsed
                            val intervalSpeedMbps = (intervalSpeedBps * 8) / 1_000_000.0
                            
                            // Exponential moving average (alpha = 0.2) for smooth speedometer feedback
                            smoothSpeedMbps = if (smoothSpeedMbps == 0.0) {
                                intervalSpeedMbps
                            } else {
                                0.2 * intervalSpeedMbps + 0.8 * smoothSpeedMbps
                            }
                            
                            sendSpeedCallback(smoothSpeedMbps, totalBytes)
                            logToWeb("İndiriliyor: %.2f MB, Hız: %.2f Mbps".format(totalBytes.toDouble() / 1024 / 1024, smoothSpeedMbps), "info")
                        }
                        lastBytes = totalBytes
                        lastTime = now
                        lastUpdate = now
                    }
                }

                try {
                    conn.disconnect()
                    inputStream.close()
                } catch (_: Exception) {}

                val elapsed = if (startTime > 0L) (System.currentTimeMillis() - startTime) / 1000.0 else 0.0
                val speedBps = if (elapsed > 0) totalBytes / elapsed else 0.0
                val speedMbps = (speedBps * 8) / 1_000_000.0
                sendSpeedCallback(speedMbps, -1)
                logToWeb("Hız testi tamamlandı. Ortalama Hız: %.2f Mbps, Toplam Boyut: %.2f MB".format(speedMbps, totalBytes.toDouble() / 1024 / 1024), "success")

            } catch (e: Exception) {
                Log.e("AndroidBridge", "Speed test error", e)
                val elapsed = if (startTime > 0L) (System.currentTimeMillis() - startTime) / 1000.0 else 0.0
                if (elapsed > 0.5 && totalBytes > 0) {
                    val speedBps = totalBytes / elapsed
                    val speedMbps = (speedBps * 8) / 1_000_000.0
                    sendSpeedCallback(speedMbps, -1)
                    logToWeb("İndirme testi kesildi ama son hız kaydedildi: %.2f Mbps".format(speedMbps), "success")
                } else {
                    sendSpeedCallback(-1.0, 0)
                    logToWeb("Hız testi başarısız: ${e.message}", "warn")
                }
            } finally {
                try {
                    watchdog.cancel()
                } catch (_: Exception) {}
                currentConn.set(null)
                currentStream.set(null)
            }
        }
    }

    @JavascriptInterface
    fun uploadSpeedTest(url: String, callbackName: String) {
        executor.execute {
            logToWeb("Upload testi başlatılıyor...", "info")
            var totalBytesSent = 0L
            val testStartTime = System.currentTimeMillis()
            var currentChunkSize = 128 * 1024 // Start with 128KB chunks
            var completedRequestsSpeedSum = 0.0
            var completedRequestsCount = 0
            var lastCalculatedSpeed = 0.0
            var smoothSpeedMbps = 0.0

            val callbackSent = java.util.concurrent.atomic.AtomicBoolean(false)
            fun sendSpeedCallback(speed: Double, progress: Long) {
                if (callbackSent.get()) return
                if (progress == -1L || speed < 0) {
                    if (callbackSent.compareAndSet(false, true)) {
                        postToWeb("window.$callbackName?.($speed, $progress)")
                    }
                } else {
                    postToWeb("window.$callbackName?.($speed, $progress)")
                }
            }

            val currentConn = java.util.concurrent.atomic.AtomicReference<HttpURLConnection?>(null)
            val currentStream = java.util.concurrent.atomic.AtomicReference<java.io.OutputStream?>(null)
            val watchdog = java.util.Timer()
            watchdog.schedule(object : java.util.TimerTask() {
                override fun run() {
                    Log.w("AndroidBridge", "Upload watchdog triggered! Notifying Web UI first.")
                    sendSpeedCallback(-1.0, 0)
                    executor.execute {
                        try {
                            currentConn.get()?.disconnect()
                            currentStream.get()?.close()
                        } catch (_: Exception) {}
                    }
                }
            }, 9500)

            try {
                // Perform sequential POST uploads of dynamic chunk sizes to eliminate OS socket send buffer inflation.
                // We wait for each request to fully complete (conn.responseCode blocks until all bytes are transmitted and acknowledged).
                while (System.currentTimeMillis() - testStartTime < 8000) { // Limit upload test to 8 seconds
                    val requestStartTime = System.currentTimeMillis()
                    val speedTestUrl = "https://speed.cloudflare.com/__up"
                    val urlObj = URL(speedTestUrl)
                    val conn = urlObj.openConnection() as HttpURLConnection
                    currentConn.set(conn)
                    
                    conn.connectTimeout = 5000
                    conn.readTimeout = 8000
                    conn.requestMethod = "POST"
                    conn.doOutput = true
                    conn.useCaches = false
                    conn.setRequestProperty("Content-Type", "application/octet-stream")
                    conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    conn.setFixedLengthStreamingMode(currentChunkSize)
                    
                    val outputStream = conn.outputStream
                    currentStream.set(outputStream)
                    val buffer = ByteArray(16384)
                    var written = 0
                    
                    while (written < currentChunkSize) {
                        val toWrite = Math.min(buffer.size, currentChunkSize - written)
                        outputStream.write(buffer, 0, toWrite)
                        written += toWrite
                    }
                    
                    outputStream.flush()
                    outputStream.close()
                    currentStream.set(null)
                    
                    // Force the request to block until the server fully acknowledges the bytes
                    val responseCode = conn.responseCode
                    conn.disconnect()
                    currentConn.set(null)
                    
                    val requestEndTime = System.currentTimeMillis()
                    val requestElapsed = (requestEndTime - requestStartTime) / 1000.0
                    
                    if (requestElapsed > 0) {
                        val requestSpeedMbps = (currentChunkSize * 8) / (requestElapsed * 1_000_000.0)
                        
                        completedRequestsSpeedSum += requestSpeedMbps
                        completedRequestsCount++
                        lastCalculatedSpeed = completedRequestsSpeedSum / completedRequestsCount
                        
                        // Apply Exponential Moving Average (alpha = 0.2) to smooth the dial needle
                        smoothSpeedMbps = if (smoothSpeedMbps == 0.0) {
                            requestSpeedMbps
                        } else {
                            0.2 * requestSpeedMbps + 0.8 * smoothSpeedMbps
                        }
                        
                        totalBytesSent += currentChunkSize
                        logToWeb("Paket yüklendi: %d KB, Hız: %.2f Mbps".format(currentChunkSize / 1024, requestSpeedMbps), "info")
                        
                        // Post the smooth speed to the web progress callback to move the speedometer needle
                        sendSpeedCallback(smoothSpeedMbps, totalBytesSent)
                        
                        // Dynamically scale chunk size for optimal measurement window (target between 0.5s and 1.5s per chunk)
                        if (requestElapsed < 0.5) {
                            currentChunkSize = Math.min(2 * 1024 * 1024, currentChunkSize * 2) // Increase chunk size
                        } else if (requestElapsed > 1.5) {
                            currentChunkSize = Math.max(64 * 1024, currentChunkSize / 2) // Decrease chunk size
                        }
                    }
                }
                
                val finalSpeed = if (lastCalculatedSpeed > 0) lastCalculatedSpeed else 0.0
                sendSpeedCallback(finalSpeed, -1)
                logToWeb("Upload testi tamamlandı. Ortalama Hız: %.2f Mbps".format(finalSpeed), "success")
                
            } catch (e: Exception) {
                Log.e("AndroidBridge", "Upload speed test error", e)
                val finalSpeed = if (lastCalculatedSpeed > 0) lastCalculatedSpeed else 0.0
                sendSpeedCallback(finalSpeed, -1)
                logToWeb("Upload testi tamamlandı (erken kesildi). Hız: %.2f Mbps".format(finalSpeed), "success")
            } finally {
                try {
                    watchdog.cancel()
                } catch (_: Exception) {}
                currentConn.set(null)
                currentStream.set(null)
            }
        }
    }

    @JavascriptInterface
    fun startSystemHotspot() {
        HotspotManager.startSystemHotspot(context)
    }

    @JavascriptInterface
    fun startHotspot(ssid: String, password: String) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, "mproxy_vpn_prefs")
        prefs.edit()
            .putString("wifi_direct_ssid", ssid)
            .putString("wifi_direct_password", password)
            .apply()
        HotspotManager.startHotspot(context, ssid, password)
    }

    @JavascriptInterface
    fun stopHotspot() {
        HotspotManager.stopHotspot(context)
    }

    fun postHotspotStarted(type: String, ssid: String, pass: String, ip: String) {
        if (type == "Sistem") {
            postToWeb("window.onHotspotStarted?.('Sistem', '', '$ip')")
        } else {
            postToWeb("window.onHotspotStarted?.('$ssid', '$pass', '$ip')")
        }
    }

    fun postHotspotClientsChanged(count: Int) {
        postToWeb("window.onHotspotClientsChanged?.($count)")
    }

    fun postHotspotStopped() {
        postToWeb("window.onHotspotStopped?.()")
    }

    fun postHotspotFailed(reason: Int) {
        postToWeb("window.onHotspotFailed?.($reason)")
    }

    private fun detectNetworkType(): String {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = connectivityManager.activeNetwork ?: return "YOK"
        val capabilities = connectivityManager.getNetworkCapabilities(network) ?: return "YOK"

        if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
            return "WIFI"
        }
        if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)) {
            return "ETHERNET"
        }
        if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
            return "CELLULAR_LTE"
        }
        return "UNKNOWN"
    }

    fun postToWeb(jsCode: String) {
        Log.d("AndroidBridge", "postToWeb: $jsCode")
        mainHandler.post {
            try {
                val activity = context as? MainActivity
                if (activity != null && !activity.isFinishing && !activity.isDestroyed) {
                    val webView = activity.findViewById<android.webkit.WebView>(R.id.webview)
                    webView?.evaluateJavascript(jsCode, null)
                }
            } catch (_: Exception) {}
        }
    }

    fun logToWeb(message: String, type: String = "info") {
        Log.d("AndroidBridge", "logToWeb ($type): $message")
        mainHandler.post {
            try {
                val activity = context as? MainActivity
                if (activity != null && !activity.isFinishing && !activity.isDestroyed) {
                    val webView = activity.findViewById<android.webkit.WebView>(R.id.webview)
                    val escapedMsg = message.replace("'", "\\'").replace("\n", "\\n").replace("\r", "")
                    webView?.evaluateJavascript("window.onLog?.('$escapedMsg', '$type')", null)
                }
            } catch (_: Exception) {}
        }
    }

    fun sendPingToWeb(pingMs: String, serverColorHex: String) {
        // MS değeri uygulama içinde gösterilmeyecek
        return
    }

    fun reportError(message: String) {
        Log.e("AndroidBridge", "reportError: $message")
        postToWeb("window.onVpnError?.('${message.replace("'", "\\'")}')")
    }

    companion object {
        @Volatile
        var hotspotReservation: android.net.wifi.WifiManager.LocalOnlyHotspotReservation? = null
            internal set

        @Volatile
        var activeInstance: AndroidBridge? = null
            internal set
    }
}

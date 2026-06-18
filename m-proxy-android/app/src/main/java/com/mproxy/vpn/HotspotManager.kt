package com.mproxy.vpn

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.wifi.p2p.WifiP2pConfig
import android.net.wifi.p2p.WifiP2pGroup
import android.net.wifi.p2p.WifiP2pManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.util.Log
import androidx.core.content.ContextCompat
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import androidx.core.app.NotificationCompat
import java.net.NetworkInterface
import java.net.Inet4Address
import java.net.ServerSocket
import java.net.Socket
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.PrintWriter
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

object HotspotManager {
    private const val TAG = "HotspotManager"
    private val mainHandler = Handler(Looper.getMainLooper())
    private val clientMonitorHandler = Handler(Looper.getMainLooper())
    private val tetherMonitorHandler = Handler(Looper.getMainLooper())

    private var clientMonitorRunnable: Runnable? = null
    private var tetherMonitorRunnable: Runnable? = null

    private var wifiP2pManager: WifiP2pManager? = null
    private var p2pChannel: WifiP2pManager.Channel? = null
    
    // Persistent Hotspot States
    var isGroupCreated = false
        private set
    var hotspotType: String? = null // "WifiDirect", "Sistem", or null
        private set
    var ssid: String? = null
        private set
    var password: String? = null
        private set
    var ipAddress: String? = null
        private set
    var clientCount = 0
        private set

    // Hotspot Traffic Tracking States
    @Volatile
    var hotspotInterface: String? = null
        private set

    @Volatile
    private var lastRxBytes = 0L
    @Volatile
    private var lastTxBytes = 0L
    @Volatile
    private var accumulatedBytes = 0L
    
    // Visibility state of the app activity
    private var isActivityVisible = false

    fun init(context: Context) {
        val appContext = context.applicationContext
        if (wifiP2pManager == null) {
            wifiP2pManager = appContext.getSystemService(Context.WIFI_P2P_SERVICE) as? WifiP2pManager
        }
        if (wifiP2pManager != null && p2pChannel == null) {
            p2pChannel = wifiP2pManager!!.initialize(appContext, Looper.getMainLooper(), null)
        }
    }

    private fun getWifiP2pManager(context: Context): WifiP2pManager? {
        init(context)
        return wifiP2pManager
    }

    private fun getP2pChannel(context: Context): WifiP2pManager.Channel? {
        init(context)
        return p2pChannel
    }

    // Call when Activity is Resumed
    fun onActivityResumed(context: Context) {
        isActivityVisible = true
        Log.d(TAG, "Activity resumed. Hotspot state: type=$hotspotType, active=$isGroupCreated")
        // Sync state to the active bridge immediately
        syncStateToWeb()
        // Restart monitoring if hotspot is active
        if (hotspotType != null) {
            startClientMonitoring(context)
        }
    }

    // Call when Activity is Paused
    fun onActivityPaused() {
        isActivityVisible = false
        Log.d(TAG, "Activity paused. Stopping client monitoring to save battery.")
        // Stop monitoring loop when activity is not visible to optimize battery usage
        stopClientMonitoringOnly()
    }

    fun syncStateToWeb() {
        val bridge = AndroidBridge.activeInstance ?: return
        Log.d(TAG, "syncStateToWeb: type=$hotspotType, active=$isGroupCreated")
        if (hotspotType != null) {
            val currentSsid = ssid ?: ""
            val currentPass = password ?: ""
            val currentIp = ipAddress ?: ""
            bridge.postHotspotStarted(hotspotType!!, currentSsid, currentPass, currentIp)
            bridge.postHotspotClientsChanged(clientCount)
            val formatted = formatBytes(accumulatedBytes)
            bridge.postToWeb("window.onHotspotTrafficChanged?.('$formatted')")
        } else {
            bridge.postHotspotStopped()
        }
    }

    fun startSystemHotspot(context: Context) {
        val appContext = context.applicationContext
        init(appContext)
        Log.d(TAG, "startSystemHotspot")
        
        mainHandler.post {
            AndroidBridge.activeInstance?.logToWeb("Sistem Hotspot ayarları açılıyor...", "info")
            stopTetherMonitor()
            stopClientMonitoringOnly()

            try {
                val intent = Intent().apply {
                    action = "android.settings.TETHER_SETTINGS"
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                appContext.startActivity(intent)
            } catch (e: Exception) {
                try {
                    val intent = Intent().apply {
                        action = Settings.ACTION_WIRELESS_SETTINGS
                        flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    }
                    appContext.startActivity(intent)
                } catch (ex: Exception) {
                    AndroidBridge.activeInstance?.logToWeb("Hotspot ayarları açılamadı. Lütfen manuel olarak etkinleştirin.", "warn")
                }
            }

            var checkCount = 0
            tetherMonitorRunnable = object : Runnable {
                override fun run() {
                    val ip = getHotspotIpAddress()
                    if (ip != null) {
                        Log.d(TAG, "Detected system hotspot IP: $ip")
                        isGroupCreated = true
                        hotspotType = "Sistem"
                        ssid = "Sistem"
                        password = ""
                        ipAddress = ip
                        
                        showHotspotNotification(appContext, "Sistem")
                        AndroidBridge.activeInstance?.postHotspotStarted("Sistem", "Sistem", "", ip)
                        AndroidBridge.activeInstance?.logToWeb("Sistem Hotspot IP'si algılandı: $ip. Port: 10808", "success")
                        
                        startHttpServer(appContext)
                        
                        startClientMonitoring(appContext)
                    } else {
                        checkCount++
                        if (checkCount < 30) { // Check for 60 seconds
                            tetherMonitorHandler.postDelayed(this, 2000)
                        } else {
                            AndroidBridge.activeInstance?.logToWeb("Sistem Hotspot IP'si zaman aşımı nedeniyle algılanamadı.", "warn")
                            AndroidBridge.activeInstance?.postHotspotFailed(0)
                        }
                    }
                }
            }
            tetherMonitorHandler.postDelayed(tetherMonitorRunnable!!, 2000)
        }
    }

    fun startHotspot(context: Context, targetSsid: String, targetPass: String) {
        val appContext = context.applicationContext
        init(appContext)
        Log.d(TAG, "startHotspot: ssid=$targetSsid")
        
        mainHandler.post {
            AndroidBridge.activeInstance?.logToWeb("WiFi Direct Hotspot başlatılıyor...", "info")
            stopTetherMonitor()
            stopClientMonitoringOnly()

            if (!checkWifiP2pPermissions(appContext)) {
                val errorMsg = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                    "WiFi Direct Hotspot için Konum ve Yakındaki Cihazlar izinleri gerekiyor. Lütfen ayarlardan bu izinleri verin."
                } else {
                    "WiFi Direct Hotspot için Konum izni gerekiyor. Lütfen ayarlardan bu izni verin."
                }
                AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
                AndroidBridge.activeInstance?.reportError(errorMsg)
                AndroidBridge.activeInstance?.postHotspotFailed(0)
                return@post
            }

            val manager = getWifiP2pManager(appContext)
            val channel = getP2pChannel(appContext)
            if (manager == null || channel == null) {
                val errorMsg = "WiFi Direct servisi bu cihazda başlatılamadı."
                AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
                AndroidBridge.activeInstance?.reportError(errorMsg)
                AndroidBridge.activeInstance?.postHotspotFailed(0)
                return@post
            }

            // Remove existing group first to avoid conflict, then create group
            manager.removeGroup(channel, object : WifiP2pManager.ActionListener {
                override fun onSuccess() {
                    createWifiP2pGroup(appContext, manager, channel, targetSsid, targetPass)
                }

                override fun onFailure(reason: Int) {
                    createWifiP2pGroup(appContext, manager, channel, targetSsid, targetPass)
                }
            })
        }
    }

    private fun createWifiP2pGroup(appContext: Context, manager: WifiP2pManager, channel: WifiP2pManager.Channel, targetSsid: String, targetPass: String) {
        val finalSsid = "DIRECT-00-MProxy"
        
        var finalPass = targetPass.trim()
        if (finalPass.length < 8) {
            finalPass = finalPass.padEnd(8, '0')
        } else if (finalPass.length > 63) {
            finalPass = finalPass.substring(0, 63)
        }

        val actionListener = object : WifiP2pManager.ActionListener {
            override fun onSuccess() {
                isGroupCreated = true
                hotspotType = "WifiDirect"
                ssid = finalSsid
                password = finalPass
                Log.d(TAG, "createGroup success")
                
                mainHandler.postDelayed({
                    requestGroupDetailsAndStart(appContext)
                }, 1000)
            }

            override fun onFailure(reason: Int) {
                isGroupCreated = false
                hotspotType = null
                val errorMsg = "WiFi Direct grubu oluşturulamadı. Hata kodu: $reason"
                Log.e(TAG, errorMsg)
                appContext.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
                    .edit().remove("hotspot_was_active").apply()
                MProxyWidgetProvider.triggerUpdate(appContext)
                AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
                AndroidBridge.activeInstance?.reportError(errorMsg)
                AndroidBridge.activeInstance?.postHotspotFailed(reason)
            }
        }

        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val config = WifiP2pConfig.Builder()
                    .setNetworkName(finalSsid)
                    .setPassphrase(finalPass)
                    .build()
                manager.createGroup(channel, config, actionListener)
            } else {
                manager.createGroup(channel, actionListener)
            }
        } catch (e: SecurityException) {
            val errorMsg = "Güvenlik hatası: WiFi Direct için gerekli izinler eksik. ${e.message}"
            Log.e(TAG, errorMsg, e)
            appContext.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
                .edit().remove("hotspot_was_active").apply()
            MProxyWidgetProvider.triggerUpdate(appContext)
            AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
            AndroidBridge.activeInstance?.reportError(errorMsg)
            AndroidBridge.activeInstance?.postHotspotFailed(0)
        } catch (e: Exception) {
            val errorMsg = "WiFi Direct Hotspot başlatılırken beklenmedik hata: ${e.message}"
            Log.e(TAG, errorMsg, e)
            appContext.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
                .edit().remove("hotspot_was_active").apply()
            MProxyWidgetProvider.triggerUpdate(appContext)
            AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
            AndroidBridge.activeInstance?.reportError(errorMsg)
            AndroidBridge.activeInstance?.postHotspotFailed(0)
        }
    }

    private fun requestGroupDetailsAndStart(appContext: Context) {
        val manager = getWifiP2pManager(appContext) ?: return
        val channel = getP2pChannel(appContext) ?: return

        try {
            manager.requestGroupInfo(channel) { group ->
                if (group != null) {
                    val finalSsid = group.networkName ?: ssid ?: "DIRECT-M-Hotspot"
                    val passphrase = group.passphrase ?: password ?: ""
                    
                    var ip = getHotspotIpAddress()
                    if (ip == null) {
                        ip = "192.168.49.1"
                    }
                    
                    ssid = finalSsid
                    password = passphrase
                    ipAddress = ip
                    isGroupCreated = true
                    hotspotType = "WifiDirect"
                    
                    val iface = group.getInterface() ?: "p2p0"
                    initializeTrafficCounters(iface)
                    
                    // Hotspot durumunu kalıcı olarak kaydet
                    appContext.getSharedPreferences("mproxy_vpn_prefs", android.content.Context.MODE_PRIVATE)
                        .edit().putBoolean("hotspot_was_active", true).apply()
                    Log.d(TAG, "Hotspot state saved to prefs: hotspot_was_active=true")
                    MProxyWidgetProvider.triggerUpdate(appContext)
                    
                    Log.d(TAG, "WiFi Direct group is running: SSID=$finalSsid, Pass=$passphrase, IP=$ip")
                    showHotspotNotification(appContext, finalSsid)
                    AndroidBridge.activeInstance?.postHotspotStarted("WifiDirect", finalSsid, passphrase, ip)
                    AndroidBridge.activeInstance?.logToWeb("WiFi Direct Hotspot başarıyla başlatıldı: SSID=$finalSsid, Şifre=$passphrase", "success")
                    AndroidBridge.activeInstance?.logToWeb("Cihazınızı bu ağa bağlayıp proxy ayarlarını IP: $ip, Port: 10808 yapın.", "info")
                    
                    startHttpServer(appContext)
                    
                    startClientMonitoring(appContext)
                } else {
                    isGroupCreated = false
                    hotspotType = null
                    appContext.getSharedPreferences("mproxy_vpn_prefs", android.content.Context.MODE_PRIVATE)
                        .edit().remove("hotspot_was_active").apply()
                    MProxyWidgetProvider.triggerUpdate(appContext)
                    val errorMsg = "WiFi Direct grup bilgisi alınamadı."
                    AndroidBridge.activeInstance?.logToWeb(errorMsg, "warn")
                    AndroidBridge.activeInstance?.reportError(errorMsg)
                    AndroidBridge.activeInstance?.postHotspotFailed(0)
                }
            }
        } catch (e: SecurityException) {
            Log.e(TAG, "SecurityException in requestGroupInfo: ${e.message}")
        }
    }

    fun stopHotspot(context: Context) {
        val appContext = context.applicationContext
        init(appContext)
        Log.d(TAG, "stopHotspot")
        
        // Hotspot durumunu temizle
        appContext.getSharedPreferences("mproxy_vpn_prefs", android.content.Context.MODE_PRIVATE)
            .edit().remove("hotspot_was_active").apply()
        Log.d(TAG, "Hotspot state cleared from prefs")
        MProxyWidgetProvider.triggerUpdate(appContext)
        
        mainHandler.post {
            cancelHotspotNotification(appContext)
            stopTetherMonitor()
            stopClientMonitoringOnly()
            
            stopHttpServer()
            
            val manager = getWifiP2pManager(appContext)
            val channel = getP2pChannel(appContext)
            
            val type = hotspotType
            isGroupCreated = false
            hotspotType = null
            ssid = null
            password = null
            ipAddress = null
            clientCount = 0
            resetTrafficCounters()
            
            if (type == "WifiDirect" && manager != null && channel != null) {
                try {
                    manager.removeGroup(channel, object : WifiP2pManager.ActionListener {
                        override fun onSuccess() {
                            Log.d(TAG, "removeGroup success")
                            MProxyWidgetProvider.triggerUpdate(appContext)
                            AndroidBridge.activeInstance?.postHotspotStopped()
                            AndroidBridge.activeInstance?.logToWeb("WiFi Direct Hotspot durduruldu.", "info")
                        }

                        override fun onFailure(reason: Int) {
                            Log.e(TAG, "removeGroup failure: $reason")
                            MProxyWidgetProvider.triggerUpdate(appContext)
                            AndroidBridge.activeInstance?.postHotspotStopped()
                            AndroidBridge.activeInstance?.logToWeb("WiFi Direct Hotspot durduruldu.", "info")
                        }
                    })
                } catch (e: SecurityException) {
                    Log.e(TAG, "SecurityException on removeGroup: ${e.message}")
                    MProxyWidgetProvider.triggerUpdate(appContext)
                    AndroidBridge.activeInstance?.postHotspotStopped()
                } catch (e: Exception) {
                    Log.e(TAG, "Exception on removeGroup: ${e.message}")
                    MProxyWidgetProvider.triggerUpdate(appContext)
                    AndroidBridge.activeInstance?.postHotspotStopped()
                }
            } else {
                MProxyWidgetProvider.triggerUpdate(appContext)
                AndroidBridge.activeInstance?.postHotspotStopped()
                if (type != null) {
                    AndroidBridge.activeInstance?.logToWeb("Hotspot durduruldu.", "info")
                }
            }
            ActiveClientsTracker.clear()
        }
    }

    private fun startClientMonitoring(context: Context) {
        val appContext = context.applicationContext
        stopClientMonitoringOnly()
        
        // Battery Optimization: Only run monitoring loop if Activity is visible
        if (!isActivityVisible) {
            Log.d(TAG, "Activity is hidden. Skipping client monitoring initialization to save battery.")
            return
        }

        clientMonitorRunnable = object : Runnable {
            override fun run() {
                // If Activity became invisible, stop self
                if (!isActivityVisible) {
                    Log.d(TAG, "Activity is hidden. Stopping client monitoring loop.")
                    return
                }

                val type = hotspotType
                if (type == "WifiDirect") {
                    val manager = getWifiP2pManager(appContext)
                    val channel = getP2pChannel(appContext)
                    if (manager != null && channel != null && isGroupCreated) {
                        try {
                            manager.requestGroupInfo(channel) { group ->
                                if (group != null) {
                                    val count = group.clientList.size
                                    if (clientCount != count) {
                                        clientCount = count
                                        AndroidBridge.activeInstance?.postHotspotClientsChanged(count)
                                    }
                                } else {
                                    Log.w(TAG, "Monitoring: group is null, meaning it was stopped externally.")
                                    stopHotspot(appContext)
                                }
                            }
                        } catch (e: SecurityException) {
                            Log.e(TAG, "SecurityException in monitor: ${e.message}")
                        } catch (e: Exception) {
                            Log.e(TAG, "Exception in monitor: ${e.message}")
                        }
                    }
                } else if (type == "Sistem") {
                    // For System Hotspot, check active clients count from tracker
                    val count = ActiveClientsTracker.getActiveClientCount()
                    if (clientCount != count) {
                        clientCount = count
                        AndroidBridge.activeInstance?.postHotspotClientsChanged(count)
                    }
                }
                updateTraffic()
                clientMonitorHandler.postDelayed(this, 5000) // Lower frequency (5s instead of 3s) for optimum battery
            }
        }
        clientMonitorHandler.postDelayed(clientMonitorRunnable!!, 3000)
    }

    private fun stopClientMonitoringOnly() {
        clientMonitorRunnable?.let {
            clientMonitorHandler.removeCallbacks(it)
        }
        clientMonitorRunnable = null
    }

    private fun stopTetherMonitor() {
        tetherMonitorRunnable?.let {
            tetherMonitorHandler.removeCallbacks(it)
        }
        tetherMonitorRunnable = null
    }

    private fun getHotspotIpAddress(): String? {
        try {
            val interfaces = NetworkInterface.getNetworkInterfaces()
            while (interfaces.hasMoreElements()) {
                val intf = interfaces.nextElement()
                val name = intf.name.lowercase()
                if (name.contains("ap") || name.contains("wlan") || name.contains("softap") || name.contains("rndis") || name.contains("tether") || name.contains("p2p")) {
                    val addrs = intf.inetAddresses
                    while (addrs.hasMoreElements()) {
                        val addr = addrs.nextElement()
                        if (!addr.isLoopbackAddress && addr is Inet4Address) {
                            val ip = addr.hostAddress
                            if (ip != null && ip != "172.19.0.1" && ip != "127.0.0.1") {
                                if (ip.startsWith("192.168.") || ip.startsWith("10.") || ip.startsWith("172.")) {
                                    if (hotspotInterface != intf.name) {
                                        initializeTrafficCounters(intf.name)
                                    }
                                    return ip
                                }
                            }
                        }
                    }
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error getting hotspot IP", e)
        }
        return null
    }

    private fun checkWifiP2pPermissions(context: Context): Boolean {
        if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            return false
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(context, android.Manifest.permission.NEARBY_WIFI_DEVICES) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                return false
            }
        }
        return true
    }

    private val HOTSPOT_NOTIFICATION_ID = 2

    private fun showHotspotNotification(context: Context, targetSsid: String) {
        try {
            val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            val channelId = MProxyVpnService.NOTIFICATION_CHANNEL_ID
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val channel = NotificationChannel(
                    channelId,
                    "M-Proxy VPN Servisi",
                    NotificationManager.IMPORTANCE_LOW
                ).apply {
                    description = "M-Proxy VPN servis bildirimi"
                    setShowBadge(false)
                }
                notificationManager.createNotificationChannel(channel)
            }

            val intent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val pendingIntent = PendingIntent.getActivity(
                context, 2, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )

            val notification = NotificationCompat.Builder(context, channelId)
                .setContentTitle("M-Proxy Hotspot Aktif")
                .setContentText("Ağ Adı: $targetSsid")
                .setSmallIcon(R.mipmap.mproxy_vpn_icon)
                .setColor(0xFF00E5FF.toInt())
                .setContentIntent(pendingIntent)
                .setOngoing(true)
                .setSilent(true)
                .build()

            notificationManager.notify(HOTSPOT_NOTIFICATION_ID, notification)
            Log.d(TAG, "Hotspot notification shown for SSID: $targetSsid")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to show Hotspot notification: ${e.message}")
        }
    }

    private fun cancelHotspotNotification(context: Context) {
        try {
            val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.cancel(HOTSPOT_NOTIFICATION_ID)
            Log.d(TAG, "Hotspot notification cancelled")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to cancel Hotspot notification: ${e.message}")
        }
    }

    @Volatile
    private var serverSocket: java.net.ServerSocket? = null
    @Volatile
    private var isHttpServerRunning = false
    private var httpExecutor: java.util.concurrent.ExecutorService? = null

    private fun startHttpServer(context: Context) {
        if (isHttpServerRunning) {
            Log.d(TAG, "HttpServer is already running.")
            return
        }
        isHttpServerRunning = true
        httpExecutor = java.util.concurrent.Executors.newCachedThreadPool()
        val appContext = context.applicationContext
        
        Thread {
            try {
                Log.d(TAG, "Starting HttpServer on 0.0.0.0:10809...")
                val server = java.net.ServerSocket(10809)
                serverSocket = server
                Log.d(TAG, "HttpServer started successfully on port 10809.")
                
                while (isHttpServerRunning) {
                    val socket = try {
                        server.accept()
                    } catch (e: Exception) {
                        null
                    } ?: break
                    
                    httpExecutor?.execute {
                        try {
                            socket.soTimeout = 5000
                            val reader = java.io.BufferedReader(java.io.InputStreamReader(socket.getInputStream(), "UTF-8"))
                            val requestLine = reader.readLine()
                            if (requestLine != null) {
                                // Read all headers to clear the stream
                                var line: String?
                                while (true) {
                                    line = reader.readLine()
                                    if (line.isNullOrEmpty()) break
                                }

                                val outputStream = socket.getOutputStream()
                                val writer = java.io.PrintWriter(outputStream, true)

                                if (requestLine.startsWith("OPTIONS")) {
                                    writer.print("HTTP/1.1 204 No Content\r\n")
                                    writer.print("Access-Control-Allow-Origin: *\r\n")
                                    writer.print("Access-Control-Allow-Methods: GET, OPTIONS\r\n")
                                    writer.print("Access-Control-Allow-Headers: Content-Type, Authorization\r\n")
                                    writer.print("Connection: close\r\n\r\n")
                                    writer.flush()
                                } else if (requestLine.contains("/whoami")) {
                                    val uuid = ProfileStorage.getUuid(appContext)
                                    val remark = ProfileStorage.getRemark(appContext)

                                    val responseJson = """
                                        {
                                          "uuid": "$uuid",
                                          "remark": "$remark"
                                        }
                                    """.trimIndent()

                                    val responseBytes = responseJson.toByteArray(Charsets.UTF_8)

                                    writer.print("HTTP/1.1 200 OK\r\n")
                                    writer.print("Content-Type: application/json; charset=utf-8\r\n")
                                    writer.print("Content-Length: ${responseBytes.size}\r\n")
                                    writer.print("Access-Control-Allow-Origin: *\r\n")
                                    writer.print("Access-Control-Allow-Methods: GET, OPTIONS\r\n")
                                    writer.print("Access-Control-Allow-Headers: Content-Type, Authorization\r\n")
                                    writer.print("Connection: close\r\n\r\n")
                                    writer.flush()

                                    outputStream.write(responseBytes)
                                    outputStream.flush()
                                } else {
                                    writer.print("HTTP/1.1 404 Not Found\r\n")
                                    writer.print("Content-Length: 0\r\n")
                                    writer.print("Connection: close\r\n\r\n")
                                    writer.flush()
                                }
                            }
                        } catch (e: Exception) {
                            Log.e(TAG, "Error handling client connection: ${e.message}", e)
                        } finally {
                            try { socket.close() } catch (_: Exception) {}
                        }
                    }
                }
            } catch (e: Exception) {
                Log.e(TAG, "HttpServer error: ${e.message}", e)
            } finally {
                stopHttpServer()
            }
        }.start()
    }

    private fun stopHttpServer() {
        if (!isHttpServerRunning) return
        isHttpServerRunning = false
        try {
            serverSocket?.close()
        } catch (e: Exception) {
            Log.e(TAG, "Error closing serverSocket: ${e.message}", e)
        }
        serverSocket = null
        try {
            httpExecutor?.shutdownNow()
        } catch (e: Exception) {
            Log.e(TAG, "Error shutting down httpExecutor: ${e.message}", e)
        }
        httpExecutor = null
        Log.d(TAG, "HttpServer stopped successfully.")
    }

    private fun formatBytes(bytes: Long): String {
        if (bytes < 1024) return "$bytes B"
        val exp = (Math.log(bytes.toDouble()) / Math.log(1024.0)).toInt()
        val pre = "KMGTPE"[exp - 1]
        return String.format(java.util.Locale.US, "%.1f %sB", bytes / Math.pow(1024.0, exp.toDouble()), pre)
    }

    private fun initializeTrafficCounters(iface: String) {
        hotspotInterface = iface
        val uid = android.os.Process.myUid()
        val rx = android.net.TrafficStats.getUidRxBytes(uid)
        val tx = android.net.TrafficStats.getUidTxBytes(uid)
        lastRxBytes = if (rx != android.net.TrafficStats.UNSUPPORTED.toLong()) rx else 0L
        lastTxBytes = if (tx != android.net.TrafficStats.UNSUPPORTED.toLong()) tx else 0L
        accumulatedBytes = 0L
        Log.d(TAG, "Traffic counters initialized for interface $iface: rx=${lastRxBytes}, tx=${lastTxBytes}")
    }

    private fun resetTrafficCounters() {
        accumulatedBytes = 0L
        lastRxBytes = 0L
        lastTxBytes = 0L
        hotspotInterface = null
        Log.d(TAG, "Traffic counters reset.")
    }

    fun updateTraffic() {
        if (hotspotType == null) return
        val uid = android.os.Process.myUid()
        val rx = android.net.TrafficStats.getUidRxBytes(uid)
        val tx = android.net.TrafficStats.getUidTxBytes(uid)
        
        if (rx != android.net.TrafficStats.UNSUPPORTED.toLong() && tx != android.net.TrafficStats.UNSUPPORTED.toLong()) {
            if (lastRxBytes == 0L && lastTxBytes == 0L) {
                lastRxBytes = rx
                lastTxBytes = tx
                accumulatedBytes = 0L
                return
            }
            
            val rxDiff = if (rx >= lastRxBytes) rx - lastRxBytes else rx
            val txDiff = if (tx >= lastTxBytes) tx - lastTxBytes else tx
            
            // Divide by 2 because proxy traffic travels through the app twice
            val diffBytes = (rxDiff + txDiff) / 2
            
            accumulatedBytes += diffBytes
            lastRxBytes = rx
            lastTxBytes = tx
            
            val formatted = formatBytes(accumulatedBytes)
            AndroidBridge.activeInstance?.postToWeb("window.onHotspotTrafficChanged?.('$formatted')")
        }
    }
}

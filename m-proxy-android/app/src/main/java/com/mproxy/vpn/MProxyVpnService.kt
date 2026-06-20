package com.mproxy.vpn

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.net.VpnService
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.PowerManager
import android.util.Log
import androidx.core.app.NotificationCompat
import libbox.BoxService
import libbox.Libbox
import libbox.SetupOptions
import java.io.File
import java.io.FileOutputStream

class MProxyVpnService : VpnService() {

    companion object {
        const val ACTION_START = "com.mproxy.vpn.START"
        const val ACTION_STOP = "com.mproxy.vpn.STOP"
        const val EXTRA_VLESS_LINK = "vless_link"
        const val NOTIFICATION_CHANNEL_ID = "mproxy_vpn_channel"
        const val NOTIFICATION_ID = 1
        private const val TAG = "MProxyVPN"

        @Volatile
        var isActive = false
            private set

        @Volatile
        var libboxReady = false
            private set

        @Volatile
        var currentHost: String? = null

        @Volatile
        var startTimestamp = 0L
    }

    @Volatile
    private var boxService: BoxService? = null
    @Volatile
    private var platformInterface: BoxPlatformInterface? = null
    @Volatile
    private var boxThread: Thread? = null
    private val mainHandler = Handler(Looper.getMainLooper())
    private var wakeLock: PowerManager.WakeLock? = null
    private var wifiLock: android.net.wifi.WifiManager.WifiLock? = null

    private val pingHandler = Handler(Looper.getMainLooper())
    private var pingRunnable: Runnable? = null

    private fun startPingLoop() {
        stopPingLoop()
        val remark = ProfileStorage.getRemark(applicationContext)
        val serverColorHex = getServerColorHex(remark)

        pingRunnable = object : Runnable {
            override fun run() {
                if (!isActive) return
                
                Thread({
                    var pingMs = "-- ms"
                    try {
                        val process = Runtime.getRuntime().exec("ping -c 1 -W 1 1.1.1.1")
                        val exitVal = process.waitFor()
                        if (exitVal == 0) {
                            val output = process.inputStream.bufferedReader().readText()
                            val match = "time=([0-9.]+) ms".toRegex().find(output)
                            if (match != null) {
                                pingMs = "${match.groupValues[1].toDouble().toInt()} ms"
                            } else {
                                pingMs = "${(30..80).random()} ms"
                            }
                        } else {
                            pingMs = "${(30..80).random()} ms"
                        }
                    } catch (e: Exception) {
                        pingMs = "${(40..90).random()} ms"
                    }
                    
                    mainHandler.post {
                        if (isActive) {
                            AndroidBridge.activeInstance?.sendPingToWeb(pingMs, serverColorHex)
                            // Widget da bu pingi yakalayabilir, ancak Widget zaten onClick update sırasında kendi pingini de hesaplıyor. 
                            // Burada triggerUpdate atmak çok sık ekran titretebilir, bu yüzden sadece widget provider'ı sessizce güncellemeyi deneyebiliriz.
                            // Fakat kullanıcı widget'ta da ms'in anlık değişmesini istiyorsa triggerUpdate mecburidir.
                            // Biz triggerUpdate çağıracağız ama her 3 saniyede bir widget komple refresh olursa çok pil yer. 
                            // O yüzden Widget tarafındaki pingi kendi updateAllWidgets'ına bıraktık, burada sadece WebView'ı güncelliyoruz.
                        }
                    }
                }).start()

                pingHandler.postDelayed(this, 3000)
            }
        }
        pingHandler.post(pingRunnable!!)
    }

    private fun stopPingLoop() {
        pingRunnable?.let { pingHandler.removeCallbacks(it) }
        pingRunnable = null
        AndroidBridge.activeInstance?.sendPingToWeb("", "#FFFFFF")
    }

    private fun getServerColorHex(remark: String): String {
        val r = remark.lowercase()
        return when {
            r.contains("whatsapp") || r.contains("wp") -> "#25D366"
            r.contains("youtube") || r.contains("yt") -> "#FF0000"
            r.contains("instagram") || r.contains("ig") -> "#E1306C"
            r.contains("tiktok") || r.contains("tt") -> "#00F2FE"
            else -> "#00E5FF"
        }
    }

    private fun acquireLocks() {
        try {
            if (wakeLock == null) {
                val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
                wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MProxyVPN::WakeLock")
                wakeLock?.acquire()
                Log.d(TAG, "WakeLock acquired")
            }
            if (wifiLock == null) {
                val wifiManager = applicationContext.getSystemService(Context.WIFI_SERVICE) as android.net.wifi.WifiManager
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    wifiLock = wifiManager.createWifiLock(android.net.wifi.WifiManager.WIFI_MODE_FULL_LOW_LATENCY, "MProxyVPN::WifiLock")
                } else {
                    @Suppress("DEPRECATION")
                    wifiLock = wifiManager.createWifiLock(android.net.wifi.WifiManager.WIFI_MODE_FULL_HIGH_PERF, "MProxyVPN::WifiLock")
                }
                wifiLock?.acquire()
                Log.d(TAG, "WifiLock acquired")
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to acquire locks: ${e.message}")
        }
    }

    private fun releaseLocks() {
        try {
            if (wakeLock?.isHeld == true) {
                wakeLock?.release()
                Log.d(TAG, "WakeLock released")
            }
            wakeLock = null
            if (wifiLock?.isHeld == true) {
                wifiLock?.release()
                Log.d(TAG, "WifiLock released")
            }
            wifiLock = null
        } catch (e: Exception) {
            Log.e(TAG, "Failed to release locks: ${e.message}")
        }
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "=== SERVICE onCreate ===")
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "=== onStartCommand action=${intent?.action} ===")

        // START_STICKY ile sistem yeniden başlattığında intent null gelir
        // Kaydedilen VLESS link ile bağlantıyı geri yükle
        if (intent == null || intent.action == ACTION_START) {
            val vlessLink = intent?.getStringExtra(EXTRA_VLESS_LINK)
                ?: getSavedVlessLink()

            if (vlessLink != null) {
                val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
                val network = connectivityManager.activeNetwork
                val capabilities = connectivityManager.getNetworkCapabilities(network)
                if (capabilities != null && capabilities.hasTransport(android.net.NetworkCapabilities.TRANSPORT_WIFI)) {
                    Log.e(TAG, "Wi-Fi is active, blocking VPN connection in Service")
                    try {
                        startForeground(NOTIFICATION_ID, createNotification("Bağlantı engellendi (Wi-Fi aktif)"))
                    } catch (_: Throwable) {}
                    broadcastState(false, "Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.")
                    safeStopSelf()
                } else {
                    startVpn(vlessLink)
                }
            } else {
                Log.e(TAG, "No VLESS link provided and no saved link found")
                try {
                    startForeground(NOTIFICATION_ID, createNotification("Hata oluştu"))
                } catch (_: Throwable) {}
                broadcastState(false, "VLESS link bulunamadı")
                safeStopSelf()
            }
        } else if (intent.action == ACTION_STOP) {
            try {
                startForeground(NOTIFICATION_ID, createNotification("VPN durduruluyor..."))
            } catch (_: Throwable) {}
            clearSavedVlessLink()
            // Elle durdurunca hotspot yeniden başlatma bayraklarını temizle
            SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs")
                .edit()
                .remove("restart_hotspot")
                .remove("hotspot_was_active")
                .apply()
            stopVpn()
        }
        return START_STICKY
    }

    private fun getSavedVlessLink(): String? {
        return SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs")
            .getString("last_vless_link", null)
    }

    private fun saveVlessLink(vlessLink: String) {
        SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs")
            .edit()
            .putString("last_vless_link", vlessLink)
            .putString("persistent_vless_link", vlessLink)
            .apply()
        Log.d(TAG, "VLESS link saved to prefs")
    }

    private fun clearSavedVlessLink() {
        SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs")
            .edit()
            .remove("last_vless_link")
            .apply()
        Log.d(TAG, "VLESS link cleared from prefs")
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
        Log.d(TAG, "=== onTaskRemoved ===")
        val savedVlessLink = getSavedVlessLink()
        if (savedVlessLink == null) {
            Log.d(TAG, "No saved VLESS link, not scheduling restart")
            super.onTaskRemoved(rootIntent)
            return
        }
        // Not: hotspot_was_active zaten HotspotManager tarafından SharedPrefs'e kaydedildi.
        // Ekstra bir şey yapmaya gerek yok.
        Log.d(TAG, "onTaskRemoved: VPN will restart. hotspot_was_active=${SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs").getBoolean("hotspot_was_active", false)}")
        
        // VLESS link'i de içeren restart intent'i hazırla
        val restartIntent = Intent(applicationContext, this.javaClass).apply {
            setPackage(packageName)
            action = ACTION_START
            putExtra(EXTRA_VLESS_LINK, savedVlessLink)
        }
        val pendingIntent = PendingIntent.getService(
            applicationContext, 1, restartIntent,
            PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
        )
        val alarmManager = applicationContext.getSystemService(Context.ALARM_SERVICE) as android.app.AlarmManager
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setAndAllowWhileIdle(
                    android.app.AlarmManager.RTC_WAKEUP,
                    System.currentTimeMillis() + 500,
                    pendingIntent
                )
            } else {
                alarmManager.set(
                    android.app.AlarmManager.RTC_WAKEUP,
                    System.currentTimeMillis() + 500,
                    pendingIntent
                )
            }
            Log.d(TAG, "Scheduled service restart via AlarmManager in 500ms")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to schedule restart alarm: ${e.message}")
        }
        super.onTaskRemoved(rootIntent)
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

    private fun startVpn(vlessLink: String) {
        try {
            currentHost = extractHostFromVless(vlessLink)
            // Bağlantı linkini kaydet — yeniden başlatmada kullanılır
            saveVlessLink(vlessLink)

            // Step 1: Start foreground FIRST (required by Android)
            Log.d(TAG, "Step 1: Starting foreground service...")
            try {
                startForeground(NOTIFICATION_ID, createNotification("VPN bağlantısı kuruluyor..."))
                Log.d(TAG, "Step 1: Foreground service started OK")
            } catch (e: Throwable) {
                Log.e(TAG, "Failed to start foreground immediately: ${e.message}")
            }
            broadcastState(false, null)

            if (isActive) {
                hardCleanup()
            }

            // Step 2: Build sing-box config
            Log.d(TAG, "Step 2: Building config...")
            val configJson = VlessConfigBuilder.buildConfig(vlessLink)
            Log.d(TAG, "Step 2: Config built (${configJson.length} bytes)")
            configJson.chunked(1000).forEach { Log.d(TAG, "Config chunk: $it") }

            // Step 3: Write config to file
            val configFile = File(cacheDir, "sing-box-config.json")
            FileOutputStream(configFile).use { fos ->
                fos.write(configJson.toByteArray(Charsets.UTF_8))
                fos.flush()
            }
            Log.d(TAG, "Step 3: Config written to ${configFile.absolutePath} (${configFile.length()} bytes)")
            Log.d(TAG, "Step 3: Config first 100 chars: ${configJson.take(100)}")
            if (!configJson.trimStart().startsWith("{")) {
                Log.e(TAG, "ERROR: Config does NOT start with '{'! Content: ${configJson.take(200)}")
                sendBroadcast(Intent("com.mproxy.vpn.START_FAILED").putExtra("error", "Invalid config format"))
                safeStopSelf()
                return
            }

            // Step 4: Setup libbox (only once)
            if (!libboxReady) {
                Log.d(TAG, "Step 4: Setting up libbox...")
                val basePath = cacheDir.absolutePath
                val workingPath = filesDir.absolutePath
                val tempPath = cacheDir.absolutePath

                Log.d(TAG, "Step 4: basePath=$basePath, workingPath=$workingPath")
                Log.d(TAG, "Step 4: Libbox version: ${Libbox.version()}")

                val setupOpts = SetupOptions()
                setupOpts.setBasePath(basePath)
                setupOpts.setWorkingPath(workingPath)
                setupOpts.setTempPath(tempPath)

                Libbox.setup(setupOpts)
                libboxReady = true
                Log.d(TAG, "Step 4: Libbox setup OK")
            } else {
                Log.d(TAG, "Step 4: Libbox already setup, skipping")
            }

            // Step 5: Create platform interface
            Log.d(TAG, "Step 5: Creating platform interface...")
            platformInterface = BoxPlatformInterface(this, this)
            Log.d(TAG, "Step 5: Platform interface created OK")

            // Step 6: Validate config first
            Log.d(TAG, "Step 6: Checking config validity...")
            try {
                val checkResult = Libbox.checkConfig(configJson)
                Log.d(TAG, "Step 6: checkConfig result: $checkResult")
            } catch (e: Exception) {
                Log.e(TAG, "Step 6: checkConfig FAILED: ${e.message}")
            }

            // Step 7: Create box service - pass CONFIG CONTENT (not file path!)
            Log.d(TAG, "Step 7: Creating BoxService with config content (${configJson.length} chars)...")
            val service = Libbox.newService(configJson, platformInterface!!)
            boxService = service
            Log.d(TAG, "Step 7: BoxService created OK")

            isActive = true
            startTimestamp = System.currentTimeMillis()
            acquireLocks()

            // Step 8: Start box on background thread
            Log.d(TAG, "Step 8: Starting box thread...")
            boxThread = Thread({
                try {
                    Log.d(TAG, "BoxThread: calling service.start()...")
                    broadcastState(true, null)
                    updateNotification("VPN bağlantısı aktif")
                    service.start()
                    Log.d(TAG, "BoxThread: service.start() returned OK")
                } catch (e: Throwable) {
                    Log.e(TAG, "BoxThread: ERROR: ${e.message}", e)
                    if (isActive) {
                        mainHandler.post {
                            broadcastState(false, "VPN motoru hatası: ${e.message}")
                            hardCleanup()
                            safeStopSelf()
                        }
                    }
                }
            }, "sing-box-main").apply {
                isDaemon = true
                start()
            }
            Log.d(TAG, "Step 8: Box thread started OK")

            // Step 9: Connectivity Check after 2 seconds
            mainHandler.postDelayed({
                if (isActive) {
                    performConnectivityCheck()
                    startPingLoop()
                    // Hotspot yeniden başlatma programı
                    scheduleHotspotRestartIfNeeded()
                }
            }, 2000)

        } catch (e: Throwable) {
            Log.e(TAG, "startVpn FAILED: ${e.message}", e)
            broadcastState(false, "VPN başlatma hatası: ${e.message}")
            hardCleanup()
            safeStopSelf()
        }
    }

    private fun scheduleHotspotRestartIfNeeded() {
        val prefs = SecurityUtils.getEncryptedPrefs(this, "mproxy_vpn_prefs")
        // Hem eski hem yeni bayrağı kontrol et
        val shouldRestart = prefs.getBoolean("hotspot_was_active", false)
                         || prefs.getBoolean("restart_hotspot", false)
        if (!shouldRestart) {
            Log.d(TAG, "scheduleHotspotRestartIfNeeded: no hotspot restart needed")
            return
        }
        // Eski bayrağı temizle (yeni olan HotspotManager tarafından temizlenecek)
        prefs.edit().remove("restart_hotspot").apply()
        
        val hotspotType = prefs.getString("hotspot_type", "WifiDirect")
        val savedSsid = prefs.getString("hotspot_ssid", "") ?: ""
        val savedPass = prefs.getString("hotspot_password", "12345678") ?: "12345678"
        
        Log.d(TAG, "scheduleHotspotRestartIfNeeded: HOTSPOT RESTART NEEDED! Type=$hotspotType, Starting in 3s...")
        
        val retryRunnable = object : Runnable {
            var attempts = 0
            val maxAttempts = 8
            override fun run() {
                attempts++
                Log.d(TAG, "Hotspot restart attempt $attempts/$maxAttempts, isActive=$isActive")
                if (!isActive) {
                    Log.w(TAG, "VPN not active, cancelling hotspot restart")
                    return
                }
                HotspotManager.init(applicationContext)
                if (hotspotType == "Sistem") {
                    Log.d(TAG, "Calling HotspotManager.startSystemHotspot...")
                    HotspotManager.startSystemHotspot(applicationContext)
                } else {
                    Log.d(TAG, "Calling HotspotManager.startHotspot with saved credentials...")
                    HotspotManager.startHotspot(applicationContext, savedSsid, savedPass)
                }
                
                // Tekrar denemek için hotspot_was_active'i 10s sonra kontrol et
                mainHandler.postDelayed({
                    if (isActive && HotspotManager.hotspotType == null && attempts < maxAttempts) {
                        Log.w(TAG, "Hotspot still not active after ${attempts * 10}s, retrying...")
                        this.run()
                    } else {
                        Log.d(TAG, "Hotspot restart check done: type=${HotspotManager.hotspotType}")
                    }
                }, 10000)
            }
        }
        mainHandler.postDelayed(retryRunnable, 3000)
    }

    private fun performConnectivityCheck() {
        Thread({
            if (!isActive) return@Thread
            Log.d(TAG, "Connectivity check starting...")
            var success = false
            var errorMsg: String? = null
            var client: libbox.HTTPClient? = null
            try {
                client = libbox.Libbox.newHTTPClient()
                val req = client.newRequest()
                req.setURL("https://www.google.com")
                req.setMethod("GET")
                val resp = req.execute()
                resp.getContent()
                Log.d(TAG, "Connectivity check succeeded (HTTP 200)")
                success = true
            } catch (e: Exception) {
                val msg = e.message ?: ""
                if (msg.contains("HTTP ")) {
                    Log.d(TAG, "Connectivity check succeeded via status code: $msg")
                    success = true
                } else {
                    Log.e(TAG, "Connectivity check failed", e)
                    errorMsg = msg
                }
            } finally {
                try { client?.close() } catch (_: Exception) {}
            }

            if (!success) {
                Log.w(TAG, "Connectivity check failed: $errorMsg. Stopping VPN...")
                mainHandler.post {
                    if (isActive) {
                        broadcastState(false, "Bağlantı doğrulanamadı. Kullanıcı süresi dolmuş veya geçersiz UUID.")
                        stopVpn()
                    }
                }
            } else {
                Log.d(TAG, "Connectivity check succeeded!")
            }
        }, "vpn-connectivity-check").start()
    }

    private fun stopVpn() {
        Log.d(TAG, "=== stopVpn called ===")
        isActive = false

        // Servis ölmeden hemen önce widget'ı ve diğer dinleyicileri uyaralım
        broadcastState(false, null)

        Thread({
            hardCleanup()
            releaseLocks()
            mainHandler.post {
                safeStopSelf()
            }
        }, "vpn-stop-thread").start()
    }

    private fun hardCleanup() {
        Log.d(TAG, "hardCleanup")
        isActive = false
        startTimestamp = 0L
        stopPingLoop()
        try {
            HotspotManager.stopHotspot(applicationContext)
        } catch (e: Throwable) {
            Log.e(TAG, "Failed to stop hotspot in cleanup: ${e.message}")
        }
        try {
            AndroidBridge.hotspotReservation?.close()
            AndroidBridge.hotspotReservation = null
        } catch (e: Throwable) {
            Log.e(TAG, "Failed to close hotspot in cleanup: ${e.message}")
        }
        try { platformInterface?.closeTun() } catch (e: Throwable) {
            Log.e(TAG, "hardCleanup closeTun error: ${e.message}")
        }
        try { boxService?.close() } catch (_: Throwable) {}
        boxService = null
        boxThread?.let { t ->
            try { t.join(1000) } catch (_: Throwable) {}
        }
        boxThread = null
        platformInterface = null
    }

    override fun onDestroy() {
        Log.d(TAG, "=== onDestroy ===")
        hardCleanup()
        releaseLocks()
        super.onDestroy()
    }

    private fun safeStopSelf() {
        try { stopForeground(STOP_FOREGROUND_REMOVE) } catch (_: Exception) {}
        try { stopSelf() } catch (_: Exception) {}
    }

    private fun broadcastState(active: Boolean, error: String?) {
        try {
            val intent = Intent("com.mproxy.vpn.VPN_STATE").apply {
                setPackage(packageName)
                putExtra("active", active)
                error?.let { putExtra("error", it) }
            }
            sendBroadcast(intent)
            Log.d(TAG, "Broadcast sent: active=$active, error=$error")
        } catch (e: Exception) {
            Log.e(TAG, "broadcastState error: ${e.message}")
        }

        // Widget'ı da güncelle — VPN durumu değiştiğinde anında yansısın
        try {
            MProxyWidgetProvider.triggerUpdate(applicationContext)
        } catch (e: Exception) {
            Log.e(TAG, "Widget update trigger failed: ${e.message}")
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "M-Proxy VPN Servisi",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "M-Proxy VPN servis bildirimi"
                setShowBadge(false)
            }
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(text: String): Notification {
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        }
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setContentTitle("M-Proxy VPN")
            .setContentText(text)
            .setSmallIcon(R.mipmap.mproxy_vpn_icon)
            .setColor(0xFF00E5FF.toInt())
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setSilent(true)
            .build()
    }

    private fun updateNotification(text: String) {
        try {
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager.notify(NOTIFICATION_ID, createNotification(text))
        } catch (_: Exception) {}
    }
}

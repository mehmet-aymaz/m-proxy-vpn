package com.mproxy.vpn

import android.annotation.SuppressLint
import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.Color
import androidx.core.content.ContextCompat
import android.net.VpnService
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import java.net.HttpURLConnection
import java.net.URL
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import android.net.Uri
import android.provider.Settings
import androidx.core.content.FileProvider
import java.io.File
import org.json.JSONObject
import java.io.FileOutputStream
import java.util.concurrent.Executors
import android.os.Handler
import android.os.Looper
import android.app.AlertDialog
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.ProgressBar

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var bridge: AndroidBridge
    private var pendingVpnLink: String? = null
    private val VPN_REQUEST_CODE = 100
    private var vpnConnected = false

    private val vpnStateReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val active = intent.getBooleanExtra("active", false)
            val error = intent.getStringExtra("error")
            vpnConnected = active
            runOnUiThread {
                try {
                    if (!isFinishing && !isDestroyed && ::webView.isInitialized && webView != null) {
                        if (error != null) {
                            webView.evaluateJavascript("window.onVpnError?.('${error.replace("'", "\\'").replace("\n", "\\n")}')", null)
                        } else {
                            webView.evaluateJavascript("window.onVpnStateChanged?.($active)", null)
                        }
                    }
                } catch (_: Exception) {}
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // APK Signature Verification (Anti-tampering)
        if (!SignatureVerifier.verify(this)) {
            Toast.makeText(this, "Güvenlik İhlali: Uygulama bütünlüğü doğrulanamadı!", Toast.LENGTH_LONG).show()
            finishAffinity()
            return
        }

        // Edge-to-Edge setup
        WindowCompat.setDecorFitsSystemWindows(window, false)
        
        // Transparent status bar
        window.statusBarColor = Color.TRANSPARENT
        window.navigationBarColor = Color.TRANSPARENT
        
        // Notch support
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            window.attributes.layoutInDisplayCutoutMode =
                WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
        }
        
        // Hide system bars for immersive
        val controller = WindowInsetsControllerCompat(window, window.decorView)
        controller.hide(WindowInsetsCompat.Type.systemBars())
        controller.show(WindowInsetsCompat.Type.systemBars())
        controller.systemBarsBehavior =
            WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE

        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webview)
        
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            cacheMode = WebSettings.LOAD_DEFAULT
            setSupportMultipleWindows(false)
            databaseEnabled = true
            mediaPlaybackRequiresUserGesture = false
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onConsoleMessage(consoleMessage: android.webkit.ConsoleMessage?): Boolean {
                if (consoleMessage != null) {
                    Log.d("WebViewConsole", "[${consoleMessage.messageLevel()}] ${consoleMessage.message()} -- From line ${consoleMessage.lineNumber()} of ${consoleMessage.sourceId()}")
                }
                return super.onConsoleMessage(consoleMessage)
            }
        }
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                return false
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d("MainActivity", "onPageFinished: WebView loaded, syncing hotspot state")
                HotspotManager.syncStateToWeb()

                // Sync UUID from localStorage to SharedPreferences
                view?.evaluateJavascript("localStorage.getItem('mproxy_uuid')") { value ->
                    val uuid = value?.replace("\"", "")?.trim() ?: ""
                    if (uuid.isNotEmpty() && uuid != "null") {
                        val currentUuid = ProfileStorage.getUuid(applicationContext)
                        if (uuid != currentUuid) {
                            ProfileStorage.saveProfile(applicationContext, uuid, ProfileStorage.getRemark(applicationContext))
                            Log.d("MainActivity", "Synced UUID from localStorage: $uuid")
                            MProxyWidgetProvider.triggerUpdate(applicationContext)
                        }
                    } else {
                        val cachedUuid = ProfileStorage.getUuid(applicationContext)
                        if (cachedUuid.isNotEmpty()) {
                            view.evaluateJavascript("localStorage.setItem('mproxy_uuid', '$cachedUuid')", null)
                            Log.d("MainActivity", "Restored UUID from SharedPreferences: $cachedUuid")
                        }
                    }
                }
            }

            override fun shouldInterceptRequest(
                view: WebView?,
                request: WebResourceRequest?
            ): WebResourceResponse? {
                val url = request?.url?.toString()
                if (url != null && (url.contains("wmehmet.web.tr") || url.contains("panel.mehmetaymaz.com.tr") || url.contains("mehmetaymaz.com.tr") || url.contains("185.254.28.210"))) {
                    try {
                        if (request.method.equals("OPTIONS", ignoreCase = true)) {
                            val responseHeaders = mapOf(
                                "Access-Control-Allow-Origin" to "*",
                                "Access-Control-Allow-Methods" to "GET, POST, OPTIONS, HEAD",
                                "Access-Control-Allow-Headers" to "Content-Type, Authorization",
                                "Access-Control-Max-Age" to "3600"
                            )
                            return WebResourceResponse(
                                "text/plain",
                                "UTF-8",
                                200,
                                "OK",
                                responseHeaders,
                                "".byteInputStream()
                            )
                        }

                        val urlObj = URL(url)
                        val urlConnection = urlObj.openConnection() as HttpURLConnection
                        if (urlConnection is javax.net.ssl.HttpsURLConnection) {
                            if (url.contains("wmehmet.web.tr")) {
                                urlConnection.sslSocketFactory = PinningTrustManager.getSSLSocketFactory()
                            } else {
                                urlConnection.sslSocketFactory = LenientTrustManager.getSSLSocketFactory()
                                urlConnection.hostnameVerifier = HostnameVerifiers.trustAll
                            }
                        }
                        urlConnection.requestMethod = request.method
                        urlConnection.connectTimeout = 10000
                        urlConnection.readTimeout = 10000
                        
                        request.requestHeaders?.forEach { (key, value) ->
                            urlConnection.setRequestProperty(key, value)
                        }
                        
                        urlConnection.connect()
                        val responseCode = urlConnection.responseCode
                        val responseMessage = urlConnection.responseMessage
                        val contentType = urlConnection.contentType ?: "application/json"
                        val encoding = urlConnection.contentEncoding ?: "UTF-8"
                        
                        val responseHeaders = mutableMapOf<String, String>()
                        urlConnection.headerFields.forEach { (key, valList) ->
                            if (key != null && 
                                !key.equals("Access-Control-Allow-Origin", ignoreCase = true) &&
                                !key.equals("Access-Control-Allow-Methods", ignoreCase = true) &&
                                !key.equals("Access-Control-Allow-Headers", ignoreCase = true)) {
                                responseHeaders[key] = valList.joinToString(", ")
                            }
                        }
                        responseHeaders["Access-Control-Allow-Origin"] = "*"
                        responseHeaders["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, HEAD"
                        responseHeaders["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
                        
                        val inputStream = if (responseCode >= 400) {
                            urlConnection.errorStream
                        } else {
                            urlConnection.inputStream
                        }
                        
                        return WebResourceResponse(
                            contentType.substringBefore(";"),
                            encoding,
                            responseCode,
                            if (responseMessage.isNullOrEmpty()) "OK" else responseMessage,
                            responseHeaders,
                            inputStream
                        )
                    } catch (e: Exception) {
                        Log.e("MainActivity", "WebView Intercept Error for $url: ${e.message}", e)
                    }
                }
                return super.shouldInterceptRequest(view, request)
            }
        }

        bridge = AndroidBridge(this)
        webView.addJavascriptInterface(bridge, "AndroidBridge")

        // Set up insets listener to dynamically pass safe areas to webview
        ViewCompat.setOnApplyWindowInsetsListener(window.decorView) { _, insets ->
            val statusBars = insets.getInsets(WindowInsetsCompat.Type.statusBars())
            val navigationBars = insets.getInsets(WindowInsetsCompat.Type.navigationBars())
            val displayCutout = insets.getInsets(WindowInsetsCompat.Type.displayCutout())

            val density = resources.displayMetrics.density
            val topInsetDp = Math.max(statusBars.top, displayCutout.top) / density
            val bottomInsetDp = Math.max(navigationBars.bottom, displayCutout.bottom) / density

            Log.d("MainActivity", "Insets updated: top=${topInsetDp}dp, bottom=${bottomInsetDp}dp")
            bridge.updateSafeArea(topInsetDp, bottomInsetDp)
            runOnUiThread {
                try {
                    if (::webView.isInitialized) {
                        webView.evaluateJavascript("window.onSafeAreaChanged?.($topInsetDp, $bottomInsetDp)", null)
                    }
                } catch (_: Exception) {}
            }
            insets
        }

        webView.loadUrl("file:///android_asset/www/index.html")

        // Request permissions (Notification and Nearby Wifi for Android 13+, Phone State for cell network type, and Location for Hotspot)
        val permissions = mutableListOf<String>()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(android.Manifest.permission.POST_NOTIFICATIONS)
            permissions.add(android.Manifest.permission.NEARBY_WIFI_DEVICES)
        }
        permissions.add(android.Manifest.permission.READ_PHONE_STATE)
        permissions.add(android.Manifest.permission.ACCESS_FINE_LOCATION)
        permissions.add(android.Manifest.permission.ACCESS_COARSE_LOCATION)
        
        ActivityCompat.requestPermissions(
            this,
            permissions.toTypedArray(),
            1001
        )

        // Register VPN state receiver
        val filter = IntentFilter("com.mproxy.vpn.VPN_STATE")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(vpnStateReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
        } else {
            registerReceiver(vpnStateReceiver, filter)
        }

        // Check for updates automatically on startup (silent check)
        checkAppUpdate(silent = true)
    }

    override fun onDestroy() {
        super.onDestroy()
        try { unregisterReceiver(vpnStateReceiver) } catch (_: Exception) {}
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
        HotspotManager.onActivityPaused()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        HotspotManager.onActivityResumed(this)
    }

    @JavascriptInterface
    fun requestVpnPermission(vlessLink: String) {
        Log.d("MainActivity", "requestVpnPermission called, vlessLink length: ${vlessLink.length}")
        pendingVpnLink = vlessLink
        try {
            val intent = VpnService.prepare(this)
            Log.d("MainActivity", "VpnService.prepare returned: $intent")
            if (intent != null) {
                Log.d("MainActivity", "Starting startActivityForResult for VPN permission")
                @Suppress("DEPRECATION")
                startActivityForResult(intent, VPN_REQUEST_CODE)
            } else {
                Log.d("MainActivity", "VpnService already prepared, starting service directly")
                startVpnWithLink(vlessLink)
                pendingVpnLink = null
            }
        } catch (e: Exception) {
            Log.e("MainActivity", "Error preparing VpnService: ${e.message}", e)
            webView.evaluateJavascript("window.onVpnError?.('VPN hazırlama hatası: ${e.message}')", null)
        }
    }

    @Suppress("DEPRECATION")
    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.d("MainActivity", "onActivityResult requestCode=$requestCode, resultCode=$resultCode")
        if (requestCode == VPN_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                Log.d("MainActivity", "VPN permission granted (RESULT_OK)")
                pendingVpnLink?.let { link ->
                    startVpnWithLink(link)
                    pendingVpnLink = null
                }
            } else {
                Log.w("MainActivity", "VPN permission denied (resultCode=$resultCode)")
                Toast.makeText(this, "VPN izni reddedildi", Toast.LENGTH_SHORT).show()
                webView.evaluateJavascript("window.onVpnError?.('VPN izni reddedildi')", null)
            }
        }
    }

    private fun startVpnWithLink(vlessLink: String) {
        Log.d("MainActivity", "startVpnWithLink starting MProxyVpnService")
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
        val network = connectivityManager.activeNetwork
        val capabilities = connectivityManager.getNetworkCapabilities(network)
        if (capabilities != null && capabilities.hasTransport(android.net.NetworkCapabilities.TRANSPORT_WIFI)) {
            Toast.makeText(this, "Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.", Toast.LENGTH_LONG).show()
            webView.evaluateJavascript("window.onVpnError?.('Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.')", null)
            return
        }
        val intent = Intent(this, MProxyVpnService::class.java).apply {
            action = MProxyVpnService.ACTION_START
            putExtra(MProxyVpnService.EXTRA_VLESS_LINK, vlessLink)
        }
        try {
            ContextCompat.startForegroundService(this, intent)
            Log.d("MainActivity", "ContextCompat.startForegroundService success")
        } catch (e: Exception) {
            Log.e("MainActivity", "Failed to start foreground service: ${e.message}", e)
            webView.evaluateJavascript("window.onVpnError?.('Servis başlatılamadı: ${e.message}')", null)
        }
    }

    @JavascriptInterface
    fun stopVpnService() {
        val intent = Intent(this, MProxyVpnService::class.java).apply {
            action = MProxyVpnService.ACTION_STOP
        }
        try {
            startService(intent)
        } catch (e: Exception) {
            try {
                ContextCompat.startForegroundService(this, intent)
            } catch (_: Exception) {}
        }
    }

    @Suppress("DEPRECATION")
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }

    fun checkAppUpdate(silent: Boolean) {
        val executor = Executors.newSingleThreadExecutor()
        val handler = Handler(Looper.getMainLooper())
        
        val currentVersion = try {
            val packageInfo = packageManager.getPackageInfo(packageName, 0)
            packageInfo.versionName ?: "1.1.4"
        } catch (e: Exception) {
            "1.1.4"
        }

        executor.execute {
            var connection: HttpURLConnection? = null
            try {
                val url = URL("https://api.github.com/repos/mehmet-aymaz/m-proxy-vpn/releases/latest")
                connection = url.openConnection() as HttpURLConnection
                connection.connectTimeout = 8000
                connection.readTimeout = 8000
                connection.setRequestProperty("Accept", "application/vnd.github.v3+json")
                connection.setRequestProperty("User-Agent", "M-Proxy-VPN-Android")
                connection.connect()

                if (connection.responseCode == 200) {
                    val responseBody = connection.inputStream.bufferedReader(Charsets.UTF_8).readText()
                    val json = JSONObject(responseBody)
                    val latestVersion = json.optString("tag_name", "").replace("v", "").trim()
                    val changelog = json.optString("body", "")
                    
                    val assets = json.optJSONArray("assets")
                    var apkUrl: String? = null
                    if (assets != null) {
                        for (i in 0 until assets.length()) {
                            val asset = assets.getJSONObject(i)
                            val name = asset.optString("name", "")
                            if (name.endsWith(".apk")) {
                                apkUrl = asset.optString("browser_download_url", "")
                                break
                            }
                        }
                    }

                    if (latestVersion.isNotEmpty() && apkUrl != null) {
                        val hasUpdate = isVersionNewer(currentVersion, latestVersion)
                        if (hasUpdate) {
                            handler.post {
                                showUpdateDialog(latestVersion, changelog, apkUrl)
                            }
                        } else {
                            if (!silent) {
                                handler.post {
                                    Toast.makeText(this@MainActivity, "Uygulama güncel (v$currentVersion)", Toast.LENGTH_SHORT).show()
                                }
                            }
                        }
                    } else if (!silent) {
                        handler.post {
                            Toast.makeText(this@MainActivity, "Güncelleme dosyası bulunamadı.", Toast.LENGTH_SHORT).show()
                        }
                    }
                } else if (!silent) {
                    handler.post {
                        Toast.makeText(this@MainActivity, "API Hatası: ${connection.responseCode}", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Update check failed: ${e.message}", e)
                if (!silent) {
                    handler.post {
                        Toast.makeText(this@MainActivity, "Bağlantı Hatası: ${e.message}", Toast.LENGTH_SHORT).show()
                    }
                }
            } finally {
                connection?.disconnect()
            }
        }
    }

    private fun isVersionNewer(current: String, latest: String): Boolean {
        val cleanCurrent = current.replace(Regex("[^0-9.]"), "")
        val cleanLatest = latest.replace(Regex("[^0-9.]"), "")
        
        val currentParts = cleanCurrent.split(".").map { it.toIntOrNull() ?: 0 }
        val latestParts = cleanLatest.split(".").map { it.toIntOrNull() ?: 0 }
        
        val maxLength = maxOf(currentParts.size, latestParts.size)
        for (i in 0 until maxLength) {
            val curr = currentParts.getOrNull(i) ?: 0
            val lat = latestParts.getOrNull(i) ?: 0
            if (lat > curr) return true
            if (curr > lat) return false
        }
        return false
    }

    private fun showUpdateDialog(latestVersion: String, changelog: String, apkUrl: String) {
        if (isFinishing || isDestroyed) return
        AlertDialog.Builder(this)
            .setTitle("Yeni Güncelleme Mevcut")
            .setMessage("M-Proxy VPN v$latestVersion sürümü indirilebilir. Şimdi güncellemek ister misiniz?\n\nDeğişiklikler:\n$changelog")
            .setPositiveButton("Güncelle") { _, _ ->
                downloadAndInstallApk(apkUrl)
            }
            .setNegativeButton("Daha Sonra", null)
            .show()
    }

    private fun downloadAndInstallApk(apkUrl: String) {
        val padding = (16 * resources.displayMetrics.density).toInt()
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(padding, padding, padding, padding)
        }
        val textView = TextView(this).apply {
            text = "Lütfen bekleyin..."
            setPadding(0, 0, 0, padding / 2)
        }
        val progressBar = ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal).apply {
            isIndeterminate = false
            max = 100
        }
        layout.addView(textView)
        layout.addView(progressBar)

        val progressDialog = AlertDialog.Builder(this)
            .setTitle("Güncelleme İndiriliyor")
            .setView(layout)
            .setCancelable(false)
            .create()
        progressDialog.show()

        val executor = Executors.newSingleThreadExecutor()
        val handler = Handler(Looper.getMainLooper())

        executor.execute {
            var connection: HttpURLConnection? = null
            var inputStream: java.io.InputStream? = null
            var outputStream: FileOutputStream? = null
            try {
                val url = URL(apkUrl)
                connection = url.openConnection() as HttpURLConnection
                connection.connectTimeout = 15000
                connection.readTimeout = 15000
                connection.connect()

                if (connection.responseCode != HttpURLConnection.HTTP_OK) {
                    throw Exception("Sunucu hata döndü: ${connection.responseCode}")
                }

                val fileLength = connection.contentLength
                inputStream = connection.inputStream
                val tempFile = File(cacheDir, "update.apk")
                if (tempFile.exists()) {
                    tempFile.delete()
                }

                outputStream = FileOutputStream(tempFile)
                val data = ByteArray(4096)
                var total: Long = 0
                var count: Int
                while (inputStream.read(data).also { count = it } != -1) {
                    total += count
                    if (fileLength > 0) {
                        val progress = (total * 100 / fileLength).toInt()
                        val kbDownloaded = total / 1024
                        val kbTotal = fileLength / 1024
                        handler.post {
                            progressBar.progress = progress
                            textView.text = "İndiriliyor: $kbDownloaded KB / $kbTotal KB ($progress%)"
                        }
                    } else {
                        val kbDownloaded = total / 1024
                        handler.post {
                            progressBar.isIndeterminate = true
                            textView.text = "İndiriliyor: $kbDownloaded KB"
                        }
                    }
                    outputStream.write(data, 0, count)
                }

                handler.post {
                    progressDialog.dismiss()
                    installApk(tempFile)
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Apk download failed: ${e.message}", e)
                handler.post {
                    progressDialog.dismiss()
                    Toast.makeText(this@MainActivity, "İndirme hatası: ${e.message}", Toast.LENGTH_LONG).show()
                }
            } finally {
                try { outputStream?.close() } catch (_: Exception) {}
                try { inputStream?.close() } catch (_: Exception) {}
                try { connection?.disconnect() } catch (_: Exception) {}
            }
        }
    }

    private fun installApk(file: File) {
        if (!file.exists()) return

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            if (!packageManager.canRequestPackageInstalls()) {
                val settingsIntent = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES).apply {
                    data = Uri.parse("package:$packageName")
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                }
                startActivity(settingsIntent)
                Toast.makeText(this, "Lütfen bilinmeyen uygulamaları yükleme iznini verin ve tekrar deneyin.", Toast.LENGTH_LONG).show()
                return
            }
        }

        val intent = Intent(Intent.ACTION_VIEW)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            val authority = "$packageName.fileprovider"
            val apkUri = FileProvider.getUriForFile(this, authority, file)
            intent.setDataAndType(apkUri, "application/vnd.android.package-archive")
        } else {
            intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive")
        }

        startActivity(intent)
    }
}

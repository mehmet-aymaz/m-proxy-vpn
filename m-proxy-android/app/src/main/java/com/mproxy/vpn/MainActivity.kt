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
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.GradientDrawable

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
        webView.clearCache(true)
        
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            cacheMode = WebSettings.LOAD_NO_CACHE
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
                if (url != null && (url.contains("wmehmet.web.tr") || url.contains("mehmetaymaz.com.tr") || url.contains("185.254.28.210"))) {
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
                                    showNotification("Uygulama güncel (v$currentVersion)", "success")
                                }
                            }
                        }
                    } else if (!silent) {
                        handler.post {
                            showNotification("Güncelleme dosyası bulunamadı.", "warn")
                        }
                    }
                } else if (!silent) {
                    handler.post {
                        showNotification("API Hatası: ${connection.responseCode}", "error")
                    }
                }
            } catch (e: Exception) {
                Log.e("MainActivity", "Update check failed: ${e.message}", e)
                if (!silent) {
                    handler.post {
                        showNotification("Bağlantı Hatası: ${e.message}", "error")
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
        
        val dialog = AlertDialog.Builder(this).create()
        val density = resources.displayMetrics.density
        fun Int.dp(): Int = (this * density).toInt()

        val rootLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(Color.parseColor("#14FFFFFF"))
                cornerRadius = (32 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), Color.parseColor("#1AFFFFFF"))
            }
            setPadding(24.dp(), 24.dp(), 24.dp(), 24.dp())
            layoutParams = android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)
        }

        // Title
        val txtTitle = TextView(this).apply {
            text = "Yeni Sürüm Mevcut"
            textSize = 18f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(Color.parseColor("#C9A84C"))
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 12.dp()
            }
        }
        rootLayout.addView(txtTitle)

        // Message
        val txtMsg = TextView(this).apply {
            text = "M-Proxy VPN v$latestVersion sürümü indirilebilir. Şimdi güncellemek ister misiniz?"
            textSize = 14f
            setTextColor(Color.WHITE)
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 16.dp()
            }
        }
        rootLayout.addView(txtMsg)

        // Changelog header
        val lblChangelog = TextView(this).apply {
            text = "Değişiklikler:"
            textSize = 12f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(Color.parseColor("#80FFFFFF"))
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 4.dp()
            }
        }
        rootLayout.addView(lblChangelog)

        // Scrollable Changelog
        val scrollView = android.widget.ScrollView(this).apply {
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, 100.dp()).apply {
                bottomMargin = 20.dp()
            }
        }
        val txtChangelog = TextView(this).apply {
            text = changelog
            textSize = 12f
            setTextColor(Color.parseColor("#CCCCCC"))
            setLineSpacing(2f, 1.1f)
        }
        scrollView.addView(txtChangelog)
        rootLayout.addView(scrollView)

        // Buttons Layout
        val buttonsLayout = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT)
        }

        val btnCancel = android.widget.Button(this).apply {
            text = "DAHA SONRA"
            setTextColor(Color.WHITE)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(Color.parseColor("#1AFFFFFF"))
                cornerRadius = (16 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), Color.parseColor("#22FFFFFF"))
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener { dialog.dismiss() }
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f).apply {
                rightMargin = 8.dp()
            }
        }
        buttonsLayout.addView(btnCancel)

        val btnUpdate = android.widget.Button(this).apply {
            text = "GÜNCELLE"
            setTextColor(Color.BLACK)
            setTypeface(null, android.graphics.Typeface.BOLD)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(Color.parseColor("#C9A84C"))
                cornerRadius = (16 * resources.displayMetrics.density)
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener {
                dialog.dismiss()
                downloadAndInstallApk(apkUrl)
            }
            layoutParams = LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1f)
        }
        buttonsLayout.addView(btnUpdate)
        rootLayout.addView(buttonsLayout)

        dialog.setView(rootLayout)
        dialog.show()
        dialog.window?.apply {
            setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                addFlags(WindowManager.LayoutParams.FLAG_BLUR_BEHIND)
                attributes.blurBehindRadius = 45
            }
            val wlp = android.view.WindowManager.LayoutParams()
            wlp.copyFrom(attributes)
            wlp.width = (340 * resources.displayMetrics.density).toInt()
            attributes = wlp
        }
    }

    private fun downloadAndInstallApk(apkUrl: String) {
        val density = resources.displayMetrics.density
        fun Int.dp(): Int = (this * density).toInt()

        val rootLayout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(Color.parseColor("#14FFFFFF"))
                cornerRadius = (32 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), Color.parseColor("#1AFFFFFF"))
            }
            setPadding(24.dp(), 24.dp(), 24.dp(), 24.dp())
            layoutParams = android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT)
        }

        // Title
        val txtTitle = TextView(this).apply {
            text = "Güncelleme İndiriliyor"
            textSize = 18f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(Color.parseColor("#C9A84C"))
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 12.dp()
            }
        }
        rootLayout.addView(txtTitle)

        // Progress Text
        val textView = TextView(this).apply {
            text = "Lütfen bekleyin..."
            textSize = 14f
            setTextColor(Color.WHITE)
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 8.dp()
            }
        }
        rootLayout.addView(textView)

        // ProgressBar
        val progressBar = ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal).apply {
            isIndeterminate = false
            max = 100
            progressTintList = android.content.res.ColorStateList.valueOf(Color.parseColor("#C9A84C"))
            progressBackgroundTintList = android.content.res.ColorStateList.valueOf(Color.parseColor("#30FFFFFF"))
            layoutParams = LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT).apply {
                bottomMargin = 16.dp()
            }
        }
        rootLayout.addView(progressBar)

        val progressDialog = AlertDialog.Builder(this)
            .setView(rootLayout)
            .setCancelable(false)
            .create()
        progressDialog.show()
        progressDialog.window?.apply {
            setBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                addFlags(WindowManager.LayoutParams.FLAG_BLUR_BEHIND)
                attributes.blurBehindRadius = 45
            }
            val wlp = android.view.WindowManager.LayoutParams()
            wlp.copyFrom(attributes)
            wlp.width = (340 * resources.displayMetrics.density).toInt()
            attributes = wlp
        }

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
                    showNotification("İndirme hatası: ${e.message}", "error")
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
                showNotification("Lütfen bilinmeyen uygulamaları yükleme iznini verin ve tekrar deneyin.", "warn")
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

    fun showNotification(message: String, type: String = "info") {
        val bridge = AndroidBridge.activeInstance
        if (bridge != null) {
            bridge.showToastInWeb(message, type)
        } else {
            runOnUiThread {
                Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
            }
        }
    }

    fun showDnsSettingsDialog() {
        if (isFinishing || isDestroyed) return
        val dialog = AlertDialog.Builder(this).create()
        
        val density = resources.displayMetrics.density
        fun Int.dp(): Int = (this * density).toInt()

        val rootLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#14FFFFFF"))
                cornerRadius = (32 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#1AFFFFFF"))
            }
            setPadding(24.dp(), 24.dp(), 24.dp(), 24.dp())
            layoutParams = android.view.ViewGroup.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }

        // Title
        val txtTitle = android.widget.TextView(this).apply {
            text = "Gelişmiş DNS Ayarları"
            textSize = 20f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(android.graphics.Color.parseColor("#C9A84C"))
            gravity = android.view.Gravity.CENTER
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 16.dp()
            }
        }
        rootLayout.addView(txtTitle)

        // DNS Spinner
        val dnsOptions = arrayOf("Varsayılan (Google DNS)", "Cloudflare DNS", "AdGuard Adblock DNS", "Özel DNS")
        val dnsModes = arrayOf("GOOGLE", "CLOUDFLARE", "ADGUARD", "CUSTOM")
        
        val spinnerContainer = android.widget.FrameLayout(this@MainActivity).apply {
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (14 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(12.dp(), 4.dp(), 12.dp(), 4.dp())
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 12.dp()
            }
        }

        val spinnerDns = android.widget.Spinner(this).apply {
            val customAdapter = object : android.widget.ArrayAdapter<String>(this@MainActivity, android.R.layout.simple_spinner_item, dnsOptions) {
                override fun getView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
                    val v = super.getView(position, convertView, parent) as android.widget.TextView
                    v.setTextColor(android.graphics.Color.WHITE)
                    v.textSize = 14f
                    v.setPadding(0, 8.dp(), 0, 8.dp())
                    return v
                }
                override fun getDropDownView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
                    val v = super.getDropDownView(position, convertView, parent) as android.widget.TextView
                    v.setTextColor(android.graphics.Color.WHITE)
                    v.setBackgroundColor(android.graphics.Color.TRANSPARENT)
                    v.textSize = 14f
                    v.setPadding(16.dp(), 16.dp(), 16.dp(), 16.dp())
                    return v
                }
            }
            adapter = customAdapter
            val currentDnsMode = AppSettings.getDnsMode(this@MainActivity)
            val idx = dnsModes.indexOf(currentDnsMode).takeIf { it >= 0 } ?: 0
            setSelection(idx)
            
            layoutParams = android.widget.FrameLayout.LayoutParams(
                android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
                android.widget.FrameLayout.LayoutParams.WRAP_CONTENT
            )
            backgroundTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#C9A84C"))
        }
        spinnerContainer.addView(spinnerDns)
        rootLayout.addView(spinnerContainer)

        // Custom DNS Input
        val edtCustomDns = android.widget.EditText(this).apply {
            hint = "Özel DNS IP (Örn: 1.1.1.1)"
            setHintTextColor(android.graphics.Color.parseColor("#40FFFFFF"))
            setTextColor(android.graphics.Color.WHITE)
            setText(AppSettings.getCustomDnsAddress(this@MainActivity))
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (14 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(16.dp(), 12.dp(), 16.dp(), 12.dp())
            visibility = if (AppSettings.getDnsMode(this@MainActivity) == "CUSTOM") android.view.View.VISIBLE else android.view.View.GONE
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 16.dp()
            }
        }
        rootLayout.addView(edtCustomDns)

        spinnerDns.onItemSelectedListener = object : android.widget.AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: android.widget.AdapterView<*>?, view: android.view.View?, position: Int, id: Long) {
                if (dnsModes[position] == "CUSTOM") {
                    edtCustomDns.visibility = android.view.View.VISIBLE
                } else {
                    edtCustomDns.visibility = android.view.View.GONE
                }
                (view as? android.widget.TextView)?.setTextColor(android.graphics.Color.WHITE)
            }
            override fun onNothingSelected(parent: android.widget.AdapterView<*>?) {}
        }

        // Save Button
        val btnSave = android.widget.Button(this).apply {
            text = "AYARLARI KAYDET"
            setTextColor(android.graphics.Color.BLACK)
            setTypeface(null, android.graphics.Typeface.BOLD)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#C9A84C"))
                cornerRadius = (16 * resources.displayMetrics.density)
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener {
                val selectedDnsIdx = spinnerDns.selectedItemPosition
                val dnsMode = dnsModes[selectedDnsIdx]
                AppSettings.setDnsMode(this@MainActivity, dnsMode)
                AppSettings.setCustomDnsAddress(this@MainActivity, edtCustomDns.text.toString().trim())

                dialog.dismiss()
                Toast.makeText(this@MainActivity, "DNS ayarları kaydedildi. Geçerli olması için bağlantıyı yenileyin.", Toast.LENGTH_LONG).show()
            }
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                topMargin = 8.dp()
            }
        }
        rootLayout.addView(btnSave)

        dialog.setView(rootLayout)
        dialog.show()
        dialog.window?.apply {
            setBackgroundDrawable(android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                addFlags(WindowManager.LayoutParams.FLAG_BLUR_BEHIND)
                attributes.blurBehindRadius = 45
            }
            val wlp = android.view.WindowManager.LayoutParams()
            wlp.copyFrom(attributes)
            wlp.width = (340 * resources.displayMetrics.density).toInt()
            attributes = wlp
        }
        spinnerDns.post {
            spinnerDns.setPopupBackgroundDrawable(GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#F20B132B"))
                cornerRadius = (20 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#33FFFFFF"))
            })
        }
    }

    fun showPerAppSettingsDialog() {
        if (isFinishing || isDestroyed) return
        val dialog = AlertDialog.Builder(this).create()
        
        val density = resources.displayMetrics.density
        fun Int.dp(): Int = (this * density).toInt()

        val rootLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#14FFFFFF"))
                cornerRadius = (32 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#1AFFFFFF"))
            }
            setPadding(24.dp(), 24.dp(), 24.dp(), 24.dp())
            layoutParams = android.view.ViewGroup.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.WRAP_CONTENT
            )
        }

        // Title
        val txtTitle = android.widget.TextView(this).apply {
            text = "Uygulama Bazlı Tünelleme"
            textSize = 20f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(android.graphics.Color.parseColor("#C9A84C"))
            gravity = android.view.Gravity.CENTER
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 16.dp()
            }
        }
        rootLayout.addView(txtTitle)

        // Switch layout
        val perAppLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.HORIZONTAL
            gravity = android.view.Gravity.CENTER_VERTICAL
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 12.dp()
            }
        }
        
        val txtSwitch = android.widget.TextView(this).apply {
            text = "Uygulama Filtrelemeyi Etkinleştir"
            setTextColor(android.graphics.Color.WHITE)
            textSize = 15f
            layoutParams = android.widget.LinearLayout.LayoutParams(0, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
        }
        perAppLayout.addView(txtSwitch)

        val switchPerApp = android.widget.Switch(this).apply {
            isChecked = AppSettings.isPerAppEnabled(this@MainActivity)
            thumbTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#C9A84C"))
            trackTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#60C9A84C"))
        }
        perAppLayout.addView(switchPerApp)
        rootLayout.addView(perAppLayout)

        // Per-App Details
        val detailsLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            visibility = if (switchPerApp.isChecked) android.view.View.VISIBLE else android.view.View.GONE
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            )
        }

        // Mode Spinner
        val modeOptions = arrayOf("Seçilenleri Tünelle (Proxy)", "Seçilenler Hariç (Bypass/Direct)")
        val modeValues = arrayOf("PROXY", "BYPASS")
        
        val spinnerContainer = android.widget.FrameLayout(this@MainActivity).apply {
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (14 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(12.dp(), 4.dp(), 12.dp(), 4.dp())
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 12.dp()
            }
        }

        val spinnerMode = android.widget.Spinner(this).apply {
            val customAdapter = object : android.widget.ArrayAdapter<String>(this@MainActivity, android.R.layout.simple_spinner_item, modeOptions) {
                override fun getView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
                    val v = super.getView(position, convertView, parent) as android.widget.TextView
                    v.setTextColor(android.graphics.Color.WHITE)
                    v.textSize = 14f
                    v.setPadding(0, 8.dp(), 0, 8.dp())
                    return v
                }
                override fun getDropDownView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
                    val v = super.getDropDownView(position, convertView, parent) as android.widget.TextView
                    v.setTextColor(android.graphics.Color.WHITE)
                    v.setBackgroundColor(android.graphics.Color.TRANSPARENT)
                    v.textSize = 14f
                    v.setPadding(16.dp(), 16.dp(), 16.dp(), 16.dp())
                    return v
                }
            }
            adapter = customAdapter
            val currentMode = AppSettings.getPerAppMode(this@MainActivity)
            val idx = modeValues.indexOf(currentMode).takeIf { it >= 0 } ?: 0
            setSelection(idx)
            layoutParams = android.widget.FrameLayout.LayoutParams(
                android.widget.FrameLayout.LayoutParams.MATCH_PARENT,
                android.widget.FrameLayout.LayoutParams.WRAP_CONTENT
            )
            backgroundTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#C9A84C"))
        }
        spinnerContainer.addView(spinnerMode)
        detailsLayout.addView(spinnerContainer)

        val selectedPackages = AppSettings.getSelectedPackages(this).toMutableSet()

        val btnSelectApps = android.widget.Button(this).apply {
            text = "Uygulamaları Seç (${selectedPackages.size} uygulama)"
            setTextColor(android.graphics.Color.WHITE)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (16 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener {
                showAppSelectionDialog(selectedPackages) { newSelection ->
                    selectedPackages.clear()
                    selectedPackages.addAll(newSelection)
                    text = "Uygulamaları Seç (${selectedPackages.size} uygulama)"
                }
            }
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 16.dp()
            }
        }
        detailsLayout.addView(btnSelectApps)
        rootLayout.addView(detailsLayout)

        switchPerApp.setOnCheckedChangeListener { _, isChecked ->
            detailsLayout.visibility = if (isChecked) android.view.View.VISIBLE else android.view.View.GONE
        }

        // Save Button
        val btnSave = android.widget.Button(this).apply {
            text = "AYARLARI KAYDET"
            setTextColor(android.graphics.Color.BLACK)
            setTypeface(null, android.graphics.Typeface.BOLD)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#C9A84C"))
                cornerRadius = (16 * resources.displayMetrics.density)
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener {
                AppSettings.setPerAppEnabled(this@MainActivity, switchPerApp.isChecked)
                val selectedModeIdx = spinnerMode.selectedItemPosition
                val perAppMode = modeValues[selectedModeIdx]
                AppSettings.setPerAppMode(this@MainActivity, perAppMode)
                AppSettings.setSelectedPackages(this@MainActivity, selectedPackages)

                dialog.dismiss()
                Toast.makeText(this@MainActivity, "Tünelleme ayarları kaydedildi. Geçerli olması için bağlantıyı yenileyin.", Toast.LENGTH_LONG).show()
            }
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                topMargin = 8.dp()
            }
        }
        rootLayout.addView(btnSave)

        dialog.setView(rootLayout)
        dialog.show()
        dialog.window?.apply {
            setBackgroundDrawable(android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT))
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                addFlags(WindowManager.LayoutParams.FLAG_BLUR_BEHIND)
                attributes.blurBehindRadius = 45
            }
            val wlp = android.view.WindowManager.LayoutParams()
            wlp.copyFrom(attributes)
            wlp.width = (340 * resources.displayMetrics.density).toInt()
            attributes = wlp
        }
        spinnerMode.post {
            spinnerMode.setPopupBackgroundDrawable(GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#F20B132B"))
                cornerRadius = (20 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#33FFFFFF"))
            })
        }
    }

    private fun showAppSelectionDialog(
        selectedSet: Set<String>,
        onSaved: (Set<String>) -> Unit
    ) {
        val dialog = AlertDialog.Builder(this, android.R.style.Theme_DeviceDefault_NoActionBar_Fullscreen).create()
        val density = resources.displayMetrics.density
        fun Int.dp(): Int = (this * density).toInt()

        val rootLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            setBackgroundColor(android.graphics.Color.parseColor("#0b132b"))
            setPadding(16.dp(), 24.dp(), 16.dp(), 16.dp())
            layoutParams = android.view.ViewGroup.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.MATCH_PARENT
            )
        }

        val headerLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.HORIZONTAL
            gravity = android.view.Gravity.CENTER_VERTICAL
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 12.dp()
            }
        }

        val txtTitle = android.widget.TextView(this).apply {
            text = "Tünellenecek Uygulamalar"
            textSize = 18f
            setTypeface(null, android.graphics.Typeface.BOLD)
            setTextColor(android.graphics.Color.parseColor("#C9A84C"))
            layoutParams = android.widget.LinearLayout.LayoutParams(0, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
        }
        headerLayout.addView(txtTitle)
        rootLayout.addView(headerLayout)

        val edtSearch = android.widget.EditText(this).apply {
            hint = "Uygulama veya paket adı ara..."
            setHintTextColor(android.graphics.Color.parseColor("#40FFFFFF"))
            setTextColor(android.graphics.Color.WHITE)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (14 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(16.dp(), 12.dp(), 16.dp(), 12.dp())
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 8.dp()
            }
        }
        rootLayout.addView(edtSearch)

        val progressBar = android.widget.ProgressBar(this).apply {
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                gravity = android.view.Gravity.CENTER
                topMargin = 32.dp()
            }
        }
        rootLayout.addView(progressBar)

        val listView = android.widget.ListView(this).apply {
            divider = android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor("#00000000"))
            dividerHeight = 0
            cacheColorHint = 0
            visibility = android.view.View.GONE
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
            ).apply {
                bottomMargin = 12.dp()
            }
        }
        rootLayout.addView(listView)

        val buttonsLayout = android.widget.LinearLayout(this).apply {
            orientation = android.widget.LinearLayout.HORIZONTAL
            layoutParams = android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
            )
        }

        val btnCancel = android.widget.Button(this).apply {
            text = "İPTAL"
            setTextColor(android.graphics.Color.WHITE)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#1AFFFFFF"))
                cornerRadius = (16 * resources.displayMetrics.density)
                setStroke((1 * resources.displayMetrics.density).toInt(), android.graphics.Color.parseColor("#22FFFFFF"))
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener { dialog.dismiss() }
            layoutParams = android.widget.LinearLayout.LayoutParams(0, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, 1f).apply {
                rightMargin = 8.dp()
            }
        }
        buttonsLayout.addView(btnCancel)

        val currentSelection = selectedSet.toMutableSet()

        val btnSave = android.widget.Button(this).apply {
            text = "KAYDET"
            setTextColor(android.graphics.Color.BLACK)
            setTypeface(null, android.graphics.Typeface.BOLD)
            background = GradientDrawable().apply {
                shape = GradientDrawable.RECTANGLE
                setColor(android.graphics.Color.parseColor("#C9A84C"))
                cornerRadius = (16 * resources.displayMetrics.density)
            }
            setPadding(12.dp(), 12.dp(), 12.dp(), 12.dp())
            setOnClickListener {
                onSaved(currentSelection)
                dialog.dismiss()
            }
            layoutParams = android.widget.LinearLayout.LayoutParams(0, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, 1f)
        }
        buttonsLayout.addView(btnSave)
        rootLayout.addView(buttonsLayout)

        dialog.setView(rootLayout)
        dialog.show()

        Thread({
            val pm = packageManager
            val packages = pm.getInstalledPackages(android.content.pm.PackageManager.GET_META_DATA)
            val appsList = mutableListOf<AppInfo>()

            for (pkg in packages) {
                val launchIntent = pm.getLaunchIntentForPackage(pkg.packageName)
                if (launchIntent != null && pkg.packageName != packageName) {
                    val label = pkg.applicationInfo.loadLabel(pm).toString()
                    val icon = pkg.applicationInfo.loadIcon(pm)
                    val isSelected = currentSelection.contains(pkg.packageName)
                    appsList.add(AppInfo(label, pkg.packageName, icon, isSelected))
                }
            }
            appsList.sortBy { it.label.lowercase() }

            runOnUiThread {
                progressBar.visibility = android.view.View.GONE
                listView.visibility = android.view.View.VISIBLE

                val adapter = AppAdapter(this, appsList) { app, checked ->
                    if (checked) {
                        currentSelection.add(app.packageName)
                    } else {
                        currentSelection.remove(app.packageName)
                    }
                }
                listView.adapter = adapter

                edtSearch.addTextChangedListener(object : android.text.TextWatcher {
                    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                        adapter.filter(s?.toString() ?: "")
                    }
                    override fun afterTextChanged(s: android.text.Editable?) {}
                })
            }
        }).start()
    }
}

data class AppInfo(
    val label: String,
    val packageName: String,
    val icon: android.graphics.drawable.Drawable,
    var isSelected: Boolean = false
)

class AppAdapter(
    context: Context,
    private val allApps: List<AppInfo>,
    private val onCheckChanged: (AppInfo, Boolean) -> Unit
) : android.widget.ArrayAdapter<AppInfo>(context, 0, allApps) {
    private var filteredApps = allApps

    fun filter(query: String) {
        filteredApps = if (query.isEmpty()) {
            allApps
        } else {
            allApps.filter { it.label.contains(query, ignoreCase = true) || it.packageName.contains(query, ignoreCase = true) }
        }
        notifyDataSetChanged()
    }

    override fun getCount(): Int = filteredApps.size
    override fun getItem(position: Int): AppInfo? = filteredApps[position]

    override fun getView(position: Int, convertView: android.view.View?, parent: android.view.ViewGroup): android.view.View {
        val density = context.resources.displayMetrics.density
        fun Int.dpToPx(): Int = (this * density).toInt()

        val view = convertView ?: android.widget.LinearLayout(context).apply {
            orientation = android.widget.LinearLayout.VERTICAL
            layoutParams = android.widget.AbsListView.LayoutParams(
                android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                android.view.ViewGroup.LayoutParams.WRAP_CONTENT
            )
            setPadding(4.dpToPx(), 4.dpToPx(), 4.dpToPx(), 4.dpToPx())
            
            addView(android.widget.LinearLayout(context).apply {
                orientation = android.widget.LinearLayout.HORIZONTAL
                layoutParams = android.widget.LinearLayout.LayoutParams(
                    android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                    android.view.ViewGroup.LayoutParams.WRAP_CONTENT
                )
                setPadding(16.dpToPx(), 12.dpToPx(), 16.dpToPx(), 12.dpToPx())
                gravity = android.view.Gravity.CENTER_VERTICAL
                
                background = GradientDrawable().apply {
                    shape = GradientDrawable.RECTANGLE
                    setColor(android.graphics.Color.parseColor("#0Fffffff")) // 6% white glass
                    cornerRadius = (16 * density)
                    setStroke((1 * density).toInt(), android.graphics.Color.parseColor("#15ffffff"))
                }
                
                addView(android.widget.ImageView(context).apply {
                    id = android.view.View.generateViewId()
                    layoutParams = android.widget.LinearLayout.LayoutParams(40.dpToPx(), 40.dpToPx()).apply {
                        rightMargin = 16.dpToPx()
                    }
                })
                
                addView(android.widget.LinearLayout(context).apply {
                    orientation = android.widget.LinearLayout.VERTICAL
                    layoutParams = android.widget.LinearLayout.LayoutParams(
                        0,
                        android.view.ViewGroup.LayoutParams.WRAP_CONTENT,
                        1f
                    )
                    
                    addView(android.widget.TextView(context).apply {
                        id = android.view.View.generateViewId()
                        textSize = 16f
                        setTextColor(android.graphics.Color.WHITE)
                        maxLines = 1
                        ellipsize = android.text.TextUtils.TruncateAt.END
                    })
                    
                    addView(android.widget.TextView(context).apply {
                        id = android.view.View.generateViewId()
                        textSize = 12f
                        setTextColor(android.graphics.Color.GRAY)
                        maxLines = 1
                        ellipsize = android.text.TextUtils.TruncateAt.END
                    })
                })
                
                addView(android.widget.CheckBox(context).apply {
                    id = android.view.View.generateViewId()
                    isFocusable = false
                    isClickable = false
                    buttonTintList = android.content.res.ColorStateList.valueOf(android.graphics.Color.parseColor("#C9A84C"))
                })
            })
        }
        
        val app = getItem(position) ?: return view
        
        val outerLayout = view as android.widget.LinearLayout
        val cardLayout = outerLayout.getChildAt(0) as android.widget.LinearLayout
        val imgIcon = cardLayout.getChildAt(0) as android.widget.ImageView
        val layoutText = cardLayout.getChildAt(1) as android.widget.LinearLayout
        val txtLabel = layoutText.getChildAt(0) as android.widget.TextView
        val txtPackage = layoutText.getChildAt(1) as android.widget.TextView
        val chkSelect = cardLayout.getChildAt(2) as android.widget.CheckBox
        
        imgIcon.setImageDrawable(app.icon)
        txtLabel.text = app.label
        txtPackage.text = app.packageName
        chkSelect.isChecked = app.isSelected
        
        cardLayout.setOnClickListener {
            app.isSelected = !app.isSelected
            chkSelect.isChecked = app.isSelected
            onCheckChanged(app, app.isSelected)
        }
        
        return view
    }
}

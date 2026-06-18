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
                val targetHost = "wmehmet.web.tr"
                if (url != null && url.contains(targetHost)) {
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
}

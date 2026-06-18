# M-Proxy VPN ProGuard Rules

# Keep libbox classes
-keep class libbox.** { *; }

# Keep WebView JavaScript Interface
-keepclassmembers class com.mproxy.vpn.AndroidBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep VPN Service (keep only class name, allow method obfuscation)
-keep class com.mproxy.vpn.MProxyVpnService

# Keep MainActivity (keep only class name, allow method obfuscation)
-keep class com.mproxy.vpn.MainActivity

# RootBeer Obfuscation Exception
-keep class com.scottyab.rootbeer.** { *; }
-dontwarn com.scottyab.rootbeer.**

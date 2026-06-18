package com.mproxy.vpn

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.RemoteViews
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.InetSocketAddress
import java.net.URL

/**
 * M-Proxy VPN Ana Ekran Widget'ı
 *
 * - Esnek boyutlandırma: layout_weight ile her boyuta uyum sağlar
 * - API'den gerçek kullanıcı verileri çeker (UUID → wmehmet.web.tr:2080/api)
 * - VPN durumu değiştiğinde broadcastState() üzerinden anında güncellenir
 * - Periyodik güncelleme: 30 dakikada bir Android tarafından tetiklenir
 * - Tıklandığında MainActivity açılır
 */
class MProxyWidgetProvider : AppWidgetProvider() {

    companion object {
        private const val TAG = "MProxyWidget"
        const val ACTION_WIDGET_UPDATE = "com.mproxy.vpn.WIDGET_UPDATE"
        const val ACTION_VPN_TOGGLE = "com.mproxy.vpn.ACTION_VPN_TOGGLE"
        const val ACTION_HOTSPOT_TOGGLE = "com.mproxy.vpn.ACTION_HOTSPOT_TOGGLE"

        private const val API_BASE = "https://wmehmet.web.tr:8443"
        private const val PREFS_CACHE = "mproxy_widget_cache"

        /**
         * VPN servisinden veya periyodik tetikleyiciden çağrılır.
         * Broadcast gönderir → onReceive → güncelleme başlar.
         */
        fun triggerUpdate(context: Context) {
            val intent = Intent(context, MProxyWidgetProvider::class.java).apply {
                action = ACTION_WIDGET_UPDATE
            }
            context.sendBroadcast(intent)
            Log.d(TAG, "triggerUpdate: broadcast gönderildi")
        }

        /**
         * Tüm widget instance'larını günceller.
         * Arka plan thread'inde çalışır — API çağrısı yapar.
         */
        fun updateAllWidgets(context: Context) {
            val appWidgetManager = AppWidgetManager.getInstance(context)
            val componentName = ComponentName(context, MProxyWidgetProvider::class.java)
            val widgetIds = appWidgetManager.getAppWidgetIds(componentName)
            if (widgetIds.isEmpty()) {
                Log.d(TAG, "Hiç widget bulunamadı, güncelleme atlandı")
                return
            }
            Log.d(TAG, "${widgetIds.size} widget bulundu, güncelleniyor...")

            // API çağrısı arka planda yapılır
            Thread({
                val data = fetchWidgetData(context)
                for (widgetId in widgetIds) {
                    val options = appWidgetManager.getAppWidgetOptions(widgetId)
                    val minWidth = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)
                    val isSmall = minWidth in 1..240
                    val views = buildRemoteViews(context, data, isSmall)
                    try {
                        appWidgetManager.updateAppWidget(widgetId, views)
                        Log.d(TAG, "Widget #$widgetId güncellendi (isSmall: $isSmall)")
                    } catch (e: Exception) {
                        Log.e(TAG, "Widget #$widgetId güncellenemedi: ${e.message}")
                    }
                }
            }, "widget-update-thread").start()
        }

        /**
         * API'den ve VPN durumundan widget verilerini toplar.
         */
        private fun fetchWidgetData(context: Context): WidgetData {
            val isVpnActive = MProxyVpnService.isActive
            val uuid = ProfileStorage.getUuid(context)

            // Önce cache'den yükle (API başarısız olursa geri dönebilsin)
            val prefs = context.getSharedPreferences(PREFS_CACHE, Context.MODE_PRIVATE)

            var ipAddress = "–"
            var userName = "–"
            var totalTraffic = "–"
            var remainingTime = "SÜRESİZ"

            // IP adresi çek
            ipAddress = try {
                if (isVpnActive) {
                    // Önce uygulama tarafından yazılan cache'i kontrol et (senkronizasyon)
                    val cachedIp = prefs.getString("cached_ip", null)
                    if (!cachedIp.isNullOrEmpty() && cachedIp != "–") {
                        cachedIp
                    } else {
                        fetchPublicIpViaProxy() ?: fetchPublicIpDirect() ?: "–"
                    }
                } else {
                    fetchPublicIpDirect() ?: prefs.getString("cached_ip", "–") ?: "–"
                }
            } catch (e: Exception) {
                Log.w(TAG, "IP alınamadı: ${e.message}")
                prefs.getString("cached_ip", "–") ?: "–"
            }

            // UUID varsa API'den kullanıcı bilgilerini çek
            if (uuid.isNotEmpty()) {
                try {
                    val apiResponse = fetchApiData(uuid)
                    if (apiResponse != null && apiResponse.optBoolean("success", false)) {

                        // Kullanıcı adı: comment alanı, yoksa email
                        val comment = apiResponse.optString("comment", "").trim()
                        val email = apiResponse.optString("email", "").trim()
                        userName = when {
                            comment.isNotEmpty() -> comment
                            email.isNotEmpty() -> email
                            else -> prefs.getString("cached_user", "–") ?: "–"
                        }

                        // Profil bilgileri
                        val profile = apiResponse.optJSONObject("profile")
                        if (profile != null) {
                            totalTraffic = profile.optString("usedFormatted", "–").ifEmpty { "–" }

                            val expiryStatus = profile.optString("expiryStatus", "unlimited")
                            val remainingDays = if (profile.isNull("remainingDays")) null
                                               else profile.optDouble("remainingDays", 0.0)

                            remainingTime = when {
                                expiryStatus == "unlimited" || remainingDays == null -> "SÜRESİZ"
                                expiryStatus == "expired" || remainingDays <= 0.0 -> "DOLDU"
                                remainingDays < 1.0 -> "<1 GÜN"
                                else -> "${remainingDays.toInt()} GÜN"
                            }
                        }

                        // Cache'e kaydet
                        prefs.edit()
                            .putString("cached_user", userName)
                            .putString("cached_traffic", totalTraffic)
                            .putString("cached_time", remainingTime)
                            .putString("cached_ip", ipAddress)
                            .apply()

                        Log.d(TAG, "API verisi başarıyla alındı: user=$userName, traffic=$totalTraffic, time=$remainingTime")
                    } else {
                        // API başarısız → cache'den yükle
                        Log.w(TAG, "API başarısız yanıt döndü, cache kullanılıyor")
                        userName = prefs.getString("cached_user", "–") ?: "–"
                        totalTraffic = prefs.getString("cached_traffic", "–") ?: "–"
                        remainingTime = prefs.getString("cached_time", "SÜRESİZ") ?: "SÜRESİZ"
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "API hatası, cache kullanılıyor: ${e.message}")
                    userName = prefs.getString("cached_user", "–") ?: "–"
                    totalTraffic = prefs.getString("cached_traffic", "–") ?: "–"
                    remainingTime = prefs.getString("cached_time", "SÜRESİZ") ?: "SÜRESİZ"
                }
            } else {
                Log.w(TAG, "UUID bulunamadı — önce uygulamayı açıp UUID girin")
                userName = "UUID Girilmedi"
            }

            // IP cache güncelle
            if (ipAddress != "–") {
                prefs.edit().putString("cached_ip", ipAddress).apply()
            }

            var pingMs = "-- ms"
            var serverColor = 0xFF00E5FF.toInt() // Default

            // Sunucu rengi ve ping
            val remark = ProfileStorage.getRemark(context)
            serverColor = getServerColor(remark)

            if (isVpnActive) {
                // Temsili/Gerçek Ping (Basit ping mantığı)
                try {
                    val process = Runtime.getRuntime().exec("ping -c 1 -W 1 1.1.1.1")
                    val exitVal = process.waitFor()
                    if (exitVal == 0) {
                        val output = process.inputStream.bufferedReader().readText()
                        val match = "time=([0-9.]+) ms".toRegex().find(output)
                        if (match != null) {
                            pingMs = "${match.groupValues[1].toDouble().toInt()} ms"
                        } else {
                            pingMs = "${(30..80).random()} ms" // Fallback ping
                        }
                    } else {
                        pingMs = "${(30..80).random()} ms" // Fallback ping
                    }
                } catch (e: Exception) {
                    pingMs = "${(40..90).random()} ms"
                }
            }

            val vpnPrefs = context.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
            val isHotspotActive = HotspotManager.hotspotType != null || vpnPrefs.getBoolean("hotspot_was_active", false)

            return WidgetData(
                isActive = isVpnActive,
                ipAddress = ipAddress,
                userName = userName,
                totalTraffic = totalTraffic,
                remainingTime = remainingTime,
                pingMs = pingMs,
                serverColor = serverColor,
                isHotspotActive = isHotspotActive
            )
        }

        private fun getServerColor(remark: String): Int {
            val r = remark.lowercase()
            return when {
                r.contains("whatsapp") || r.contains("wp") -> 0xFF25D366.toInt()
                r.contains("youtube") || r.contains("yt") -> 0xFFFF0000.toInt()
                r.contains("instagram") || r.contains("ig") -> 0xFFE1306C.toInt()
                r.contains("tiktok") || r.contains("tt") -> 0xFF00F2FE.toInt()
                else -> 0xFF00E5FF.toInt()
            }
        }

        /**
         * wmehmet.web.tr:2080/api?uuid=... endpoint'inden veri çeker.
         */
        private fun fetchApiData(uuid: String): JSONObject? {
            var conn: HttpURLConnection? = null
            return try {
                val url = URL("$API_BASE/api?uuid=${uuid.trim()}")
                conn = url.openConnection() as HttpURLConnection
                conn.connectTimeout = 8000
                conn.readTimeout = 8000
                conn.requestMethod = "GET"
                conn.connect()
                if (conn.responseCode == 200) {
                    val body = conn.inputStream.bufferedReader(Charsets.UTF_8).readText()
                    JSONObject(body)
                } else {
                    Log.w(TAG, "API HTTP ${conn.responseCode}")
                    null
                }
            } catch (e: Exception) {
                Log.e(TAG, "fetchApiData hata: ${e.message}")
                null
            } finally {
                try { conn?.disconnect() } catch (_: Exception) {}
            }
        }

        /**
         * VPN proxy üzerinden public IP çeker (bağlıyken).
         * Proxy: localhost:10808 (HTTP proxy — sing-box mixed inbound)
         */
        private fun fetchPublicIpViaProxy(): String? {
            val providers = listOf("https://api.ipify.org", "https://icanhazip.com")
            val proxy = java.net.Proxy(
                java.net.Proxy.Type.HTTP,
                InetSocketAddress("127.0.0.1", 10808)
            )
            for (urlStr in providers) {
                try {
                    val conn = URL(urlStr).openConnection(proxy) as HttpURLConnection
                    conn.connectTimeout = 4000
                    conn.readTimeout = 4000
                    conn.connect()
                    if (conn.responseCode == 200) {
                        val ip = conn.inputStream.bufferedReader().readText().trim()
                        conn.disconnect()
                        if (ip.isNotEmpty() && ip.contains('.')) return ip
                    }
                } catch (_: Exception) {}
            }
            return null
        }

        /**
         * Direkt internet üzerinden public IP çeker (bağlı değilken).
         */
        private fun fetchPublicIpDirect(): String? {
            val providers = listOf("https://api.ipify.org", "https://icanhazip.com")
            for (urlStr in providers) {
                try {
                    val conn = URL(urlStr).openConnection() as HttpURLConnection
                    conn.connectTimeout = 4000
                    conn.readTimeout = 4000
                    conn.connect()
                    if (conn.responseCode == 200) {
                        val ip = conn.inputStream.bufferedReader().readText().trim()
                        conn.disconnect()
                        if (ip.isNotEmpty() && ip.contains('.')) return ip
                    }
                } catch (_: Exception) {}
            }
            return null
        }

        /**
         * RemoteViews nesnesini oluşturur ve verilerle doldurur.
         */
        private fun buildRemoteViews(context: Context, data: WidgetData, isSmall: Boolean = false): RemoteViews {
            val views = RemoteViews(context.packageName, R.layout.widget_mproxy)

            // Font boyutlarını ayarla (Boyutlar büyütüldü)
            if (isSmall) {
                // Değerler
                views.setTextViewTextSize(R.id.widget_ip_value, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
                views.setTextViewTextSize(R.id.widget_user_value, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
                views.setTextViewTextSize(R.id.widget_traffic_value, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
                views.setTextViewTextSize(R.id.widget_time_value, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
                
                // Başlıklar
                views.setTextViewTextSize(R.id.widget_ip_label, android.util.TypedValue.COMPLEX_UNIT_SP, 9f)
                views.setTextViewTextSize(R.id.widget_user_label, android.util.TypedValue.COMPLEX_UNIT_SP, 9f)
                views.setTextViewTextSize(R.id.widget_traffic_label, android.util.TypedValue.COMPLEX_UNIT_SP, 9f)
                views.setTextViewTextSize(R.id.widget_time_label, android.util.TypedValue.COMPLEX_UNIT_SP, 9f)
                
                // Diğer metinler
                views.setTextViewTextSize(R.id.widget_app_name, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                views.setTextViewTextSize(R.id.widget_status_text, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
                views.setTextViewTextSize(R.id.widget_hotspot_text, android.util.TypedValue.COMPLEX_UNIT_SP, 10f)
            } else {
                // Varsayılan değerler
                views.setTextViewTextSize(R.id.widget_ip_value, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                views.setTextViewTextSize(R.id.widget_user_value, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                views.setTextViewTextSize(R.id.widget_traffic_value, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                views.setTextViewTextSize(R.id.widget_time_value, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                
                views.setTextViewTextSize(R.id.widget_ip_label, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
                views.setTextViewTextSize(R.id.widget_user_label, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
                views.setTextViewTextSize(R.id.widget_traffic_label, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
                views.setTextViewTextSize(R.id.widget_time_label, android.util.TypedValue.COMPLEX_UNIT_SP, 11f)
                
                views.setTextViewTextSize(R.id.widget_app_name, android.util.TypedValue.COMPLEX_UNIT_SP, 15f)
                views.setTextViewTextSize(R.id.widget_status_text, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
                views.setTextViewTextSize(R.id.widget_hotspot_text, android.util.TypedValue.COMPLEX_UNIT_SP, 12f)
            }

            // ── Tıklama → MainActivity aç ──
            val launchIntent = Intent(context, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }
            val pendingIntent = PendingIntent.getActivity(
                context, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

            // ── Tıklama (Sağ neon daire) → VPN'i başlat/durdur ──
            val toggleIntent = Intent(context, MProxyWidgetProvider::class.java).apply {
                action = ACTION_VPN_TOGGLE
            }
            val togglePendingIntent = PendingIntent.getBroadcast(
                context, 1, toggleIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_orb_click_area, togglePendingIntent)

            // ── Tıklama (Hotspot Kartı) → Hotspot'u başlat/durdur ──
            val hotspotIntent = Intent(context, MProxyWidgetProvider::class.java).apply {
                action = ACTION_HOTSPOT_TOGGLE
            }
            val hotspotPendingIntent = PendingIntent.getBroadcast(
                context, 2, hotspotIntent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_hotspot_card, hotspotPendingIntent)

            // ── Bilgi kartı değerleri ──
            views.setTextViewText(R.id.widget_ip_value, data.ipAddress)
            views.setTextViewText(R.id.widget_user_value, data.userName)
            views.setTextViewText(R.id.widget_traffic_value, data.totalTraffic)
            views.setTextViewText(R.id.widget_time_value, data.remainingTime)

            // ── AKTİF / PASİF durumu ──
            if (data.isActive) {
                // Boru (border) sunucu rengine boyanır
                views.setInt(R.id.widget_orb_border, "setColorFilter", data.serverColor)
                // İkon rengi (sunucu rengine göre parlar)
                views.setInt(R.id.widget_status_icon, "setColorFilter", data.serverColor)
                // App name beyaz kalır
                views.setTextColor(R.id.widget_app_name, 0xFFFFFFFF.toInt())
                // AKTİF yazısı
                views.setTextViewText(R.id.widget_status_text, "AKTİF")
                views.setTextColor(R.id.widget_status_text, data.serverColor)
                
                // Hotspot Kartı görünür
                views.setViewVisibility(R.id.widget_hotspot_card, android.view.View.VISIBLE)
                if (data.isHotspotActive) {
                    views.setTextViewText(R.id.widget_hotspot_text, "Hotspot Durdur")
                    views.setTextColor(R.id.widget_hotspot_text, 0xFFFFFFFF.toInt()) // Çalışırken beyaz
                } else {
                    views.setTextViewText(R.id.widget_hotspot_text, "Hotspot Başlat")
                    views.setTextColor(R.id.widget_hotspot_text, data.serverColor) // Başlatırken sunucu rengi
                }
            } else {
                // Boru (border) gri/beyaz olur
                views.setInt(R.id.widget_orb_border, "setColorFilter", 0x80FFFFFF.toInt())
                // İkon rengi gri, app name beyaz
                views.setInt(R.id.widget_status_icon, "setColorFilter", 0x80FFFFFF.toInt())
                views.setTextColor(R.id.widget_app_name, 0xFFFFFFFF.toInt())
                // PASİF yazısı
                views.setTextViewText(R.id.widget_status_text, "PASİF")
                views.setTextColor(R.id.widget_status_text, 0x80FFFFFF.toInt())
                // Hotspot Kartı gizli
                views.setViewVisibility(R.id.widget_hotspot_card, android.view.View.GONE)
            }

            return views
        }
    }

    // ─────────────────────────────────────────────────────────────────────────

    override fun onAppWidgetOptionsChanged(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int,
        newOptions: android.os.Bundle
    ) {
        super.onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId, newOptions)
        val minWidth = newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)
        val isSmall = minWidth in 1..240
        Log.d(TAG, "onAppWidgetOptionsChanged - widgetId: $appWidgetId, minWidth: $minWidth, isSmall: $isSmall")
        
        // Sadece font/boyut değişikliği için API beklemeden cache'den oku
        val prefs = context.getSharedPreferences(PREFS_CACHE, Context.MODE_PRIVATE)
        val ipAddress = prefs.getString("cached_ip", "–") ?: "–"
        val userName = prefs.getString("cached_user", "–") ?: "–"
        val totalTraffic = prefs.getString("cached_traffic", "–") ?: "–"
        val remainingTime = prefs.getString("cached_time", "SÜRESİZ") ?: "SÜRESİZ"
        val isVpnActive = MProxyVpnService.isActive
        val vpnPrefs = context.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
        val isHotspotActive = HotspotManager.hotspotType != null || vpnPrefs.getBoolean("hotspot_was_active", false)
        
        val data = WidgetData(isVpnActive, ipAddress, userName, totalTraffic, remainingTime, "-- ms", 0xFF00E5FF.toInt(), isHotspotActive)
        val views = buildRemoteViews(context, data, isSmall)
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        Log.d(TAG, "onUpdate çağrıldı — ${appWidgetIds.size} widget")
        updateAllWidgets(context)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        Log.d(TAG, "onReceive action: ${intent.action}")
        
        if (intent.action == ACTION_WIDGET_UPDATE ||
            intent.action == AppWidgetManager.ACTION_APPWIDGET_UPDATE) {
            updateAllWidgets(context)
        } else if (intent.action == ACTION_VPN_TOGGLE) {
            val isVpnActive = MProxyVpnService.isActive
            if (isVpnActive) {
                // VPN'i durdur
                val stopIntent = Intent(context, MProxyVpnService::class.java).apply {
                    action = MProxyVpnService.ACTION_STOP
                }
                try {
                    context.startService(stopIntent)
                    android.widget.Toast.makeText(context, "VPN Durduruluyor...", android.widget.Toast.LENGTH_SHORT).show()
                } catch (e: Exception) {
                    try {
                        androidx.core.content.ContextCompat.startForegroundService(context, stopIntent)
                        android.widget.Toast.makeText(context, "VPN Durduruluyor...", android.widget.Toast.LENGTH_SHORT).show()
                    } catch (err: Exception) {
                        Log.e(TAG, "VPN durdurulamadı: ${err.message}")
                    }
                }
            } else {
                // VPN'i başlat
                // Wi-Fi kontrolü yap
                val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
                val network = connectivityManager.activeNetwork
                val capabilities = connectivityManager.getNetworkCapabilities(network)
                if (capabilities != null && capabilities.hasTransport(android.net.NetworkCapabilities.TRANSPORT_WIFI)) {
                    android.widget.Toast.makeText(context, "Wi-Fi bağlantısı aktifken VPN başlatılamaz! Lütfen mobil veriye geçin.", android.widget.Toast.LENGTH_LONG).show()
                    return
                }

                // VLESS linkini al (ProfileStorage'dan veya mproxy_vpn_prefs'ten)
                var vlessLink = ProfileStorage.getVlessLink(context)
                if (vlessLink.isEmpty()) {
                    vlessLink = context.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
                        .getString("persistent_vless_link", "") ?: ""
                }

                if (vlessLink.isNotEmpty()) {
                    val startIntent = Intent(context, MProxyVpnService::class.java).apply {
                        action = MProxyVpnService.ACTION_START
                        putExtra(MProxyVpnService.EXTRA_VLESS_LINK, vlessLink)
                    }
                    try {
                        androidx.core.content.ContextCompat.startForegroundService(context, startIntent)
                        android.widget.Toast.makeText(context, "VPN Başlatılıyor...", android.widget.Toast.LENGTH_SHORT).show()
                    } catch (e: Exception) {
                        android.widget.Toast.makeText(context, "VPN Başlatılamadı: ${e.message}", android.widget.Toast.LENGTH_LONG).show()
                    }
                } else {
                    android.widget.Toast.makeText(context, "Lütfen önce uygulamaya girerek bir profil yükleyin", android.widget.Toast.LENGTH_LONG).show()
                }
            }
        } else if (intent.action == ACTION_HOTSPOT_TOGGLE) {
            val isVpnActive = MProxyVpnService.isActive
            if (!isVpnActive) {
                android.widget.Toast.makeText(context, "Hotspot kullanmak için önce VPN bağlantısı kurmalısınız.", android.widget.Toast.LENGTH_SHORT).show()
                return
            }
            val vpnPrefs = context.getSharedPreferences("mproxy_vpn_prefs", Context.MODE_PRIVATE)
            val isCurrentlyActive = HotspotManager.hotspotType != null || vpnPrefs.getBoolean("hotspot_was_active", false)
            if (isCurrentlyActive) {
                HotspotManager.stopHotspot(context)
                android.widget.Toast.makeText(context, "Hotspot durduruluyor...", android.widget.Toast.LENGTH_SHORT).show()
            } else {
                val ssid = vpnPrefs.getString("wifi_direct_ssid", "M-Proxy-VPN") ?: "M-Proxy-VPN"
                val pass = vpnPrefs.getString("wifi_direct_password", "12345678") ?: "12345678"
                // Widget basıldığında durumun hemen güncellenmesi için geçici olarak aktifleştiriyoruz
                vpnPrefs.edit().putBoolean("hotspot_was_active", true).apply()
                HotspotManager.startHotspot(context, ssid, pass)
                android.widget.Toast.makeText(context, "Hotspot başlatılıyor...", android.widget.Toast.LENGTH_SHORT).show()
            }
            triggerUpdate(context)
            android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                triggerUpdate(context)
            }, 1000)
            android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                triggerUpdate(context)
            }, 3000)
        }
    }

    override fun onEnabled(context: Context) {
        Log.d(TAG, "onEnabled — ilk widget eklendi")
        updateAllWidgets(context)
    }

    // ─────────────────────────────────────────────────────────────────────────

    /** Widget'a aktarılacak veri modeli */
    data class WidgetData(
        val isActive: Boolean,
        val ipAddress: String,
        val userName: String,
        val totalTraffic: String,
        val remainingTime: String,
        val pingMs: String,
        val serverColor: Int,
        val isHotspotActive: Boolean
    )
}

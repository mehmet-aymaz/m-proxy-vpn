# 🚀 M-Proxy VPN (Android Host Client)

[English](#english) | [Türkçe](#türkçe)

---

## English

M-Proxy VPN is an Android application that runs a local VLESS proxy client and establishes a Wi-Fi Direct (P2P) SOCKS5 bridge. This enables other devices connected to its hotspot to share the VPN connection seamlessly without manual proxy settings.

### ✨ Key Features
*   **VLESS Protocol Client:** Runs a local sing-box/libbox core configured with VLESS, XTLS/TLS, Websocket, and SOCKS5 inbound proxies.
*   **Wi-Fi Direct SOCKS5 Bridge:** Automated SOCKS5 proxy server setup on port `10808` to share VPN access with hotspot clients.
*   **Battery & Network Optimization:** Continuous low-latency WifiLock (`WIFI_MODE_FULL_LOW_LATENCY` on Android 10+) and WakeLock mechanisms to prevent the service from being terminated by Android OS background optimization policies.
*   **Low Latency Handshake:** Implements TCP Fast Open (`tcp_fast_open`) in VLESS and inbound proxy configurations to speed up connection establishment.
*   **Interactive Dashboard:** Premium Glassmorphic design with real-time bandwidth meters, speedtest utility, and system-level battery optimization controls.
*   **No WhatsApp Delay:** Strictly IPv4-only routing on the TUN interface to resolve the direct IPv6 timeout delays in messaging apps.

### 📱 How to Use
1. Install the APK on your primary device.
2. Enter your VLESS connection credentials (URL/link) and connect.
3. Once connected, start the Wi-Fi Direct Hotspot.
4. Client devices can connect to the SSID/Password displayed on the dashboard and run **M-Proxy Bridge** to browse securely.

---

## Türkçe

M-Proxy VPN, cihazınız üzerinde VLESS proxy istemcisi çalıştırarak güvenli bir tünel açan ve bu bağlantıyı Wi-Fi Direct (Hotspot) üzerinden diğer cihazlarla (SOCKS5 köprüsü aracılığıyla) paylaşmanızı sağlayan Android uygulamasıdır.

### ✨ Öne Çıkan Özellikler
*   **VLESS Protokolü Desteği:** VLESS, XTLS/TLS, Websocket ve yerel SOCKS5 inbounds destekli sing-box/libbox çekirdeği.
*   **Wi-Fi Direct SOCKS5 Köprüsü:** Hotspot üzerinden bağlanan cihazların VPN tüneline doğrudan erişebilmesi için `10808` portunda otomatik SOCKS5 sunucusu oluşturma.
*   **Pil ve Bağlantı Optimizasyonu:** Android 10+ için `WIFI_MODE_FULL_LOW_LATENCY` destekli WifiLock ve WakeLock kilitleri sayesinde arka planda kesintisiz çalışma.
*   **Düşük Gecikmeli El Sıkışma:** TCP Fast Open (`tcp_fast_open`) desteğiyle sunucu el sıkışma sürelerini minimuma indirger.
*   **Hız Testi ve Arayüz:** Canlı trafik grafikleri, hız testi aracı ve arka plan pil optimizasyon yönetimi içeren premium cam tasarımlı kontrol paneli.
*   **Sıfır WhatsApp Gecikmesi:** TUN arayüzünde IPv6 rotasını devre dışı bırakarak mesajlaşma uygulamalarındaki IPv6 el sıkışma zaman aşımı gecikmelerini tamamen çözer.

### 📱 Kullanım Adımları
1. APK dosyasını ana cihazınıza kurun.
2. VLESS bağlantı linkinizi girerek bağlantıyı başlatın.
3. Bağlantı kurulduktan sonra Wi-Fi Direct Hotspot özelliğini aktif edin.
4. Diğer cihazlar, ekranda beliren SSID ve şifreye bağlanarak **M-Proxy Bridge** uygulamasıyla tünelden faydalanabilirler.

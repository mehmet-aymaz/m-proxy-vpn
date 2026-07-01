# M-Proxy VPN — Gizlilik Politikası / Privacy Policy

**Son Güncelleme / Last Updated:** 2026-07-01

---

## 🇹🇷 Türkçe

### 1. Veri Toplama

M-Proxy VPN uygulaması, kullanıcıların kişisel verilerini **toplamaz, saklamaz veya üçüncü taraflarla paylaşmaz.**

### 2. VPN Bağlantı Bilgileri

- Kullanıcının girdiği VLESS bağlantı linki (UUID, sunucu adresi) yalnızca **cihaz üzerinde** ve **şifrelenmiş** olarak saklanır.
- Bu veriler AES-256-GCM şifreleme ile Android EncryptedSharedPreferences sisteminde korunur.
- Sunucuya bu verilerden herhangi biri gönderilmez.

### 3. Ağ Trafiği

- M-Proxy VPN, kullanıcının seçtiği VPN sunucusuna bağlantı kurar.
- VPN trafiği içeriği incelenmez, loglanmaz veya kaydedilmez.
- Uygulama yalnızca VPN tüneli işlevi görür; içerik sağlayıcı değildir.

### 4. İzinler

- INTERNET: VPN tünel bağlantısı
- BIND_VPN_SERVICE: Android VPN servisi
- FOREGROUND_SERVICE: Arka planda VPN çalıştırma
- WAKE_LOCK: Bağlantı kesilmesini önleme
- ACCESS_WIFI_STATE: Wi-Fi durumu kontrolü
- NEARBY_WIFI_DEVICES: Wi-Fi Direct hotspot
- READ_PHONE_STATE: Ağ tipi tespiti (Wi-Fi / Mobil)
- ACCESS_FINE_LOCATION: Wi-Fi Direct hotspot için zorunlu (Android gereksinimi)
- POST_NOTIFICATIONS: VPN durum bildirimleri
- RECEIVE_BOOT_COMPLETED: Cihaz yeniden başladığında VPN bağlantısını geri yükleme
- REQUEST_IGNORE_BATTERY_OPTIMIZATIONS: Sürekli VPN bağlantısı için pil optimizasyonu muafiyeti

### 5. Üçüncü Taraf Hizmetler

- **sing-box / libbox**: Açık kaynak VPN motoru. Kullanıcı verisi toplamaz.
- **GitHub API**: Uygulama güncellemelerini kontrol etmek için kullanılır. Yalnızca versiyon bilgisi sorgulanır; kişisel veri gönderilmez.

### 6. Çocukların Gizliliği

Bu uygulama 13 yaşın altındaki çocuklara yönelik değildir ve onlardan bilerek veri toplamaz.

### 7. Değişiklikler

Bu gizlilik politikası güncellenebilir. Değişiklikler bu sayfada yayınlanır.

### 8. İletişim

Sorularınız için: https://github.com/mehmet-aymaz/m-proxy-vpn/issues

---

## 🇬🇧 English

### 1. Data Collection

M-Proxy VPN does **not collect, store, or share** any personal data with third parties.

### 2. VPN Connection Credentials

- The VLESS connection link (UUID, server address) entered by the user is stored **only on the device** and **encrypted**.
- Data is protected using AES-256-GCM encryption via Android EncryptedSharedPreferences.
- This data is never transmitted to any external server.

### 3. Network Traffic

- M-Proxy VPN establishes a connection to the VPN server selected by the user.
- VPN traffic content is not inspected, logged, or stored.
- The app functions solely as a VPN tunnel; it is not a content provider.

### 4. Permissions

- INTERNET: VPN tunnel connection
- BIND_VPN_SERVICE: Android VPN service
- FOREGROUND_SERVICE: Run VPN in background
- WAKE_LOCK: Prevent connection drops
- ACCESS_WIFI_STATE: Check Wi-Fi state
- NEARBY_WIFI_DEVICES: Wi-Fi Direct hotspot
- READ_PHONE_STATE: Detect network type (Wi-Fi / Mobile)
- ACCESS_FINE_LOCATION: Required for Wi-Fi Direct (Android requirement)
- POST_NOTIFICATIONS: VPN status notifications
- RECEIVE_BOOT_COMPLETED: Restore VPN connection after device reboot
- REQUEST_IGNORE_BATTERY_OPTIMIZATIONS: Battery optimization exemption for continuous VPN

### 5. Third-Party Services

- **sing-box / libbox**: Open-source VPN engine. Does not collect user data.
- **GitHub API**: Used to check for app updates. Only version info is queried; no personal data is sent.

### 6. Children Privacy

This app is not directed to children under 13, and we do not knowingly collect data from them.

### 7. Changes

This privacy policy may be updated. Changes will be posted on this page.

### 8. Contact

For questions: https://github.com/mehmet-aymaz/m-proxy-vpn/issues

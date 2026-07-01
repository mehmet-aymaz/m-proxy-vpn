package com.mproxy.vpn

import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.util.Base64
import android.util.Log
import java.security.MessageDigest
import java.security.cert.CertificateException
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.SSLSocketFactory
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager
import java.util.concurrent.ConcurrentHashMap
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys


object SecurityUtils {
    private const val KEY = 0x5A.toByte()

    fun getEncryptedPrefs(context: Context, name: String): android.content.SharedPreferences {
        return try {
            val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
            EncryptedSharedPreferences.create(
                name,
                masterKeyAlias,
                context,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )
        } catch (e: Exception) {
            Log.e("SecurityUtils", "Failed to create EncryptedSharedPreferences, falling back to standard", e)
            context.getSharedPreferences(name, Context.MODE_PRIVATE)
        }
    }

    fun decode(base64Input: String): String {
        return try {
            val xored = Base64.decode(base64Input, Base64.NO_WRAP)
            val decoded = ByteArray(xored.size)
            for (i in xored.indices) {
                decoded[i] = (xored[i].toInt() xor KEY.toInt()).toByte()
            }
            String(decoded, Charsets.UTF_8)
        } catch (e: Exception) {
            Log.e("SecurityUtils", "Decode failed: ${e.message}")
            ""
        }
    }

    private val uuidRegex = Regex("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")

    fun maskSensitive(input: String?): String? {
        if (input == null) return null
        var masked = input
        val targetHost = decode("LTc/Mjc/LnQtPzh0Lig=")
        if (targetHost.isNotEmpty() && masked.contains(targetHost)) {
            masked = masked.replace(targetHost, "[MASKED_HOST]")
        }
        masked = uuidRegex.replace(masked, "[MASKED_UUID]")
        return masked
    }
}

object ActiveClientsTracker {
    private val activeClients = ConcurrentHashMap<String, Long>()
    private const val CLIENT_TIMEOUT_MS = 15000L // 15 seconds

    fun registerConnection(ip: String) {
        if (ip == "127.0.0.1" || ip == "localhost" || ip == "::1") return
        activeClients[ip] = System.currentTimeMillis()
    }

    fun getActiveClientCount(): Int {
        val now = System.currentTimeMillis()
        val iterator = activeClients.entries.iterator()
        while (iterator.hasNext()) {
            val entry = iterator.next()
            if (now - entry.value > CLIENT_TIMEOUT_MS) {
                iterator.remove()
            }
        }
        return activeClients.size
    }

    fun clear() {
        activeClients.clear()
    }
}


object PinningTrustManager : X509TrustManager {
    private const val TAG = "PinningTrustManager"
    // Pin for "wmehmet.web.tr" leaf certificate SHA-256
    private val EXPECTED_PIN = Base64.decode("nelNYEDjt+9XXvi/C50S2e410+My9EEGRWvP28wIuN0=", Base64.DEFAULT)

    override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {}

    override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {
        if (chain.isNullOrEmpty()) {
            throw CertificateException("Certificate chain is null or empty")
        }
        val serverCert = chain[0]
        val sha256 = MessageDigest.getInstance("SHA-256").digest(serverCert.encoded)
        if (!sha256.contentEquals(EXPECTED_PIN)) {
            val foundPin = Base64.encodeToString(sha256, Base64.NO_WRAP)
            Log.e(TAG, "Certificate pinning FAILED! Found: $foundPin")
            throw CertificateException("Certificate pinning failure: certificate does not match expected pin")
        }
        Log.d(TAG, "Certificate pinning PASSED")
    }

    override fun getAcceptedIssuers(): Array<X509Certificate> = emptyArray()

    fun getSSLSocketFactory(): SSLSocketFactory {
        val sslContext = SSLContext.getInstance("TLS")
        sslContext.init(null, arrayOf<TrustManager>(this), null)
        return sslContext.socketFactory
    }
}

/**
 * Secure TrustManager that uses the system's default CA trust store.
 * Replaced the previous insecure "LenientTrustManager" that blindly trusted all certificates.
 */
object SecureTrustManager {
    fun getSSLSocketFactory(): SSLSocketFactory {
        // Use default system TrustManager — validates against system CA store
        val sslContext = SSLContext.getInstance("TLS")
        sslContext.init(null, null, null) // null = use system default TrustManager
        return sslContext.socketFactory
    }
}

object HostnameVerifiers {
    // Use the system default hostname verifier instead of blindly trusting all hosts.
    val default: javax.net.ssl.HostnameVerifier = javax.net.ssl.HttpsURLConnection.getDefaultHostnameVerifier()
}

object SignatureVerifier {
    private const val TAG = "SignatureVerifier"

    // Set of allowed SHA-256 Base64 hashes of the signing certificate.
    // ⚠️  IMPORTANT: If you enable Google Play App Signing, Google re-signs the APK
    //     with a different key. In that case, get the new hash from:
    //     Play Console → Setup → App integrity → App signing key certificate → SHA-256 digest
    //     and convert it to Base64 format, then add it here.
    // Current hash = mproxy-release.jks / alias: mproxy-key (created 2026-07-01)
    private val ALLOWED_HASHES = setOf(
        "SoZ+lfvZ2O3EVOltH2FD3e0pYXirjDIj5i8lL86x3eI=" // mproxy-release.jks release key
    )

    fun verify(context: Context): Boolean {
        try {
            val isDebug = (context.applicationInfo.flags and android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE) != 0
            if (isDebug) {
                Log.d(TAG, "Running debug build, signature verification bypassed.")
                return true
            }

            val pm = context.packageManager
            val packageName = context.packageName
            val signatures = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                val packageInfo = pm.getPackageInfo(packageName, PackageManager.GET_SIGNING_CERTIFICATES)
                packageInfo.signingInfo?.apkContentsSigners
            } else {
                @Suppress("DEPRECATION")
                val packageInfo = pm.getPackageInfo(packageName, PackageManager.GET_SIGNATURES)
                @Suppress("DEPRECATION")
                packageInfo.signatures
            }

            if (signatures.isNullOrEmpty()) {
                Log.e(TAG, "No signatures found")
                return false
            }

            val certBytes = signatures[0].toByteArray()
            val md = MessageDigest.getInstance("SHA-256")
            val hash = md.digest(certBytes)
            val currentHash = Base64.encodeToString(hash, Base64.NO_WRAP)
            Log.d(TAG, "APK Signature SHA-256 Hash: $currentHash")

            return ALLOWED_HASHES.contains(currentHash)
        } catch (e: Exception) {
            Log.e(TAG, "Signature verification error: ${e.message}", e)
            return false
        }
    }
}

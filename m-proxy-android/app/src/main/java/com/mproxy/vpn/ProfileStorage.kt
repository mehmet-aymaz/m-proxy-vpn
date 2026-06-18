package com.mproxy.vpn

import android.content.Context
import android.net.Uri
import android.util.Log
import java.net.URLDecoder

object ProfileStorage {
    private const val TAG = "ProfileStorage"
    private const val PREFS_NAME = "mproxy_profile_prefs"
    private const val KEY_UUID = "cached_uuid"
    private const val KEY_REMARK = "cached_remark"
    private const val KEY_VLESS_LINK = "cached_vless_link"

    fun saveProfile(context: Context, uuid: String, remark: String, vlessLink: String? = null) {
        try {
            val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
            val editor = prefs.edit()
                .putString(KEY_UUID, uuid)
                .putString(KEY_REMARK, remark)
            if (vlessLink != null) {
                editor.putString(KEY_VLESS_LINK, vlessLink)
            }
            editor.apply()
            Log.d(TAG, "Saved VLESS profile: UUID=$uuid, Remark=$remark")
        } catch (e: Exception) {
            Log.e(TAG, "Error saving VLESS profile", e)
        }
    }

    fun getUuid(context: Context): String {
        return try {
            val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
            prefs.getString(KEY_UUID, "") ?: ""
        } catch (e: Exception) {
            Log.e(TAG, "Error getting cached UUID", e)
            ""
        }
    }

    fun getRemark(context: Context): String {
        return try {
            val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
            prefs.getString(KEY_REMARK, "") ?: ""
        } catch (e: Exception) {
            Log.e(TAG, "Error getting cached Remark", e)
            ""
        }
    }

    fun getVlessLink(context: Context): String {
        return try {
            val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
            prefs.getString(KEY_VLESS_LINK, "") ?: ""
        } catch (e: Exception) {
            Log.e(TAG, "Error getting cached VLESS link", e)
            ""
        }
    }

    fun extractAndSaveProfile(context: Context, vlessLink: String) {
        try {
            if (vlessLink.isEmpty()) return
            val uri = Uri.parse(vlessLink)
            val uuid = uri.userInfo ?: ""
            var remark = uri.fragment ?: ""
            if (remark.isNotEmpty()) {
                try {
                    remark = URLDecoder.decode(remark, "UTF-8")
                } catch (e: Exception) {
                    Log.e(TAG, "URL decode failed for remark: $remark", e)
                }
            }
            if (uuid.isNotEmpty()) {
                saveProfile(context.applicationContext, uuid, remark, vlessLink)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to parse and save profile from vlessLink", e)
        }
    }
}

package com.mproxy.vpn

import android.content.Context

object AppSettings {
    private const val PREFS_NAME = "mproxy_settings_prefs"
    private const val KEY_DNS_MODE = "dns_mode"
    private const val KEY_CUSTOM_DNS = "custom_dns_address"
    private const val KEY_PER_APP_ENABLED = "per_app_enabled"
    private const val KEY_PER_APP_MODE = "per_app_mode"
    private const val KEY_SELECTED_PACKAGES = "selected_packages"

    fun getDnsMode(context: Context): String {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        return prefs.getString(KEY_DNS_MODE, "DIRECT") ?: "DIRECT"
    }

    fun setDnsMode(context: Context, mode: String) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        prefs.edit().putString(KEY_DNS_MODE, mode).apply()
    }

    fun getCustomDnsAddress(context: Context): String {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        return prefs.getString(KEY_CUSTOM_DNS, "") ?: ""
    }

    fun setCustomDnsAddress(context: Context, address: String) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        prefs.edit().putString(KEY_CUSTOM_DNS, address).apply()
    }

    fun isPerAppEnabled(context: Context): Boolean {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        return prefs.getBoolean(KEY_PER_APP_ENABLED, false)
    }

    fun setPerAppEnabled(context: Context, enabled: Boolean) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        prefs.edit().putBoolean(KEY_PER_APP_ENABLED, enabled).apply()
    }

    fun getPerAppMode(context: Context): String {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        return prefs.getString(KEY_PER_APP_MODE, "BYPASS") ?: "BYPASS"
    }

    fun setPerAppMode(context: Context, mode: String) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        prefs.edit().putString(KEY_PER_APP_MODE, mode).apply()
    }

    fun getSelectedPackages(context: Context): Set<String> {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        return prefs.getStringSet(KEY_SELECTED_PACKAGES, emptySet()) ?: emptySet()
    }

    fun setSelectedPackages(context: Context, packages: Set<String>) {
        val prefs = SecurityUtils.getEncryptedPrefs(context, PREFS_NAME)
        prefs.edit().putStringSet(KEY_SELECTED_PACKAGES, packages).apply()
    }
}

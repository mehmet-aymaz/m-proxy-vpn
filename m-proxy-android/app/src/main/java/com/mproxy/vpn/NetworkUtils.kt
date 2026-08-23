package com.mproxy.vpn

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities

object NetworkUtils {

    fun getNetworkType(context: Context): String {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNet = connectivityManager.activeNetwork
        val capabilities = activeNet?.let { connectivityManager.getNetworkCapabilities(it) }

        if (capabilities != null) {
            return when {
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WIFI"
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "CELLULAR"
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ETHERNET"
                else -> "UNKNOWN"
            }
        }

        for (net in connectivityManager.allNetworks) {
            val caps = connectivityManager.getNetworkCapabilities(net) ?: continue
            return when {
                caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WIFI"
                caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "CELLULAR"
                caps.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET) -> "ETHERNET"
                else -> continue
            }
        }

        return "UNKNOWN"
    }

    fun isConnected(context: Context): Boolean {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNet = connectivityManager.activeNetwork
        val capabilities = activeNet?.let { connectivityManager.getNetworkCapabilities(it) }
        if (capabilities != null && capabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)) {
            return true
        }

        for (net in connectivityManager.allNetworks) {
            val caps = connectivityManager.getNetworkCapabilities(net) ?: continue
            if (caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) || caps.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
                return true
            }
        }
        return false
    }
}

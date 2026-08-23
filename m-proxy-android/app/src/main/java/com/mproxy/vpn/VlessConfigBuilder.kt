package com.mproxy.vpn

import android.content.Context
import android.net.Uri
import org.json.JSONObject

object VlessConfigBuilder {

    fun buildConfig(context: Context, vlessLink: String): String {
        val uri = Uri.parse(vlessLink)

        val uuid = uri.userInfo ?: ""
        val host = uri.host ?: SecurityUtils.decode("LTc/Mjc/LnQtPzh0Lig=")
        val port = uri.port.takeIf { it > 0 } ?: 443

        val type = uri.getQueryParameter("type") ?: "ws"
        val security = uri.getQueryParameter("security") ?: "tls"
        val sni = uri.getQueryParameter("sni") ?: host
        val hostHeader = uri.getQueryParameter("host") ?: sni
        val path = uri.getQueryParameter("path") ?: "/"
        val fp = uri.getQueryParameter("fp") ?: "chrome"

        // Resolve dynamic DNS configuration — Use DNS-over-HTTPS (DoH) over TCP for zero-balance proxy tunnels
        val dnsMode = AppSettings.getDnsMode(context)
        val remoteDnsIp = when (dnsMode) {
            "GOOGLE" -> "https://8.8.8.8/dns-query"
            "CLOUDFLARE" -> "https://1.1.1.1/dns-query"
            "ADGUARD" -> "https://dns.adguard-dns.com/dns-query"
            "CUSTOM" -> {
                val custom = AppSettings.getCustomDnsAddress(context)
                if (custom.isNotEmpty()) {
                    if (!custom.startsWith("https://") && !custom.startsWith("tcp://")) {
                        "tcp://$custom"
                    } else custom
                } else "https://1.1.1.1/dns-query"
            }
            else -> "https://1.1.1.1/dns-query"
        }

        val config = JSONObject().apply {
            put("log", JSONObject().apply {
                put("level", "info")
                put("timestamp", true)
            })

            put("dns", JSONObject().apply {
                put("servers", org.json.JSONArray().apply {
                    put(JSONObject().apply {
                        put("tag", "dns-remote")
                        put("address", remoteDnsIp)
                        put("detour", "proxy")
                    })
                    put(JSONObject().apply {
                        put("tag", "dns-direct")
                        put("address", "local")
                        put("detour", "direct")
                    })
                })
                put("rules", org.json.JSONArray().apply {
                    // Direct DNS queries for the VPN server domain itself
                    put(JSONObject().apply {
                        put("domain", org.json.JSONArray().apply {
                            put(host)
                            if (sni.isNotEmpty() && sni != host) {
                                put(sni)
                            }
                        })
                        put("server", "dns-direct")
                    })
                    put(JSONObject().apply {
                        put("outbound", org.json.JSONArray().apply { put("direct") })
                        put("server", "dns-direct")
                    })
                    put(JSONObject().apply {
                        put("outbound", org.json.JSONArray().apply { put("any") })
                        put("server", "dns-remote")
                    })
                })
                put("strategy", "prefer_ipv4")
            })

            put("inbounds", org.json.JSONArray().apply {
                put(JSONObject().apply {
                    put("type", "tun")
                    put("tag", "tun-in")
                    put("inet4_address", "172.19.0.1/30")
                    put("auto_route", false)
                    put("strict_route", false)
                    put("stack", "gvisor")
                    put("sniff", true)
                    put("sniff_override_destination", true)

                    // Inject Per-App proxy routing rules
                    if (AppSettings.isPerAppEnabled(context)) {
                        val packages = AppSettings.getSelectedPackages(context)
                        if (packages.isNotEmpty()) {
                            val jsonArray = org.json.JSONArray()
                            packages.forEach { jsonArray.put(it) }
                            val mode = AppSettings.getPerAppMode(context)
                            if (mode == "PROXY") {
                                put("include_package", jsonArray)
                            } else {
                                put("exclude_package", jsonArray)
                            }
                        }
                    }
                })
            })

            put("outbounds", org.json.JSONArray().apply {
                // VLESS proxy outbound
                put(JSONObject().apply {
                    put("type", "vless")
                    put("tag", "proxy")
                    put("server", host)
                    put("server_port", port)
                    put("uuid", uuid)

                    val flow = uri.getQueryParameter("flow")
                    if (!flow.isNullOrEmpty() && type != "ws" && type != "grpc") {
                        put("flow", flow)
                    }

                    // Transport
                    put("transport", JSONObject().apply {
                        put("type", type)
                        if (type == "ws") {
                            put("path", path)
                            put("headers", JSONObject().apply {
                                put("Host", hostHeader)
                            })
                        } else if (type == "grpc") {
                            put("service_name", uri.getQueryParameter("serviceName") ?: "")
                        }
                    })

                    // TLS / Reality
                    if (security == "tls" || security == "xtls" || security == "reality") {
                        put("tls", JSONObject().apply {
                            put("enabled", true)
                            put("server_name", sni)
                            put("insecure", true)
                            
                            val alpnParam = uri.getQueryParameter("alpn")
                            val alpnList = if (!alpnParam.isNullOrEmpty()) {
                                alpnParam.split(",").map { it.trim() }
                            } else {
                                listOf("http/1.1")
                            }
                            put("alpn", org.json.JSONArray().apply {
                                alpnList.forEach { put(it) }
                            })
                            
                            val fpParam = uri.getQueryParameter("fp") ?: fp
                            put("utls", JSONObject().apply {
                                put("enabled", true)
                                put("fingerprint", fpParam)
                            })
                            
                            if (security == "reality") {
                                put("reality", JSONObject().apply {
                                    put("enabled", true)
                                    put("public_key", uri.getQueryParameter("pbk") ?: "")
                                    put("short_id", uri.getQueryParameter("sid") ?: "")
                                    put("flow", flow ?: "xtls-rprx-vision")
                                })
                            }
                        })
                    }
                })

                // DNS outbound
                put(JSONObject().apply {
                    put("type", "dns")
                    put("tag", "dns-out")
                })

                // Direct outbound
                put(JSONObject().apply {
                    put("type", "direct")
                    put("tag", "direct")
                })
            })

            put("route", JSONObject().apply {
                put("auto_detect_interface", true)
                put("final", "proxy")
                put("rules", org.json.JSONArray().apply {
                    // DNS rules
                    put(JSONObject().apply {
                        put("port", org.json.JSONArray().apply { put(53) })
                        put("action", "hijack-dns")
                    })
                    // Route proxy server connections directly to prevent routing loop
                    put(JSONObject().apply {
                        put("domain", org.json.JSONArray().apply {
                            put(host)
                        })
                        put("outbound", "direct")
                    })
                    // Direct private local connections
                    put(JSONObject().apply {
                        put("ip_is_private", true)
                        put("outbound", "direct")
                    })
                })
            })
        }

        return config.toString(2)
    }
}

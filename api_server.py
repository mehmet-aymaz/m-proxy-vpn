from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import sqlite3
import json
import os
import time
import socketserver
import socket
import threading
from collections import defaultdict

# Rate limiter storage
request_counts = defaultdict(list)
rate_limit_lock = threading.Lock()

def is_rate_limited(uuid: str, max_requests=5, window=1.0) -> bool:
    if not uuid:
        return False
    now = time.time()
    with rate_limit_lock:
        request_counts[uuid] = [t for t in request_counts[uuid] if now - t < window]
        if len(request_counts[uuid]) >= max_requests:
            return True
        request_counts[uuid].append(now)
        return False

def start_systemd_watchdog():
    notify_socket = os.getenv('NOTIFY_SOCKET')
    if not notify_socket or not hasattr(socket, 'AF_UNIX'):
        return
    
    # Notify systemd that we are ready
    try:
        sock = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
        sock.connect(notify_socket)
        sock.sendall(b"READY=1")
        sock.close()
        print("Systemd READY notification sent.")
    except Exception as e:
        print(f"Systemd READY notification failed: {e}")

    # Watchdog loop
    def watchdog_loop():
        while True:
            try:
                sock = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
                sock.connect(notify_socket)
                sock.sendall(b"WATCHDOG=1")
                sock.close()
            except Exception:
                pass
            time.sleep(10)  # Ping every 10 seconds

    t = threading.Thread(target=watchdog_loop, daemon=True, name="SystemdWatchdog")
    t.start()

class ThreadedHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

# Pre-allocate 10 MB of random bytes at startup to eliminate CPU overhead during speed tests
STATIC_RANDOM_DATA = os.urandom(10 * 1024 * 1024)

PORT = 2080
DB_PATH = '/etc/x-ui/x-ui.db'
SERVER_ADDRESS = "wmehmet.web.tr"


def format_bytes(b):
    for unit in ["B", "KB", "MB", "GB", "TB"]:
        if b < 1024:
            if unit in ["GB", "TB"]:
                return f"{b:.2f} {unit}"
            elif unit == "B":
                return f"{int(b)} {unit}"
            else:
                return f"{b:.1f} {unit}"
        b /= 1024
    return f"{b:.2f} PB"


def get_profile_info(client_row):
    remark = client_row.get("email", "")
    expiry_time = client_row.get("expiry_time", 0) or client_row.get("expiryTime", 0) or 0
    now_ms = int(time.time() * 1000)

    if expiry_time == 0:
        expiry_status = "unlimited"
        remaining_days = None
    elif expiry_time < 0:
        expiry_status = "active"
        remaining_days = abs(expiry_time) / 86400000
    elif 0 < expiry_time < 1150000000000:
        expiry_status = "active"
        remaining_days = expiry_time / 86400000
    elif expiry_time < now_ms:
        expiry_status = "expired"
        remaining_days = 0
    else:
        expiry_status = "active"
        remaining_days = max(0, (expiry_time - now_ms) // (1000 * 60 * 60 * 24))

    used_bytes = (client_row.get("up", 0) or 0) + (client_row.get("down", 0) or 0)
    total_bytes = client_row.get("total", 0) or 0

    return {
        "remark": remark,
        "expiryTime": expiry_time,
        "expiryStatus": expiry_status,
        "remainingDays": remaining_days,
        "totalGB": round(total_bytes / (1024 ** 3), 2) if total_bytes else 0,
        "usedBytes": used_bytes,
        "usedFormatted": format_bytes(used_bytes),
    }


class WebServerHandler(BaseHTTPRequestHandler):
    timeout = 10

    def log_message(self, format, *args):
        print(f"[{self.address_string()}] {format % args}")

    # ── YARDIMCI: VLESS LİNKİ OLUŞTUR ────────────────────────────────────────
    def build_vless_link(self, uuid, row_dict, stream, client):
        port = row_dict.get('port')
        inbound_remark = row_dict.get('remark', '')
        client_email = client.get('email', '')

        if inbound_remark and client_email:
            full_remark = f"{inbound_remark}-{client_email}"
        else:
            full_remark = inbound_remark or client_email or "vless"
        remark_encoded = urllib.parse.quote(full_remark)

        net_type = stream.get('network', 'tcp')
        security = stream.get('security', 'none')

        p = {"type": net_type, "security": security, "encryption": "none"}

        if security in ["tls", "xtls"]:
            tls_key = "tlsSettings" if security == "tls" else "xtlsSettings"
            tls_s = stream.get(tls_key, {})
            if tls_s.get("serverName"):
                p["sni"] = tls_s["serverName"]
            if tls_s.get("alpn"):
                p["alpn"] = ",".join(tls_s["alpn"]) if isinstance(tls_s["alpn"], list) else tls_s["alpn"]
            fp = tls_s.get("settings", {}).get("fingerprint") or tls_s.get("fingerprint")
            if fp:
                p["fp"] = fp

        if net_type == "ws":
            ws_s = stream.get("wsSettings", {})
            if ws_s.get("path"):
                p["path"] = ws_s["path"]
            host = ws_s.get("headers", {}).get("Host") or ws_s.get("host")
            if host:
                p["host"] = host
        elif net_type == "grpc":
            grpc_s = stream.get("grpcSettings", {})
            if grpc_s.get("serviceName"):
                p["serviceName"] = grpc_s["serviceName"]
        elif security == "reality" and "realitySettings" in stream:
            reality = stream["realitySettings"]
            p["pbk"] = reality.get("settings", {}).get("publicKey", "")
            snis = reality.get("serverNames", [])
            p["sni"] = snis[0] if snis else ""
            p["fp"] = reality.get("settings", {}).get("fingerprint", "chrome")
            short_ids = reality.get("shortIds", [])
            if short_ids:
                p["sid"] = short_ids[0]
            p["flow"] = client.get("flow", "xtls-rprx-vision")

        query_str = urllib.parse.urlencode(p)
        return f"vless://{uuid}@{SERVER_ADDRESS}:{port}?{query_str}#{remark_encoded}", net_type

    # ── HEAD ──────────────────────────────────────────────────────────────────
    def do_HEAD(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == '/ping':
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    # ── OPTIONS ───────────────────────────────────────────────────────────────
    def do_OPTIONS(self):
        self.send_response(200)
        origin = self.headers.get('Origin')
        if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
            self.send_header('Access-Control-Allow-Origin', origin)
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    # ── POST ──────────────────────────────────────────────────────────────────
    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == '/upload':
            content_length = int(self.headers.get('Content-Length', 0))
            # Limit reading to 10MB to prevent DoS (bandwidth/memory exhaustion)
            if content_length > 10 * 1024 * 1024:
                self.send_response(413)
                self.end_headers()
                self.wfile.write(b'{"error": "Payload too large"}')
                return
            self.rfile.read(content_length)
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            origin = self.headers.get('Origin')
            if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
                self.send_header('Access-Control-Allow-Origin', origin)
            self.end_headers()
            self.wfile.write(b'{"ok": true}')
        else:
            self.send_response(404)
            self.end_headers()

    # ── GET ───────────────────────────────────────────────────────────────────
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)

        # ── PING ──────────────────────────────────────────────────────────────
        if parsed_url.path == '/ping':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            origin = self.headers.get('Origin')
            if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
                self.send_header('Access-Control-Allow-Origin', origin)
            self.end_headers()
            self.wfile.write(b'{"ok": true}')

        # ── SPEEDTEST ─────────────────────────────────────────────────────────
        elif parsed_url.path == '/speedtest':
            params = urllib.parse.parse_qs(parsed_url.query)
            size = int(params.get('size', ['1048576'])[0])
            size = min(size, 100 * 1024 * 1024)
            self.send_response(200)
            self.send_header('Content-type', 'application/octet-stream')
            self.send_header('Content-Length', str(size))
            origin = self.headers.get('Origin')
            if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
                self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            
            chunk_size = len(STATIC_RANDOM_DATA)
            written = 0
            while written < size:
                to_write = min(chunk_size, size - written)
                self.wfile.write(STATIC_RANDOM_DATA[:to_write])
                written += to_write

        # ── ANA SAYFA (Web UI) ────────────────────────────────────────────────
        elif parsed_url.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            html = """<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>M-Proxy API</title>
    <style>
        body { font-family: sans-serif; padding: 20px; background-color: #121212; color: #ffffff; }
        .container { max-width: 500px; margin: auto; }
        input, button { width: 100%; padding: 15px; margin: 10px 0; border-radius: 8px; border: none; font-size: 16px; box-sizing: border-box; }
        input { background-color: #2c2c2c; color: white; }
        button { background-color: #007bff; color: white; font-weight: bold; cursor: pointer; }
        .result { margin-top: 20px; padding: 15px; background-color: #1e1e1e; border-radius: 8px; word-wrap: break-word; border: 1px solid #333; display: none; }
        .error { color: #ff4d4d; }
        .success { color: #4CAF50; }
        #vlessText { padding: 10px; background: #2c2c2c; border-radius: 5px; display: block; margin-bottom: 10px; font-family: monospace; font-size: 12px; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="container">
        <h2>M-Proxy API</h2>
        <input type="text" id="uuidInput" placeholder="UUID girin...">
        <button onclick="getVless()">Sorgula</button>
        <div id="result" class="result"></div>
    </div>
    <script>
        async function getVless() {
            const uuid = document.getElementById("uuidInput").value.trim();
            const resultDiv = document.getElementById("result");
            if (!uuid) { alert("UUID girin!"); return; }
            resultDiv.style.display = "block";
            resultDiv.innerHTML = "Sorgulanıyor...";
            try {
                const res = await fetch('/api?uuid=' + uuid);
                const data = await res.json();
                if (data.success) {
                    let html = '<p class="success"><strong>Kullanıcı Bulundu</strong></p>';
                    html += '<p>Email: ' + data.email + '</p>';
                    html += '<p>Abonelik: ' + (data.expiry === 0 ? 'Sinirsiz' : new Date(data.expiry).toLocaleDateString('tr-TR')) + '</p>';
                    html += '<p>Baglanti sayisi: ' + data.links.length + '</p>';
                    if (data.profile) {
                        html += '<p>Kullanici: ' + data.profile.remark + '</p>';
                        html += '<p>Kota: ' + data.profile.usedFormatted + ' / ' + (data.profile.totalGB > 0 ? data.profile.totalGB + ' GB' : 'Sinirsiz') + '</p>';
                        html += '<p>Durum: ' + data.profile.expiryStatus + '</p>';
                    }
                    data.links.forEach((l, i) => {
                        html += '<code id="vless_' + i + '">' + l.link + '</code>';
                    });
                    resultDiv.innerHTML = html;
                } else {
                    resultDiv.innerHTML = '<p class="error">' + data.message + '</p>';
                }
            } catch(e) {
                resultDiv.innerHTML = '<p class="error">Hata: ' + e.message + '</p>';
            }
        }
    </script>
</body>
</html>"""
            self.wfile.write(html.encode('utf-8'))

        # ── API: UUID SORGULAMA ───────────────────────────────────────────────
        elif parsed_url.path.startswith('/api'):
            query = parsed_url.query
            params = urllib.parse.parse_qs(query)
            uuid_to_find = params.get('uuid', [''])[0].strip()

            if uuid_to_find and is_rate_limited(uuid_to_find):
                self.send_response(429)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                origin = self.headers.get('Origin')
                if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
                    self.send_header('Access-Control-Allow-Origin', origin)
                self.end_headers()
                response_data = {"success": False, "message": "Çok fazla istek! Lütfen saniyede en fazla 5 istek gönderin. / Too many requests! Please limit to 5 requests per second."}
                self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))
                return

            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            origin = self.headers.get('Origin')
            if origin and (origin == "https://wmehmet.web.tr" or origin.endswith(".wmehmet.web.tr")):
                self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            response_data = {"success": False, "message": "Bu UUID degerine ait kullanici bulunamadi."}

            if uuid_to_find and os.path.exists(DB_PATH):
                try:
                    conn = sqlite3.connect(DB_PATH)
                    conn.row_factory = sqlite3.Row
                    cursor = conn.cursor()
                    cursor.execute("SELECT * FROM inbounds WHERE protocol='vless'")
                    rows = cursor.fetchall()

                    links_list = []
                    user_info = None
                    traffic_info = None

                    for row in rows:
                        row_dict = dict(row)
                        settings = json.loads(row_dict.get('settings', '{}'))
                        stream_key = 'stream_settings' if 'stream_settings' in row_dict else 'streamSettings'
                        stream = json.loads(row_dict.get(stream_key) or '{}')

                        for client in settings.get('clients', []):
                            if client.get('id') == uuid_to_find:
                                link, net_type = self.build_vless_link(uuid_to_find, row_dict, stream, client)
                                links_list.append({
                                    "link": link,
                                    "network": net_type,
                                    "port": row_dict.get('port'),
                                    "remark": row_dict.get('remark', ''),
                                })
                                if user_info is None:
                                    user_info = client

                    # client_traffics tablosundan trafik bilgisini cek
                    if user_info:
                        cursor2 = conn.cursor()
                        cursor2.execute(
                            "SELECT * FROM client_traffics WHERE email=?",
                            (user_info.get("email", ""),)
                        )
                        traffic_row = cursor2.fetchone()
                        if traffic_row:
                            traffic_info = dict(traffic_row)

                    conn.close()

                    if links_list and user_info:
                        profile = get_profile_info(traffic_info) if traffic_info else {
                            "remark": user_info.get("email", ""),
                            "expiryTime": user_info.get("expiryTime", 0),
                            "expiryStatus": "unlimited",
                            "remainingDays": None,
                            "totalGB": 0,
                            "usedBytes": 0,
                            "usedFormatted": "0 B",
                        }

                        response_data = {
                            "success": True,
                            "link": links_list[0]["link"],
                            "links": links_list,
                            "email": user_info.get("email", ""),
                            "comment": user_info.get("comment", ""),
                            "telegramId": str(user_info.get("tgId", "")),
                            "subId": user_info.get("subId", ""),
                            "expiry": user_info.get("expiryTime", 0),
                            "totalGB": user_info.get("totalGB", 0),
                            "profile": profile,
                        }

                except Exception as e:
                    response_data = {"success": False, "message": f"Veritabani Hatasi: {str(e)}"}

            self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()


if __name__ == '__main__':
    start_systemd_watchdog()
    print(f"API sunucusu port {PORT}'da baslatildi")
    server = ThreadedHTTPServer(('0.0.0.0', PORT), WebServerHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()

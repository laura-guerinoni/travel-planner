"""Local preview server: serves index.html with the sign-in gate bypassed
(local, non-synced mode) so the UI can be looked at without touching Firebase.
index.html on disk is never modified."""
import http.server, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8099
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=ROOT, **k)
    def do_GET(self):
        if self.path.split('?')[0] in ('/', '/index.html'):
            s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
            s = s.replace("if (location.protocol === 'http:' || location.protocol === 'https:') {\n      document.documentElement.style.visibility = 'hidden';", "if (false) {\n      document.documentElement.style.visibility = 'hidden';", 1)
            s = s.replace("var IS_HOSTED = location.protocol === 'http:' || location.protocol === 'https:';", "var IS_HOSTED = false;", 1)
            b = s.encode('utf-8')
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(b))); self.send_header('Cache-Control', 'no-store'); self.end_headers(); self.wfile.write(b)
        else: super().do_GET()
http.server.ThreadingHTTPServer(('127.0.0.1', PORT), H).serve_forever()

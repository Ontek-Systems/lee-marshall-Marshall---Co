#!/usr/bin/env python3
"""Local dev server that mimics Cloudflare Pages clean URLs (/testimonials -> testimonials.html)."""
import http.server, os, socketserver

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        local = super().translate_path(path)
        if not os.path.exists(local) and not path.rstrip('/').endswith('.html'):
            candidate = local.rstrip('/') + '.html'
            if os.path.isfile(candidate):
                return candidate
        return local

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        print(f'Serving on http://localhost:{PORT}')
        httpd.serve_forever()

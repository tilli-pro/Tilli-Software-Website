#!/usr/bin/env python3
"""
Development HTTP server for the Tilli Software website with Nudge OTP proxy endpoints.
Runs on port 8000 by default.
"""

import http.server
import socketserver
import os
import sys
import json
import uuid
import urllib.request
import urllib.error
import ssl

PORT = int(os.environ.get("PORT", "8000"))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

NUDGE_SEND_ENDPOINT = "https://app.nudge.net/api/v2/Nudge/Send"
NUDGE_VERIFY_ENDPOINT = "https://app.nudge.net/api/v1/Otp/Verify"


class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # ------------------------------------------------------------------
    # Common helpers
    # ------------------------------------------------------------------
    def end_headers(self):
        # Development-friendly CORS headers
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        # Disable caching during local development
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
        except (TypeError, ValueError):
            length = 0
        raw = self.rfile.read(length) if length else b""
        if not raw:
            return {}
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_json({"error": "Invalid JSON payload."}, status=400)
            raise

    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(204)
        self.end_headers()

    # ------------------------------------------------------------------
    # OTP endpoints
    # ------------------------------------------------------------------
    def do_POST(self):
        if self.path == "/api/nudge/send-otp":
            self.handle_send_otp()
        elif self.path == "/api/nudge/verify-otp":
            self.handle_verify_otp()
        else:
            self.send_error(404, "Endpoint not found")

    def handle_send_otp(self):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            return

        email = (payload.get("email") or "").strip()
        phone = (payload.get("phone") or "").strip()
        first_name = (payload.get("firstName") or "there").strip() or "there"
        company = (payload.get("company") or "").strip()
        preferred_channel = (payload.get("channel") or "").strip().lower()

        if not email and not phone:
            self.send_json({"error": "Email or phone number is required."}, status=400)
            return

        api_key = os.environ.get("NUDGE_API_KEY")
        if not api_key:
            self.send_json({
                "error": "NUDGE_API_KEY environment variable is not set on the server."
            }, status=500)
            return

        recipient_id = str(uuid.uuid4())
        base_request = {
            "recipientId": recipient_id,
            "senderName": payload.get("senderName", "Tilli Software"),
            "senderEmail": payload.get("senderEmail", "info@tilli.pro"),
            "replyTo": payload.get("replyTo", "tilli@nudge.net"),
            "generateOtp": True,
            "expirySeconds": payload.get("expirySeconds", 300),
            "otpLength": payload.get("otpLength", 6),
            "channel": 0,
            "template": {
                "subject": payload.get("subject", "Your Tilli Demo OTP"),
                "bodyHtml": "",
                "bodyPlain": ""
            }
        }

        if email and (preferred_channel in ("", "email", "mail")):
            base_request["toEmailAddress"] = email
            message = (
                f"Hello {first_name}, your Tilli demo verification code is %OTP%. "
                "It expires in 5 minutes."
            )
            if company:
                message += f" Requested by {company}."
            base_request["template"]["bodyPlain"] = message
        elif phone:
            base_request["channel"] = 1
            base_request["toPhoneNumber"] = phone
            base_request["senderNumber"] = payload.get("senderNumber", "18334561408")
            base_request["template"]["bodyPlain"] = (
                "Tilli demo verification code: %OTP%. Valid for 5 minutes."
            )
        else:
            self.send_json({"error": "Unable to determine delivery channel."}, status=400)
            return

        try:
            response_data = self._forward_to_nudge(NUDGE_SEND_ENDPOINT, base_request, api_key)
        except urllib.error.HTTPError as exc:
            self._handle_http_error(exc, "Failed to send OTP via Nudge.")
            return
        except Exception as exc:  # pylint: disable=broad-except
            self.send_json({"error": "Unexpected error contacting Nudge.", "details": str(exc)}, status=500)
            return

        session_id = response_data.get("OtpSessionId")
        expires_at = response_data.get("ExpiresAt")

        if not session_id:
            self.send_json({
                "error": "OTP session id missing from Nudge response. Please retry once the service issue is resolved.",
                "nudgeResponse": response_data
            }, status=502)
            return

        self.send_json({
            "success": True,
            "sessionId": session_id,
            "expiresAt": expires_at,
            "notificationLogId": response_data.get("NotificationLogId")
        })

    def handle_verify_otp(self):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            return

        session_id = payload.get("sessionId") or payload.get("OtpSessionId")
        code = payload.get("code")

        if not session_id or not code:
            self.send_json({"error": "Both sessionId and code are required."}, status=400)
            return

        api_key = os.environ.get("NUDGE_API_KEY")
        if not api_key:
            self.send_json({
                "error": "NUDGE_API_KEY environment variable is not set on the server."
            }, status=500)
            return

        verify_request = {
            "OtpSessionId": session_id,
            "code": str(code)
        }

        try:
            response_data = self._forward_to_nudge(NUDGE_VERIFY_ENDPOINT, verify_request, api_key)
        except urllib.error.HTTPError as exc:
            self._handle_http_error(exc, "Failed to verify OTP via Nudge.")
            return
        except Exception as exc:  # pylint: disable=broad-except
            self.send_json({"error": "Unexpected error contacting Nudge.", "details": str(exc)}, status=500)
            return

        if response_data.get("HasErrors"):
            self.send_json({"error": "OTP verification failed.", "details": response_data}, status=400)
            return

        self.send_json({"success": True, "details": response_data})

    # ------------------------------------------------------------------
    # Proxy helper
    # ------------------------------------------------------------------
    def _forward_to_nudge(self, url, payload, api_key):
        request_data = json.dumps(payload).encode("utf-8")
        headers = {
            "Content-Type": "application/json",
            "accept": "application/json, text/plain, */*",
            "Authorization": api_key
        }
        request = urllib.request.Request(url, data=request_data, headers=headers, method="POST")
        context = ssl.create_default_context()
        with urllib.request.urlopen(request, context=context, timeout=20) as response:
            body = response.read().decode("utf-8")
            return json.loads(body) if body else {}

    def _handle_http_error(self, exc, message):
        try:
            details = exc.read().decode("utf-8")
            parsed = json.loads(details)
        except Exception:  # pylint: disable=broad-except
            parsed = details if details else str(exc)
        self.send_json({"error": message, "details": parsed}, status=exc.code)


def run_server():
    handler = MyHTTPRequestHandler

    try:
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            print(f"\n✨ Tilli Software website is running!")
            print(f"🌐 Access at: http://localhost:{PORT}")
            print(f"📂 Serving from: {DIRECTORY}")
            print("\nPress Ctrl+C to stop the server\n")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped")
        sys.exit(0)
    except OSError as exc:
        if exc.errno == 48:
            print(f"\n❌ Error: Port {PORT} is already in use")
            print("Try a different port or stop the existing server")
        else:
            print(f"\n❌ Error: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    os.chdir(DIRECTORY)
    run_server()

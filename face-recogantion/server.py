import threading
from typing import Optional

from flask import Flask, jsonify, request
from flask_cors import CORS

from main import AIProctoringSystem


class WebAIProctoringSystem(AIProctoringSystem):
    """Non-interactive wrapper around AIProctoringSystem for web usage."""

    def show_consent_screen(self) -> bool:  # type: ignore[override]
        # Consent is handled on the website UI.
        print("[WEB] Consent assumed granted from web client.")
        return True

    def setup_student(self):  # type: ignore[override]
        # For web usage, assume a single registered student already exists.
        if not self.registration.is_student_registered():
            print("[WEB] No registered student found. Please run registration flow first.")
            raise RuntimeError("Student not registered in encodings/student.pkl")

        student_data = self.registration.load_student_encoding()
        if not student_data:
            raise RuntimeError("Failed to load registered student encoding")

        self.student_name = student_data.get("name", "Student")
        self.student_id = student_data.get("id", "ID")
        print(f"[WEB] Loaded student: {self.student_name} (ID: {self.student_id})")

    def perform_liveness_check(self) -> bool:  # type: ignore[override]
        # Use a fixed blink-based liveness check for web-triggered sessions.
        from liveness import LivenessDetector

        print("[WEB] Starting blink-based liveness check...")
        self.liveness_detector = LivenessDetector()

        result = self.liveness_detector.perform_liveness_check(
            self.camera_index, "blink"
        )

        self.liveness_detector.release()

        if result:
            print("[WEB] Liveness check passed.")
            return True

        print("[WEB] Liveness check failed.")
        return False


app = Flask(__name__)
CORS(app)

_session_lock = threading.Lock()
_session_thread: Optional[threading.Thread] = None
_session_running: bool = False
_last_error: Optional[str] = None


def _run_session(camera_index: int = 0):
    global _session_running, _last_error
    try:
        system = WebAIProctoringSystem(camera_index=camera_index)
        _session_running = True
        _last_error = None
        system.run()
    except Exception as e:  # noqa: BLE001
        _last_error = str(e)
        print(f"[WEB] Proctoring session error: {e}")
    finally:
        _session_running = False
        print("[WEB] Proctoring session ended.")


@app.route("/start-proctor", methods=["POST"])
def start_proctor():
    """Start a proctoring session in the background if not already running."""
    global _session_thread

    with _session_lock:
        if _session_running:
            return jsonify({"success": True, "status": "already_running"})

        camera_index = 0
        try:
            payload = request.get_json(silent=True) or {}
            if "camera_index" in payload:
                camera_index = int(payload["camera_index"])
        except Exception:  # noqa: BLE001
            camera_index = 0

        _session_thread = threading.Thread(
            target=_run_session, args=(camera_index,), daemon=True
        )
        _session_thread.start()

        return jsonify({"success": True, "status": "started"})


@app.route("/status", methods=["GET"])
def status():
    """Return current status of the proctoring session."""
    return jsonify(
        {
            "running": _session_running,
            "last_error": _last_error,
        }
    )


if __name__ == "__main__":
    # Run the Flask server for local development.
    app.run(host="127.0.0.1", port=5001, debug=False)


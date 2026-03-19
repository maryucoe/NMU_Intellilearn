import os
import threading
import time
from typing import Optional

import cv2
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

_lock = threading.Lock()
_thread: Optional[threading.Thread] = None
_stop_event = threading.Event()

# Shared status (read by /status)
_running = False
_suspicious = False
_risk_score = 0
_last_message: Optional[str] = None
_last_face_count: Optional[int] = None


def _haar_path() -> str:
    base_dir = os.path.dirname(__file__)
    return os.path.join(
        base_dir,
        "Real-time-Face-Recognition-Project-main",
        "haarcascade_frontalface_alt.xml",
    )


def _run_proctor(camera_index: int, no_face_threshold_frames: int, multi_face_threshold_frames: int):
    global _running, _suspicious, _risk_score, _last_message, _last_face_count

    haar_path = _haar_path()
    face_cascade = cv2.CascadeClassifier(haar_path)
    if face_cascade.empty():
        _last_message = f"Failed to load Haar cascade at {haar_path}"
        _suspicious = True
        _risk_score = 100
        _running = False
        return

    cap = cv2.VideoCapture(camera_index)
    if not cap.isOpened():
        _last_message = f"Could not open camera index {camera_index}"
        _suspicious = True
        _risk_score = 100
        _running = False
        return

    _risk_score = 0
    _suspicious = False
    _last_message = None

    no_face_frames = 0
    multi_face_frames = 0

    # quick stabilization
    time.sleep(0.5)

    while not _stop_event.is_set():
        ret, frame = cap.read()
        if not ret:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        face_count = len(faces)
        _last_face_count = face_count

        if face_count == 0:
            no_face_frames += 1
            multi_face_frames = 0
            if no_face_frames >= no_face_threshold_frames:
                _suspicious = True
                _risk_score = 100
                _last_message = "No face detected for too long."
                break
        elif face_count > 1:
            multi_face_frames += 1
            no_face_frames = 0
            if multi_face_frames >= multi_face_threshold_frames:
                _suspicious = True
                _risk_score = 100
                _last_message = "Multiple faces detected."
                break
        else:
            # Exactly one face resets the counters
            no_face_frames = 0
            multi_face_frames = 0

        # Throttle a bit (avoid maxing CPU)
        time.sleep(0.03)

    cap.release()
    _running = False


@app.route("/start-proctor", methods=["POST"])
def start_proctor():
    global _thread, _running, _stop_event
    payload = request.get_json(silent=True) or {}

    camera_index = int(payload.get("camera_index", 0))
    # Approximate thresholds:
    # - loop sleeps ~0.03s, so 30 frames ~= 0.9s
    # These defaults are deliberately lenient to avoid false positives.
    no_face_threshold_frames = int(payload.get("no_face_threshold_frames", 30))
    multi_face_threshold_frames = int(payload.get("multi_face_threshold_frames", 10))

    with _lock:
        if _running:
            return jsonify({"success": True, "status": "already_running"})

        _stop_event.clear()
        _running = True
        # Reset status
        global _suspicious, _risk_score, _last_message, _last_face_count
        _suspicious = False
        _risk_score = 0
        _last_message = None
        _last_face_count = None

        _thread = threading.Thread(
            target=_run_proctor,
            args=(camera_index, no_face_threshold_frames, multi_face_threshold_frames),
            daemon=True,
        )
        _thread.start()

    return jsonify({"success": True, "status": "started"})


@app.route("/stop-proctor", methods=["POST"])
def stop_proctor():
    global _running
    with _lock:
        _stop_event.set()
        _running = False
    return jsonify({"success": True, "status": "stopping"})


@app.route("/status", methods=["GET"])
def status():
    return jsonify(
        {
            "running": _running,
            "suspicious": _suspicious,
            "risk_score": _risk_score,
            "last_message": _last_message,
            "last_face_count": _last_face_count,
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=False)


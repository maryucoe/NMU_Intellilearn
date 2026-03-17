import cv2
import sys
import time
from datetime import datetime, timedelta
from typing import Optional

from register import StudentRegistration
from verification import IdentityVerifier
from pose_tracking import HeadPoseTracker
from liveness import LivenessDetector
from risk_engine import RiskEngine
from logger import ProctoringLogger
from report import ReportGenerator


class AIProctoringSystem:

    def __init__(self, camera_index: int = 0):
        self.camera_index = camera_index
        self.registration = StudentRegistration()
        self.risk_engine = RiskEngine()
        self.logger = ProctoringLogger()
        self.report_generator = ReportGenerator()

        self.verifier: Optional[IdentityVerifier] = None
        self.pose_tracker: Optional[HeadPoseTracker] = None
        self.liveness_detector: Optional[LivenessDetector] = None

        self.student_name = ""
        self.student_id = ""
        self.session_start_time: Optional[datetime] = None
        self.is_running = False

    def show_consent_screen(self) -> bool:
        print("\n" + "=" * 80)
        print("AI PROCTORING SYSTEM - CONSENT SCREEN")
        print("=" * 80)
        print("\nThis session will be monitored for academic integrity purposes.")
        print("The system will track:")
        print("  - Your identity verification")
        print("  - Head pose and attention")
        print("  - Multiple face detection")
        print("  - Suspicious behaviors")
        print("\nAll activities will be logged for review.")
        print("\n" + "=" * 80)

        while True:
            consent = input("\nDo you consent to be monitored? (Y/N): ").strip().upper()
            if consent == 'Y':
                print("\nConsent granted. Proceeding to exam setup...")
                return True
            elif consent == 'N':
                print("\nConsent denied. Exiting system.")
                return False
            else:
                print("Invalid input. Please enter 'Y' for Yes or 'N' for No.")

    def setup_student(self):
        if not self.registration.is_student_registered():
            print("\n=== Student Registration Required ===")
            student_name = input("Enter student name: ").strip()
            student_id = input("Enter student ID: ").strip()

            if not student_name or not student_id:
                print("Error: Name and ID are required.")
                sys.exit(1)

            if not self.registration.register_student(student_name, student_id, self.camera_index):
                print("Registration failed. Exiting.")
                sys.exit(1)

            self.student_name = student_name
            self.student_id = student_id
        else:
            print("\n=== Loading Registered Student ===")
            student_data = self.registration.load_student_encoding()
            if student_data:
                self.student_name = student_data["name"]
                self.student_id = student_data["id"]
                print(f"Loaded: {self.student_name} (ID: {self.student_id})")
            else:
                print("Error: Could not load student data.")
                sys.exit(1)

    def perform_liveness_check(self) -> bool:
        print("\n=== Pre-Exam Liveness Check ===")
        print("Choose liveness check method:")
        print("1. Blink detection")
        print("2. Head movement (left-right)")

        choice = input("Enter choice (1 or 2): ").strip()
        self.liveness_detector = LivenessDetector()

        if choice == "1":
            result = self.liveness_detector.perform_liveness_check(
                self.camera_index, "blink"
            )
        elif choice == "2":
            result = self.liveness_detector.perform_liveness_check(
                self.camera_index, "head_movement"
            )
        else:
            print("Invalid choice. Using blink detection by default.")
            result = self.liveness_detector.perform_liveness_check(
                self.camera_index, "blink"
            )

        self.liveness_detector.release()

        if result:
            print("Liveness check passed!")
            return True
        else:
            print("Liveness check failed. Exam cannot start.")
            return False

    def draw_overlay(self, frame, session_duration: float):
        h, w = frame.shape[:2]

        risk_level, is_high_risk, status_text = self.risk_engine.get_risk_status()
        summary = self.risk_engine.get_summary()

        overlay = frame.copy()
        cv2.rectangle(overlay, (10, 10), (w - 10, 200), (0, 0, 0), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)

        cv2.putText(frame, f"Student: {self.student_name}", (20, 35),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        minutes = int(session_duration // 60)
        seconds = int(session_duration % 60)
        timer_text = f"Time: {minutes:02d}:{seconds:02d}"
        cv2.putText(frame, timer_text, (20, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        risk_color = (0, 0, 255) if is_high_risk else (0, 255, 0) if risk_level < 50 else (0, 165, 255)
        risk_text = f"Risk Level: {risk_level}% - {status_text}"
        cv2.putText(frame, risk_text, (20, 85),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, risk_color, 2)

        cv2.putText(frame, f"Warnings: {summary['total_warnings']}", (20, 110),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        violations = summary['violations']
        y_offset = 135
        if violations['no_face'] > 0:
            cv2.putText(frame, f"No Face: {violations['no_face']}", (20, y_offset),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
            y_offset += 20
        if violations['multiple_faces'] > 0:
            cv2.putText(frame, f"Multiple Faces: {violations['multiple_faces']}", (20, y_offset),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
            y_offset += 20
        if violations['looking_away'] > 0:
            cv2.putText(frame, f"Looking Away: {violations['looking_away']}", (20, y_offset),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
            y_offset += 20
        if violations['identity_mismatch'] > 0:
            cv2.putText(frame, f"Identity Mismatch: {violations['identity_mismatch']}", (20, y_offset),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

        if is_high_risk:
            cv2.rectangle(frame, (w // 2 - 200, h // 2 - 30),
                          (w // 2 + 200, h // 2 + 30), (0, 0, 255), 3)
            cv2.putText(frame, "HIGH RISK ALERT!", (w // 2 - 150, h // 2 + 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 3)

    def run(self):
        print("\n" + "=" * 80)
        print("AI PROCTORING SYSTEM - ACADEMIC RESEARCH PROTOTYPE")
        print("=" * 80)

        if not self.show_consent_screen():
            return

        self.setup_student()

        if not self.perform_liveness_check():
            return

        print("\nSystem Ready.")


def main():
    try:
        system = AIProctoringSystem(camera_index=0)
        system.run()
    except KeyboardInterrupt:
        print("\n\nSystem interrupted by user.")
        sys.exit(0)
    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
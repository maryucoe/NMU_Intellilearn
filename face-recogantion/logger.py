import os
from datetime import datetime
from typing import Optional


class ProctoringLogger:

    def __init__(self, log_file: str = "logs/exam_log.txt"):
        self.log_file = log_file
        self._ensure_log_directory()

    def _ensure_log_directory(self):
        log_dir = os.path.dirname(self.log_file)
        if log_dir and not os.path.exists(log_dir):
            os.makedirs(log_dir, exist_ok=True)

    def log_event(self, event_type: str, duration: Optional[float] = None,
                  risk_points: int = 0, details: Optional[str] = None):

        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        log_entry = f"[{timestamp}] - {event_type}"

        if duration is not None:
            log_entry += f" - Duration: {duration:.2f}s"

        if risk_points > 0:
            log_entry += f" - Risk Points Added: {risk_points}"

        if details:
            log_entry += f" - Details: {details}"

        log_entry += "\n"

        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception as e:
            print(f"Error writing to log file: {e}")

    def log_session_start(self, student_name: str, student_id: str):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] - SESSION START - Student: {student_name} (ID: {student_id})\n"

        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception as e:
            print(f"Error writing to log file: {e}")

    def log_session_end(self, total_risk_score: int, total_warnings: int):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] - SESSION END - Total Risk Score: {total_risk_score}, Total Warnings: {total_warnings}\n"
        log_entry += "=" * 80 + "\n"

        try:
            with open(self.log_file, "a", encoding="utf-8") as f:
                f.write(log_entry)
        except Exception as e:
            print(f"Error writing to log file: {e}")

    def clear_log(self):
        try:
            with open(self.log_file, "w", encoding="utf-8") as f:
                f.write("")
        except Exception as e:
            print(f"Error clearing log file: {e}")
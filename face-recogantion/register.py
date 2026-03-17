import os
import pickle
import cv2
import face_recognition
from typing import Optional, Tuple


class StudentRegistration:

    def __init__(self, encodings_dir: str = "encodings"):
        self.encodings_dir = encodings_dir
        self._ensure_directory()

    def _ensure_directory(self):
        if not os.path.exists(self.encodings_dir):
            os.makedirs(self.encodings_dir, exist_ok=True)

    def capture_face(self, camera_index: int = 0) -> Optional[Tuple[list, cv2.Mat]]:
        cap = cv2.VideoCapture(camera_index)

        if not cap.isOpened():
            print(f"Error: Could not open camera {camera_index}")
            return None

        print("Position your face in the center of the frame.")
        print("Press SPACE to capture, ESC to cancel.")

        face_encoding = None
        frame = None

        while True:
            ret, frame = cap.read()
            if not ret:
                print("Error: Could not read frame from camera")
                break

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            face_locations = face_recognition.face_locations(rgb_frame)
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            if face_locations:
                top, right, bottom, left = face_locations[0]
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(frame, "Face Detected - Press SPACE", (left, top - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            else:
                cv2.putText(frame, "No Face Detected", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

            cv2.imshow("Student Registration - Capture Face", frame)

            key = cv2.waitKey(1) & 0xFF
            if key == ord(' '):
                if face_encodings:
                    face_encoding = face_encodings[0]
                    print("Face captured successfully!")
                    break
                else:
                    print("No face detected. Please try again.")
            elif key == 27:
                print("Registration cancelled.")
                cap.release()
                cv2.destroyAllWindows()
                return None

        cap.release()
        cv2.destroyAllWindows()

        if face_encoding is not None:
            return face_encoding, frame
        return None

    def register_student(self, student_name: str, student_id: str,
                         camera_index: int = 0) -> bool:

        print(f"\n=== Registering Student: {student_name} (ID: {student_id}) ===")

        result = self.capture_face(camera_index)
        if result is None:
            return False

        face_encoding, _ = result

        encoding_file = os.path.join(self.encodings_dir, "student.pkl")

        student_data = {
            "name": student_name,
            "id": student_id,
            "encoding": face_encoding
        }

        try:
            with open(encoding_file, "wb") as f:
                pickle.dump(student_data, f)
            print(f"Student registered successfully! Encoding saved to {encoding_file}")
            return True
        except Exception as e:
            print(f"Error saving encoding: {e}")
            return False

    def load_student_encoding(self) -> Optional[dict]:
        encoding_file = os.path.join(self.encodings_dir, "student.pkl")

        if not os.path.exists(encoding_file):
            return None

        try:
            with open(encoding_file, "rb") as f:
                student_data = pickle.load(f)
            return student_data
        except Exception as e:
            print(f"Error loading encoding: {e}")
            return None

    def is_student_registered(self) -> bool:
        return self.load_student_encoding() is not None
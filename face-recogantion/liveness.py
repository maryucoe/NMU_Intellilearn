import cv2
import mediapipe as mp
import numpy as np
from typing import Optional, Tuple


class LivenessDetector:

    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

        self.LEFT_EYE_INDICES = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
        self.RIGHT_EYE_INDICES = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]

        self.nose_tip_index = 1
        self.previous_nose_position = None
        self.head_movement_threshold = 0.1

    def calculate_eye_aspect_ratio(self, landmarks, eye_indices, img_w, img_h):
        eye_points = []
        for idx in eye_indices:
            landmark = landmarks[idx]
            x = landmark.x * img_w
            y = landmark.y * img_h
            eye_points.append([x, y])

        eye_points = np.array(eye_points)

        vertical_1 = np.linalg.norm(eye_points[1] - eye_points[5])
        vertical_2 = np.linalg.norm(eye_points[2] - eye_points[4])
        horizontal = np.linalg.norm(eye_points[0] - eye_points[3])

        if horizontal == 0:
            return 0.0

        ear = (vertical_1 + vertical_2) / (2.0 * horizontal)
        return ear

    def detect_blink(self, frame: np.ndarray) -> Tuple[bool, float]:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if not results.multi_face_landmarks:
            return False, 0.0

        landmarks = results.multi_face_landmarks[0].landmark
        h, w = frame.shape[:2]

        left_ear = self.calculate_eye_aspect_ratio(landmarks, self.LEFT_EYE_INDICES, w, h)
        right_ear = self.calculate_eye_aspect_ratio(landmarks, self.RIGHT_EYE_INDICES, w, h)

        ear = (left_ear + right_ear) / 2.0
        blink_threshold = 0.25
        blink_detected = ear < blink_threshold

        return blink_detected, ear

    def detect_head_movement(self, frame: np.ndarray) -> Tuple[bool, Optional[str]]:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if not results.multi_face_landmarks:
            return False, None

        landmarks = results.multi_face_landmarks[0].landmark
        h, w = frame.shape[:2]

        nose = landmarks[self.nose_tip_index]
        nose_x = nose.x
        nose_y = nose.y

        if self.previous_nose_position is None:
            self.previous_nose_position = (nose_x, nose_y)
            return False, None

        dx = nose_x - self.previous_nose_position[0]
        dy = nose_y - self.previous_nose_position[1]

        if abs(dx) > self.head_movement_threshold:
            direction = 'right' if dx > 0 else 'left'
            self.previous_nose_position = (nose_x, nose_y)
            return True, direction

        self.previous_nose_position = (nose_x, nose_y)
        return False, None

    def perform_liveness_check(self, camera_index: int = 0,
                               check_type: str = "blink") -> bool:
        cap = cv2.VideoCapture(camera_index)

        if not cap.isOpened():
            print(f"Error: Could not open camera {camera_index}")
            return False

        print(f"\n=== Liveness Check: {check_type.upper()} ===")

        if check_type == "blink":
            print("Please blink once when ready.")
            blink_detected = False
            consecutive_low_ear = 0
            ear_threshold_low = 0.25
            ear_threshold_high = 0.30

            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                blink_det, ear = self.detect_blink(frame)

                cv2.putText(frame, "Blink once to continue", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(frame, f"EAR: {ear:.3f}", (10, 60),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

                if ear < ear_threshold_low:
                    consecutive_low_ear += 1
                elif ear > ear_threshold_high and consecutive_low_ear > 3:
                    blink_detected = True
                    break
                else:
                    consecutive_low_ear = 0

                cv2.imshow("Liveness Check - Blink", frame)

                if cv2.waitKey(1) & 0xFF == 27:
                    break

        elif check_type == "head_movement":
            print("Please turn your head left and right.")
            left_detected = False
            right_detected = False

            while True:
                ret, frame = cap.read()
                if not ret:
                    break

                movement, direction = self.detect_head_movement(frame)

                status_text = "Turn head left and right"
                if left_detected and right_detected:
                    status_text = "Liveness verified!"

                cv2.putText(frame, status_text, (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

                if movement:
                    if direction == 'left':
                        left_detected = True
                    elif direction == 'right':
                        right_detected = True

                if left_detected and right_detected:
                    blink_detected = True
                    cv2.waitKey(1000)
                    break

                cv2.imshow("Liveness Check - Head Movement", frame)

                if cv2.waitKey(1) & 0xFF == 27:
                    break

        cap.release()
        cv2.destroyAllWindows()

        if check_type == "blink":
            return blink_detected
        else:
            return left_detected and right_detected

    def release(self):
        self.face_mesh.close()
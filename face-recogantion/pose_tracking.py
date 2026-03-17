import cv2
import mediapipe as mp
import numpy as np
from typing import Optional, Tuple


class HeadPoseTracker:

    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils

        self.landmark_indices = {
            'nose_tip': 1,
            'chin': 175,
            'left_eye': 33,
            'right_eye': 263,
            'left_mouth': 61,
            'right_mouth': 291
        }

    def detect_pose(self, frame: np.ndarray) -> Tuple[Optional[str], bool]:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_frame)

        if not results.multi_face_landmarks:
            return None, False

        landmarks = results.multi_face_landmarks[0].landmark
        h, w = frame.shape[:2]

        try:
            nose = landmarks[self.landmark_indices['nose_tip']]
            left_eye = landmarks[self.landmark_indices['left_eye']]
            right_eye = landmarks[self.landmark_indices['right_eye']]
            left_mouth = landmarks[self.landmark_indices['left_mouth']]
            right_mouth = landmarks[self.landmark_indices['right_mouth']]

            nose_pt = (int(nose.x * w), int(nose.y * h))
            left_eye_pt = (int(left_eye.x * w), int(left_eye.y * h))
            right_eye_pt = (int(right_eye.x * w), int(right_eye.y * h))
            left_mouth_pt = (int(left_mouth.x * w), int(left_mouth.y * h))
            right_mouth_pt = (int(right_mouth.x * w), int(right_mouth.y * h))

            eye_center_x = (left_eye_pt[0] + right_eye_pt[0]) / 2
            eye_center_y = (left_eye_pt[1] + right_eye_pt[1]) / 2

            mouth_center_x = (left_mouth_pt[0] + right_mouth_pt[0]) / 2
            mouth_center_y = (left_mouth_pt[1] + right_mouth_pt[1]) / 2

            face_center_x = (eye_center_x + mouth_center_x) / 2
            face_center_y = (eye_center_y + mouth_center_y) / 2

            frame_center_x = w / 2
            frame_center_y = h / 2

            offset_x = face_center_x - frame_center_x
            offset_y = face_center_y - frame_center_y

            normalized_offset_x = offset_x / (w / 2)
            normalized_offset_y = offset_y / (h / 2)

            threshold_lateral = 0.15
            threshold_vertical = 0.20

            direction = None
            is_looking_away = False

            if abs(normalized_offset_x) > threshold_lateral:
                if normalized_offset_x > 0:
                    direction = 'right'
                    is_looking_away = True
                else:
                    direction = 'left'
                    is_looking_away = True
            elif normalized_offset_y > threshold_vertical:
                direction = 'down'
                is_looking_away = True
            else:
                direction = 'center'
                is_looking_away = False

            return direction, is_looking_away

        except (KeyError, IndexError):
            return None, False

    def release(self):
        self.face_mesh.close()
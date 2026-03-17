
import cv2
import face_recognition
import numpy as np
from typing import Optional, Tuple


class IdentityVerifier:
  
    
    def __init__(self, registered_encoding: np.ndarray, tolerance: float = 0.6):
     
        self.registered_encoding = registered_encoding
        self.tolerance = tolerance
        self.consecutive_mismatches = 0
        self.mismatch_threshold = 3  # Require 3 consecutive mismatches to trigger warning
    
    def verify_frame(self, frame: np.ndarray) -> Tuple[bool, Optional[dict]]:
       
        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Find face locations
        face_locations = face_recognition.face_locations(rgb_frame)
        
        if not face_locations:
            return False, None
        
        # Get encodings for all detected faces
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
        
        if not face_encodings:
            return False, None
        
        # Compare with registered encoding
        # Use the first detected face
        face_encoding = face_encodings[0]
        face_location = face_locations[0]
        
        # Calculate face distance
        face_distance = face_recognition.face_distance(
            [self.registered_encoding], face_encoding
        )[0]
        
        # Check if match
        is_match = face_distance <= self.tolerance
        
        face_info = {
            "location": face_location,
            "encoding": face_encoding,
            "distance": face_distance,
            "is_match": is_match
        }
        
        if is_match:
            self.consecutive_mismatches = 0
        else:
            self.consecutive_mismatches += 1
        
        # Only return mismatch if we have consecutive mismatches
        if not is_match and self.consecutive_mismatches >= self.mismatch_threshold:
            return False, face_info
        
        return True, face_info
    
    def count_faces(self, frame: np.ndarray) -> int:
        """
        Count the number of faces in a frame.
        
        Args:
            frame: BGR frame from webcam
            
        Returns:
            Number of faces detected
        """
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)
        return len(face_locations)

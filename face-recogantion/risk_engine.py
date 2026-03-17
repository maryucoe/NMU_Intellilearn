

from typing import Dict
from datetime import datetime, timedelta


class RiskEngine:
  
    RISK_NO_FACE = 10
    RISK_MULTIPLE_FACES = 30
    RISK_LOOKING_AWAY = 15
    RISK_IDENTITY_MISMATCH = 40
    HIGH_RISK_THRESHOLD = 70
    
    def __init__(self):
        """Initialize the risk engine with empty state."""
        self.total_risk_score = 0
        self.violations: Dict[str, int] = {
            "no_face": 0,
            "multiple_faces": 0,
            "looking_away": 0,
            "identity_mismatch": 0
        }
        self.warning_count = 0
        self.session_start_time = None
        self.looking_away_start = None
        self.looking_away_threshold = 5.0  # seconds
    
    def start_session(self):
        """Mark the start of an exam session."""
        self.session_start_time = datetime.now()
        self.total_risk_score = 0
        self.violations = {
            "no_face": 0,
            "multiple_faces": 0,
            "looking_away": 0,
            "identity_mismatch": 0
        }
        self.warning_count = 0
    
    def add_no_face(self):
        """
        Add risk points for no face detected.
        Returns the risk points added.
        """
        self.total_risk_score += self.RISK_NO_FACE
        self.violations["no_face"] += 1
        self.warning_count += 1
        return self.RISK_NO_FACE
    
    def add_multiple_faces(self):
        """
        Add risk points for multiple faces detected.
        Returns the risk points added.
        """
        self.total_risk_score += self.RISK_MULTIPLE_FACES
        self.violations["multiple_faces"] += 1
        self.warning_count += 1
        return self.RISK_MULTIPLE_FACES
    
    def start_looking_away(self):
        """Mark the start of looking away behavior."""
        if self.looking_away_start is None:
            self.looking_away_start = datetime.now()
    
    def stop_looking_away(self):
        """Stop tracking looking away and add risk if threshold exceeded."""
        if self.looking_away_start is not None:
            duration = (datetime.now() - self.looking_away_start).total_seconds()
            if duration >= self.looking_away_threshold:
                self.total_risk_score += self.RISK_LOOKING_AWAY
                self.violations["looking_away"] += 1
                self.warning_count += 1
                self.looking_away_start = None
                return self.RISK_LOOKING_AWAY, duration
            self.looking_away_start = None
        return 0, 0
    
    def add_identity_mismatch(self):
        """
        Add risk points for identity mismatch.
        Returns the risk points added.
        """
        self.total_risk_score += self.RISK_IDENTITY_MISMATCH
        self.violations["identity_mismatch"] += 1
        self.warning_count += 1
        return self.RISK_IDENTITY_MISMATCH
    
    def get_risk_level(self) -> int:
        """
        Calculate risk level as a percentage (0-100).
        Uses a maximum possible score of 100 for normalization.
        """
        # Normalize to 0-100 scale (assuming max possible score of 100)
        # In a real scenario, you might want to adjust this based on session duration
        max_possible_score = 100
        risk_level = min(100, int((self.total_risk_score / max_possible_score) * 100))
        return risk_level
    
    def get_risk_status(self) -> tuple:
        """
        Get current risk status.
        Returns: (risk_level, is_high_risk, status_text)
        """
        risk_level = self.get_risk_level()
        is_high_risk = risk_level >= self.HIGH_RISK_THRESHOLD
        
        if is_high_risk:
            status_text = "HIGH RISK"
        elif risk_level >= 50:
            status_text = "MODERATE RISK"
        else:
            status_text = "LOW RISK"
        
        return risk_level, is_high_risk, status_text
    
    def get_summary(self) -> Dict:
        """
        Get a summary of the risk assessment.
        Returns a dictionary with all relevant statistics.
        """
        risk_level, is_high_risk, status_text = self.get_risk_status()
        
        return {
            "total_risk_score": self.total_risk_score,
            "risk_level": risk_level,
            "is_high_risk": is_high_risk,
            "status_text": status_text,
            "total_warnings": self.warning_count,
            "violations": self.violations.copy()
        }

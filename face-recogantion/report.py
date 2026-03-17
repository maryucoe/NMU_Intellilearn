
import os
from datetime import datetime
from typing import Dict
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend


class ReportGenerator:

    def __init__(self, reports_dir: str = "reports"):
        
        self.reports_dir = reports_dir
        self._ensure_directory()
    
    def _ensure_directory(self):
        if not os.path.exists(self.reports_dir):
            os.makedirs(self.reports_dir, exist_ok=True)
    
    def generate_text_report(self, session_data: Dict, student_name: str, 
                           student_id: str) -> str:
     
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        report_file = os.path.join(self.reports_dir, f"session_report_{timestamp}.txt")
        
        violations = session_data.get("violations", {})
        total_risk_score = session_data.get("total_risk_score", 0)
        risk_level = session_data.get("risk_level", 0)
        total_warnings = session_data.get("total_warnings", 0)
        session_duration = session_data.get("session_duration", 0)
        
        report_content = f"""
{'='*80}
AI PROCTORING SYSTEM - EXAM SESSION REPORT
{'='*80}

Session Information:
-------------------
Student Name: {student_name}
Student ID: {student_id}
Session Date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Session Duration: {session_duration:.2f} seconds ({session_duration/60:.2f} minutes)

Risk Assessment:
----------------
Total Risk Score: {total_risk_score}
Risk Level: {risk_level}%
Status: {session_data.get('status_text', 'UNKNOWN')}

Violations Summary:
------------------
No Face Detected: {violations.get('no_face', 0)} occurrences
Multiple Faces Detected: {violations.get('multiple_faces', 0)} occurrences
Looking Away: {violations.get('looking_away', 0)} occurrences
Identity Mismatch: {violations.get('identity_mismatch', 0)} occurrences

Total Warnings: {total_warnings}

Detailed Violation Breakdown:
-----------------------------
"""
        
        # Add detailed breakdown
        if violations.get('no_face', 0) > 0:
            report_content += f"- No Face Detected: {violations['no_face']} times\n"
            report_content += f"  Risk Points: {violations['no_face'] * 10}\n"
        
        if violations.get('multiple_faces', 0) > 0:
            report_content += f"- Multiple Faces Detected: {violations['multiple_faces']} times\n"
            report_content += f"  Risk Points: {violations['multiple_faces'] * 30}\n"
        
        if violations.get('looking_away', 0) > 0:
            report_content += f"- Looking Away (>5s): {violations['looking_away']} times\n"
            report_content += f"  Risk Points: {violations['looking_away'] * 15}\n"
        
        if violations.get('identity_mismatch', 0) > 0:
            report_content += f"- Identity Mismatch: {violations['identity_mismatch']} times\n"
            report_content += f"  Risk Points: {violations['identity_mismatch'] * 40}\n"
        
        report_content += f"""
{'='*80}
Report Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
{'='*80}
"""
        
        try:
            with open(report_file, "w", encoding="utf-8") as f:
                f.write(report_content)
            print(f"Text report saved to: {report_file}")
            return report_file
        except Exception as e:
            print(f"Error generating text report: {e}")
            return ""
    
    def generate_chart(self, session_data: Dict, student_name: str) -> str:
        """
        Generate a bar chart visualization of violations.
        
        Args:
            session_data: Dictionary containing session statistics
            student_name: Name of the student
            
        Returns:
            Path to the generated chart file
        """
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        chart_file = os.path.join(self.reports_dir, f"violations_chart_{timestamp}.png")
        
        violations = session_data.get("violations", {})
        
        # Prepare data for chart
        categories = []
        counts = []
        
        if violations.get('no_face', 0) > 0:
            categories.append('No Face')
            counts.append(violations['no_face'])
        
        if violations.get('multiple_faces', 0) > 0:
            categories.append('Multiple Faces')
            counts.append(violations['multiple_faces'])
        
        if violations.get('looking_away', 0) > 0:
            categories.append('Looking Away')
            counts.append(violations['looking_away'])
        
        if violations.get('identity_mismatch', 0) > 0:
            categories.append('Identity Issues')
            counts.append(violations['identity_mismatch'])
        
        # If no violations, create empty chart with message
        if not categories:
            categories = ['No Violations']
            counts = [0]
        
        # Create bar chart
        plt.figure(figsize=(10, 6))
        bars = plt.bar(categories, counts, color=['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][:len(categories)])
        
        # Customize chart
        plt.title(f'Exam Session Violations Summary\nStudent: {student_name}', 
                 fontsize=14, fontweight='bold')
        plt.xlabel('Violation Type', fontsize=12)
        plt.ylabel('Number of Occurrences', fontsize=12)
        plt.grid(axis='y', alpha=0.3)
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2., height,
                    f'{int(height)}',
                    ha='center', va='bottom', fontsize=10, fontweight='bold')
        
        plt.tight_layout()
        
        try:
            plt.savefig(chart_file, dpi=300, bbox_inches='tight')
            plt.close()
            print(f"Chart saved to: {chart_file}")
            return chart_file
        except Exception as e:
            print(f"Error generating chart: {e}")
            plt.close()
            return ""
    
    def generate_full_report(self, session_data: Dict, student_name: str, 
                           student_id: str) -> Dict[str, str]:
        """
        Generate both text report and chart.
        
        Args:
            session_data: Dictionary containing session statistics
            student_name: Name of the student
            student_id: ID of the student
            
        Returns:
            Dictionary with paths to generated files
        """
        text_report = self.generate_text_report(session_data, student_name, student_id)
        chart = self.generate_chart(session_data, student_name)
        
        return {
            "text_report": text_report,
            "chart": chart
        }

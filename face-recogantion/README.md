# AI Proctoring System - Academic Research Prototype

A standalone AI-powered proctoring system for academic research purposes, designed to enhance academic integrity during online exams. This system monitors student behavior in real-time using computer vision and machine learning techniques.

## 🎯 Project Overview

This is a prototype system built for university graduation project research. It provides real-time monitoring of exam sessions with identity verification, behavioral analysis, and comprehensive reporting.

## 📋 Features

### Core Functionality

1. **Consent Screen** - Requires explicit user consent before monitoring begins
2. **Student Registration** - Captures and stores student face encodings for identity verification
3. **Identity Verification** - Real-time comparison of live feed with registered student
4. **Head Pose Tracking** - Detects when student looks away from screen (left, right, down)
5. **Liveness Detection** - Verifies presence of live person through blink or head movement
6. **Multiple Face Detection** - Alerts when more than one face is detected
7. **Dynamic Risk Scoring** - Real-time risk assessment based on violations
8. **Real-Time Overlay UI** - Displays student info, timer, risk level, and warnings
9. **Comprehensive Logging** - Records all suspicious activities with timestamps
10. **Report Generation** - Creates text reports and visualization charts

### Risk Scoring System

- **No Face Detected**: +10 points
- **Multiple Faces**: +30 points
- **Looking Away (>5s)**: +15 points
- **Identity Mismatch**: +40 points

**Risk Levels:**
- **LOW RISK**: 0-49%
- **MODERATE RISK**: 50-69%
- **HIGH RISK**: ≥70%

## 🛠️ Technology Stack

- **Python 3.10+**
- **OpenCV** - Video capture and image processing
- **face_recognition** - Face detection and encoding
- **Mediapipe** - Face mesh and pose tracking
- **NumPy** - Numerical operations
- **Matplotlib** - Report visualization
- **Pickle** - Data serialization
- **Threading** - Concurrent operations
- **DateTime** - Timestamp management

## 📁 Project Structure

```
ai_proctoring_project/
│
├── main.py                 # Main entry point
├── register.py             # Student registration module
├── verification.py          # Identity verification module
├── pose_tracking.py         # Head pose tracking module
├── liveness.py             # Liveness detection module
├── risk_engine.py          # Risk scoring engine
├── logger.py               # Logging system
├── report.py               # Report generation module
├── requirements.txt        # Python dependencies
├── README.md              # This file
│
├── encodings/             # Student face encodings storage
│   └── student.pkl
│
├── logs/                  # Session logs
│   └── exam_log.txt
│
└── reports/               # Generated reports
    ├── session_report_*.txt
    └── violations_chart_*.png
```

## 🚀 Installation

### Prerequisites

- Python 3.10 or higher
- Webcam connected to your computer
- Windows/Linux/macOS operating system

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd face-recogantion

# Or simply extract the project folder
```

### Step 2: Create Virtual Environment (Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Note:** Installing `dlib` and `face_recognition` may require additional system dependencies:

#### Windows:
- Install Visual Studio Build Tools (C++ compiler)
- Or use pre-built wheels if available

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install build-essential cmake
sudo apt-get install libopenblas-dev liblapack-dev
sudo apt-get install libx11-dev libgtk-3-dev
```

#### macOS:
```bash
brew install cmake
brew install dlib
```

### Step 4: Verify Installation

```bash
python -c "import cv2; import face_recognition; import mediapipe; print('All dependencies installed successfully!')"
```

## 📖 Usage

### Running the System

1. **Start the Application:**
   ```bash
   python main.py
   ```

2. **Consent Screen:**
   - Read the consent message
   - Press `Y` to consent and continue
   - Press `N` to exit

3. **Student Registration (First Time):**
   - Enter student name
   - Enter student ID
   - Position face in camera view
   - Press `SPACE` to capture face
   - Press `ESC` to cancel

4. **Liveness Check:**
   - Choose detection method (blink or head movement)
   - Follow on-screen instructions
   - System verifies liveness before exam starts

5. **Exam Session:**
   - System monitors in real-time
   - Overlay shows:
     - Student name
     - Session timer
     - Risk level
     - Warning count
     - Violation details
   - Press `Q` to end session

6. **Report Generation:**
   - After session ends, reports are automatically generated
   - Text report: `reports/session_report_*.txt`
   - Chart: `reports/violations_chart_*.png`

## 📊 Output Files

### Logs (`logs/exam_log.txt`)
- Timestamped events
- Violation types and durations
- Risk points added
- Session summaries

### Reports (`reports/`)
- **Text Report**: Detailed session summary with statistics
- **Chart**: Bar chart visualization of violations

## ⚙️ Configuration

### Camera Index
If you have multiple cameras, modify the camera index in `main.py`:
```python
system = AIProctoringSystem(camera_index=0)  # Change to 1, 2, etc.
```

### Risk Thresholds
Adjust risk scoring in `risk_engine.py`:
```python
RISK_NO_FACE = 10
RISK_MULTIPLE_FACES = 30
RISK_LOOKING_AWAY = 15
RISK_IDENTITY_MISMATCH = 40
HIGH_RISK_THRESHOLD = 70
```

### Face Recognition Tolerance
Modify tolerance in `verification.py`:
```python
IdentityVerifier(registered_encoding, tolerance=0.6)  # Lower = more strict
```

## 🔬 Academic Research Notes

This system is designed for academic research purposes. Key research areas:

- **Computer Vision**: Face detection and recognition
- **Behavioral Analysis**: Head pose estimation and attention tracking
- **Liveness Detection**: Anti-spoofing techniques
- **Risk Assessment**: Dynamic scoring algorithms
- **Human-Computer Interaction**: Real-time monitoring interfaces

## ⚠️ Limitations & Ethical Considerations

1. **Privacy**: This system monitors and records student behavior. Ensure compliance with privacy regulations.
2. **Accuracy**: Face recognition accuracy depends on lighting, camera quality, and face angle.
3. **False Positives**: System may flag legitimate behaviors (e.g., looking at notes, adjusting position).
4. **Research Purpose**: This is a prototype for academic research, not a production system.

## 🐛 Troubleshooting

### Camera Not Detected
- Check camera connection
- Verify camera permissions
- Try different camera index (0, 1, 2, etc.)

### Face Recognition Errors
- Ensure good lighting
- Face should be clearly visible
- Remove glasses/face coverings if causing issues

### Import Errors
- Verify all dependencies are installed: `pip list`
- Reinstall problematic packages: `pip install --force-reinstall <package>`

### Performance Issues
- Close other applications using the camera
- Reduce video resolution in code if needed
- Use a dedicated webcam (not built-in if possible)

## 📝 License

This project is created for academic research purposes. Use responsibly and in accordance with institutional policies.

## 👥 Author

University Graduation Project - AI Proctoring System

## 📅 Version

1.0.0 - Initial Release

---

**Note**: This system is a research prototype. For production use, additional security measures, encryption, and compliance features would be required.

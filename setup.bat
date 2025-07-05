@echo off
echo 🤖 Chat with Notes - Setup Script
echo ==================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Python found

REM Check if pip is installed
pip --version >nul 2>&1
if errorlevel 1 (
    echo ❌ pip is not installed. Please install pip first.
    pause
    exit /b 1
)

echo ✅ pip found

REM Create virtual environment
echo 📦 Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo ⬆️ Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo 📚 Installing dependencies...
pip install -r requirements.txt

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Make sure Ollama is installed and running:
echo    - Download from: https://ollama.ai/
echo    - Run: ollama serve
echo.
echo 2. Download the AI model:
echo    ollama pull llama3.1
echo.
echo 3. Run the application:
echo    venv\Scripts\activate.bat
echo    python app.py
echo.
echo 4. Open your browser to: http://localhost:5000
echo.
echo 🔒 Your data stays private and local!
pause 
#!/bin/bash

echo "🤖 Chat with Notes - Setup Script"
echo "=================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Python 3 found"

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "✅ pip3 found"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📚 Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure Ollama is installed and running:"
echo "   - Download from: https://ollama.ai/"
echo "   - Run: ollama serve"
echo ""
echo "2. Download the AI model:"
echo "   ollama pull llama3.1"
echo ""
echo "3. Run the application:"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "4. Open your browser to: http://localhost:5000"
echo ""
echo "🔒 Your data stays private and local!" 
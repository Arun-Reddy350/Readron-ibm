# 🚀 Quick Start Guide

Get Chat with Notes running in 5 minutes!

## Prerequisites

1. **Python 3.8+** - [Download here](https://python.org)
2. **Ollama** - [Download here](https://ollama.ai)

## Quick Setup

### Option 1: Automated Setup (Recommended)

**macOS/Linux:**
```bash
cd chat-with-notes
./setup.sh
```

**Windows:**
```cmd
cd chat-with-notes
setup.bat
```

### Option 2: Manual Setup

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

## Start the Application

1. **Start Ollama:**
   ```bash
   ollama serve
   ```

2. **Download AI model:**
   ```bash
   ollama pull llama3.1
   ```

3. **Run the app:**
   ```bash
   python app.py
   ```

4. **Open browser:**
   Navigate to `http://localhost:5000`

## Usage

1. **Upload a document** (TXT, MD, PY, JS, HTML, CSS, JSON, PDF)
2. **Review the content** in the document viewer
3. **Start chatting** about your document
4. **Export conversations** or clear data as needed

## Troubleshooting

- **"Connection refused"** → Make sure Ollama is running
- **"Model not found"** → Run `ollama pull llama3.1`
- **Port in use** → Change port in `app.py` line 111

## Privacy

✅ All processing is local  
✅ No data sent to external servers  
✅ Your documents never leave your device  

---

**Need help?** Check the full [README.md](README.md) for detailed instructions. 
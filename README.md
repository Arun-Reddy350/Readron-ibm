# Readron

**Reading Reinvented with Local Intelligence**

Readron combines blazing-fast local search, smart context extraction, and LLaMA-based Q&A — so you can mine insights from PDFs and other documents with zero cloud dependency.

---

## 🚀 What is Readron?

Readron is a privacy-first, AI-powered document assistant that runs entirely on your computer. Upload PDFs, code, or text files, and instantly:
- Search, review, and chat with your documents
- Extract insights, summaries, and answers using local LLMs (LLaMA)
- Never send your data to the cloud — everything stays on your device

---

## ✨ Features

- **Local AI Q&A:** Ask questions about your documents, get instant answers powered by LLaMA running locally
- **PDF & Text Support:** Works with PDFs, TXT, MD, code files, and more
- **Smart Context Extraction:** Automatically extracts and displays key info from your files
- **Animated Chat UI:** Modern, beautiful chat interface with typing animation and floating bubbles
- **No Cloud Required:** 100% offline, zero data leaves your machine
- **Cross-Platform:** Works on both Windows and macOS
- **Export & Clear:** Export chat history, clear data, and manage your session easily

---

## 🛠️ How It Works

1. **Upload a Document:** Drag and drop or select a file (PDF, TXT, code, etc.)
2. **Review Content:** Instantly see the document content, with line numbers and file stats
3. **Chat with AI:** Ask questions, get summaries, or extract insights — all powered by a local LLaMA model
4. **Export or Clear:** Download your chat, clear history, or reset the session at any time

**All processing happens locally.** Your files and questions never leave your device.

---

## 💡 Why Use Readron?

- **Privacy:** No cloud, no leaks. Your data stays with you.
- **Speed:** Instant answers, no waiting for uploads or remote servers
- **Versatility:** Works with PDFs, code, notes, and more
- **Modern UI:** Beautiful, animated, and easy to use
- **Empowering:** Mine insights from research, contracts, code, or notes — all offline

---

## 🖥️ Installation & Setup

### Prerequisites
- **Python 3.8+**
- **Ollama** (for local LLaMA model): [Download here](https://ollama.ai)

### 1. Clone the Repository
```bash
# Download the project
# (Use GitHub Desktop, or run:)
git clone https://github.com/yourusername/readron.git
cd readron/chat-with-notes
```

### 2. Set Up the Environment
#### On macOS/Linux:
```bash
./setup.sh
```
#### On Windows:
```cmd
setup.bat
```

### 3. Download the LLaMA Model
```bash
ollama pull llama3.1
```

### 4. Start Ollama Service
```bash
ollama serve
```

### 5. Run Readron
#### On macOS/Linux:
```bash
source venv/bin/activate
python app.py
```
#### On Windows:
```cmd
venv\Scripts\activate
python app.py
```

### 6. Open in Browser
Go to [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 How to Use

1. **Upload a file:** Drag and drop or use the file picker
2. **Review:** See file content, stats, and metadata
3. **Chat:** Ask questions, get summaries, or extract info
4. **Export:** Download your chat history
5. **Clear:** Reset chat or all data at any time

---

## 📝 Supported File Types
- PDF (.pdf)
- Text (.txt, .md)
- Code (.py, .js, .html, .css, .json)

---

## 🪄 How It's Useful
- **Students:** Summarize readings, extract key points, ask questions about textbooks
- **Researchers:** Mine insights from papers, reports, or data
- **Professionals:** Review contracts, technical docs, or meeting notes
- **Developers:** Chat with code, get explanations, or search large files
- **Anyone:** Instantly search and understand any document, offline

---

## 🛡️ 100% Local, 100% Private
- No cloud, no tracking, no data leaks
- All AI and file processing happens on your device
- Works offline after setup

---

## ❓ Troubleshooting
- **Port 5000 in use:** Change the port in `app.py` (e.g., `app.run(debug=True, port=5001)`)
- **Ollama errors:** Make sure `ollama serve` is running and the model is downloaded
- **Python errors:** Ensure you're using Python 3.8+ and all dependencies are installed
- **PDF issues:** Update `pypdf` with `pip install --upgrade pypdf`

---

## 🙌 Made with ❤️ by [K.Arun Reddy]


If you found this project helpful, feel free to ⭐️ it on GitHub and share your thoughts!

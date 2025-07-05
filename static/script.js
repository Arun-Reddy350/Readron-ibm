document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const fileContent = document.getElementById('fileContent');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatHistory = document.getElementById('chatHistory');
    const exportChatButton = document.getElementById('exportChat');
    const clearChatButton = document.getElementById('clearChat');
    const clearAllButton = document.getElementById('clearAll');
    const dropZone = document.getElementById('dropZone');
    const spinner = document.getElementById('spinner');
    
    // Document header elements
    const documentHeader = document.getElementById('documentHeader');
    const documentIcon = document.getElementById('documentIcon');
    const documentName = document.getElementById('documentName');
    const documentType = document.getElementById('documentType');
    const documentSize = document.getElementById('documentSize');
    const documentLines = document.getElementById('documentLines');
    const documentDate = document.getElementById('documentDate');

    const allowedFileTypes = ['.txt', '.md', '.py', '.js', '.html', '.css', '.json', '.pdf'];

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingOverlay);

    // Function to show/hide loading overlay
    function setLoading(isLoading) {
        loadingOverlay.style.display = isLoading ? 'flex' : 'none';
    }

    // Function to show/hide spinner
    function setSpinner(isLoading) {
        spinner.style.display = isLoading ? 'block' : 'none';
    }

    // Function to scroll chat to bottom smoothly
    function scrollChatToBottom() {
        chatHistory.scrollTo({
            top: chatHistory.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Function to get file icon based on type
    function getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            'txt': '📄',
            'md': '📝',
            'py': '🐍',
            'js': '⚡',
            'html': '🌐',
            'css': '🎨',
            'json': '📋',
            'pdf': '📕'
        };
        return icons[ext] || '📄';
    }

    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Function to update document header
    function updateDocumentHeader(file) {
        const icon = getFileIcon(file.name);
        const size = formatFileSize(file.size);
        const lines = fileContent.textContent.split('\n').length;
        const date = new Date().toLocaleDateString();
        
        documentIcon.textContent = icon;
        documentName.textContent = file.name;
        documentType.textContent = file.type || file.name.split('.').pop().toUpperCase();
        documentSize.textContent = size;
        documentLines.textContent = `${lines} lines`;
        documentDate.textContent = date;
        
        documentHeader.style.display = 'flex';
    }

    // Function to format document content with line numbers
    function formatDocumentContent(content) {
        const lines = content.split('\n');
        return lines.map((line, index) => 
            `<span class="line">${line}</span>`
        ).join('\n');
    }

    // Load chat history from local storage
    loadChatHistory();

    // Load file content from local storage
    loadFileContent();

    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFileSelect({ target: { files: files } });
        }
    });

    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            if (allowedFileTypes.includes(fileExtension)) {
                uploadButton.textContent = '🚀 Upload ' + file.name;
                uploadButton.disabled = false;
                fileInput.files = e.target.files;  // Update the file input
            } else {
                uploadButton.textContent = '❌ Invalid file type';
                uploadButton.disabled = true;
                alert('Please select a valid file type: ' + allowedFileTypes.join(', '));
            }
        } else {
            uploadButton.textContent = '🚀 Upload';
            uploadButton.disabled = false;
        }
    }

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);

        // Check if there's existing chat history
        if (chatHistory.innerHTML.trim() !== '') {
            const userChoice = await showUploadConfirmation();
            if (userChoice === 'cancel') {
                return;
            }
            formData.append('action', userChoice);
        } else {
            formData.append('action', 'upload');
        }

        try {
            setLoading(true);
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.error) {
                alert(`Error: ${data.error}`);
                fileContent.textContent = '';
                documentHeader.style.display = 'none';
            } else {
                // Update document header
                updateDocumentHeader(fileInput.files[0]);
                
                // Format and display content
                fileContent.innerHTML = formatDocumentContent(data.content);
                localStorage.setItem('fileContent', data.content);
                
                if (data.chatHistory) {
                    updateChatHistory(data.chatHistory);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the file.');
            fileContent.textContent = '';
            documentHeader.style.display = 'none';
        } finally {
            setLoading(false);
        }
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        appendMessage('You', message);
        userInput.value = '';

        try {
            setSpinner(true);
            
            // Show typing indicator
            const typingMessage = appendTypingMessage();
            
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                }),
            });
            const data = await response.json();
            
            // Remove typing indicator and show actual response
            removeTypingMessage();
            appendMessageWithTyping('AI', data.response);
            updateChatHistory(data.full_history);
        } catch (error) {
            console.error('Error:', error);
            removeTypingMessage();
            appendMessage('System', 'An error occurred while processing your message.');
        } finally {
            setSpinner(false);
        }
    });

    function showUploadConfirmation() {
        return new Promise((resolve) => {
            const confirmationDialog = document.createElement('div');
            confirmationDialog.className = 'confirmation-dialog';
            confirmationDialog.innerHTML = `
                <div>
                    <p>You have an existing chat history. What would you like to do?</p>
                    <button id="clearChatBtn">🗑️ Clear chat and upload</button>
                    <button id="keepChatBtn">💾 Keep chat and upload</button>
                    <button id="cancelUploadBtn">❌ Cancel upload</button>
                </div>
            `;
            document.body.appendChild(confirmationDialog);

            document.getElementById('clearChatBtn').onclick = () => {
                document.body.removeChild(confirmationDialog);
                resolve('clear');
            };
            document.getElementById('keepChatBtn').onclick = () => {
                document.body.removeChild(confirmationDialog);
                resolve('keep');
            };
            document.getElementById('cancelUploadBtn').onclick = () => {
                document.body.removeChild(confirmationDialog);
                resolve('cancel');
            };
        });
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender.toLowerCase()}-message`;
        messageElement.innerHTML = `
            <strong>${sender}:</strong>
            <div class="message-content">${message}</div>
        `;
        chatHistory.appendChild(messageElement);
        scrollChatToBottom();
    }

    function appendTypingMessage() {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai-message typing';
        messageElement.id = 'typing-message';
        messageElement.innerHTML = `
            <strong>AI:</strong>
            <div class="message-content">
                <span class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </span>
            </div>
        `;
        chatHistory.appendChild(messageElement);
        scrollChatToBottom();
        return messageElement;
    }

    function removeTypingMessage() {
        const typingMessage = document.getElementById('typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    function appendMessageWithTyping(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender.toLowerCase()}-message`;
        messageElement.innerHTML = `
            <strong>${sender}:</strong>
            <div class="message-content" id="typing-content"></div>
        `;
        chatHistory.appendChild(messageElement);
        scrollChatToBottom();
        
        // Type out the message with improved performance
        typeMessage(messageElement.querySelector('.message-content'), message);
    }

    function typeMessage(element, text) {
        let index = 0;
        const speed = 25; // Slightly faster for better UX
        const chunkSize = 3; // Type multiple characters at once for smoother animation
        
        function typeChunk() {
            if (index < text.length) {
                const endIndex = Math.min(index + chunkSize, text.length);
                element.textContent += text.substring(index, endIndex);
                index = endIndex;
                
                // Only scroll occasionally to prevent constant scrolling
                if (index % 15 === 0 || index === text.length) {
                    scrollChatToBottom();
                }
                
                setTimeout(typeChunk, speed);
            }
        }
        
        typeChunk();
    }

    function updateChatHistory(fullHistory) {
        chatHistory.innerHTML = ''; // Clear existing chat history
        fullHistory.forEach(message => {
            if (message.startsWith('Human: ')) {
                appendMessage('You', message.substring(7));
            } else if (message.startsWith('AI: ')) {
                appendMessage('AI', message.substring(4));
            } else if (message.startsWith('System: ')) {
                appendMessage('System', message.substring(8));
            }
        });
        saveChatHistory();
    }

    function saveChatHistory() {
        const messages = chatHistory.innerHTML;
        localStorage.setItem('chatHistory', messages);
    }

    function loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            chatHistory.innerHTML = savedHistory;
            scrollChatToBottom();
        }
    }

    function loadFileContent() {
        const savedContent = localStorage.getItem('fileContent');
        if (savedContent) {
            fileContent.innerHTML = formatDocumentContent(savedContent);
            // Show document header if content exists
            if (savedContent.trim()) {
                documentHeader.style.display = 'flex';
                // Update with placeholder info since we don't have the original file
                documentIcon.textContent = '📄';
                documentName.textContent = 'Previously uploaded document';
                documentType.textContent = 'Unknown';
                documentSize.textContent = formatFileSize(savedContent.length);
                documentLines.textContent = `${savedContent.split('\n').length} lines`;
                documentDate.textContent = 'Previously uploaded';
            }
        }
    }

    async function clearChat() {
        try {
            const response = await fetch('/clear_chat', {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status === 'success') {
                chatHistory.innerHTML = '';
                localStorage.removeItem('chatHistory');
                appendMessage('System', 'Chat history cleared successfully.');
            }
        } catch (error) {
            console.error('Error clearing chat:', error);
            appendMessage('System', 'Error clearing chat history.');
        }
    }

    async function clearAll() {
        try {
            const response = await fetch('/clear_all', {
                method: 'POST'
            });
            const data = await response.json();
            if (data.status === 'success') {
                chatHistory.innerHTML = '';
                fileContent.innerHTML = '';
                documentHeader.style.display = 'none';
                localStorage.removeItem('chatHistory');
                localStorage.removeItem('fileContent');
                appendMessage('System', 'All data cleared successfully.');
            }
        } catch (error) {
            console.error('Error clearing all data:', error);
            appendMessage('System', 'Error clearing all data.');
        }
    }

    function exportChat() {
        const messages = Array.from(chatHistory.querySelectorAll('.message'))
            .map(msg => {
                const sender = msg.querySelector('strong').textContent;
                const content = msg.querySelector('.message-content').textContent;
                return `${sender} ${content}`;
            })
            .join('\n\n');

        const blob = new Blob([messages], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Event listeners
    exportChatButton.addEventListener('click', exportChat);
    clearChatButton.addEventListener('click', clearChat);
    clearAllButton.addEventListener('click', clearAll);

    // Add some initial system message if chat is empty
    if (chatHistory.innerHTML.trim() === '') {
        appendMessage('System', 'Welcome to Readron! Upload a document to start chatting with your local AI assistant. Your data never leaves your device.');
    }
});
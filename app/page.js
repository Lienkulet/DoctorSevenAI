'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [base64Data, setBase64Data] = useState(''); // Store base64 string
  const [summary, setSummary] = useState(''); // Store the summary
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Handle chat submission (unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { role: 'bot', content: data.message };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages((prev) => [...prev, { role: 'bot', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection with validation and compression (exact copy of handleReportSelection)
  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;

    const validImages = ['image/jpeg', 'image/png', 'image/webp'];
    const validDocs = ['application/pdf'];
    const isValidImage = validImages.includes(file.type);
    const isValidDoc = validDocs.includes(file.type);

    if (!(isValidImage || isValidDoc)) {
      console.error('Filetype not supported!');
      // Optionally, add a toast notification here if you have a toast library
      return;
    }

    if (isValidImage) {
      compressImage(file, (compressedFile) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          setBase64Data(base64String);
        };
        reader.readAsDataURL(compressedFile);
      });
    }

    if (isValidDoc) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setBase64Data(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Compress image function (exact copy from ReportComponent)
  const compressImage = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const quality = 0.1; // Adjust quality as needed
        const dataURL = canvas.toDataURL('image/jpeg', quality);

        const byteString = atob(dataURL.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const compressedFile = new File([ab], file.name, { type: 'image/jpeg' });

        callback(compressedFile);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  // Handle summarization (exact copy of extractDetails logic)
  const handleSummarize = async () => {
    if (!base64Data) {
      console.error('Upload a valid report!');
      // Optionally, add a toast notification here
      return;
    }

    setIsSummarizing(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: base64Data }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const summaryText = await response.text();
      console.log(summaryText);
      setSummary(summaryText);
    } catch (error) {
      console.error('Summarize error:', error);
      setSummary(`Error: ${error.message}`);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      {/* Left Sidebar for File Upload and Summary */}
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Medical Report Analysis</h2>

        {/* File Upload Section */}
        <div className={styles.fileForm}>
          {isSummarizing && (
            <div className="absolute z-10 h-full w-full bg-gray-100/90 rounded-lg flex flex-row items-center justify-center">
              Summarizing...
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.fileInput}
            accept=".pdf,.png,.jpg,.jpeg,.webp" // Restrict to PDF, PNG, JPG, WEBP
            disabled={isSummarizing}
          />
          <button
            onClick={handleSummarize}
            className={styles.button}
            disabled={!base64Data || isSummarizing}
          >
            Summarize Report
          </button>
        </div>

        {/* Summary Section */}
        <div className={styles.summarySection}>
          <h3 className={styles.summaryTitle}>Summary</h3>
          {isSummarizing ? (
            <div className={styles.loading}>Summarizing...</div>
          ) : summary ? (
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary of the report will appear here..."
              className={`${styles.summaryText} min-h-[200px] resize-none border-0 p-3 shadow-none focus:outline-none`}
            />
          ) : (
            <p className={styles.summaryPlaceholder}>Upload a report to see its summary.</p>
          )}
        </div>
      </div>

      {/* Right Side for Chat */}
      <div className={styles.chatContainer}>
        <h1 className={styles.title}>Medical AI Assistant</h1>

        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div className={styles.loading}>Bot is typing...</div>}
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.input}
            placeholder="Ask a medical question..."
            disabled={isLoading}
          />
          <button type="submit" className={styles.button} disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
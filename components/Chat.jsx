// ChatSection.jsx
import { useState, useEffect } from 'react';

const ChatSection = ({ summary }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a greeting message on page load
  useEffect(() => {
    const greetingMessage = {
      role: 'bot',
      content: 'Hello! How can I assist you with your health-related questions today?',
    };
    setMessages([greetingMessage]);
  }, []); // Empty dependency array ensures this runs only on mount

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
        body: JSON.stringify({ message: input, summary }),
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

  return (
    <div className="chat-container">
      <h1 className="title">Medical AI Assistant</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="loading">Bot is typing...</div>}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="Ask a medical question..."
          disabled={isLoading}
        />
        <button type="submit" className="button" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSection;
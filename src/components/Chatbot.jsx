// /src/components/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Import the CSS file
import { getChatbotReply } from '../services/api';

const Chatbot = ({ tweets }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const conversationEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const userMessage = { sender: 'user', text: message };
    setConversation((prev) => [...prev, userMessage]);
    setMessage('');
    setError(null);
    setLoading(true);

    try {
      const reply = await getChatbotReply(message, tweets);
      const botMessage = { sender: 'bot', text: reply };
      setConversation((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-title">Chat with Sentiment Bot</div>
      
      <div className="chatbot-conversation">
        {conversation.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            <div className="chatbot-message-text">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={conversationEndRef} />
      </div>
      
      <div className="chatbot-input-area">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          ref={inputRef}
        />
        <button
          className="chatbot-send-button"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? <div className="spinner"></div> : 'Send'}
        </button>
      </div>
      
      {error && <div className="chatbot-error">{error}</div>}
    </div>
  );
};

export default Chatbot;
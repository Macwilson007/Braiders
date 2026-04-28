'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatWidget.module.css';

const QUICK_REPLIES = [
  { label: '📅 Book Appointment', action: 'book' },
  { label: '💇 View Services', action: 'services' },
  { label: '📦 Track Order', action: 'track' },
  { label: '💬 Talk to Someone', action: 'human' },
];

const AUTO_RESPONSES = {
  book: 'You can book an appointment directly on our website! Visit our booking page to select your preferred service, stylist, date, and time. Would you like me to take you there?',
  services: 'We offer a wide range of services including Box Braids, Knotless Braids, Cornrows, Goddess Locs, Silk Press, and much more! Check out our full service menu for details and pricing.',
  track: 'To track your order, please log into your account and visit the "My Orders" section in your dashboard. You can see real-time status updates there.',
  human: 'I\'ll connect you with our team right away! You can also reach us directly on WhatsApp for faster response. Our team typically responds within 15 minutes during business hours.',
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hi! Welcome to Braiders 👋 How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text, sender = 'user', type = 'text', mediaUrl = null) => {
    const msg = {
      id: crypto.randomUUID(),
      text,
      sender,
      type,
      mediaUrl,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    return msg;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    addMessage(inputText, 'user');
    setInputText('');

    // Simple auto-response
    setTimeout(() => {
      addMessage(
        'Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or book an appointment.',
        'bot'
      );
    }, 1000);
  };

  const handleQuickReply = (action) => {
    const reply = QUICK_REPLIES.find(r => r.action === action);
    if (reply) addMessage(reply.label, 'user');
    setTimeout(() => {
      addMessage(AUTO_RESPONSES[action] || 'Let me help you with that!', 'bot');
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    addMessage('Shared an image', 'user', 'image', url);
    setTimeout(() => {
      addMessage('Thanks for sharing! I\'ve noted the image. Our stylist will review it and suggest the best options for you.', 'bot');
    }, 1000);
  };

  const handleVoiceNote = () => {
    if (isRecording) {
      setIsRecording(false);
      addMessage('Voice note recorded', 'user', 'voice');
      setTimeout(() => {
        addMessage('I\'ve received your voice note! Our team will listen to it and respond shortly.', 'bot');
      }, 1000);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.widget}>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.chatAvatar}>B</div>
              <div>
                <h4 className={styles.chatName}>Braiders</h4>
                <span className={styles.chatStatus}>
                  <span className={styles.statusDot} /> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.chatClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.chatMessages}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.message} ${styles[`message${msg.sender === 'user' ? 'User' : 'Bot'}`]}`}>
                {msg.type === 'image' && msg.mediaUrl && (
                  <div className={styles.messageImage}>
                    <img src={msg.mediaUrl} alt="Shared" />
                  </div>
                )}
                {msg.type === 'voice' && (
                  <div className={styles.messageVoice}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                    <span>Voice Note</span>
                    <span className={styles.voiceDuration}>0:04</span>
                  </div>
                )}
                {msg.type !== 'image' && <p className={styles.messageText}>{msg.text}</p>}
                <span className={styles.messageTime}>{formatTime(msg.timestamp)}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick Replies (show after first bot message only) */}
            {messages.length <= 2 && (
              <div className={styles.quickReplies}>
                {QUICK_REPLIES.map((reply) => (
                  <button key={reply.action} className={styles.quickReply} onClick={() => handleQuickReply(reply.action)}>
                    {reply.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className={styles.chatInput}>
            <button onClick={() => fileInputRef.current?.click()} className={styles.inputAction} aria-label="Upload image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
              </svg>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className={styles.inputField}
            />
            <button onClick={handleVoiceNote} className={`${styles.inputAction} ${isRecording ? styles.recording : ''}`} aria-label="Voice note">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
            <button onClick={handleSend} className={styles.sendBtn} disabled={!inputText.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button onClick={() => setIsOpen(!isOpen)} className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`} aria-label="Chat">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </div>
  );
}

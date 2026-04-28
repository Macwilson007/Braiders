'use client';

import styles from '../admin.module.css';

export default function AdminChatbotLogs() {
  return (
    <div className={styles.card}>
      <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>Chatbot Interaction Logs</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>View real-time logs of AI chatbot conversations from both Web and WhatsApp platforms. Track user inquiries and automated responses here.</p>
    </div>
  );
}

'use client';

import styles from '../admin.module.css';

export default function AdminSettings() {
  return (
    <div className={styles.card}>
      <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>Salon Settings</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Configure salon opening hours, service categories, pricing, and API keys for Supabase, Paystack, and WhatsApp Cloud API.</p>
    </div>
  );
}

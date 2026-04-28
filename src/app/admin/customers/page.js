'use client';

import styles from '../admin.module.css';

export default function AdminCustomers() {
  return (
    <div className={styles.card}>
      <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>Customer Directory</h2>
      <p style={{ color: '#666', fontSize: '14px' }}>Customer management system coming soon. This page will display your salon&apos;s client database with their booking history and preferences.</p>
    </div>
  );
}

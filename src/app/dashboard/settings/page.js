'use client';

import styles from '../dashboard.module.css';

export default function UserSettings() {
  return (
    <div>
      <h1 className={styles.sectionTitle}>SETTINGS</h1>
      <div className={styles.card} style={{ background: '#fff', padding: 'var(--space-xl)' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>Configure notification preferences, security settings, and payment methods.</p>
      </div>
    </div>
  );
}

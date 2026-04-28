'use client';

import styles from '../dashboard.module.css';

export default function UserProfile() {
  return (
    <div>
      <h1 className={styles.sectionTitle}>MY PROFILE</h1>
      <div className={styles.card} style={{ background: '#fff', padding: 'var(--space-xl)' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>Manage your personal information, contact details, and hair preferences here.</p>
      </div>
    </div>
  );
}

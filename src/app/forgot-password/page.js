'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../login/auth.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authGrid}>
        <div className={styles.authImage}>
          <div className={styles.authImagePlaceholder} style={{ background: 'linear-gradient(135deg, #3D2E3D, #7B2D4E)' }} />
          <div className={styles.authImageOverlay}>
            <h2 className={styles.authImageTitle}>RESET PASSWORD</h2>
            <p className={styles.authImageText}>We&apos;ll send you a link to reset your password.</p>
          </div>
        </div>
        <div className={styles.authForm}>
          <div className={styles.authFormInner}>
            <Link href="/" className={styles.authLogo}>BRAIDERS</Link>
            <h1 className={styles.authTitle}>FORGOT PASSWORD</h1>
            <p className={styles.authSubtitle}>Enter your email and we&apos;ll send you a reset link</p>

            {sent ? (
              <div style={{ padding: 'var(--space-xl)', background: '#E8F5EE', textAlign: 'center' }}>
                <p style={{ fontWeight: 700, color: 'var(--color-success)', marginBottom: 'var(--space-sm)' }}>Check your email!</p>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-gray-700)' }}>
                  We&apos;ve sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Reset Link</button>
              </form>
            )}

            <p className={styles.authSwitch}>
              Remember your password? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

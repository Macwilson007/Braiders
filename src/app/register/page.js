'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from '../login/auth.module.css';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
    setLoading(false);
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className={styles.authPage}>
      <div className={styles.authGrid}>
        <div className={styles.authImage}>
          <div className={styles.authImagePlaceholder} style={{ background: 'linear-gradient(135deg, #5A1E38, #D4A853)' }} />
          <div className={styles.authImageOverlay}>
            <h2 className={styles.authImageTitle}>JOIN BRAIDERS</h2>
            <p className={styles.authImageText}>Create an account to book appointments, shop products, and track your orders.</p>
          </div>
        </div>
        <div className={styles.authForm}>
          <div className={styles.authFormInner}>
            <Link href="/" className={styles.authLogo}>BRAIDERS</Link>
            <h1 className={styles.authTitle}>CREATE ACCOUNT</h1>
            <p className={styles.authSubtitle}>Join thousands of women who trust Braiders</p>

            {error && <div className={styles.authError}>{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Your full name" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" placeholder="+234 ..." value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-input" placeholder="Min. 6 characters" value={form.password} onChange={(e) => update('password', e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-input" placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className={styles.authSwitch}>
              Already have an account? <Link href="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

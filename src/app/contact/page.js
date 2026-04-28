'use client';

import { useState } from 'react';
import styles from './contact.module.css';

const HOURS = [
  { day: 'Monday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 7:00 PM' },
  { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Get In Touch</span>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff' }}>
            CONTACT US
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', fontSize: 'var(--fs-md)' }}>
            We&apos;d love to hear from you. Reach out for appointments, enquiries, or just to say hello.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Form */}
            <div className={styles.formSection}>
              <h2 className="heading-display" style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-xl)' }}>
                SEND US A MESSAGE
              </h2>
              {submitted && (
                <div className={styles.successMsg}>
                  Thank you! Your message has been sent. We&apos;ll get back to you within 24 hours.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className={styles.formRow}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="+234 ..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" placeholder="How can we help you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Message</button>
              </form>
            </div>

            {/* Info */}
            <div className={styles.infoSection}>
              {/* Address */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Visit Our Salon</h3>
                <p className={styles.infoText}>15 Admiralty Way, Lekki Phase 1<br />Lagos, Nigeria</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                  Get Directions →
                </a>
              </div>

              {/* Contact */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Reach Us Directly</h3>
                <div className={styles.contactItem}>
                  <span className={styles.contactItemLabel}>Phone</span>
                  <a href="tel:+2349012345678">+234 901 234 5678</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactItemLabel}>WhatsApp</span>
                  <a href="https://wa.me/2349012345678">+234 901 234 5678</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactItemLabel}>Email</span>
                  <a href="mailto:hello@braiders.ng">hello@braiders.ng</a>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Opening Hours</h3>
                <ul className={styles.hoursList}>
                  {HOURS.map((h) => (
                    <li key={h.day} className={styles.hoursItem}>
                      <span>{h.day}</span>
                      <span>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <span className={styles.mapText}>Google Maps Embed — Lekki Phase 1, Lagos</span>
        </div>
      </section>
    </div>
  );
}

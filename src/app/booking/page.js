'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './booking.module.css';

const SERVICES_LIST = [
  { id: 'box-braids', name: 'Box Braids', category: 'Braiding', price: 25000, duration: '3-5 hours' },
  { id: 'knotless-braids', name: 'Knotless Braids', category: 'Braiding', price: 30000, duration: '4-6 hours' },
  { id: 'cornrows', name: 'Cornrows', category: 'Braiding', price: 15000, duration: '2-3 hours' },
  { id: 'goddess-locs', name: 'Goddess Locs', category: 'Braiding', price: 35000, duration: '4-6 hours' },
  { id: 'fulani-braids', name: 'Fulani Braids', category: 'Braiding', price: 20000, duration: '2-4 hours' },
  { id: 'twist-braids', name: 'Twist Braids', category: 'Braiding', price: 22000, duration: '3-5 hours' },
  { id: 'silk-press', name: 'Silk Press', category: 'Styling', price: 18000, duration: '1.5-2 hours' },
  { id: 'blowout', name: 'Blowout', category: 'Styling', price: 12000, duration: '1-1.5 hours' },
  { id: 'updo', name: 'Updo', category: 'Styling', price: 20000, duration: '1.5-2 hours' },
  { id: 'bridal', name: 'Bridal Styling', category: 'Styling', price: 50000, duration: '2-3 hours' },
  { id: 'deep-conditioning', name: 'Deep Conditioning', category: 'Treatments', price: 10000, duration: '45 min' },
  { id: 'scalp-treatment', name: 'Scalp Treatment', category: 'Treatments', price: 12000, duration: '45 min' },
  { id: 'protein-treatment', name: 'Protein Treatment', category: 'Treatments', price: 15000, duration: '1 hour' },
  { id: 'full-color', name: 'Full Color', category: 'Coloring', price: 25000, duration: '2-3 hours' },
  { id: 'highlights', name: 'Highlights', category: 'Coloring', price: 20000, duration: '2-3 hours' },
  { id: 'balayage', name: 'Balayage', category: 'Coloring', price: 30000, duration: '2.5-3.5 hours' },
];

const STYLISTS = [
  { id: 'any', name: 'Any Available Stylist' },
  { id: 'aisha', name: 'Aisha Bello', specialty: 'Braiding' },
  { id: 'ngozi', name: 'Ngozi Okafor', specialty: 'Locs & Twists' },
  { id: 'fatima', name: 'Fatima Yusuf', specialty: 'Coloring' },
  { id: 'blessing', name: 'Blessing Eze', specialty: 'Treatments' },
];

const TIME_SLOTS = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM',
];

function BookingContent() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    serviceId: searchParams.get('service') || '',
    stylistId: '',
    date: '',
    time: '',
    notes: '',
  });
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const selectedService = SERVICES_LIST.find(s => s.id === booking.serviceId);
  const selectedStylist = STYLISTS.find(s => s.id === booking.stylistId);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleConfirm = () => {
    const ref = 'BRD-' + Date.now().toString(36).toUpperCase();
    setBookingRef(ref);
    setConfirmed(true);
    // TODO: Save to Supabase
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!booking.serviceId;
      case 2: return !!booking.stylistId;
      case 3: return !!booking.date;
      case 4: return !!booking.time;
      case 5: return true;
      default: return false;
    }
  };

  if (confirmed) {
    return (
      <div className={styles.page}>
        <section className={styles.confirmation}>
          <div className={styles.confirmCard}>
            <div className={styles.confirmIcon}>✓</div>
            <h2 className="heading-display" style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-md)' }}>BOOKING CONFIRMED</h2>
            <p className={styles.confirmRef}>Reference: <strong>{bookingRef}</strong></p>
            <div className={styles.confirmDetails}>
              <div className={styles.confirmRow}><span>Service</span><strong>{selectedService?.name}</strong></div>
              <div className={styles.confirmRow}><span>Stylist</span><strong>{selectedStylist?.name}</strong></div>
              <div className={styles.confirmRow}><span>Date</span><strong>{new Date(booking.date).toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></div>
              <div className={styles.confirmRow}><span>Time</span><strong>{booking.time}</strong></div>
              <div className={styles.confirmRow}><span>Price</span><strong>₦{selectedService?.price.toLocaleString()}</strong></div>
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-gray-700)', marginTop: 'var(--space-lg)' }}>
              A confirmation has been sent to your email. We look forward to seeing you!
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)', justifyContent: 'center' }}>
              <Link href="/" className="btn btn-primary">Back to Home</Link>
              <Link href="/dashboard/bookings" className="btn btn-secondary">My Bookings</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Schedule Your Visit</span>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff' }}>BOOK AN APPOINTMENT</h1>
        </div>
      </section>

      {/* Progress */}
      <div className={styles.progress}>
        <div className="container">
          <div className={styles.progressSteps}>
            {['Service', 'Stylist', 'Date', 'Time', 'Review'].map((label, i) => (
              <div key={label} className={`${styles.progressStep} ${i + 1 <= step ? styles.progressStepActive : ''} ${i + 1 < step ? styles.progressStepDone : ''}`}>
                <span className={styles.progressDot}>{i + 1 < step ? '✓' : i + 1}</span>
                <span className={styles.progressLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Steps */}
      <section className="section">
        <div className="container-narrow">
          {/* Step 1: Service */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>SELECT A SERVICE</h2>
              <div className={styles.serviceList}>
                {SERVICES_LIST.map(service => (
                  <button key={service.id} className={`${styles.serviceOption} ${booking.serviceId === service.id ? styles.serviceOptionActive : ''}`} onClick={() => setBooking({ ...booking, serviceId: service.id })}>
                    <div>
                      <span className={styles.serviceOptName}>{service.name}</span>
                      <span className={styles.serviceOptMeta}>{service.category} · {service.duration}</span>
                    </div>
                    <span className={styles.serviceOptPrice}>₦{service.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Stylist */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>CHOOSE YOUR STYLIST</h2>
              <div className={styles.stylistGrid}>
                {STYLISTS.map(stylist => (
                  <button key={stylist.id} className={`${styles.stylistCard} ${booking.stylistId === stylist.id ? styles.stylistCardActive : ''}`} onClick={() => setBooking({ ...booking, stylistId: stylist.id })}>
                    <div className={styles.stylistAvatar}>{stylist.name.charAt(0)}</div>
                    <span className={styles.stylistName}>{stylist.name}</span>
                    {stylist.specialty && <span className={styles.stylistSpec}>{stylist.specialty}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>PICK A DATE</h2>
              <div className={styles.datePickerWrapper}>
                <input type="date" className={`form-input ${styles.datePicker}`} min={getMinDate()} value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
              </div>
            </div>
          )}

          {/* Step 4: Time */}
          {step === 4 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>SELECT A TIME</h2>
              <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--space-xl)', fontSize: 'var(--fs-sm)' }}>
                Available slots for {new Date(booking.date).toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <div className={styles.timeGrid}>
                {TIME_SLOTS.map(time => (
                  <button key={time} className={`${styles.timeSlot} ${booking.time === time ? styles.timeSlotActive : ''}`} onClick={() => setBooking({ ...booking, time })}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <div className={styles.stepContent}>
              <h2 className={styles.stepTitle}>REVIEW & CONFIRM</h2>
              <div className={styles.reviewCard}>
                <div className={styles.reviewRow}><span>Service</span><strong>{selectedService?.name}</strong></div>
                <div className={styles.reviewRow}><span>Stylist</span><strong>{selectedStylist?.name}</strong></div>
                <div className={styles.reviewRow}><span>Date</span><strong>{new Date(booking.date).toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong></div>
                <div className={styles.reviewRow}><span>Time</span><strong>{booking.time}</strong></div>
                <div className={styles.reviewRow}><span>Duration</span><strong>{selectedService?.duration}</strong></div>
                <hr className={styles.reviewDivider} />
                <div className={styles.reviewRow}><span>Total</span><strong className={styles.reviewTotal}>₦{selectedService?.price.toLocaleString()}</strong></div>
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-xl)' }}>
                <label className="form-label">Additional Notes (optional)</label>
                <textarea className="form-input form-textarea" placeholder="Hair length, reference images, special requests..." value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />
              </div>
              {!user && (
                <div className={styles.authNotice}>
                  <p>Please <Link href="/login">sign in</Link> or <Link href="/register">create an account</Link> to confirm your booking.</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className={styles.stepNav}>
            {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>}
            <div style={{ marginLeft: 'auto' }}>
              {step < 5 ? (
                <button className="btn btn-primary" disabled={!canProceed()} onClick={() => setStep(step + 1)}>Continue</button>
              ) : (
                <button className="btn btn-accent btn-lg" onClick={handleConfirm} disabled={!user}>
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}

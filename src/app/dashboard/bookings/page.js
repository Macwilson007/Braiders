'use client';

import Link from 'next/link';
import styles from '../dashboard.module.css';

const MY_BOOKINGS = [
  { id: 'BRD-4K91', service: 'Knotless Braids', stylist: 'Aisha Bello', date: '2026-05-15', time: '10:00 AM', status: 'Upcoming', price: 30000 },
  { id: 'BRD-2M15', service: 'Deep Conditioning', stylist: 'Blessing Eze', date: '2026-04-10', time: '02:30 PM', status: 'Completed', price: 10000 },
];

export default function MyBookings() {
  return (
    <div>
      <h1 className={styles.sectionTitle}>MY BOOKINGS</h1>
      
      <div className={styles.listCard}>
        {MY_BOOKINGS.map((booking) => (
          <div key={booking.id} className={styles.listItem}>
            <div className={styles.itemDate}>
              <span className={styles.day}>{new Date(booking.date).getDate()}</span>
              <span className={styles.month}>{new Date(booking.date).toLocaleDateString('en-NG', { month: 'short' }).toUpperCase()}</span>
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>{booking.service}</span>
              <span className={styles.itemMeta}>with {booking.stylist} · {booking.time}</span>
              <span style={{ fontSize: '11px', color: 'var(--color-gray-500)', marginTop: '4px' }}>Ref: {booking.id}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, marginBottom: '8px' }}>₦{booking.price.toLocaleString()}</div>
              <div className={`${styles.itemStatus} ${booking.status === 'Completed' ? styles.statusDone : ''}`}>
                {booking.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <Link href="/booking" className="btn btn-primary">Book New Appointment</Link>
      </div>
    </div>
  );
}

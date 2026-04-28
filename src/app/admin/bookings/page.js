'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

const MOCK_BOOKINGS = [
  { id: '1', customer: 'Chioma Okoro', email: 'chioma@example.com', service: 'Knotless Braids', stylist: 'Aisha Bello', date: '2026-05-15', time: '10:00 AM', status: 'Pending', price: 30000 },
  { id: '2', customer: 'Bisi Akindele', email: 'bisi@example.com', service: 'Silk Press', stylist: 'Ngozi Okafor', date: '2026-05-15', time: '01:30 PM', status: 'Confirmed', price: 18000 },
  { id: '3', customer: 'Teni Makanaki', email: 'teni@example.com', service: 'Goddess Locs', stylist: 'Aisha Bello', date: '2026-05-16', time: '09:00 AM', status: 'Pending', price: 35000 },
  { id: '4', customer: 'Adaobi Eze', email: 'ada@example.com', service: 'Cornrows', stylist: 'Blessing Eze', date: '2026-05-16', time: '12:00 PM', status: 'Done', price: 15000 },
];

export default function AdminBookings() {
  const [filter, setFilter] = useState('All');
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const filtered = bookings.filter(b => filter === 'All' || b.status === filter);

  const handleStatusChange = (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div>
      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
          <div className={styles.filters}>
            {['All', 'Pending', 'Confirmed', 'Done', 'Cancelled'].map(s => (
              <button 
                key={s} 
                className={`${styles.tabBtn} ${filter === s ? styles.tabBtnActive : ''}`}
                onClick={() => setFilter(s)}
                style={{ padding: '8px 16px', fontSize: '11px' }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className={styles.search}>
            <input type="text" placeholder="Search customer..." className="form-input" style={{ width: '240px', padding: '8px 12px', fontSize: '13px' }} />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Stylist</th>
              <th>Schedule</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(booking => (
              <tr key={booking.id}>
                <td>
                  <strong>{booking.customer}</strong>
                  <div style={{ fontSize: '11px', color: '#666' }}>{booking.email}</div>
                </td>
                <td>{booking.service}</td>
                <td>{booking.stylist}</td>
                <td>
                  <div>{new Date(booking.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>{booking.time}</div>
                </td>
                <td>₦{booking.price.toLocaleString()}</td>
                <td>
                  <span className={`${styles.status} ${styles[`status${booking.status}`] || styles.statusPending}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <select 
                    className="form-input" 
                    style={{ padding: '4px 8px', fontSize: '11px', width: 'auto' }}
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Confirmed">Set Confirmed</option>
                    <option value="Done">Set Done</option>
                    <option value="Cancelled">Set Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

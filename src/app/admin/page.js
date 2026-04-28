'use client';

import styles from './admin.module.css';

export default function AdminOverview() {
  return (
    <div>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Revenue (MTD)</span>
          <span className={styles.statValue}>₦1,250,000</span>
          <span className={`${styles.statTrend} ${styles.trendUp}`}>+12.5% vs last month</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active Bookings</span>
          <span className={styles.statValue}>48</span>
          <span className={`${styles.statTrend} ${styles.trendUp}`}>+5 today</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Product Sales</span>
          <span className={styles.statValue}>124</span>
          <span className={`${styles.statTrend} ${styles.trendDown}`}>-2.4% vs last month</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Avg. Service Time</span>
          <span className={styles.statValue}>3.2h</span>
          <span className={styles.statTrend}>Optimal range</span>
        </div>
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase' }}>Recent Bookings</h2>
          <button className={styles.viewAll}>View All Bookings</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Stylist</th>
              <th>Date/Time</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Chioma Okoro</strong></td>
              <td>Knotless Braids</td>
              <td>Aisha Bello</td>
              <td>28 Apr, 10:00 AM</td>
              <td>₦30,000</td>
              <td><span className={`${styles.status} ${styles.statusPending}`}>Pending</span></td>
            </tr>
            <tr>
              <td><strong>Bisi Akindele</strong></td>
              <td>Silk Press</td>
              <td>Ngozi Okafor</td>
              <td>28 Apr, 01:30 PM</td>
              <td>₦18,000</td>
              <td><span className={`${styles.status} ${styles.statusDone}`}>Confirmed</span></td>
            </tr>
            <tr>
              <td><strong>Teni Makanaki</strong></td>
              <td>Goddess Locs</td>
              <td>Aisha Bello</td>
              <td>29 Apr, 09:00 AM</td>
              <td>₦35,000</td>
              <td><span className={`${styles.status} ${styles.statusPending}`}>Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
        <div className={styles.card}>
          <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>Top Stylists</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Aisha Bello</span>
              <strong>32 Bookings</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Ngozi Okafor</span>
              <strong>24 Bookings</strong>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 'var(--space-lg)' }}>Inventory Alerts</h2>
          <div style={{ color: 'var(--color-error)', fontSize: '12px', fontWeight: 700 }}>
            ⚠️ Braid Sheen Spray: Low Stock (5 left)
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className={styles.sectionTitle}>DASHBOARD OVERVIEW</h1>
      
      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Next Booking</span>
          <span className={styles.statValue}>15 May, 2026</span>
          <span className={styles.statSub}>Knotless Braids · 10:00 AM</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Recent Order</span>
          <span className={styles.statValue}>#BRD-7X2A</span>
          <span className={styles.statSub}>Shipped · ₦8,500</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Rewards</span>
          <span className={styles.statValue}>450 Pts</span>
          <span className={styles.statSub}>Level: Silver</span>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.subTitle}>UPCOMING BOOKINGS</h2>
          <Link href="/dashboard/bookings" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.listCard}>
          <div className={styles.listItem}>
            <div className={styles.itemDate}>
              <span className={styles.day}>15</span>
              <span className={styles.month}>MAY</span>
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>Knotless Braids</span>
              <span className={styles.itemMeta}>with Aisha Bello · 10:00 AM</span>
            </div>
            <div className={styles.itemStatus}>Upcoming</div>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.subTitle}>RECENT ORDERS</h2>
          <Link href="/dashboard/orders" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.listCard}>
          <div className={styles.listItem}>
            <div className={styles.itemIcon}>🛍</div>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>Edge Control Gel, Braid Sheen...</span>
              <span className={styles.itemMeta}>Order #BRD-7X2A · 28 Apr, 2026</span>
            </div>
            <div className={styles.itemStatus}>Shipped</div>
          </div>
        </div>
      </div>
    </div>
  );
}

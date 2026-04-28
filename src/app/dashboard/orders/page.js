'use client';

import styles from '../dashboard.module.css';

const MY_ORDERS = [
  { id: 'ORD-7X2A', items: 'Edge Control Gel, Braid Sheen Spray', date: '2026-04-28', total: 8500, status: 'Shipped' },
  { id: 'ORD-1K99', items: 'Satin Hair Bonnet', date: '2026-03-15', total: 2500, status: 'Delivered' },
];

export default function MyOrders() {
  return (
    <div>
      <h1 className={styles.sectionTitle}>ORDER HISTORY</h1>
      
      <div className={styles.listCard}>
        {MY_ORDERS.map((order) => (
          <div key={order.id} className={styles.listItem}>
            <div className={styles.itemIcon}>🛍</div>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>{order.items}</span>
              <span className={styles.itemMeta}>Order #{order.id} · {new Date(order.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 800, marginBottom: '8px' }}>₦{order.total.toLocaleString()}</div>
              <div className={styles.itemStatus}>{order.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import styles from './dashboard.module.css';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !user) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Dashboard...</div>;
  }

  const menuItems = [
    { label: 'Overview', href: '/dashboard', icon: '⌂' },
    { label: 'My Bookings', href: '/dashboard/bookings', icon: '📅' },
    { label: 'Order History', href: '/dashboard/orders', icon: '🛍' },
    { label: 'Profile Settings', href: '/dashboard/profile', icon: '👤' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <div className={styles.grid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>{user?.full_name?.charAt(0) || 'U'}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.full_name || 'Guest User'}</span>
                <span className={styles.userRole}>{user?.role || 'Customer'}</span>
              </div>
            </div>
            
            <nav className={styles.nav}>
              {menuItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <span className={styles.navIcon}>⎗</span> Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

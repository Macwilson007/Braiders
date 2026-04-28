'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !user || user.role !== 'admin') {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>Verifying Admin Access...</div>;
  }

  const menuItems = [
    { label: 'Overview', href: '/admin', icon: '📊' },
    { label: 'Bookings', href: '/admin/bookings', icon: '📅' },
    { label: 'Products', href: '/admin/products', icon: '🛍' },
    { label: 'Customers', href: '/admin/customers', icon: '👥' },
    { label: 'Chatbot Logs', href: '/admin/chatbot', icon: '🤖' },
    { label: 'Settings', href: '/admin/settings', icon: '⚙' },
  ];

  return (
    <div className={styles.admin}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link href="/">BRAIDERS <span>ADMIN</span></Link>
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
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>⎗ Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>{menuItems.find(i => i.href === pathname)?.label || 'Admin'}</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminInfo}>
              <span>{user?.full_name || 'Admin'} ({user?.role})</span>
              <div className={styles.adminAvatar}>{user?.full_name?.charAt(0) || 'A'}</div>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

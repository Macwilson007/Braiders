'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { logout } = useAuth();

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
          <button onClick={logout} className={styles.logoutBtn}>⎗ Logout</button>
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
              <span>Aisha Bello (Owner)</span>
              <div className={styles.adminAvatar}>A</div>
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

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV_ITEMS = [
  {
    label: 'Services',
    href: '/services',
    megaMenu: {
      sections: [
        {
          title: 'Braiding',
          links: [
            { label: 'Box Braids', href: '/services#box-braids' },
            { label: 'Knotless Braids', href: '/services#knotless-braids' },
            { label: 'Cornrows', href: '/services#cornrows' },
            { label: 'Goddess Locs', href: '/services#goddess-locs' },
            { label: 'Fulani Braids', href: '/services#fulani-braids' },
            { label: 'Twist Braids', href: '/services#twist-braids' },
          ],
        },
        {
          title: 'Styling',
          links: [
            { label: 'Silk Press', href: '/services#silk-press' },
            { label: 'Blowout', href: '/services#blowout' },
            { label: 'Updo', href: '/services#updo' },
            { label: 'Bridal Styling', href: '/services#bridal' },
            { label: 'Kids Styling', href: '/services#kids' },
          ],
        },
        {
          title: 'Treatments',
          links: [
            { label: 'Deep Conditioning', href: '/services#deep-conditioning' },
            { label: 'Scalp Treatment', href: '/services#scalp-treatment' },
            { label: 'Protein Treatment', href: '/services#protein-treatment' },
            { label: 'Hot Oil Treatment', href: '/services#hot-oil' },
          ],
        },
        {
          title: 'Coloring',
          links: [
            { label: 'Full Color', href: '/services#full-color' },
            { label: 'Highlights', href: '/services#highlights' },
            { label: 'Balayage', href: '/services#balayage' },
          ],
        },
      ],
      featured: {
        title: 'Most Popular',
        subtitle: 'Knotless Braids',
        description: 'Lightweight, natural-looking braids that protect your hair.',
        href: '/services#knotless-braids',
        image: '/images/knotless_braids.png',
      },
    },
  },
  {
    label: 'Book Now',
    href: '/booking',
    megaMenu: null,
  },
  {
    label: 'Store',
    href: '/shop',
    megaMenu: {
      sections: [
        {
          title: 'Hair Care',
          links: [
            { label: 'Oils & Serums', href: '/shop?category=oils' },
            { label: 'Shampoo & Conditioner', href: '/shop?category=care' },
            { label: 'Leave-in Treatments', href: '/shop?category=treatments' },
          ],
        },
        {
          title: 'Extensions',
          links: [
            { label: 'Braiding Hair', href: '/shop?category=extensions' },
            { label: 'Crochet Hair', href: '/shop?category=crochet' },
            { label: 'Clip-ins', href: '/shop?category=clipins' },
          ],
        },
        {
          title: 'Accessories',
          links: [
            { label: 'Hair Jewelry', href: '/shop?category=jewelry' },
            { label: 'Bonnets & Wraps', href: '/shop?category=bonnets' },
            { label: 'Combs & Brushes', href: '/shop?category=tools' },
          ],
        },
      ],
      featured: {
        title: 'New Arrival',
        subtitle: 'Silk Edge Control',
        description: 'Professional-grade hold for flawless edges.',
        href: '/shop',
        image: '/images/braid_1.jpg',
      },
    },
  },
  {
    label: 'About',
    href: '/about',
    megaMenu: null,
  },
  {
    label: 'Contact',
    href: '/contact',
    megaMenu: null,
  },
];

export default function Header() {
  const [activeMega, setActiveMega] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const headerRef = useRef(null);
  const timeoutRef = useRef(null);

  const isAdmin = pathname?.startsWith('/admin');
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMegaEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActiveMega(index);
  };

  const handleMegaLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  if (isAdmin || isDashboard) return null;

  return (
    <>
      {/* Marquee Banner */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.marqueeGroup}>
              <span>Free Delivery on Orders Over ₦30,000</span>
              <span className={styles.marqueeDot}>✦</span>
              <span>Book Online & Get 10% Off Your First Visit</span>
              <span className={styles.marqueeDot}>✦</span>
              <span>Premium Hair Products Now Available</span>
              <span className={styles.marqueeDot}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <img src="/images/logo.png" alt="Braiders" className={styles.logoImg} />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {NAV_ITEMS.map((item, index) => (
              <div
                key={item.label}
                className={styles.navItemWrapper}
                onMouseEnter={() => item.megaMenu && handleMegaEnter(index)}
                onMouseLeave={handleMegaLeave}
              >
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                  {item.megaMenu && (
                    <svg className={`${styles.chevron} ${activeMega === index ? styles.chevronOpen : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <Link href="/login" className={styles.actionBtn} aria-label="Account">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <Link href="/cart" className={styles.actionBtn} aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>

            {/* Mobile Toggle */}
            <button
              className={`${styles.mobileToggle} ${mobileOpen ? styles.mobileToggleOpen : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mega Menu Panels */}
        {NAV_ITEMS.map((item, index) =>
          item.megaMenu && activeMega === index ? (
            <div
              key={`mega-${index}`}
              className={styles.megaMenu}
              onMouseEnter={() => handleMegaEnter(index)}
              onMouseLeave={handleMegaLeave}
            >
              <div className={styles.megaInner}>
                <div className={styles.megaSections}>
                  {item.megaMenu.sections.map((section) => (
                    <div key={section.title} className={styles.megaSection}>
                      <h3 className={styles.megaSectionTitle}>{section.title}</h3>
                      <ul className={styles.megaLinks}>
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} className={styles.megaLink}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {item.megaMenu.featured && (
                  <div className={styles.megaFeatured}>
                    <div className={styles.megaFeaturedImage}>
                      <img src={item.megaMenu.featured.image} alt={item.megaMenu.featured.subtitle} className={styles.megaImg} />
                    </div>
                    <div className={styles.megaFeaturedContent}>
                      <span className={styles.megaFeaturedLabel}>{item.megaMenu.featured.title}</span>
                      <h4 className={styles.megaFeaturedTitle}>{item.megaMenu.featured.subtitle}</h4>
                      <p className={styles.megaFeaturedDesc}>{item.megaMenu.featured.description}</p>
                      <Link href={item.megaMenu.featured.href} className={styles.megaFeaturedLink}>
                        Explore →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <hr className={styles.mobileDivider} />
              <Link href="/login" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link href="/register" className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                Create Account
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

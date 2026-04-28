'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

const FEATURED_SERVICES = [
  {
    id: 1,
    name: 'Knotless Braids',
    description: 'Lightweight, tension-free braids for a natural, seamless look.',
    price: '₦25,000',
    duration: '3-5 hours',
    image: '/images/knotless_braids.png',
  },
  {
    id: 2,
    name: 'Cornrows',
    description: 'Classic and creative cornrow patterns for every occasion.',
    price: '₦15,000',
    duration: '2-3 hours',
    image: '/images/cornrows.png',
  },
  {
    id: 3,
    name: 'Goddess Locs',
    description: 'Bohemian-inspired locs with a soft, romantic finish.',
    price: '₦30,000',
    duration: '4-6 hours',
    image: '/images/goddess_locs.png',
  },
  {
    id: 4,
    name: 'Silk Press',
    description: 'Sleek, silky straight hair without the damage.',
    price: '₦18,000',
    duration: '1.5-2 hours',
    image: '/images/silk_press.png',
  },
];

const VALUES = [
  {
    icon: '✦',
    title: 'Expert Braiders',
    text: 'Our stylists bring years of experience and a deep love for African hair artistry to every appointment.',
  },
  {
    icon: '◆',
    title: 'Premium Products',
    text: 'We use only the finest hair products to protect, nourish, and elevate your natural beauty.',
  },
  {
    icon: '●',
    title: 'Relaxing Space',
    text: 'Step into a calm, beautifully designed salon where you can unwind while we work our magic.',
  },
  {
    icon: '▲',
    title: 'Easy Booking',
    text: 'Book your appointment online in seconds. Flexible scheduling that works around your life.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Adaeze O.',
    text: 'Braiders completely transformed my look. The knotless braids were so light and natural — I got compliments everywhere I went.',
    service: 'Knotless Braids',
  },
  {
    name: 'Funke A.',
    text: 'The best salon experience I\'ve ever had in Lagos. Professional, welcoming, and the results speak for themselves.',
    service: 'Goddess Locs',
  },
  {
    name: 'Chidinma E.',
    text: 'I\'ve been coming here for six months now and I refuse to go anywhere else. My hair has never been healthier.',
    service: 'Deep Conditioning',
  },
];

export default function HomePage() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className={styles.home}>
      {/* === HERO SECTION === */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          {/* Main Hero */}
          <div className={styles.heroMain}>
            <div className={styles.heroImageWrapper}>
              <img src="/images/braids_bg.jpg" alt="Braiders Salon" className={styles.heroImage} />
              <div className={styles.heroContent}>
                <span className={styles.heroLabel}>Lagos&apos;s Premier Hair Studio</span>
                <h1 className={styles.heroTitle}>WHERE EVERY STRAND TELLS A STORY</h1>
                <p className={styles.heroSubtitle}>
                  Expert braiding, styling, and treatments that celebrate the beauty of African hair.
                </p>
                <div className={styles.heroCtas}>
                  <Link href="/booking" className="btn btn-white btn-lg">Book Now</Link>
                  <Link href="/services" className="btn btn-secondary btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className={styles.heroSide}>
            <div className={styles.heroCard}>
              <img src="/images/knotless_braids.png" alt="Trending" className={styles.heroCardImage} />
              <div className={styles.heroCardOverlay}>
                <span className={styles.heroCardLabel}>Trending</span>
                <h3 className={styles.heroCardTitle}>Knotless Braids</h3>
                <Link href="/services#knotless-braids" className={styles.heroCardLink}>Shop the Look →</Link>
              </div>
            </div>
            <div className={styles.heroCard}>
              <img src="/images/goddess_locs.png" alt="New" className={styles.heroCardImage} />
              <div className={styles.heroCardOverlay}>
                <span className={styles.heroCardLabel}>New</span>
                <h3 className={styles.heroCardTitle}>Goddess Locs</h3>
                <Link href="/services#goddess-locs" className={styles.heroCardLink}>Discover →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
      <section className={`section ${styles.values}`} ref={addRevealRef}>
        <div className="container">
          <div className={`section-header text-center ${styles.valuesHeader}`}>
            <span className="section-label">Why Braiders</span>
            <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)' }}>
              THE BRAIDERS DIFFERENCE
            </h2>
          </div>
          <div className={`grid grid-4 ${styles.valuesGrid}`}>
            {VALUES.map((value, i) => (
              <div key={value.title} className={`reveal ${styles.valueCard}`} ref={addRevealRef} style={{ animationDelay: `${i * 100}ms` }}>
                <span className={styles.valueIcon}>{value.icon}</span>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueText}>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURED SERVICES === */}
      <section className={`section ${styles.services}`} ref={addRevealRef}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="section-label">Our Services</span>
              <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)' }}>
                SIGNATURE STYLES
              </h2>
            </div>
            <Link href="/services" className="btn btn-secondary btn-sm">View All Services</Link>
          </div>
          <div className={`grid grid-4 ${styles.servicesGrid}`}>
            {FEATURED_SERVICES.map((service, i) => (
              <div key={service.id} className={`card reveal ${styles.serviceCard}`} ref={addRevealRef} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="card-image">
                  <img src={service.image} alt={service.name} className={styles.serviceImage} />
                  <div className="card-overlay">
                    <Link href="/booking" className="btn btn-white btn-sm">Book This</Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-title">{service.name}</div>
                  <div className="card-subtitle">{service.description}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="card-price">{service.price}</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-gray-500)' }}>{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROMO BANNER === */}
      <section className={styles.promoBanner} ref={addRevealRef}>
        <img src="/images/promo.jpg" alt="Promo" className={styles.promoImage} />
        <div className={styles.promoContent}>
          <span className={styles.promoLabel}>Limited Offer</span>
          <h2 className={styles.promoTitle}>FIRST VISIT? GET 10% OFF</h2>
          <p className={styles.promoText}>
            Book your first appointment online and enjoy 10% off any service. 
            Use code <strong>FIRST10</strong> at checkout.
          </p>
          <Link href="/booking" className="btn btn-accent btn-lg">Book Your First Visit</Link>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className={`section ${styles.testimonials}`} ref={addRevealRef}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-label">Client Love</span>
            <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)' }}>
              WHAT THEY SAY
            </h2>
          </div>
          <div className={`grid grid-3 ${styles.testimonialGrid}`}>
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={testimonial.name} className={`reveal ${styles.testimonialCard}`} ref={addRevealRef} style={{ animationDelay: `${i * 150}ms` }}>
                <div className={styles.testimonialQuote}>&ldquo;</div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{testimonial.name.charAt(0)}</div>
                  <div>
                    <strong className={styles.testimonialName}>{testimonial.name}</strong>
                    <span className={styles.testimonialService}>{testimonial.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === SHOP PREVIEW === */}
      <section className={`section section-dark ${styles.shopPreview}`} ref={addRevealRef}>
        <div className="container text-center">
          <span className="section-label" style={{ color: 'var(--color-accent)' }}>The Braiders Store</span>
          <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)', color: 'var(--color-white)', marginBottom: 'var(--space-md)' }}>
            PREMIUM HAIR PRODUCTS
          </h2>
          <p style={{ color: 'var(--color-gray-500)', maxWidth: '560px', margin: '0 auto var(--space-2xl)' }}>
            From nourishing oils to professional-grade styling products — everything you need to maintain your look between visits.
          </p>
          <Link href="/shop" className="btn btn-accent btn-lg">Shop Now</Link>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className={styles.finalCta} ref={addRevealRef}>
        <div className="container text-center">
          <h2 className="heading-display" style={{ fontSize: 'var(--fs-4xl)', marginBottom: 'var(--space-md)' }}>
            READY FOR YOUR NEXT LOOK?
          </h2>
          <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--color-gray-700)', maxWidth: '500px', margin: '0 auto var(--space-2xl)' }}>
            Book your appointment today and let our expert stylists bring your vision to life.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" className="btn btn-primary btn-lg">Book Appointment</Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

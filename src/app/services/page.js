'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './services.module.css';

const SERVICES = {
  braiding: [
    { id: 'box-braids', name: 'Box Braids', description: 'Individual braids sectioned in box-shaped parts. Available in various sizes from micro to jumbo for a versatile, long-lasting protective style.', price: 25000, duration: '3-5 hours', image: '/images/braid_1.jpg' },
    { id: 'knotless-braids', name: 'Knotless Braids', description: 'Feed-in braids that start with your natural hair, eliminating tension at the root. Lightweight, natural-looking, and gentle on your scalp.', price: 30000, duration: '4-6 hours', image: '/images/knotless_braids.png' },
    { id: 'cornrows', name: 'Cornrows', description: 'Classic braids woven close to the scalp in straight lines or creative patterns. Perfect for both everyday wear and special occasions.', price: 15000, duration: '2-3 hours', image: '/images/cornrows.png' },
    { id: 'goddess-locs', name: 'Goddess Locs', description: 'Bohemian-style faux locs with loose, wavy ends for a soft, romantic look. Lightweight and perfect for any season.', price: 35000, duration: '4-6 hours', image: '/images/goddess_locs.png' },
    { id: 'fulani-braids', name: 'Fulani Braids', description: 'Traditional pattern featuring a center cornrow with side braids, often accessorized with beads and cuffs for a regal finish.', price: 20000, duration: '2-4 hours', image: '/images/braid_2.jpg' },
    { id: 'twist-braids', name: 'Twist Braids', description: 'Two-strand twists using natural or synthetic hair. Available as Senegalese twists, Marley twists, or passion twists.', price: 22000, duration: '3-5 hours', image: '/images/braid_1.jpg' },
  ],
  styling: [
    { id: 'silk-press', name: 'Silk Press', description: 'Heat-straightened natural hair with a silky, bouncy finish. Using professional-grade flat irons and heat protectants for zero damage.', price: 18000, duration: '1.5-2 hours', image: '/images/silk_press.png' },
    { id: 'blowout', name: 'Blowout', description: 'Professional blow-dry styling for volume, smoothness, and shine. Perfect for a polished look that lasts for days.', price: 12000, duration: '1-1.5 hours', image: '/images/promo.jpg' },
    { id: 'updo', name: 'Updo', description: 'Elegant upswept hairstyles for special events, weddings, and formal occasions. Custom-designed to complement your outfit and face shape.', price: 20000, duration: '1.5-2 hours', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
    { id: 'bridal', name: 'Bridal Styling', description: 'Complete bridal hair package including trial session, day-of styling, and touch-ups. We create timeless looks for your special day.', price: 50000, duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' },
    { id: 'kids', name: 'Kids Styling', description: 'Gentle, age-appropriate styles for children aged 3-12. From simple braids to creative designs — keeping little ones looking adorable.', price: 8000, duration: '1-2 hours', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
  ],
  treatments: [
    { id: 'deep-conditioning', name: 'Deep Conditioning', description: 'Intensive moisture treatment using professional-grade products to restore hydration, softness, and elasticity to dry or damaged hair.', price: 10000, duration: '45 min', image: 'https://images.unsplash.com/photo-1527799822367-3188572f344b?auto=format&fit=crop&q=80&w=800' },
    { id: 'scalp-treatment', name: 'Scalp Treatment', description: 'Therapeutic scalp massage and treatment to address dryness, flakiness, and promote healthy hair growth from the root.', price: 12000, duration: '45 min', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800' },
    { id: 'protein-treatment', name: 'Protein Treatment', description: 'Strengthening treatment that repairs broken bonds in the hair shaft, reducing breakage and improving overall hair resilience.', price: 15000, duration: '1 hour', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' },
    { id: 'hot-oil', name: 'Hot Oil Treatment', description: 'Warm oil infusion using natural oils like coconut, jojoba, and argan to deeply nourish and add intense shine to your hair.', price: 8000, duration: '30 min', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800' },
  ],
  coloring: [
    { id: 'full-color', name: 'Full Color', description: 'Complete color transformation from root to tip. Choose from a wide spectrum of shades for a bold new look.', price: 25000, duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
    { id: 'highlights', name: 'Highlights', description: 'Strategic color placement to add dimension, movement, and brightness to your hair. Foil or balayage technique available.', price: 20000, duration: '2-3 hours', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
    { id: 'balayage', name: 'Balayage', description: 'Hand-painted color technique for a natural, sun-kissed gradient effect. Low-maintenance and grows out beautifully.', price: 30000, duration: '2.5-3.5 hours', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
  ],
};

const CATEGORIES = [
  { key: 'braiding', label: 'Braiding' },
  { key: 'styling', label: 'Styling' },
  { key: 'treatments', label: 'Treatments' },
  { key: 'coloring', label: 'Coloring' },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('braiding');
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [activeCategory]);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>What We Offer</span>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff' }}>
            OUR SERVICES
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', fontSize: 'var(--fs-md)' }}>
            From intricate braids to nourishing treatments — discover our full range of expert hair services.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className={styles.tabsWrapper}>
        <div className="container">
          <div className="tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat.key); revealRefs.current = []; }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {SERVICES[activeCategory]?.map((service, i) => (
              <div key={service.id} id={service.id} className={`card reveal ${styles.serviceCard}`} ref={addRef} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="card-image">
                  <img src={service.image} alt={service.name} className={styles.serviceImg} />
                  <div className="card-overlay">
                    <Link href={`/booking?service=${service.id}`} className="btn btn-white btn-sm">Book This</Link>
                  </div>
                </div>
                <div className={styles.serviceBody}>
                  <div className="card-title">{service.name}</div>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <div className={styles.serviceMeta}>
                    <span className={styles.servicePrice}>{formatPrice(service.price)}</span>
                    <span className={styles.serviceDuration}>⏱ {service.duration}</span>
                  </div>
                  <Link href={`/booking?service=${service.id}`} className={styles.serviceLink}>
                    Book Appointment →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)', marginBottom: 'var(--space-md)' }}>
            NOT SURE WHAT YOU NEED?
          </h2>
          <p style={{ color: 'var(--color-gray-700)', maxWidth: '460px', margin: '0 auto var(--space-2xl)' }}>
            Our stylists are happy to help you find the perfect style. Book a free consultation today.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/booking" className="btn btn-primary btn-lg">Book Consultation</Link>
            <Link href="/contact" className="btn btn-secondary btn-lg">Chat With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

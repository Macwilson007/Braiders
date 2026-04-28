'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './about.module.css';

const TEAM = [
  { name: 'Aisha Bello', title: 'Founder & Lead Braider', specialty: 'Knotless Braids, Cornrows', bio: 'With over 12 years of experience, Aisha founded Braiders to celebrate the art and culture of African hair.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800' },
  { name: 'Ngozi Okafor', title: 'Senior Stylist', specialty: 'Goddess Locs, Twist Styles', bio: 'Ngozi is a master of protective styling, bringing creativity and precision to every client.', image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Fatima Yusuf', title: 'Color Specialist', specialty: 'Balayage, Full Color', bio: 'Fatima transforms hair with color — from subtle highlights to bold, head-turning looks.', image: 'https://images.unsplash.com/photo-1610424564205-728c313279da?auto=format&fit=crop&q=80&w=800' },
  { name: 'Blessing Eze', title: 'Treatment Expert', specialty: 'Scalp Care, Deep Conditioning', bio: 'Blessing focuses on hair health, ensuring every client leaves with stronger, nourished hair.', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
];

const STATS = [
  { number: '8+', label: 'Years of Excellence' },
  { number: '12,000+', label: 'Happy Clients' },
  { number: '30+', label: 'Services Offered' },
  { number: '15', label: 'Expert Stylists' },
];

export default function AboutPage() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className={styles.about}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <img src="/images/braids_bg.jpg" alt="Salon Interior" className={styles.heroImage} />
          <div className={styles.heroContent}>
            <span className={styles.heroLabel}>Our Story</span>
            <h1 className="heading-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff' }}>
              BORN FROM A LOVE OF AFRICAN HAIR
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section" ref={addRef}>
        <div className="container">
          <div className={`reveal ${styles.storyGrid}`} ref={addRef}>
            <div className={styles.storyContent}>
              <span className="section-label">Who We Are</span>
              <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)', marginBottom: 'var(--space-lg)' }}>
                MORE THAN A SALON
              </h2>
              <p className={styles.storyText}>
                Braiders was born in the heart of Lagos from a simple belief: every woman deserves to feel extraordinary. 
                Founded by Aisha Bello in 2018, we started as a small braiding studio in Lekki with a big vision — 
                to create a space where African hair artistry is celebrated, perfected, and made accessible to every woman 
                who walks through our doors.
              </p>
              <p className={styles.storyText}>
                Today, we are one of Lagos&apos;s most sought-after hair studios, known for our expert braiders, 
                warm atmosphere, and unwavering commitment to quality. Every braid we weave, every style we create, 
                is a tribute to the rich heritage of African hair culture.
              </p>
              <p className={styles.storyText}>
                We don&apos;t just style hair — we build confidence, one strand at a time.
              </p>
            </div>
            <div className={styles.storyImage}>
               <img src="/images/braid_1.jpg" alt="Braiders Story" className={styles.storyImg} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats} ref={addRef}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`reveal ${styles.statCard}`} ref={addRef} style={{ animationDelay: `${i * 100}ms` }}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`section ${styles.mission}`} ref={addRef}>
        <div className="container-narrow text-center">
          <span className="section-label">Our Mission</span>
          <h2 className={`heading-elegant ${styles.missionTitle}`}>
            &ldquo;To celebrate and elevate the beauty of African hair through expert artistry, 
            premium care, and a welcoming space where every client feels like royalty.&rdquo;
          </h2>
        </div>
      </section>

      {/* Team */}
      <section className="section" ref={addRef}>
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <span className="section-label">The Team</span>
            <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)' }}>MEET YOUR STYLISTS</h2>
          </div>
          <div className="grid grid-4">
            {TEAM.map((member, i) => (
              <div key={member.name} className={`card reveal ${styles.teamCard}`} ref={addRef} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="card-image">
                  <img src={member.image} alt={member.name} className={styles.teamImg} />
                </div>
                <div className="card-body">
                  <div className="card-title">{member.name}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    {member.title}
                  </div>
                  <div className="card-subtitle">{member.bio}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-gray-500)', marginTop: '8px' }}>
                    Specializes in: {member.specialty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container text-center">
          <h2 className="heading-display" style={{ fontSize: 'var(--fs-3xl)', color: '#fff', marginBottom: 'var(--space-lg)' }}>
            EXPERIENCE THE DIFFERENCE
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto var(--space-2xl)' }}>
            Book your appointment today and discover why thousands of women trust Braiders with their hair.
          </p>
          <Link href="/booking" className="btn btn-accent btn-lg">Book Now</Link>
        </div>
      </section>
    </div>
  );
}

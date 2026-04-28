'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './shop.module.css';

const PRODUCTS = [
  { id: 'braid-sheen-spray', name: 'Braid Sheen Spray', category: 'Hair Care', price: 4500, rating: 4.8, description: 'Moisturizes and shines braids, twists, and locs.', image: '/images/sheen_spray.png' },
  { id: 'edge-control-gel', name: 'Edge Control Gel', category: 'Styling', price: 3500, rating: 4.9, description: 'Long-lasting hold for sleek edges without flaking.', image: '/images/braid_1.jpg' },
  { id: 'scalp-oil-treatment', name: 'Scalp Oil Treatment', category: 'Treatments', price: 6000, rating: 4.7, description: 'Nourishing blend of oils to promote scalp health.', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800' },
  { id: 'satin-hair-bonnet', name: 'Satin Hair Bonnet', category: 'Accessories', price: 2500, rating: 4.6, description: 'Protects your style while you sleep.', image: '/images/braid_2.jpg' },
  { id: 'detangling-brush', name: 'Detangling Brush', category: 'Tools', price: 3000, rating: 4.5, description: 'Gentle detangling for all hair types.', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800' },
  { id: 'hair-growth-serum', name: 'Hair Growth Serum', category: 'Treatments', price: 8500, rating: 4.9, description: 'Concentrated formula to stimulate follicles.', image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800' },
  { id: 'moisturizing-shampoo', name: 'Moisturizing Shampoo', category: 'Hair Care', price: 5500, rating: 4.7, description: 'Sulfate-free cleansing for natural hair.', image: 'https://images.unsplash.com/photo-1585232350744-974ba66c6d6b?auto=format&fit=crop&q=80&w=800' },
  { id: 'leave-in-conditioner', name: 'Leave-In Conditioner', category: 'Hair Care', price: 5000, rating: 4.8, description: 'Daily hydration and detangling.', image: 'https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=800' },
];

const SHOP_CATEGORIES = ['All', 'Hair Care', 'Styling', 'Treatments', 'Accessories', 'Tools'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const { addToCart } = useCart();
  const revealRefs = useRef([]);

  const filteredProducts = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

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
  }, [activeCategory]);

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div className={styles.shop}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Premium Hair Care</span>
          <h1 className="heading-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff' }}>THE SHOP</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px' }}>
            Curated products for your hair journey. From professional-grade treatments to essential accessories.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterInner}>
            <div className={styles.categories}>
              {SHOP_CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
                  onClick={() => { setActiveCategory(cat); revealRefs.current = []; }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className={styles.sort}>
              <select 
                className={styles.sortSelect}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {filteredProducts.map((product, i) => (
              <div 
                key={product.id} 
                className={`card reveal ${styles.productCard}`} 
                ref={addRef}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Link href={`/shop/${product.id}`} className={styles.imageLink}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                  ) : (
                    <div className={styles.productImagePlaceholder} />
                  )}
                  <div className={styles.hoverActions}>
                    <button 
                      className="btn btn-white btn-sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      Quick Add
                    </button>
                  </div>
                </Link>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category}</span>
                  <Link href={`/shop/${product.id}`} className={styles.productName}>
                    {product.name}
                  </Link>
                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>₦{product.price.toLocaleString()}</span>
                    <span className={styles.productRating}>★ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className={styles.promo}>
        <div className="container">
          <div className={styles.promoCard}>
            <div className={styles.promoText}>
              <span className={styles.promoLabel}>Join Our Club</span>
              <h2 className="heading-display" style={{ color: '#fff', fontSize: 'var(--fs-2xl)' }}>GET 15% OFF YOUR FIRST ORDER</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 'var(--space-xl)' }}>
                Subscribe to our newsletter for exclusive deals and hair care tips.
              </p>
              <form className={styles.promoForm}>
                <input type="email" placeholder="your@email.com" className="form-input" required />
                <button type="submit" className="btn btn-accent">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

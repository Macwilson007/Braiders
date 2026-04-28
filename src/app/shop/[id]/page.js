'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './product.module.css';

const PRODUCTS = [
  { id: 'braid-sheen-spray', name: 'Braid Sheen Spray', category: 'Hair Care', price: 4500, rating: 4.8, reviews: 124, description: 'Moisturizes and shines braids, twists, and locs. Formulated with natural oils to prevent itching and soothe the scalp.', usage: 'Spray evenly over hair. Use daily for best results.', ingredients: 'Water, Glycerin, Aloe Vera, Peppermint Oil, Tea Tree Oil, Fragrance.', image: null },
  { id: 'edge-control-gel', name: 'Edge Control Gel', category: 'Styling', price: 3500, rating: 4.9, reviews: 89, description: 'Long-lasting hold for sleek edges without flaking. Perfect for natural and relaxed hair.', usage: 'Apply a small amount to edges and smooth with an edge brush or fingertips.', ingredients: 'Water, Ceteareth-25, PEG-7 Glyceryl Cocoate, Propylene Glycol, Castor Oil.', image: null },
  { id: 'scalp-oil-treatment', name: 'Scalp Oil Treatment', category: 'Treatments', price: 6000, rating: 4.7, reviews: 56, description: 'Nourishing blend of oils to promote scalp health and stimulate hair growth.', usage: 'Apply directly to scalp and massage gently. Use 2-3 times per week.', ingredients: 'Jojoba Oil, Argan Oil, Rosemary Extract, Vitamin E.', image: null },
];

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    setProduct(found || PRODUCTS[0]); // Default for demo
  }, [id]);

  if (!product) return <div className="container" style={{ padding: '100px 0' }}>Loading...</div>;

  return (
    <div className={styles.productPage}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs}>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop?cat=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span className={styles.current}>{product.name}</span>
        </nav>

        <div className={styles.productGrid}>
          {/* Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImagePlaceholder} />
            <div className={styles.thumbnails}>
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.thumbPlaceholder} />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className={styles.details}>
            <span className={styles.categoryLabel}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.ratingRow}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.reviewCount}>({product.reviews} reviews)</span>
            </div>
            <div className={styles.price}>₦{product.price.toLocaleString()}</div>
            
            <p className={styles.shortDesc}>{product.description}</p>

            <div className={styles.actions}>
              <div className={styles.quantity}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button 
                className="btn btn-primary btn-lg btn-full"
                onClick={() => addToCart(product, quantity)}
              >
                Add to Cart
              </button>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <strong>SKU:</strong> <span>BRD-{product.id.slice(0,4).toUpperCase()}</span>
              </div>
              <div className={styles.metaItem}>
                <strong>Availability:</strong> <span className={styles.stock}>In Stock</span>
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
              <div className={styles.tabHeaders}>
                {['description', 'usage', 'ingredients'].map(tab => (
                  <button 
                    key={tab} 
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'usage' && <p>{product.usage}</p>}
                {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className="container text-center">
          <h1 className="heading-display">YOUR BAG IS EMPTY</h1>
          <p style={{ color: 'var(--color-gray-500)', margin: 'var(--space-lg) 0 var(--space-2xl)' }}>
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg">Explore Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className="container">
        <h1 className="heading-display" style={{ marginBottom: 'var(--space-3xl)' }}>YOUR BAG</h1>

        <div className={styles.cartGrid}>
          {/* List */}
          <div className={styles.cartList}>
            <div className={styles.listHeader}>
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.productInfo}>
                  <div className={styles.itemImagePlaceholder} />
                  <div>
                    <Link href={`/shop/${item.id}`} className={styles.itemName}>{item.name}</Link>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
                <div className={styles.quantityCol}>
                  <div className={styles.quantity}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className={styles.totalCol}>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>ORDER SUMMARY</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <Link href="/checkout" className="btn btn-primary btn-full btn-lg" style={{ marginTop: 'var(--space-xl)' }}>
                Checkout Now
              </Link>
              <p className={styles.summaryHelp}>
                Free delivery on orders above ₦50,000 within Lagos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

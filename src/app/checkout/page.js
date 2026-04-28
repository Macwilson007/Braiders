'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Lagos',
    state: 'Lagos',
  });

  const total = getCartTotal();
  const delivery = total > 50000 ? 0 : 2500;
  const grandTotal = total + delivery;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock Paystack integration
    console.log('Initiating Paystack payment for:', grandTotal);
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    router.push('/checkout/success?ref=' + Math.random().toString(36).substring(7).toUpperCase());
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  if (cart.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '100px 0' }}>
        <h1 className="heading-display">NOTHING TO CHECKOUT</h1>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <h1 className="heading-display" style={{ marginBottom: 'var(--space-3xl)' }}>CHECKOUT</h1>
        
        <div className={styles.checkoutGrid}>
          {/* Form */}
          <div className={styles.shippingSection}>
            <form id="checkout-form" onSubmit={handlePayment}>
              <h2 className={styles.sectionTitle}>SHIPPING INFORMATION</h2>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input type="text" className="form-input" value={form.address} onChange={(e) => update('address', e.target.value)} required />
              </div>

              <div className={styles.formRow}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" value={form.city} readOnly />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" value={form.state} readOnly />
                </div>
              </div>

              <div className={styles.paymentNotice}>
                <h3 className={styles.noticeTitle}>Secure Payment via Paystack</h3>
                <p>You will be redirected to the secure Paystack portal to complete your payment via Bank Transfer, Card, or USSD.</p>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                {loading ? 'Processing...' : `Pay ₦${grandTotal.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>YOUR ORDER</h2>
              <div className={styles.itemList}>
                {cart.map(item => (
                  <div key={item.id} className={styles.itemRow}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemQty}>Qty: {item.quantity}</span>
                    </div>
                    <span className={styles.itemPrice}>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE' : `₦${delivery.toLocaleString()}`}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Grand Total</span>
                  <span>₦{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

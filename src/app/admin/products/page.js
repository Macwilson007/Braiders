'use client';

import { useState } from 'react';
import styles from '../admin.module.css';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Braid Sheen Spray', category: 'Hair Care', price: 4500, stock: 5, status: 'Active' },
  { id: '2', name: 'Edge Control Gel', category: 'Styling', price: 3500, stock: 42, status: 'Active' },
  { id: '3', name: 'Scalp Oil Treatment', category: 'Treatments', price: 6000, stock: 18, status: 'Active' },
  { id: '4', name: 'Satin Hair Bonnet', category: 'Accessories', price: 2500, stock: 0, status: 'Out of Stock' },
];

export default function AdminProducts() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-xl)' }}>
        <button className="btn btn-primary btn-sm">+ Add New Product</button>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><strong>{product.name}</strong></td>
                <td>{product.category}</td>
                <td>₦{product.price.toLocaleString()}</td>
                <td>
                  <span style={{ color: product.stock < 10 ? 'var(--color-error)' : 'inherit', fontWeight: product.stock < 10 ? '700' : 'normal' }}>
                    {product.stock} units
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${product.stock > 0 ? styles.statusDone : styles.statusPending}`}>
                    {product.stock > 0 ? 'Active' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', fontSize: '11px', fontWeight: 700, textDecoration: 'underline', color: 'var(--color-error)', cursor: 'pointer' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

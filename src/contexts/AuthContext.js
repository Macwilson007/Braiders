'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('braiders_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('braiders_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // TODO: Replace with Supabase auth
    // For now, simulate auth for development
    const userData = {
      id: crypto.randomUUID(),
      email,
      full_name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'customer',
      phone: '',
      avatar_url: null,
      created_at: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('braiders_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (data) => {
    // TODO: Replace with Supabase auth
    const userData = {
      id: crypto.randomUUID(),
      email: data.email,
      full_name: data.fullName,
      role: 'customer',
      phone: data.phone || '',
      avatar_url: null,
      created_at: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('braiders_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('braiders_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('braiders_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

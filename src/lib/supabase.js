import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. App will run in mock mode.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

/**
 * DATABASE SCHEMA (REFERENCE)
 * 
 * profiles: id, full_name, phone, role (customer/admin), created_at
 * services: id, name, category, price, duration, description
 * bookings: id, user_id, service_id, stylist_id, date, time, status, notes, created_at
 * products: id, name, category, price, stock, description, image_url
 * orders: id, user_id, total, status, delivery_address, items (jsonb), created_at
 * chatbot_logs: id, user_id, message, response, platform (web/whatsapp), created_at
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://atrrgofhzoyybqrazwwg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0cnJnb2Zoem95eWJxcmF6d3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMzgzMDksImV4cCI6MjA3NzgxNDMwOX0.03ZCVel_LWA-PywDjzwf_YJW_QBkLSTdlADSf7iPRPc";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  image_url: string;
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  thumbnail_url: string;
  category: string;
  description?: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_photo?: string;
  rating: number;
  feedback: string;
  service_type: string;
  date: string;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  slug: string;
  price: string;
  duration: string;
  photos_count: string;
  features: string[];
  is_popular: boolean;
  display_order: number;
  created_at: string;
}

export interface Booking {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  event_date: string;
  message?: string;
}
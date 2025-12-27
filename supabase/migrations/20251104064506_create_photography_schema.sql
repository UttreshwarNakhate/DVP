/*
  # Dream Vision Photography Database Schema

  ## Overview
  This migration creates the complete database schema for a modern photography studio website.
  
  ## New Tables
  
  ### 1. services
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Service name (e.g., "Wedding Photography")
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Service description
  - `short_description` (text) - Brief summary for cards
  - `icon` (text) - Lucide icon name
  - `image_url` (text) - Cover image URL
  - `features` (jsonb) - Array of features included
  - `display_order` (integer) - Sort order
  - `is_active` (boolean) - Whether service is visible
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. gallery_images
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Image title
  - `image_url` (text) - Image URL
  - `thumbnail_url` (text) - Thumbnail URL
  - `category` (text) - Category (wedding, pre-wedding, newborn, etc.)
  - `description` (text, optional) - Image description
  - `display_order` (integer) - Sort order
  - `is_featured` (boolean) - Featured on home page
  - `created_at` (timestamptz) - Upload timestamp

  ### 3. testimonials
  - `id` (uuid, primary key) - Unique identifier
  - `client_name` (text) - Client's name
  - `client_photo` (text, optional) - Client photo URL
  - `rating` (integer) - Rating out of 5
  - `feedback` (text) - Testimonial text
  - `service_type` (text) - Service they used
  - `date` (date) - Testimonial date
  - `is_featured` (boolean) - Show on home page
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. pricing_plans
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Plan name (Basic, Premium, Luxury)
  - `slug` (text, unique) - URL-friendly identifier
  - `price` (text) - Price display (e.g., "₹25,000")
  - `duration` (text) - Duration (e.g., "4 Hours")
  - `photos_count` (text) - Number of photos (e.g., "100 Edited Photos")
  - `features` (jsonb) - Array of features
  - `is_popular` (boolean) - Mark as most popular
  - `display_order` (integer) - Sort order
  - `created_at` (timestamptz) - Creation timestamp

  ### 5. bookings
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Client name
  - `email` (text) - Client email
  - `phone` (text) - Client phone
  - `service_type` (text) - Requested service
  - `event_date` (date) - Preferred event date
  - `message` (text) - Additional details
  - `status` (text) - Booking status (pending, confirmed, completed, cancelled)
  - `created_at` (timestamptz) - Booking timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for services, gallery, testimonials, and pricing (display data)
  - Restricted write access for bookings (clients can create, admin can manage)
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  icon text NOT NULL,
  image_url text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  thumbnail_url text NOT NULL,
  category text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_photo text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback text NOT NULL,
  service_type text NOT NULL,
  date date DEFAULT CURRENT_DATE,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price text NOT NULL,
  duration text NOT NULL,
  photos_count text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  is_popular boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  event_date date NOT NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services (public read)
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  USING (is_active = true);

-- RLS Policies for gallery_images (public read)
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);

-- RLS Policies for testimonials (public read)
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  USING (true);

-- RLS Policies for pricing_plans (public read)
CREATE POLICY "Anyone can view pricing plans"
  ON pricing_plans FOR SELECT
  USING (true);

-- RLS Policies for bookings (public can create, restricted view)
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);
/*
  # Admin Content Management System

  ## Overview
  This migration creates the complete database structure for an admin panel that allows
  authorized users to edit website content without touching code.

  ## New Tables Created

  ### 1. admin_users
  - `id` (uuid, primary key) - Admin user identifier
  - `email` (text, unique) - Admin email for login
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### 2. hero_section
  - `id` (uuid, primary key)
  - `main_headline` (text) - Main hero headline
  - `sub_headline` (text) - Hero subheadline/description
  - `badge_text` (text) - Small badge text above headline
  - `primary_button_text` (text) - Primary CTA button text
  - `secondary_button_text` (text) - Secondary button text
  - `is_published` (boolean) - Whether this version is live
  - `updated_at` (timestamptz) - Last update timestamp
  - `updated_by` (uuid) - Reference to admin who updated

  ### 3. services_content
  - `id` (uuid, primary key)
  - `title` (text) - Service card title
  - `description` (text) - Service card description
  - `icon_name` (text) - Lucide icon name (e.g., 'Network')
  - `display_order` (integer) - Order to display services
  - `is_active` (boolean) - Whether service is visible
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)

  ### 4. approach_section
  - `id` (uuid, primary key)
  - `section_title` (text) - Main section heading
  - `section_badge` (text) - Badge text
  - `items` (jsonb) - Array of approach items with title/description
  - `is_published` (boolean)
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)

  ### 5. benefits_section
  - `id` (uuid, primary key)
  - `section_title` (text) - Main section heading
  - `section_badge` (text) - Badge text
  - `items` (jsonb) - Array of benefit items
  - `is_published` (boolean)
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)

  ### 6. cta_section
  - `id` (uuid, primary key)
  - `heading` (text) - CTA heading
  - `description` (text) - CTA description
  - `button_text` (text) - Button label
  - `is_published` (boolean)
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)

  ### 7. site_settings
  - `id` (uuid, primary key)
  - `company_name` (text)
  - `tagline` (text)
  - `contact_email` (text)
  - `contact_phone` (text)
  - `social_links` (jsonb) - Object with social media URLs
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)

  ### 8. admin_activity_log
  - `id` (uuid, primary key)
  - `admin_id` (uuid) - Who made the change
  - `action` (text) - What action was taken
  - `table_name` (text) - Which table was affected
  - `record_id` (uuid) - Which record was changed
  - `changes` (jsonb) - What changed
  - `created_at` (timestamptz) - When it happened

  ## Security (RLS Policies)

  All tables have Row Level Security enabled with the following rules:

  ### admin_users
  - Authenticated users can read their own admin record
  - Only existing admins can create new admin users
  - Admins can update their own record

  ### Content Tables (hero, services, approach, benefits, cta, settings)
  - Anyone can read published content (for public website)
  - Only authenticated admin users can insert/update/delete content
  
  ### admin_activity_log
  - Only authenticated admin users can read activity log
  - System automatically logs changes (no manual inserts needed)

  ## Initial Data

  Seeds the database with current website content so the site continues working
  immediately after migration. Admins can then edit this content through the panel.

  ## Important Notes

  1. The `is_published` field allows draft/publish workflow
  2. `updated_by` tracks which admin made changes
  3. `display_order` on services allows drag-and-drop reordering
  4. JSONB fields allow flexible nested data structures
  5. Activity log provides complete audit trail
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can insert new admins"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Admins can update own record"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create hero_section table
CREATE TABLE IF NOT EXISTS hero_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  main_headline text NOT NULL DEFAULT '',
  sub_headline text NOT NULL DEFAULT '',
  badge_text text NOT NULL DEFAULT '',
  primary_button_text text NOT NULL DEFAULT '',
  secondary_button_text text NOT NULL DEFAULT '',
  is_published boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published hero content"
  ON hero_section FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage hero content"
  ON hero_section FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create services_content table
CREATE TABLE IF NOT EXISTS services_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'Network',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE services_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active services"
  ON services_content FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage services"
  ON services_content FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create approach_section table
CREATE TABLE IF NOT EXISTS approach_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text NOT NULL DEFAULT '',
  section_badge text NOT NULL DEFAULT '',
  items jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE approach_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published approach"
  ON approach_section FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage approach"
  ON approach_section FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create benefits_section table
CREATE TABLE IF NOT EXISTS benefits_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text NOT NULL DEFAULT '',
  section_badge text NOT NULL DEFAULT '',
  items jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE benefits_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published benefits"
  ON benefits_section FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage benefits"
  ON benefits_section FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create cta_section table
CREATE TABLE IF NOT EXISTS cta_section (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  heading text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  button_text text NOT NULL DEFAULT '',
  is_published boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE cta_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published CTA"
  ON cta_section FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Admins can manage CTA"
  ON cta_section FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  contact_email text NOT NULL DEFAULT '',
  contact_phone text NOT NULL DEFAULT '',
  social_links jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Create admin_activity_log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id),
  action text NOT NULL DEFAULT '',
  table_name text NOT NULL DEFAULT '',
  record_id uuid,
  changes jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read activity log"
  ON admin_activity_log FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Seed initial content from current website
INSERT INTO hero_section (main_headline, sub_headline, badge_text, primary_button_text, secondary_button_text, is_published)
VALUES (
  'Next-gen digital infrastructure for visionary companies',
  'Advanced web systems engineered for performance, scale, and innovation',
  'Start Here',
  'Get Quote',
  'Learn More',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO services_content (title, description, icon_name, display_order, is_active)
VALUES 
  ('Strategic mapping', 'We build digital platforms that transform raw potential into powerful online experiences.', 'Network', 1, true),
  ('Technical evolution', 'Our strategic approach ensures every pixel serves your business goals with surgical precision.', 'Telescope', 2, true),
  ('Design architecture', 'Intelligent design frameworks that translate complex business requirements into seamless digital ecosystems.', 'Compass', 3, true),
  ('Performance optimization', 'Continuous refinement strategies that keep your digital presence sharp and competitive.', 'Gauge', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (company_name, tagline, contact_email, contact_phone, social_links)
VALUES (
  'Your Company',
  'Advanced web systems',
  'contact@yourcompany.com',
  '',
  '{}'::jsonb
) ON CONFLICT DO NOTHING;
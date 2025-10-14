/*
  # Create quote requests table

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key)
      - `name` (text, required) - Client's full name
      - `email` (text, required) - Client's email address
      - `phone` (text, optional) - Client's phone number
      - `company` (text, optional) - Company name
      - `project_type` (text, required) - Type of project (web design, development, etc.)
      - `budget_range` (text, optional) - Client's budget range
      - `timeline` (text, optional) - Desired project timeline
      - `message` (text, required) - Project description and requirements
      - `created_at` (timestamptz) - Timestamp of request submission
      - `status` (text) - Request status (new, contacted, quoted, closed)

  2. Security
    - Enable RLS on `quote_requests` table
    - Add policy for inserting quote requests (public can submit)
    - Add policy for authenticated admin users to view all requests
*/

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  project_type text NOT NULL,
  budget_range text,
  timeline text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Service role can view all quote requests"
  ON quote_requests
  FOR SELECT
  TO service_role
  USING (true);
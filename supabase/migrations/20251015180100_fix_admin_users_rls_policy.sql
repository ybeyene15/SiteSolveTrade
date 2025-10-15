/*
  # Fix Admin Users RLS Policy for Login
  
  1. Changes
    - Drop the restrictive "Admins can read own record" policy
    - Add a new policy that allows authenticated users to check if they are admins
    - This fixes the login issue where users couldn't verify their admin status
  
  2. Security
    - Users can only read their own admin record (auth.uid() = id)
    - This is secure because users can only see if THEY are an admin, not others
*/

-- Drop the old policy
DROP POLICY IF EXISTS "Admins can read own record" ON admin_users;

-- Create a new policy that works during login
CREATE POLICY "Users can check if they are admin"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

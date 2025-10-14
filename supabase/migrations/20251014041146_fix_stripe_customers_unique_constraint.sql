/*
  # Fix stripe_customers unique constraint for soft deletes

  1. Changes
    - Drop the existing UNIQUE constraint on user_id
    - Add a partial UNIQUE constraint that only applies to non-deleted records
    - This allows multiple customer records per user as long as only one is active
  
  2. Notes
    - This enables the application to create new Stripe customers when old ones are soft-deleted
    - Only one active (non-deleted) customer per user is enforced
*/

-- Drop the existing unique constraint on user_id
ALTER TABLE stripe_customers 
DROP CONSTRAINT IF EXISTS stripe_customers_user_id_key;

-- Add a partial unique constraint that only applies when deleted_at IS NULL
CREATE UNIQUE INDEX IF NOT EXISTS stripe_customers_user_id_active_idx 
ON stripe_customers(user_id) 
WHERE deleted_at IS NULL;
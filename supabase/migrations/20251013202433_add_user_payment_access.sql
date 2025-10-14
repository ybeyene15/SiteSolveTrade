/*
  # Add User Payment Access Tracking

  1. New Columns
    - Add `has_paid_access` column to track if user has paid for app access
    - Add `payment_date` column to track when user completed payment
    - Add `stripe_customer_id` reference for easy lookup

  2. Updates
    - Create a view to easily check user access status
    - Add function to grant access when payment is completed

  3. Security
    - Add RLS policies to protect user access data
    - Only authenticated users can view their own access status
*/

-- Add payment tracking columns to auth.users metadata via a separate table
CREATE TABLE IF NOT EXISTS public.user_access (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  has_paid_access boolean DEFAULT false,
  payment_date timestamptz,
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_access ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own access status"
  ON public.user_access
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to grant access when payment is completed
CREATE OR REPLACE FUNCTION public.grant_user_access(p_customer_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get user_id from stripe_customers table
  SELECT user_id INTO v_user_id
  FROM public.stripe_customers
  WHERE customer_id = p_customer_id
  AND deleted_at IS NULL;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found for customer_id: %', p_customer_id;
  END IF;

  -- Insert or update user access
  INSERT INTO public.user_access (user_id, has_paid_access, payment_date, stripe_customer_id)
  VALUES (v_user_id, true, now(), p_customer_id)
  ON CONFLICT (user_id)
  DO UPDATE SET
    has_paid_access = true,
    payment_date = COALESCE(public.user_access.payment_date, now()),
    stripe_customer_id = p_customer_id,
    updated_at = now();
END;
$$;

-- Create a trigger function to automatically grant access when order is completed
CREATE OR REPLACE FUNCTION public.handle_completed_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only grant access if payment is successful and order is completed
  IF NEW.payment_status = 'paid' AND NEW.status = 'completed' THEN
    PERFORM public.grant_user_access(NEW.customer_id);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on stripe_orders table
DROP TRIGGER IF EXISTS on_order_completed ON public.stripe_orders;
CREATE TRIGGER on_order_completed
  AFTER INSERT OR UPDATE ON public.stripe_orders
  FOR EACH ROW
  WHEN (NEW.payment_status = 'paid' AND NEW.status = 'completed')
  EXECUTE FUNCTION public.handle_completed_order();

-- Create helper function for checking user access (can be called from client)
CREATE OR REPLACE FUNCTION public.check_user_access()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_has_access boolean;
BEGIN
  SELECT has_paid_access INTO v_has_access
  FROM public.user_access
  WHERE user_id = auth.uid();

  RETURN COALESCE(v_has_access, false);
END;
$$;
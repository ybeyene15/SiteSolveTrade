/*
  # Update quote requests table schema

  1. Changes
    - Remove `project_type`, `budget_range`, and `timeline` columns (not used in form)
    - Keep only the fields that the form actually collects:
      - name, email, phone, company, message
    - This matches the actual form implementation

  2. Notes
    - Uses IF EXISTS checks to safely handle column removal
    - Maintains all existing data and security policies
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'project_type'
  ) THEN
    ALTER TABLE quote_requests DROP COLUMN project_type;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'budget_range'
  ) THEN
    ALTER TABLE quote_requests DROP COLUMN budget_range;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quote_requests' AND column_name = 'timeline'
  ) THEN
    ALTER TABLE quote_requests DROP COLUMN timeline;
  END IF;
END $$;
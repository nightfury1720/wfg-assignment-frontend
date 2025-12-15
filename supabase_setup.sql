-- Supabase Table Setup for Chart Custom Values
-- Run this SQL in the Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS chart_custom_values (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  chart_id TEXT NOT NULL,
  custom_values JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, chart_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email ON chart_custom_values(email);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_chart_id ON chart_custom_values(chart_id);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email_chart ON chart_custom_values(email, chart_id);

-- Enable Row Level Security
ALTER TABLE chart_custom_values ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for clean setup)
DROP POLICY IF EXISTS "Users can read their own chart values" ON chart_custom_values;
DROP POLICY IF EXISTS "Users can insert their own chart values" ON chart_custom_values;
DROP POLICY IF EXISTS "Users can update their own chart values" ON chart_custom_values;

-- Create RLS policies
CREATE POLICY "Users can read their own chart values"
  ON chart_custom_values
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own chart values"
  ON chart_custom_values
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own chart values"
  ON chart_custom_values
  FOR UPDATE
  USING (true);

-- Verify table creation
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'chart_custom_values'
ORDER BY ordinal_position;


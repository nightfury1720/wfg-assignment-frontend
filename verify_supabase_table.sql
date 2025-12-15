-- Verification Query for Supabase Table
-- Run this to check if the table exists and has the correct structure

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'chart_custom_values'
) AS table_exists;

-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'chart_custom_values'
ORDER BY ordinal_position;

-- Check indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'chart_custom_values';

-- Check RLS status
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'chart_custom_values';

-- Check policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'chart_custom_values';


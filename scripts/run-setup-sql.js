// Script to execute Supabase setup SQL via REST API
const https = require('https');

const supabaseUrl = 'https://qiudtvmfrdwjnlneawfy.supabase.co';
const supabaseKey = 'sb_publishable_vEoYqCRoZMqDyJgHztK9JQ_ZTknsHr2';

// Note: Supabase doesn't allow arbitrary SQL execution via REST API for security
// This script will attempt to use the Management API, but typically requires service_role key
// For DDL operations, we need to use the Supabase Dashboard SQL Editor

const sql = `
-- Create the table
CREATE TABLE IF NOT EXISTS chart_custom_values (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  chart_id TEXT NOT NULL,
  custom_values JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, chart_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email ON chart_custom_values(email);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_chart_id ON chart_custom_values(chart_id);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email_chart ON chart_custom_values(email, chart_id);

-- Enable Row Level Security
ALTER TABLE chart_custom_values ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
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
`;

console.log('Attempting to execute SQL via Supabase API...');
console.log('Note: DDL operations typically require service_role key or Dashboard access\n');

// Try using Supabase REST API with RPC (if available)
// However, for CREATE TABLE, we need the Management API or SQL Editor

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function trySetup() {
  // First, let's check if table exists
  try {
    const { data, error } = await supabase
      .from('chart_custom_values')
      .select('id')
      .limit(1);
    
    if (!error) {
      console.log('✅ Table already exists!');
      return;
    }
    
    if (error && error.code === '42P01') {
      console.log('❌ Table does not exist.');
      console.log('\n⚠️  Cannot execute DDL (CREATE TABLE) via REST API.');
      console.log('You need to run the SQL in the Supabase Dashboard:\n');
      console.log('1. Go to: https://supabase.com/dashboard/project/qiudtvmfrdwjnlneawfy');
      console.log('2. Click "SQL Editor"');
      console.log('3. Paste the SQL from supabase_setup.sql');
      console.log('4. Click "Run"\n');
      console.log('SQL to run:');
      console.log('='.repeat(50));
      console.log(sql);
      console.log('='.repeat(50));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

trySetup();


// Script to check if the Supabase table exists
// Run with: node scripts/check-table.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qiudtvmfrdwjnlneawfy.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_vEoYqCRoZMqDyJgHztK9JQ_ZTknsHr2';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
  console.log('Checking if chart_custom_values table exists...\n');
  
  try {
    // Try to query the table
    const { data, error } = await supabase
      .from('chart_custom_values')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('❌ Table does NOT exist!');
        console.log('\n📋 Please run the setup SQL:');
        console.log('1. Go to https://supabase.com/dashboard');
        console.log('2. Open SQL Editor');
        console.log('3. Copy and paste the contents of supabase_setup.sql');
        console.log('4. Click Run\n');
        return false;
      } else {
        throw error;
      }
    }

    console.log('✅ Table exists!');
    console.log('✅ Connection successful!\n');
    return true;
  } catch (error) {
    console.error('❌ Error checking table:', error.message);
    return false;
  }
}

checkTable().then((exists) => {
  process.exit(exists ? 0 : 1);
});


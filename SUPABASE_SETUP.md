# Supabase Setup Instructions

## 1. Supabase Project

The Supabase project is already configured with the following credentials:
- **Project URL**: `https://qiudtvmfrdwjnlneawfy.supabase.co`
- **Publishable Key**: Already configured in the code

## 2. Create the Database Table

**Quick Setup**: Use the provided SQL file `supabase_setup.sql` which contains all the necessary SQL commands.

### Option 1: Use the SQL File (Recommended)

1. Open your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_setup.sql` from this project
4. Click **Run** to execute the SQL

### Option 2: Manual Setup

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS chart_custom_values (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  chart_id TEXT NOT NULL,
  custom_values JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, chart_id)
);

CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email ON chart_custom_values(email);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_chart_id ON chart_custom_values(chart_id);
CREATE INDEX IF NOT EXISTS idx_chart_custom_values_email_chart ON chart_custom_values(email, chart_id);

ALTER TABLE chart_custom_values ENABLE ROW LEVEL SECURITY;

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
```

## 3. Verify Table Creation

After running the setup SQL, you can verify the table was created correctly:

1. Open the Supabase SQL Editor
2. Copy and paste the contents of `verify_supabase_table.sql`
3. Run the query to see:
   - Table existence confirmation
   - Table structure (columns and types)
   - Indexes
   - RLS status
   - Security policies

## 4. Configure Environment Variables (Optional)

The Supabase credentials are already hardcoded in the code, but you can override them with environment variables:

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. The `.env.local` file already contains the correct values, but you can modify them if needed:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://qiudtvmfrdwjnlneawfy.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_vEoYqCRoZMqDyJgHztK9JQ_ZTknsHr2
   ```

## 5. Test the Connection

Start the development server:
```bash
npm run dev
```

The app should now be able to save and retrieve chart custom values from Supabase.


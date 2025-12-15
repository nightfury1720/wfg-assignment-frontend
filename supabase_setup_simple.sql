-- Simple Supabase Table Setup
-- Only creates the table and indexes

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


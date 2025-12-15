import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qiudtvmfrdwjnlneawfy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_vEoYqCRoZMqDyJgHztK9JQ_ZTknsHr2'

export const supabase = createClient(supabaseUrl, supabaseKey)


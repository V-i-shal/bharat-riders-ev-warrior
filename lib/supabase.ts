import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use this in frontend (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Use this in API routes (server only — has full access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
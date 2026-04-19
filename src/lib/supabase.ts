import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check your .env.local file.')
}

/**
 * Browser-side Supabase client.
 * Use this everywhere in Vite/React — there is no server client in this stack.
 */
export const supabase = createClient(supabaseUrl, supabaseKey)

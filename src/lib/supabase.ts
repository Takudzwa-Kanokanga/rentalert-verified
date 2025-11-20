import { createClient } from '@supabase/supabase-js';

// These should be in a .env file, but for quick setup you can paste them here
// OR create a .env file in your root:
// VITE_SUPABASE_URL=your_url_here
// VITE_SUPABASE_ANON_KEY=your_key_here

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
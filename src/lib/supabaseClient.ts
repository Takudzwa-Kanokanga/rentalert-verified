import { createClient } from "@supabase/supabase-js";

// Read Vite environment variables. Define these in a .env / .env.local file at project root:
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The Agent type for the nested object
export type Agent = {
  id: number;
  name: string;
  is_verified: boolean;
  rating: number;
  properties_listed: number;
};
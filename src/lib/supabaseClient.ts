import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are correctly loaded by Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Use console.error instead of throwing in production to allow UI to render with error state
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.");
}

// Create a single supabase client for your application
export const supabase = createClient(supabaseUrl || "dummy-url", supabaseAnonKey || "dummy-key");

// --- Database Types (Matching your SQL Schema) ---

export type Agent = {
  id: number;
  name: string;
  is_verified: boolean;
  rating: number;
  properties_listed: number;
};

// Type for the data as stored in the 'properties' table (snake_case)
export type DbProperty = {
  id?: string; // Optional for inserts
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string;
  description: string;
  amenities: string[];
  agent_id: number; // Required foreign key
  // The rest are optional/defaulted but included for completeness
  is_verified?: boolean;
  rating?: number;
  reviews_count?: number;
  has_virtual_tour?: boolean;
  is_featured?: boolean;
};
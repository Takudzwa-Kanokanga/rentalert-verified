import { createContext, useContext } from "react";
import { supabase, Agent as SupabaseAgent } from "@/lib/supabaseClient";

// Define the Property type based on the expected client-side structure (AFTER Supabase JOIN)
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string; // Mapped from image_url
  verified: boolean; // Mapped from is_verified
  rating: number;
  reviews: number; // Mapped from reviews_count
  virtualTour: boolean; // Mapped from has_virtual_tour
  featured: boolean; // Mapped from is_featured
  description: string;
  amenities: string[];
  agent: SupabaseAgent; // Nested Agent object from the join
}

// Helper type for the raw data structure returned by Supabase
export type RawSupabaseProperty = {
  id: string;
  title: string;
  location: string;
  price: number | string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image_url: string | null;
  is_verified: boolean;
  rating: number | string;
  reviews_count: number;
  has_virtual_tour: boolean;
  is_featured: boolean;
  description: string | null;
  amenities: string[] | null;
  agent: SupabaseAgent | null; // The joined object may be null
};

export interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
  savedProperties: string[];
  toggleSaveProperty: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Fetching function
export const fetchPropertiesWithAgents = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      agent:agents (
        id,
        name,
        is_verified,
        rating,
        properties_listed
      )
    `
    );

  if (error) {
    console.error("Supabase Fetch Error:", error);
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }

  return (data as RawSupabaseProperty[]).map((p) => ({
    id: String(p.id),
    title: p.title,
    location: p.location,
    price: Number(p.price),
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    image: p.image_url || "",
    verified: Boolean(p.is_verified),
    rating: Number(p.rating || 0),
    reviews: p.reviews_count || 0,
    virtualTour: Boolean(p.has_virtual_tour),
    featured: Boolean(p.is_featured),
    description: p.description || "",
    amenities: p.amenities || [],
    agent: (p.agent as SupabaseAgent) || {
      id: 0,
      name: "",
      is_verified: false,
      rating: 0,
      properties_listed: 0,
    },
  }));
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within PropertyProvider");
  }
  return context;
};

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
  addProperty: (property: Property) => Promise<Property | void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<Property | void>;
  deleteProperty: (id: string) => Promise<void>;
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

// Create a new property in Supabase
export const createProperty = async (p: Partial<Property>): Promise<Property> => {
  const insertObj: Record<string, unknown> = {
    title: p.title,
    location: p.location,
    price: p.price,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    image_url: p?.image || null,
    is_verified: p?.verified || false,
    rating: p?.rating || 0,
    reviews_count: p?.reviews || 0,
    has_virtual_tour: p?.virtualTour || false,
    is_featured: p?.featured || false,
    description: p?.description || null,
    amenities: p?.amenities || [],
    agent_id: p?.agent?.id || null,
  };

  const { data, error } = await supabase.from("properties").insert([insertObj]).select();
  if (error) {
    console.error("Supabase Insert Error:", error);
    throw error;
  }

  // After insert, re-fetch to get joined agent object
  const all = await fetchPropertiesWithAgents();
  // Return the created row mapped (find by id)
  const created = all.find((r) => r.title === p.title && r.location === p.location && Number(r.price) === Number(p.price));
  return (created as Property) || (all[all.length - 1] as Property);
};

// Update an existing property by id
export const updatePropertyById = async (id: string, updated: Partial<Property>): Promise<Property> => {
  const updateObj: Record<string, unknown> = {};
  if (updated.title !== undefined) updateObj.title = updated.title;
  if (updated.location !== undefined) updateObj.location = updated.location;
  if (updated.price !== undefined) updateObj.price = updated.price;
  if (updated.bedrooms !== undefined) updateObj.bedrooms = updated.bedrooms;
  if (updated.bathrooms !== undefined) updateObj.bathrooms = updated.bathrooms;
  if (updated.area !== undefined) updateObj.area = updated.area;
  if (updated.image !== undefined) updateObj.image_url = updated.image;
  if (updated.verified !== undefined) updateObj.is_verified = updated.verified;
  if (updated.rating !== undefined) updateObj.rating = updated.rating;
  if (updated.reviews !== undefined) updateObj.reviews_count = updated.reviews;
  if (updated.virtualTour !== undefined) updateObj.has_virtual_tour = updated.virtualTour;
  if (updated.featured !== undefined) updateObj.is_featured = updated.featured;
  if (updated.description !== undefined) updateObj.description = updated.description;
  if (updated.amenities !== undefined) updateObj.amenities = updated.amenities;
  if (updated.agent !== undefined) updateObj.agent_id = updated.agent?.id || null;

  const { data, error } = await supabase.from("properties").update(updateObj).eq("id", id).select();
  if (error) {
    console.error("Supabase Update Error:", error);
    throw error;
  }

  const all = await fetchPropertiesWithAgents();
  const updatedProp = all.find((p) => p.id === id);
  if (!updatedProp) throw new Error("Updated property not found");
  return updatedProp;
};

// Delete a property by id
export const deletePropertyById = async (id: string): Promise<void> => {
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    console.error("Supabase Delete Error:", error);
    throw error;
  }
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within PropertyProvider");
  }
  return context;
};

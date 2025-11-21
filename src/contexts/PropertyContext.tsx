import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase, Agent as SupabaseAgent, DbProperty } from "@/lib/supabaseClient";

// 1. Define the Application Property Type (camelCase, includes joined Agent)
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  verified: boolean;
  rating: number;
  reviews: number;
  virtualTour: boolean;
  featured: boolean;
  description: string;
  amenities: string[];
  agent: SupabaseAgent;
}

// Helper type for the raw data structure returned by Supabase
type RawSupabaseProperty = DbProperty & {
  agent: SupabaseAgent;
};

interface PropertyContextType {
  properties: Property[];
  addProperty: (propertyData: Omit<Property, 'id' | 'agent' | 'verified' | 'rating' | 'reviews' | 'featured'>) => Promise<boolean>;
  updateProperty: (id: string, updatedFields: Partial<Omit<Property, 'id' | 'agent'>>) => Promise<boolean>;
  deleteProperty: (id: string) => Promise<boolean>;
  getPropertyById: (id: string) => Property | undefined;
  savedProperties: string[];
  toggleSaveProperty: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// --- Core Data Fetching Logic ---
const fetchPropertiesWithAgents = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      *,
      agent:agents (id, name, is_verified, rating, properties_listed)
    `
    );

  if (error) {
    console.error("Supabase Fetch Error:", error);
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }

  // Map the Supabase data structure to the application's expected Property structure
  return (data as RawSupabaseProperty[]).map((p) => ({
    id: p.id!,
    title: p.title,
    location: p.location,
    price: Number(p.price),
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    image: p.image_url || "",
    verified: p.is_verified || false,
    rating: Number(p.rating),
    reviews: p.reviews_count || 0,
    virtualTour: p.has_virtual_tour || false,
    featured: p.is_featured || false,
    description: p.description || "",
    amenities: p.amenities || [],
    agent: p.agent,
  }));
};

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Refresh function that can be called after any CRUD operation
  const refreshProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProperties = await fetchPropertiesWithAgents();
      setProperties(fetchedProperties);
    } catch (err) {
      if (err instanceof Error) {
          setError(err);
      } else {
          setError(new Error("An unknown error occurred during property refresh."));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshProperties();
  }, [refreshProperties]);


  // --- CRUD Implementations ---

  // NOTE: For simplicity, all new properties are assigned to Agent ID 1 (John Mapfumo)
  const addProperty = async (propertyData: Omit<Property, 'id' | 'agent' | 'verified' | 'rating' | 'reviews' | 'featured'>): Promise<boolean> => {
    const newDbProperty: DbProperty = {
      ...propertyData,
      image_url: propertyData.image, // Map back to snake_case for DB
      agent_id: 1, // Default agent for new properties
    };

    const { error } = await supabase
      .from("properties")
      .insert(newDbProperty);

    if (error) {
      console.error("Supabase INSERT Error:", error);
      return false;
    }

    await refreshProperties(); // Re-fetch all properties to update state
    return true;
  };


  const updateProperty = async (id: string, updatedFields: Partial<Omit<Property, 'id' | 'agent'>>): Promise<boolean> => {
    // Map client-side camelCase fields back to snake_case for the database
    const updatePayload: Partial<DbProperty> = {
      title: updatedFields.title,
      location: updatedFields.location,
      price: updatedFields.price,
      bedrooms: updatedFields.bedrooms,
      bathrooms: updatedFields.bathrooms,
      area: updatedFields.area,
      description: updatedFields.description,
      amenities: updatedFields.amenities,
      image_url: updatedFields.image,
      is_verified: updatedFields.verified,
      reviews_count: updatedFields.reviews,
      has_virtual_tour: updatedFields.virtualTour,
      is_featured: updatedFields.featured,
      // agent_id should usually not be updated, but you can add it if needed
    };

    const { error } = await supabase
      .from("properties")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("Supabase UPDATE Error:", error);
      return false;
    }

    await refreshProperties(); // Re-fetch all properties to update state
    return true;
  };


  const deleteProperty = async (id: string): Promise<boolean> => {
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase DELETE Error:", error);
      return false;
    }

    await refreshProperties(); // Re-fetch all properties to update state
    return true;
  };


  // --- Non-Database Operations ---
  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  const toggleSaveProperty = (id: string) => {
    setSavedProperties(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        getPropertyById,
        savedProperties,
        toggleSaveProperty,
        isLoading,
        error,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within PropertyProvider");
  }
  return context;
};
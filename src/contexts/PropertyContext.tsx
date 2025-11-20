import React, { useState, useEffect, ReactNode } from "react";
import {
  PropertyContext as CorePropertyContext,
  fetchPropertiesWithAgents,
  createProperty,
  updatePropertyById,
  deletePropertyById,
  Property,
  PropertyContextType,
} from "./propertyCore";

// Use the context from the core module (this file only exports the provider component)
const PropertyContext = CorePropertyContext;


export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  // Initialize properties as an empty array, not dummyProperties
  const [properties, setProperties] = useState<Property[]>([]); 
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  // Initialize loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use useEffect to fetch data from Supabase on component mount
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProperties = await fetchPropertiesWithAgents();
        setProperties(fetchedProperties);
      } catch (err) {
        if (err instanceof Error) {
            setError(err);
        } else {
            setError(new Error("An unknown error occurred during property fetch."));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []); 


  // Persisted CRUD functions using Supabase helpers
  const addProperty = async (property: Property) => {
    setIsLoading(true);
    setError(null);
    try {
      const created = await createProperty(property);
      if (created) setProperties((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id: string, updatedProperty: Partial<Property>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updatePropertyById(id, updatedProperty);
      if (updated) {
        setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      }
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deletePropertyById(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

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
        isLoading, // Expose loading state
        error, // Expose error state
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// Note: `useProperties` hook is provided in `src/contexts/useProperties.ts`
// to avoid React Fast Refresh errors when a file exports non-component values.

// The hook is provided from `src/contexts/useProperties.ts` to avoid
// React Fast Refresh issues when exporting non-component values.
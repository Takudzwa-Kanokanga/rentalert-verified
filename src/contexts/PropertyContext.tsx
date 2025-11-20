import React, { createContext, useContext, useState, ReactNode } from "react";
import { Property, dummyProperties } from "@/lib/dummyData";

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getPropertyById: (id: string) => Property | undefined;
  savedProperties: string[];
  toggleSaveProperty: (id: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(dummyProperties);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const addProperty = (property: Property) => {
    setProperties([...properties, property]);
  };

  const updateProperty = (id: string, updatedProperty: Partial<Property>) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, ...updatedProperty } : p
    ));
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
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

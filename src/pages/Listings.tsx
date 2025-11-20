import { useState } from "react";
import { useProperties } from "@/contexts/useProperties";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Listings = () => {
  const { properties } = useProperties();
  const [sortBy, setSortBy] = useState("featured");

  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-8 bg-secondary/50">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-6">Browse Properties</h1>
          <SearchBar />
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {sortedProperties.length} properties
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listings;

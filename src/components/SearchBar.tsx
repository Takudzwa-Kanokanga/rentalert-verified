import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zimbabweLocations } from "@/lib/zimbabweLocations";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/browse");
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto">
      <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Harare, Bulawayo..." 
                className="pl-9"
                list="locations"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <datalist id="locations">
                {zimbabweLocations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Property Type
            </label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Any type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="cottage">Cottage</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Price Range
            </label>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Any price" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any price</SelectItem>
                <SelectItem value="0-200">$0 - $200</SelectItem>
                <SelectItem value="200-400">$200 - $400</SelectItem>
                <SelectItem value="400-600">$400 - $600</SelectItem>
                <SelectItem value="600+">$600+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full" size="lg">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "@/contexts/PropertyContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { zimbabweLocations } from "@/lib/zimbabweLocations";

const AddProperty = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperties();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "",
    description: "",
    verified: true,
    virtualTour: false,
    featured: false,
    amenities: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty = {
      id: Date.now().toString(),
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      image: formData.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      verified: formData.verified,
      rating: 4.5,
      reviews: 0,
      virtualTour: formData.virtualTour,
      featured: formData.featured,
      description: formData.description,
      agent: {
        name: "Your Name",
        verified: true,
        rating: 4.8,
        properties: 1,
      },
      amenities: formData.amenities.split(",").map(a => a.trim()).filter(Boolean),
    };

    addProperty(newProperty);
    toast({ title: "Property added successfully!" });
    navigate(`/property/${newProperty.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-foreground mb-6">List Your Property</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Modern 2BR Apartment"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                required
                list="locations"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Select or type location"
              />
              <datalist id="locations">
                {zimbabweLocations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Monthly Rent ($)</Label>
                <Input
                  id="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="450"
                />
              </div>
              <div>
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="85"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  required
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  required
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  placeholder="2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your property..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                placeholder="Parking, Security, Water Backup, WiFi"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified">Verified Property</Label>
                <Switch
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => setFormData({ ...formData, verified: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="virtualTour">360° Virtual Tour Available</Label>
                <Switch
                  id="virtualTour"
                  checked={formData.virtualTour}
                  onCheckedChange={(checked) => setFormData({ ...formData, virtualTour: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Listing</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">List Property</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddProperty;

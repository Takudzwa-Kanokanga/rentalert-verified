import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, updateProperty } = useProperties();
  const property = getPropertyById(id || "");

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

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        price: property.price.toString(),
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        area: property.area.toString(),
        image: property.image,
        description: property.description,
        verified: property.verified,
        virtualTour: property.virtualTour,
        featured: property.featured || false,
        amenities: property.amenities.join(", "),
      });
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProperty(property.id, {
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      image: formData.image,
      verified: formData.verified,
      virtualTour: formData.virtualTour,
      featured: formData.featured,
      description: formData.description,
      amenities: formData.amenities.split(",").map(a => a.trim()).filter(Boolean),
    });

    toast({ title: "Property updated successfully!" });
    navigate(`/property/${property.id}`);
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
          <h1 className="text-2xl font-bold text-foreground mb-6">Edit Property</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input
                id="amenities"
                value={formData.amenities}
                onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
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
              <Button type="submit" className="flex-1">Save Changes</Button>
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

export default EditProperty;

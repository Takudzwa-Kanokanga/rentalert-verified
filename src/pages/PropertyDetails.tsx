import { useParams, useNavigate } from "react-router-dom";
import { useProperties } from "@/contexts/PropertyContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, ShieldCheck, Star, Eye, Trash2, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, deleteProperty, savedProperties, toggleSaveProperty } = useProperties();
  
  const property = getPropertyById(id || "");

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

  const isSaved = savedProperties.includes(property.id);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property?")) {
      deleteProperty(property.id);
      toast({ title: "Property deleted successfully" });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              {property.featured && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
              )}
              {property.virtualTour && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  <Eye className="w-3 h-3 mr-1" />
                  360° Tour
                </Badge>
              )}
            </div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </div>
              {property.verified && (
                <Badge variant="outline" className="border-success text-success">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-accent text-accent mr-1" />
                <span className="font-semibold">{property.rating}</span>
                <span className="text-muted-foreground ml-1">({property.reviews} reviews)</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-primary mb-6">${property.price}/month</div>

            <div className="flex gap-6 mb-8">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-foreground">{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-foreground">{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Maximize className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-foreground">{property.area}m²</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <Separator className="my-6" />

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">{amenity}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">Agent Information</h3>
              <div className="mb-6">
                <p className="font-semibold text-foreground">{property.agent.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  {property.agent.verified && (
                    <Badge variant="outline" className="border-success text-success text-xs">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <span>★ {property.agent.rating}</span>
                  <span>•</span>
                  <span>{property.agent.properties} properties</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full" size="lg">Contact Agent</Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toggleSaveProperty(property.id)}
                >
                  {isSaved ? "Saved" : "Save Property"}
                </Button>
                {property.virtualTour && (
                  <Button variant="secondary" className="w-full">View 360° Tour</Button>
                )}
                <div className="pt-4 border-t space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/edit-property/${property.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

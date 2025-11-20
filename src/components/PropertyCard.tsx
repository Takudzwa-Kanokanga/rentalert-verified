import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, BedDouble, Bath, Maximize, ShieldCheck, Star, Video } from "lucide-react";

interface PropertyCardProps {
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
  featured?: boolean;
}

const PropertyCard = ({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  verified,
  rating,
  reviews,
  virtualTour,
  featured = false,
}: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-[box-shadow,transform] hover:-translate-y-1 duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Featured
          </Badge>
        )}
        {virtualTour && (
          <Badge variant="secondary" className="absolute top-3 right-3 gap-1">
            <Video className="h-3 w-3" />
            360° Tour
          </Badge>
        )}
        {verified && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-success px-2 py-1 text-xs font-medium text-success-foreground">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{area}m²</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">${price}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;

import { useProperties } from "@/contexts";
import Header from "@/components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { DollarSign, Bed, Bath, Home, MapPin, CheckCircle, UserCheck, Star, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import PropertyForm from "@/components/PropertyForm"; // Import the new form component
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


const DetailIcon = ({ icon: Icon, label }: { icon: React.ElementType, label: string | number }) => (
    <div className="flex items-center space-x-2 text-sm text-gray-700">
        <Icon className="w-4 h-4 text-primary" />
        <span>{label}</span>
    </div>
);

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getPropertyById, deleteProperty, toggleSaveProperty, savedProperties, isLoading } = useProperties();
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

        let property;
        try {
            property = getPropertyById(id || '');
        } catch (err) {
            // Defensive: if the context throws unexpectedly, show a friendly message
            // and log the error for debugging.
            console.error("Error fetching property by id:", err);
            return (
                <div className="min-h-screen bg-background">
                    <Header />
                    <div className="container py-20 text-center">
                        <h1 className="text-2xl font-bold text-foreground mb-4">An error occurred</h1>
                        <p className="text-muted-foreground">There was a problem loading this property. Please try again later.</p>
                        <Button onClick={() => navigate("/browse")} className="mt-6">Back to Browse</Button>
                    </div>
                </div>
            );
        }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container py-20 text-center">
                    <h1 className="text-3xl font-bold text-red-500">Property Not Found</h1>
                    <p className="mt-4 text-muted-foreground">The property you are looking for does not exist or was deleted.</p>
                    <Button onClick={() => navigate("/browse")} className="mt-6">Back to Browse</Button>
                </div>
            </div>
        );
    }
    
    const localSaved = Array.isArray(savedProperties) ? savedProperties : [];
    const isSaved = localSaved.includes(property.id);

    const handleDelete = async () => {
        setIsDeleting(true);
        const success = await deleteProperty(property.id);
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);

        if (success) {
            toast({
                title: "Property Deleted",
                description: `Property "${property.title}" was successfully removed.`,
                variant: "destructive",
            });
            navigate("/browse");
        } else {
            toast({
                title: "Deletion Failed",
                description: "Could not delete property. Check network connection.",
                variant: "destructive",
            });
        }
    };

    const handleEditSuccess = () => {
        setIsEditDialogOpen(false);
        toast({
            title: "Property Updated",
            description: `Property "${property.title}" changes have been saved.`,
        });
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <article className="py-8 lg:py-16">
                <div className="container max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* LEFT COLUMN: Image & Main Details */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Image Section */}
                            <Card className="overflow-hidden">
                                <AspectRatio ratio={16 / 9}>
                                    <img 
                                        src={property.image} 
                                        alt={property.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" 
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).onerror = null; 
                                            (e.target as HTMLImageElement).src = `https://placehold.co/1200x675/030712/f9fafb?text=${encodeURIComponent(property.title)}`;
                                        }}
                                    />
                                </AspectRatio>
                            </Card>

                            {/* Title and Action */}
                            <div className="flex justify-between items-start pt-2">
                                <div>
                                    <h1 className="text-4xl font-extrabold text-foreground mb-1">{property.title}</h1>
                                    <p className="flex items-center text-lg text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {property.location}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {/* Edit Dialog */}
                                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon" title="Edit Property">
                                                <Edit className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl p-0">
                                            {/* Pass the current property data to the form */}
                                            <PropertyForm initialData={property} isEditing onSuccess={handleEditSuccess} />
                                        </DialogContent>
                                    </Dialog>

                                    {/* Delete Dialog */}
                                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="icon" title="Delete Property">
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Are you sure?</DialogTitle>
                                            </DialogHeader>
                                            <p>This action cannot be undone. This will permanently delete the property "{property.title}".</p>
                                            <DialogFooter>
                                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>Cancel</Button>
                                                <Button 
                                                    variant="destructive" 
                                                    onClick={handleDelete} 
                                                    disabled={isDeleting}
                                                >
                                                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete Property'}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    
                                    {/* Save Button */}
                                    <Button 
                                        onClick={() => toggleSaveProperty(property.id)}
                                        variant={isSaved ? "default" : "outline"}
                                        title={isSaved ? "Unsave Property" : "Save Property"}
                                    >
                                        {isSaved ? "Saved" : "Save"}
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Overview Box */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Property Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <DetailIcon icon={DollarSign} label={`$${property.price.toLocaleString()}`} />
                                        <DetailIcon icon={Bed} label={`${property.bedrooms} Bed`} />
                                        <DetailIcon icon={Bath} label={`${property.bathrooms} Bath`} />
                                        <DetailIcon icon={Home} label={`${property.area} sqm`} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-3">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{property.description}</p>
                            </section>

                            {/* Amenities */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-3">Amenities</h2>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map((amenity, index) => (
                                        <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                                            <CheckCircle className="w-3 h-3 mr-1.5" />
                                            {amenity}
                                        </Badge>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN: Agent Details */}
                        <div className="lg:col-span-1 space-y-8">
                            <Card className="sticky top-10">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center">
                                        Agent Details
                                        {property.agent.is_verified && <UserCheck className="w-5 h-5 ml-2 text-blue-500" title="Verified Agent" />}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-xl font-bold">{property.agent.name}</p>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-yellow-500" />
                                        <span>{property.agent.rating} Rating</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {property.agent.properties_listed} properties listed
                                    </p>
                                    <Button className="w-full">Contact Agent</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PropertyDetails;
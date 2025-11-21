import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useProperties } from '@/contexts';
import type { Property } from '@/contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface PropertyFormProps {
  initialData?: Property;
  isEditing?: boolean;
  onSuccess?: () => void;
}

// Default data structure for a new property
const defaultFormData = {
    title: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    image: '',
    description: '',
    amenities: '', // Comma-separated string in the form
};

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, isEditing = false, onSuccess }) => {
  const { addProperty, updateProperty } = useProperties();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || defaultFormData.title,
    location: initialData?.location || defaultFormData.location,
    price: initialData?.price || defaultFormData.price,
    bedrooms: initialData?.bedrooms || defaultFormData.bedrooms,
    bathrooms: initialData?.bathrooms || defaultFormData.bathrooms,
    area: initialData?.area || defaultFormData.area,
    image: initialData?.image || defaultFormData.image,
    description: initialData?.description || defaultFormData.description,
    amenities: initialData?.amenities.join(', ') || defaultFormData.amenities,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [id]: id === 'price' || id === 'bedrooms' || id === 'bathrooms' || id === 'area' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Prepare data for the context functions
    const payload = {
        ...formData,
        amenities: formData.amenities.split(',').map(s => s.trim()).filter(s => s.length > 0),
    };
    
    let success = false;
    
    try {
        if (isEditing && initialData?.id) {
            // EDIT/UPDATE operation
            success = await updateProperty(initialData.id, payload);
        } else {
            // ADD/CREATE operation
            // We omit the fields that are auto-generated or defaulted by the context/DB (id, agent, verified, rating, reviews, featured)
            const addPayload = payload as Omit<Property, 'id' | 'agent' | 'verified' | 'rating' | 'reviews' | 'featured'>;
            success = await addProperty(addPayload);
        }

        if (success) {
            onSuccess?.();
            if (!isEditing) {
                // Navigate to browse after adding
                navigate("/browse"); 
            }
        } else {
            setSubmitError(`Failed to ${isEditing ? 'update' : 'add'} property. Please check console for details.`);
        }
    } catch (err) {
        setSubmitError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-10 shadow-xl">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Property' : 'List a New Property'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Rent ($)</Label>
              <Input id="price" type="number" value={formData.price || ''} onChange={handleChange} required min="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={formData.image} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" type="number" value={formData.bedrooms || ''} onChange={handleChange} required min="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" type="number" value={formData.bathrooms || ''} onChange={handleChange} required min="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (sqm)</Label>
              <Input id="area" type="number" value={formData.area || ''} onChange={handleChange} required min="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (Comma-separated)</Label>
              <Input id="amenities" value={formData.amenities} onChange={handleChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} rows={4} required />
          </div>
          
          {submitError && (
            <div className="text-red-500 bg-red-100 p-3 rounded-md border border-red-300">
                Error: {submitError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isEditing ? (
              'Save Changes'
            ) : (
              'List Property'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
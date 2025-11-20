export interface Property {
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
  description: string;
  agent: {
    name: string;
    verified: boolean;
    rating: number;
    properties: number;
  };
  amenities: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  type: "tenant" | "landlord";
}

export const dummyProperties: Property[] = [
  {
    id: "1",
    title: "Modern 2BR Apartment in Avondale",
    location: "Avondale, Harare",
    price: 450,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    verified: true,
    rating: 4.8,
    reviews: 24,
    virtualTour: true,
    featured: true,
    description: "Beautiful modern apartment with secure parking, backup water, and 24/7 security. Close to shops and schools.",
    agent: {
      name: "John Mapfumo",
      verified: true,
      rating: 4.9,
      properties: 45,
    },
    amenities: ["Parking", "Security", "Water Backup", "WiFi", "Garden"],
  },
  {
    id: "2",
    title: "Spacious 3BR House in Borrowdale",
    location: "Borrowdale, Harare",
    price: 650,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    verified: true,
    rating: 4.6,
    reviews: 18,
    virtualTour: true,
    featured: true,
    description: "Lovely family home with spacious garden, borehole, and solar power backup. Quiet neighborhood.",
    agent: {
      name: "Sarah Ncube",
      verified: true,
      rating: 4.7,
      properties: 32,
    },
    amenities: ["Borehole", "Solar", "Garden", "Parking", "DSstv"],
  },
  {
    id: "3",
    title: "Cozy 1BR Flat in Mount Pleasant",
    location: "Mount Pleasant, Harare",
    price: 300,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    verified: true,
    rating: 4.5,
    reviews: 15,
    virtualTour: false,
    description: "Affordable single bedroom flat, perfect for young professionals. Walking distance to shops.",
    agent: {
      name: "Michael Dube",
      verified: true,
      rating: 4.5,
      properties: 28,
    },
    amenities: ["Security", "Water Backup", "Parking"],
  },
  {
    id: "4",
    title: "Luxury 4BR Villa in Glen Lorne",
    location: "Glen Lorne, Harare",
    price: 1200,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    verified: true,
    rating: 4.9,
    reviews: 31,
    virtualTour: true,
    featured: true,
    description: "Stunning luxury villa with pool, landscaped garden, and mountain views. Fully furnished option available.",
    agent: {
      name: "Grace Moyo",
      verified: true,
      rating: 5.0,
      properties: 58,
    },
    amenities: ["Pool", "Solar", "Borehole", "Garden", "WiFi", "Security", "Furnished"],
  },
  {
    id: "5",
    title: "2BR Cottage in Greendale",
    location: "Greendale, Harare",
    price: 380,
    bedrooms: 2,
    bathrooms: 1,
    area: 70,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
    verified: false,
    rating: 4.3,
    reviews: 9,
    virtualTour: false,
    description: "Charming cottage in a quiet area. Own entrance and small garden space.",
    agent: {
      name: "Peter Chikwanha",
      verified: false,
      rating: 4.2,
      properties: 12,
    },
    amenities: ["Parking", "Garden", "Water Backup"],
  },
  {
    id: "6",
    title: "Modern 3BR Apartment in Belgravia",
    location: "Belgravia, Harare",
    price: 550,
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    verified: true,
    rating: 4.7,
    reviews: 22,
    virtualTour: true,
    description: "Newly renovated apartment with modern finishes. Prime location near embassies.",
    agent: {
      name: "Tendai Sithole",
      verified: true,
      rating: 4.8,
      properties: 41,
    },
    amenities: ["Security", "Lift", "Parking", "Generator", "WiFi"],
  },
];

export const dummyReviews: Review[] = [
  {
    id: "1",
    author: "Tariro M.",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent landlord! Very responsive to maintenance requests and the property is exactly as advertised. Highly recommend!",
    type: "tenant",
  },
  {
    id: "2",
    author: "David K.",
    rating: 5,
    date: "2024-01-10",
    comment: "Great tenant, always pays on time and keeps the property in excellent condition. Would rent to again!",
    type: "landlord",
  },
  {
    id: "3",
    author: "Rumbi S.",
    rating: 4,
    date: "2024-01-05",
    comment: "Good property overall. The area is quiet and safe. Only minor issue was water pressure but was fixed quickly.",
    type: "tenant",
  },
  {
    id: "4",
    author: "James T.",
    rating: 5,
    date: "2023-12-28",
    comment: "Perfect tenant - respectful, communicative, and responsible. Made renting hassle-free!",
    type: "landlord",
  },
];

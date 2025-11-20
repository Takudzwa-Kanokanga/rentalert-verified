import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, MessageSquare, Award } from "lucide-react";
import { dummyProperties } from "@/lib/dummyData";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const featuredProperties = dummyProperties.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Find Your Perfect Home in Zimbabwe
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              No fake agents. No viewing fees. Just verified, affordable rentals with 360° tours.
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-4">
                <ShieldCheck className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Verified Listings</h3>
              <p className="text-sm text-muted-foreground">Every property and agent is verified</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No Viewing Fees</h3>
              <p className="text-sm text-muted-foreground">View properties absolutely free</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Reviews System</h3>
              <p className="text-sm text-muted-foreground">Honest reviews from real tenants</p>
            </div>
            <div className="text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">360° Tours</h3>
              <p className="text-sm text-muted-foreground">Explore properties virtually</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Verified listings from trusted agents</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to List Your Property?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of verified agents and landlords. Get featured listings and reach more tenants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              List Your Property
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">RentAlert ZW</h3>
              <p className="text-sm text-muted-foreground">
                Making rental housing affordable and trustworthy in Zimbabwe.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Tenants</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Browse Listings</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Virtual Tours</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">For Landlords</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">List Property</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Agent Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 RentAlert ZW. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

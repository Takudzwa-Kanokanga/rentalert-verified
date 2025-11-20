import { useProperties } from "@/contexts/PropertyContext";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const { properties, savedProperties } = useProperties();
  const navigate = useNavigate();
  
  const saved = properties.filter(p => savedProperties.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Properties</h1>
          <p className="text-muted-foreground mb-8">Properties you've saved for later</p>

          {saved.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">You haven't saved any properties yet</p>
              <Button onClick={() => navigate("/browse")}>Browse Properties</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saved.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Saved;

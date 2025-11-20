import { useNavigate } from "react-router-dom";
import { Home, Search, Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Browse", href: "/browse" },
    { icon: Heart, label: "Saved", href: "/saved" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
            <Home className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RentAlert ZW</h1>
            <p className="text-xs text-muted-foreground">Verified rentals</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.href)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Sign In
          </Button>
          <Button 
            size="sm" 
            className="hidden md:flex"
            onClick={() => navigate("/add-property")}
          >
            List Property
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.href);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                  <Button variant="ghost">Sign In</Button>
                  <Button onClick={() => {
                    navigate("/add-property");
                    setIsOpen(false);
                  }}>
                    List Property
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

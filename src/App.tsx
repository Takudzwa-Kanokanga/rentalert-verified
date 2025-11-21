import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "@/contexts"; // Use barrel export
import Home from "@/pages/Index";
import Listings from "@/pages/Listings";
import Saved from "@/pages/Saved";
import AddProperty from "@/pages/AddProperty";
import PropertyDetails from "@/pages/PropertyDetails";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      {/*
        CRITICAL FIX: The PropertyProvider MUST wrap the Routes
        so that all components rendered within the Routes (like Home, Browse, Details)
        can access the useProperties hook.
      */}
      <PropertyProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Listings />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </PropertyProvider>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
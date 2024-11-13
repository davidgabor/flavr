import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import CityDetails from "./pages/CityDetails";
import RecommendationDetails from "./pages/RecommendationDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-100">
        <BrowserRouter>
          <Navbar />
          <main className="container px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/cities/:cityId" element={<CityDetails />} />
              <Route path="/recommendations/:id" element={<RecommendationDetails />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import RecommendationDetails from "./pages/RecommendationDetails";
import PersonProfile from "./pages/PersonProfile";
import People from "./pages/People";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AI from "./pages/AI";
import ScrollToTop from "./components/common/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-900">
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/people" element={<People />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/p/:personSlug" element={<PersonProfile />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/:destinationSlug" element={<DestinationDetails />} />
              <Route path="/:destinationSlug/:recommendationSlug" element={<RecommendationDetails />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
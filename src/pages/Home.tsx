import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RECOMMENDATIONS } from "@/data/recommendations";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const cities = Object.entries(RECOMMENDATIONS).map(([id, city]) => ({
    id,
    ...city
  }));

  return (
    <div className="animate-fade-in">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <div className="mb-6">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150"
            alt="David's profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
          />
          <span className="text-primary font-medium">Hey there! 👋</span>
        </div>
        
        <h1 className="heading-1 mb-6">
          David's Personal Food & Drink Guide
        </h1>
        <p className="text-body text-lg mb-8">
          I'm sharing my favorite spots from around the world - places I personally love and recommend to friends and family. Each recommendation comes from my own experiences and countless meals shared with great company.
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Search cities or cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="heading-2 text-center mb-8">Explore my recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link to={`/cities/${city.id}`} key={city.id} className="card group">
              <div className="aspect-[3/2] overflow-hidden rounded-t-lg">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-lg mb-0.5">{city.name}</h3>
                <p className="text-sm text-neutral-600">
                  {city.recommendations.length} recommendations
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center max-w-2xl mx-auto">
        <h2 className="heading-2 mb-4">Share Your Favorite Spots</h2>
        <p className="text-body mb-6">
          Know a hidden gem? Help others discover amazing local restaurants and bars.
        </p>
        <Link
          to="/cities"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Browse Cities
        </Link>
      </section>
    </div>
  );
};

export default Home;
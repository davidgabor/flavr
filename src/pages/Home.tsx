import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TRENDING_CITIES = [
  {
    id: "nyc",
    name: "New York City",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    recommendationCount: 342
  },
  {
    id: "sf",
    name: "San Francisco",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    recommendationCount: 256
  },
  {
    id: "ldn",
    name: "London",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    recommendationCount: 289
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="animate-fade-in">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="heading-1 mb-6">
          Discover the Best Local Food Spots
        </h1>
        <p className="text-body text-lg mb-8">
          Explore curated recommendations from food enthusiasts around the world
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
        <h2 className="heading-2 text-center mb-8">Trending Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRENDING_CITIES.map((city) => (
            <Link to={`/cities/${city.id}`} key={city.id} className="card group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-1">{city.name}</h3>
                <p className="text-neutral-600">
                  {city.recommendationCount} recommendations
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
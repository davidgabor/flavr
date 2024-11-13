import { Link } from "react-router-dom";
import { optimizeImageUrl } from "@/utils/imageUtils";

const CITIES = [
  {
    id: "copenhagen",
    name: "Copenhagen",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400",
    recommendationCount: 5,
    description: "Nordic cuisine meets cozy atmosphere"
  },
  {
    id: "florence",
    name: "Florence",
    image: "https://images.unsplash.com/photo-1534260164206-2a3a4a72891d?w=400",
    recommendationCount: 3,
    description: "Classic Italian trattorias and wine bars"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    recommendationCount: 3,
    description: "Tapas, cocktails, and Catalan cuisine"
  }
];

const Cities = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="heading-1">Explore Cities</h1>
        <p className="text-body text-lg">
          Find local favorites in cities around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CITIES.map((city) => (
          <Link to={`/cities/${city.id}`} key={city.id} className="card group">
            <div className="aspect-video overflow-hidden">
              <img
                src={optimizeImageUrl(city.image)}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{city.name}</h2>
              <p className="text-neutral-600 mb-3">{city.description}</p>
              <p className="text-sm text-neutral-500">
                {city.recommendationCount} recommendations
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cities;
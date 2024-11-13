import { Link } from "react-router-dom";

const CITIES = [
  {
    id: "copenhagen",
    name: "Copenhagen",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    recommendationCount: 16,
    description: "Nordic cuisine meets cozy atmosphere"
  },
  {
    id: "florence",
    name: "Florence",
    image: "https://images.unsplash.com/photo-1534260164206-2a3a4a72891d",
    recommendationCount: 4,
    description: "Classic Italian trattorias and wine bars"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
    recommendationCount: 28,
    description: "Tapas, cocktails, and Catalan cuisine"
  },
  {
    id: "dublin",
    name: "Dublin",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4",
    recommendationCount: 8,
    description: "Traditional pubs and modern dining"
  },
  {
    id: "nyc",
    name: "New York City",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    recommendationCount: 42,
    description: "From classic delis to Michelin-starred restaurants"
  },
  {
    id: "capetown",
    name: "Cape Town",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
    recommendationCount: 18,
    description: "Fine dining with mountain views"
  },
  {
    id: "london",
    name: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    recommendationCount: 19,
    description: "Traditional pubs and global cuisine"
  },
  {
    id: "stockholm",
    name: "Stockholm",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11",
    recommendationCount: 46,
    description: "Nordic fine dining and cozy cafes"
  },
  {
    id: "paris",
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    recommendationCount: 23,
    description: "Classic bistros and wine bars"
  },
  {
    id: "losangeles",
    name: "Los Angeles",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da",
    recommendationCount: 8,
    description: "Celebrity hotspots and street food"
  },
  {
    id: "dubai",
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    recommendationCount: 12,
    description: "Luxury dining with skyline views"
  },
  {
    id: "milan",
    name: "Milan",
    image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1",
    recommendationCount: 6,
    description: "Authentic Italian and modern fusion"
  },
  {
    id: "malaga",
    name: "Malaga",
    image: "https://images.unsplash.com/photo-1591792111137-5b8219d5fdd3",
    recommendationCount: 1,
    description: "Seaside dining and tapas bars"
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
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
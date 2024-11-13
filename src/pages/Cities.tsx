import { Link } from "react-router-dom";

const CITIES = [
  {
    id: "nyc",
    name: "New York City",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    recommendationCount: 342,
    description: "From classic pizzerias to Michelin-starred restaurants"
  },
  {
    id: "sf",
    name: "San Francisco",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    recommendationCount: 256,
    description: "A paradise for food innovation and fresh seafood"
  },
  {
    id: "ldn",
    name: "London",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    recommendationCount: 289,
    description: "Diverse culinary scene with markets and fine dining"
  },
  {
    id: "tk",
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    recommendationCount: 421,
    description: "World-class sushi and street food culture"
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
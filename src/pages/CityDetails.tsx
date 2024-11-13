import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";

const RECOMMENDATIONS = {
  nyc: {
    name: "New York City",
    recommendations: [
      {
        id: "r1",
        name: "Joe's Pizza",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.8,
        priceLevel: "$$",
        neighborhood: "Greenwich Village",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      },
      {
        id: "r2",
        name: "Russ & Daughters",
        type: "Restaurant",
        cuisine: "Deli",
        rating: 4.7,
        priceLevel: "$$",
        neighborhood: "Lower East Side",
        image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
      }
    ]
  }
};

const CityDetails = () => {
  const { cityId } = useParams();
  const cityData = RECOMMENDATIONS[cityId as keyof typeof RECOMMENDATIONS];

  if (!cityData) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">City not found</h1>
        <Link to="/cities" className="text-primary hover:underline">
          Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="heading-1">{cityData.name}</h1>
        <p className="text-body text-lg">
          Discover the best local spots in {cityData.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cityData.recommendations.map((recommendation) => (
          <Link
            to={`/recommendations/${recommendation.id}`}
            key={recommendation.id}
            className="card group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{recommendation.name}</h2>
                <span className="text-neutral-600">{recommendation.priceLevel}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                <span>{recommendation.type}</span>
                <span>•</span>
                <span>{recommendation.cuisine}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {recommendation.neighborhood}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-primary" />
                  <span className="text-sm text-neutral-600">
                    {recommendation.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityDetails;
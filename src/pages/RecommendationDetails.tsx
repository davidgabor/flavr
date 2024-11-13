import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock, DollarSign, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const RECOMMENDATIONS = {
  r1: {
    id: "r1",
    name: "Joe's Pizza",
    type: "Restaurant",
    cuisine: "Italian",
    rating: 4.8,
    priceLevel: "$$",
    neighborhood: "Greenwich Village",
    address: "7 Carmine St, New York, NY 10014",
    description: "A New York institution since 1975, serving authentic NY-style pizza by the slice. Known for their perfectly crispy crust and fresh ingredients.",
    hours: "11:00 AM - 4:00 AM",
    popularDishes: ["Classic Cheese Slice", "Fresh Mozzarella Slice", "Pepperoni Slice"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    cityId: "nyc"
  }
};

const RecommendationDetails = () => {
  const { id } = useParams();
  const recommendation = RECOMMENDATIONS[id as keyof typeof RECOMMENDATIONS];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this recommendation with your friends.",
    });
  };

  if (!recommendation) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">Recommendation not found</h1>
        <Link to="/cities" className="text-primary hover:underline">
          Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          to={`/cities/${recommendation.cityId}`}
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to city
        </Link>
        
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={recommendation.image}
            alt={recommendation.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{recommendation.name}</h1>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-body mb-6">{recommendation.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="text-neutral-500" size={20} />
                <span className="text-body">{recommendation.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-neutral-500" size={20} />
                <span className="text-body">{recommendation.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="text-neutral-500" size={20} />
                <span className="text-body">{recommendation.priceLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-primary" size={20} />
                <span className="text-body">{recommendation.rating}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="heading-3 mb-4">Popular Dishes</h2>
            <ul className="space-y-3">
              {recommendation.popularDishes.map((dish) => (
                <li 
                  key={dish}
                  className="p-3 bg-neutral-100 rounded-lg text-body"
                >
                  {dish}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;
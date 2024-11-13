import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock, DollarSign, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RECOMMENDATIONS } from "@/data/recommendations";
import type { Recommendation } from "@/types/recommendation";

const RecommendationDetails = () => {
  const { id } = useParams();
  
  // Find the recommendation across all cities
  const recommendation = Object.values(RECOMMENDATIONS)
    .flatMap(city => city.recommendations)
    .find(rec => rec.id === id) as Recommendation | undefined;

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
          to="/cities"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to cities
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
            {recommendation.description && (
              <p className="text-neutral-600 mb-6">{recommendation.description}</p>
            )}
            
            <div className="space-y-4 mb-6">
              {recommendation.neighborhood && (
                <div className="flex items-center gap-2">
                  <MapPin className="text-neutral-500" size={20} />
                  <span className="text-neutral-600">{recommendation.neighborhood}</span>
                </div>
              )}
              {recommendation.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="text-neutral-500" size={20} />
                  <span className="text-neutral-600">{recommendation.hours}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="text-neutral-500" size={20} />
                <span className="text-neutral-600">{recommendation.priceLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-primary" size={20} />
                <span className="text-neutral-600">{recommendation.rating}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Type:</span>
                <span className="text-neutral-600">{recommendation.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Cuisine:</span>
                <span className="text-neutral-600">{recommendation.cuisine}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;
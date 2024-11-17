import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DestinationHeader from "@/components/destination/DestinationHeader";
import RecommendationCard from "@/components/destination/RecommendationCard";
import { supabase } from "@/integrations/supabase/client";
import type { Destination, Recommendation } from "@/types/recommendation";

const DestinationDetails = () => {
  const { destinationId } = useParams();

  const { data: destinationData, isLoading: isLoadingDestination } = useQuery({
    queryKey: ["destination", destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", destinationId)
        .single();
      
      if (error) throw error;
      return data as Destination;
    },
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations", destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("destination_id", destinationId);
      
      if (error) throw error;
      return data as Recommendation[];
    },
  });

  const groupedRecommendations = useMemo(() => {
    return recommendations.reduce((acc, recommendation) => {
      const type = recommendation.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        ...recommendation,
        priceLevel: recommendation.price_level
      });
      return acc;
    }, {} as Record<string, (Recommendation & { priceLevel: string })[]>);
  }, [recommendations]);

  if (isLoadingDestination || isLoadingRecommendations) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  if (!destinationData) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-1">Destination not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <DestinationHeader 
        name={destinationData.name}
        description={destinationData.description}
        image={destinationData.image}
        country="Sweden"
      />
      
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {Object.keys(groupedRecommendations).map((type) => (
            <button
              key={type}
              className="px-6 py-2 rounded-full text-sm text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors whitespace-nowrap"
            >
              {type}
            </button>
          ))}
        </div>

        {Object.entries(groupedRecommendations).map(([type, items]) => (
          <div key={type} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl text-white font-medium">{type}</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  {...recommendation}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationDetails;
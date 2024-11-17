import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DestinationHeader from "@/components/destination/DestinationHeader";
import RecommendationCard from "@/components/destination/RecommendationCard";
import { supabase } from "@/integrations/supabase/client";
import type { Destination, Recommendation } from "@/types/recommendation";

const pluralizeType = (type: string, count: number) => {
  if (count <= 1) return type;
  
  // Special cases
  if (type.toLowerCase() === "cafe") return "Cafes";
  if (type.toLowerCase() === "pub") return "Pubs";
  
  // General case: add 's'
  return `${type}s`;
};

const DestinationDetails = () => {
  const { destinationId } = useParams();
  const [selectedType, setSelectedType] = useState<string | null>(null);

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

  const types = Object.keys(groupedRecommendations);
  const displayedType = selectedType || types[0];

  return (
    <div className="relative min-h-screen bg-neutral-900">
      <DestinationHeader 
        name={destinationData.name}
        description={destinationData.description}
        image={destinationData.image}
        country={destinationData.country}
      />
      
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 text-sm ${
                type === displayedType
                  ? "text-white border-white"
                  : "text-white/80 border-white/20 hover:border-white/40"
              } border transition-colors whitespace-nowrap`}
            >
              {pluralizeType(type, groupedRecommendations[type].length)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groupedRecommendations[displayedType]?.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              {...recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
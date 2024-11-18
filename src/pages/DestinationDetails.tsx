import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DestinationHeader from "@/components/destination/DestinationHeader";
import RecommendationCard from "@/components/destination/RecommendationCard";
import BreadcrumbNavigation from "@/components/navigation/Breadcrumb";
import { supabase } from "@/integrations/supabase/client";
import type { Destination, Recommendation } from "@/types/recommendation";

const pluralizeType = (type: string, count: number) => {
  if (count <= 1) return type;
  
  if (type.toLowerCase() === "cafe") return "Cafes";
  if (type.toLowerCase() === "pub") return "Pubs";
  
  return `${type}s`;
};

const DestinationDetails = () => {
  const { destinationSlug } = useParams();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: destinationData, isLoading: isLoadingDestination } = useQuery({
    queryKey: ["destination", destinationSlug],
    queryFn: async () => {
      if (!destinationSlug) throw new Error("No destination slug provided");
      
      console.log('Searching for destination with slug:', destinationSlug);
      
      const searchName = destinationSlug.replace(/-/g, ' ');
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .ilike('name', searchName)
        .single();
      
      if (error) {
        console.error('Error fetching destination:', error);
        throw error;
      }
      
      console.log('Found destination:', data);
      return data as Destination;
    },
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations", destinationData?.id],
    queryFn: async () => {
      if (!destinationData?.id) return [];
      
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("destination_id", destinationData.id);
      
      if (error) throw error;
      return data as Recommendation[];
    },
    enabled: !!destinationData?.id,
  });

  const groupedRecommendations = recommendations.reduce((acc, recommendation) => {
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: destinationData.name, href: `/${destinationSlug}`, current: true },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-900">
      <BreadcrumbNavigation items={breadcrumbItems} />
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
              {pluralizeType(type, groupedRecommendations[type].length)} ({groupedRecommendations[type].length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {groupedRecommendations[displayedType]?.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              {...recommendation}
              destinationName={destinationData.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;

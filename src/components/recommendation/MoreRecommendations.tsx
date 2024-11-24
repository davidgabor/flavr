import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Recommendation } from "@/types/recommendation";
import RecommendationCard from "../destination/RecommendationCard";

interface MoreRecommendationsProps {
  destinationId: string;
  currentRecommendationId: string;
  destinationName: string;
}

const MoreRecommendations = ({ 
  destinationId, 
  currentRecommendationId,
  destinationName 
}: MoreRecommendationsProps) => {
  const { data: moreRecommendations = [] } = useQuery({
    queryKey: ["more-recommendations", destinationId],
    queryFn: async () => {
      if (!destinationId) return [];
      
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("destination_id", destinationId)
        .neq("id", currentRecommendationId)
        .limit(4)
        .order('id', { ascending: true, nullsFirst: false, foreignTable: null });
      
      if (error) throw error;
      return data as Recommendation[];
    },
    enabled: !!destinationId,
  });

  if (moreRecommendations.length === 0) return null;

  const destinationSlug = destinationName.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="mt-16 pt-16 border-t border-neutral-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="heading-2">Explore more in {destinationName}</h2>
        <Link 
          to={`/${destinationSlug}`}
          className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          See all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {moreRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            {...recommendation}
            destinationName={destinationName}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreRecommendations;
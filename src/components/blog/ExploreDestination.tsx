import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RecommendationCard from "../destination/RecommendationCard";
import type { Recommendation } from "@/types/recommendation";

interface ExploreDestinationProps {
  destinationId: string;
  destinationName: string;
}

const ExploreDestination = ({ destinationId, destinationName }: ExploreDestinationProps) => {
  const { data: recommendations = [] } = useQuery({
    queryKey: ["destination-recommendations", destinationId],
    queryFn: async () => {
      console.log('Fetching recommendations for destination:', destinationId);
      
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("destination_id", destinationId)
        .limit(4)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
      }

      console.log('Fetched recommendations:', data);
      return data as Recommendation[];
    },
    enabled: !!destinationId,
  });

  if (!destinationId || recommendations.length === 0) return null;

  const destinationSlug = destinationName.toLowerCase().replace(/\s+/g, '-');

  return (
    <section className="py-16 border-t border-neutral-200">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-judson text-neutral-900">
            Explore {destinationName}
          </h2>
          <Link 
            to={`/${destinationSlug}`}
            className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1 transition-colors"
          >
            See all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              {...recommendation}
              destinationName={destinationName}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreDestination;
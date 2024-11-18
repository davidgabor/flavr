import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecommendationCard from "@/components/destination/RecommendationCard";
import type { Expert } from "@/types/expert";
import type { Recommendation } from "@/types/recommendation";

const ExpertProfile = () => {
  const { expertSlug } = useParams();

  const { data: expert, isLoading: isLoadingExpert } = useQuery({
    queryKey: ["expert", expertSlug],
    queryFn: async () => {
      if (!expertSlug) throw new Error("No expert slug provided");
      
      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .eq('id', expertSlug)
        .single();
      
      if (error) throw error;
      return data as Expert;
    },
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["expert-recommendations", expert?.id],
    queryFn: async () => {
      if (!expert?.id) return [];
      
      const { data, error } = await supabase
        .from("expert_recommendations")
        .select(`
          recommendations (
            *,
            destinations (
              name
            )
          )
        `)
        .eq('expert_id', expert.id);
      
      if (error) throw error;
      return data.map(item => ({
        ...item.recommendations,
        destinationName: item.recommendations.destinations.name
      })) as (Recommendation & { destinationName: string })[];
    },
    enabled: !!expert?.id,
  });

  if (isLoadingExpert || isLoadingRecommendations) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-judson">Expert not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-8 mb-16">
          {expert.image && (
            <img
              src={expert.image}
              alt={expert.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-judson mb-4">{expert.name}</h1>
            {expert.bio && <p className="text-neutral-400">{expert.bio}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              {...recommendation}
              destinationName={recommendation.destinationName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
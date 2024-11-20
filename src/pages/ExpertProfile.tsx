import { useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecommendationCard from "@/components/destination/RecommendationCard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Expert } from "@/types/expert";
import type { Recommendation } from "@/types/recommendation";

const ExpertProfile = () => {
  const { expertSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const { data: recommendationsByDestination = {}, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["expert-recommendations", expert?.id],
    queryFn: async () => {
      if (!expert?.id) return {};
      
      const { data, error } = await supabase
        .from("expert_recommendations")
        .select(`
          recommendations (
            *,
            destinations (
              id,
              name
            )
          )
        `)
        .eq('expert_id', expert.id);
      
      if (error) throw error;

      return data.reduce((acc: Record<string, (Recommendation & { destinationName: string })[]>, item) => {
        const recommendation = item.recommendations;
        const destinationId = recommendation.destinations.id;
        const destinationName = recommendation.destinations.name;

        if (!acc[destinationId]) {
          acc[destinationId] = [];
        }

        acc[destinationId].push({
          ...recommendation,
          destinationName
        });

        return acc;
      }, {});
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

  const destinations = Object.entries(recommendationsByDestination).map(([id, recommendations]) => ({
    id,
    name: recommendations[0].destinationName,
    recommendations
  }));

  const destinationParam = searchParams.get('destination')?.toLowerCase();
  const currentTab = destinations.find(
    dest => dest.name.toLowerCase() === destinationParam
  )?.id || destinations[0]?.id;

  const handleTabChange = (value: string) => {
    const selectedDestination = destinations.find(dest => dest.id === value);
    if (selectedDestination) {
      setSearchParams({ destination: selectedDestination.name.toLowerCase() });
    }
  };

  const selectedDestination = destinations.find(dest => dest.id === currentTab);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {expert.image && (
            <img
              src={expert.image}
              alt={expert.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-white/10"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-judson mb-4">{expert.name}</h1>
            {expert.bio && <p className="text-neutral-400 max-w-2xl">{expert.bio}</p>}
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <div className="bg-neutral-900/80 backdrop-blur-sm z-10 py-4 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-neutral-400">Recommendations</h2>
                <span className="text-sm text-neutral-500">
                  {destinations.reduce((acc, dest) => acc + dest.recommendations.length, 0)} places in {destinations.length} cities
                </span>
              </div>
              
              <Select value={currentTab} onValueChange={handleTabChange}>
                <SelectTrigger className="w-[200px] bg-neutral-800 border-white/10">
                  <SelectValue>
                    {selectedDestination ? (
                      <span>
                        {selectedDestination.name} ({selectedDestination.recommendations.length})
                      </span>
                    ) : (
                      "Select a city"
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-white/10">
                  {destinations.map((destination) => (
                    <SelectItem 
                      key={destination.id} 
                      value={destination.id}
                      className="text-white hover:bg-neutral-700 focus:bg-neutral-700"
                    >
                      {destination.name} ({destination.recommendations.length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {destinations.map((destination) => (
            <TabsContent key={destination.id} value={destination.id} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destination.recommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    {...recommendation}
                    destinationName={recommendation.destinationName}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ExpertProfile;
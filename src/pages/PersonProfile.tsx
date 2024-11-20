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
import type { Person } from "@/types/person";
import type { Recommendation } from "@/types/recommendation";

interface RecommendationWithDestination extends Recommendation {
  destinations: {
    id: string;
    name: string;
  };
}

const PersonProfile = () => {
  const { personSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: person, isLoading: isLoadingPerson } = useQuery({
    queryKey: ["person", personSlug],
    queryFn: async () => {
      if (!personSlug) throw new Error("No person slug provided");
      
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .eq('id', personSlug)
        .single();
      
      if (error) throw error;
      return data as Person;
    },
  });

  const { data: recommendationsByDestination = {}, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["person-recommendations", person?.id],
    queryFn: async () => {
      if (!person?.id) return {};
      
      const { data, error } = await supabase
        .from("person_recommendations")
        .select(`
          recommendations (
            *,
            destinations (
              id,
              name
            )
          )
        `)
        .eq('person_id', person.id);
      
      if (error) throw error;

      const recommendations = data.reduce((acc: Record<string, RecommendationWithDestination[]>, item) => {
        const recommendation = item.recommendations as RecommendationWithDestination;
        if (!recommendation) return acc;
        
        const destinationId = recommendation.destinations.id;
        if (!acc[destinationId]) {
          acc[destinationId] = [];
        }

        acc[destinationId].push(recommendation);
        return acc;
      }, {});

      console.log('Processed recommendations:', recommendations);
      return recommendations;
    },
    enabled: !!person?.id,
  });

  if (isLoadingPerson || isLoadingRecommendations) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-judson">Person not found</h1>
        </div>
      </div>
    );
  }

  const destinations = Object.entries(recommendationsByDestination).map(([id, recommendations]) => ({
    id,
    name: recommendations[0].destinations.name,
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
          {person.image && (
            <img
              src={person.image}
              alt={person.name}
              className="w-32 h-32 rounded-full object-cover border-2 border-white/10"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-judson mb-4">{person.name}</h1>
            {person.bio && <p className="text-neutral-400 max-w-2xl">{person.bio}</p>}
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
                    destinationName={recommendation.destinations.name}
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

export default PersonProfile;
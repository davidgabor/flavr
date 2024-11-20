import { useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PersonHeader from "@/components/person/PersonHeader";
import PersonRecommendationStats from "@/components/person/PersonRecommendationStats";
import PersonRecommendationGrid from "@/components/person/PersonRecommendationGrid";
import type { Person } from "@/types/person";
import type { RecommendationWithDestination } from "@/types/recommendation";

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
      
      console.log('Fetching person with ID:', personSlug);
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .eq('id', personSlug)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching person:', error);
        throw error;
      }
      
      console.log('Fetched person data:', data);
      return data as Person;
    },
  });

  const { data: recommendationsByDestination = {}, isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["person-recommendations", person?.id],
    queryFn: async () => {
      if (!person?.id) return {};
      
      console.log('Fetching recommendations for person:', person.id);
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
      
      if (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
      }

      console.log('Raw recommendations data:', data);
      
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

  const selectedDestination = destinations.find(dest => dest.id === currentTab);

  const handleDestinationChange = (value: string) => {
    const selectedDestination = destinations.find(dest => dest.id === value);
    if (selectedDestination) {
      setSearchParams({ destination: selectedDestination.name.toLowerCase() });
    }
  };

  const totalRecommendations = destinations.reduce((acc, dest) => acc + dest.recommendations.length, 0);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <PersonHeader person={person} />
        
        <div className="bg-neutral-900/80 backdrop-blur-sm z-10 py-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <PersonRecommendationStats 
              totalRecommendations={totalRecommendations}
              totalDestinations={destinations.length}
            />
            
            <Select value={currentTab} onValueChange={handleDestinationChange}>
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

        {selectedDestination && (
          <div className="mt-6">
            <PersonRecommendationGrid recommendations={selectedDestination.recommendations} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonProfile;
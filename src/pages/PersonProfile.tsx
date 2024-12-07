import { useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PersonHeader from "@/components/person/PersonHeader";
import PersonFilters from "@/components/person/PersonFilters";
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
  const types = selectedDestination ? 
    Array.from(new Set(selectedDestination.recommendations.map(r => r.type)))
    : [];

  const currentType = searchParams.get('type') || null;

  const handleDestinationChange = (value: string) => {
    const selectedDestination = destinations.find(dest => dest.id === value);
    if (selectedDestination) {
      setSearchParams({ destination: selectedDestination.name.toLowerCase() });
    }
  };

  const handleTypeChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('type', value);
      return newParams;
    });
  };

  const totalRecommendations = destinations.reduce((acc, dest) => acc + dest.recommendations.length, 0);
  const filteredRecommendations = selectedDestination?.recommendations.filter(
    rec => !currentType || rec.type === currentType
  ) || [];

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-12">
      <PersonHeader 
        person={person} 
        totalRecommendations={totalRecommendations}
        totalDestinations={destinations.length}
      />
      
      <PersonFilters
        destinations={destinations}
        currentTab={currentTab}
        currentType={currentType}
        types={types}
        onDestinationChange={handleDestinationChange}
        onTypeChange={handleTypeChange}
      />
      
      {selectedDestination && (
        <div className="container mx-auto px-4 mt-8">
          <PersonRecommendationGrid recommendations={filteredRecommendations} />
        </div>
      )}
    </div>
  );
};

export default PersonProfile;
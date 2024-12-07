import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PersonHeader from "@/components/person/PersonHeader";
import PersonStats from "@/components/person/PersonStats";
import PersonFilters from "@/components/person/PersonFilters";
import PersonRecommendationGrid from "@/components/person/PersonRecommendationGrid";
import NewsletterForm from "@/components/common/NewsletterForm";
import { useState } from "react";
import { Helmet } from "react-helmet";
import type { Person } from "@/types/person";
import type { RecommendationWithDestination } from "@/types/recommendation";

interface DestinationGroup {
  id: string;
  name: string;
  recommendations: RecommendationWithDestination[];
}

const PersonProfile = () => {
  const { personSlug } = useParams();
  const [currentTab, setCurrentTab] = useState("");
  const [currentType, setCurrentType] = useState<string | null>(null);

  const { data: person } = useQuery<Person>({
    queryKey: ["person", personSlug],
    queryFn: async () => {
      if (!personSlug) throw new Error("No person slug provided");
      
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .eq("id", personSlug)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: destinations = [] } = useQuery<DestinationGroup[]>({
    queryKey: ["person-destinations", personSlug],
    queryFn: async () => {
      if (!personSlug) return [];
      
      console.log('Fetching destinations for person:', personSlug);
      
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
        .eq("person_id", personSlug);
      
      if (error) {
        console.error('Error fetching destinations:', error);
        throw error;
      }

      console.log('Raw destinations data:', data);
      
      const recommendations = data.map(item => ({
        ...item.recommendations,
        destinations: item.recommendations.destinations
      })) as RecommendationWithDestination[];

      console.log('Processed recommendations:', recommendations);

      const groupedByDestination = recommendations.reduce<Record<string, DestinationGroup>>((acc, rec) => {
        const destId = rec.destinations.id;
        if (!acc[destId]) {
          acc[destId] = {
            id: destId,
            name: rec.destinations.name,
            recommendations: []
          };
        }
        acc[destId].recommendations.push(rec);
        return acc;
      }, {});

      console.log('Grouped destinations:', groupedByDestination);

      return Object.values(groupedByDestination);
    },
    enabled: !!personSlug,
  });

  // Set initial tab
  useState(() => {
    if (destinations.length > 0 && !currentTab) {
      setCurrentTab(destinations[0].id);
    }
  });

  const selectedDestination = destinations.find(d => d.id === currentTab);
  const recommendations = selectedDestination?.recommendations || [];
  
  const filteredRecommendations = currentType
    ? recommendations.filter(rec => rec.type === currentType)
    : recommendations;

  const types = [...new Set(recommendations.map(rec => rec.type))];

  const totalRecommendations = destinations.reduce(
    (sum, dest) => sum + dest.recommendations.length,
    0
  );

  if (!person) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Helmet>
        <title>{person.name} - Flavr</title>
        <meta 
          name="description" 
          content={person.bio || `Discover ${person.name}'s favorite restaurants and bars on Flavr`}
        />
      </Helmet>

      <PersonHeader 
        person={person} 
        totalRecommendations={totalRecommendations}
        totalDestinations={destinations.length}
      />

      <div className="space-y-12 pb-24">
        <PersonStats
          totalRecommendations={totalRecommendations}
          totalDestinations={destinations.length}
        />

        <PersonFilters
          destinations={destinations}
          currentTab={currentTab}
          currentType={currentType}
          types={types}
          onDestinationChange={setCurrentTab}
          onTypeChange={setCurrentType}
        />

        <div className="container mx-auto px-4">
          <PersonRecommendationGrid recommendations={filteredRecommendations} />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonProfile;
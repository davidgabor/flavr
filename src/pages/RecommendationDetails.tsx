import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recommendation } from "@/types/recommendation";
import BreadcrumbNavigation from "@/components/navigation/Breadcrumb";
import RecommendationHeader from "@/components/recommendation/RecommendationHeader";
import RecommendationContent from "@/components/recommendation/RecommendationContent";
import MoreRecommendations from "@/components/recommendation/MoreRecommendations";

const RecommendationDetails = () => {
  const { destinationSlug, recommendationSlug } = useParams();
  
  const { data: recommendation, isLoading } = useQuery({
    queryKey: ["recommendation", destinationSlug, recommendationSlug],
    queryFn: async () => {
      if (!destinationSlug || !recommendationSlug) {
        throw new Error("Missing destination or recommendation slug");
      }

      console.log('Searching with slugs:', { destinationSlug, recommendationSlug });
      
      const searchDestination = destinationSlug.replace(/-/g, ' ');
      const searchRecommendation = recommendationSlug.replace(/-/g, ' ');
      
      // First, get the destination ID
      const { data: destination, error: destinationError } = await supabase
        .from("destinations")
        .select("id, name")
        .ilike('name', searchDestination)
        .single();

      if (destinationError) {
        console.error('Error fetching destination:', destinationError);
        throw destinationError;
      }

      console.log('Found destination:', destination);

      // Then, use the destination ID to find the recommendation
      const { data, error } = await supabase
        .from("recommendations")
        .select(`
          *,
          destinations (
            name,
            country
          )
        `)
        .eq("destination_id", destination.id)
        .ilike('name', searchRecommendation)
        .single();
      
      if (error) {
        console.error('Error fetching recommendation:', error);
        throw error;
      }

      console.log('Found recommendation:', data);
      return data as Recommendation & { destinations: { name: string; country: string } };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recommendation) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">Recommendation not found</h1>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: recommendation.destinations.name, href: `/${destinationSlug}` },
    { label: recommendation.name, href: `/${destinationSlug}/${recommendationSlug}`, current: true },
  ];

  return (
    <div className="animate-fade-in">
      <BreadcrumbNavigation items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <RecommendationHeader {...recommendation} />
          <RecommendationContent {...recommendation} />
          <MoreRecommendations 
            destinationId={recommendation.destination_id}
            currentRecommendationId={recommendation.id}
            destinationName={recommendation.destinations.name}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;
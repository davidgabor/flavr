import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecommendationHeader from "@/components/recommendation/RecommendationHeader";
import RecommendationContent from "@/components/recommendation/RecommendationContent";
import NewsletterSection from "@/components/recommendation/NewsletterSection";
import MoreRecommendations from "@/components/recommendation/MoreRecommendations";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const RecommendationDetails = () => {
  const { destinationSlug, recommendationSlug } = useParams();

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destinationSlug, recommendationSlug]);

  console.log('Searching with slugs:', { destinationSlug, recommendationSlug });

  const { data: destination } = useQuery({
    queryKey: ["destination-by-slug", destinationSlug],
    queryFn: async () => {
      if (!destinationSlug) return null;
      
      console.log('Fetching destination with slug:', destinationSlug);
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .ilike('name', destinationSlug.replace(/-/g, ' '))
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching destination:', error);
        return null;
      }
      
      console.log('Fetched destination:', data);
      return data;
    },
    retry: false
  });

  const { data: recommendation, isLoading } = useQuery({
    queryKey: ["recommendation", destination?.id, recommendationSlug],
    queryFn: async () => {
      if (!destination?.id || !recommendationSlug) return null;

      console.log('Fetching recommendation with slug:', recommendationSlug);
      const { data, error } = await supabase
        .from("recommendations")
        .select(`
          *,
          destinations (
            name,
            country
          )
        `)
        .eq('destination_id', destination.id)
        .ilike('name', recommendationSlug.replace(/-/g, ' '))
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching recommendation:', error);
        return null;
      }

      console.log('Fetched recommendation:', data);
      return data;
    },
    enabled: !!destination?.id && !!recommendationSlug,
    retry: false
  });

  // Handle 404 cases
  if (!isLoading && (!destination || !recommendation)) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-judson text-white">Page Not Found</h1>
          <p className="text-neutral-400">
            The recommendation you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-neutral-900" />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Helmet>
        <title>{recommendation.name} • {recommendation.destinations.name}</title>
        <meta 
          name="description" 
          content={recommendation.description || `${recommendation.name} is a ${recommendation.type.toLowerCase()} in ${recommendation.destinations.name}, ${recommendation.destinations.country}`}
        />
      </Helmet>

      <RecommendationHeader recommendation={recommendation} />
      
      <div className="space-y-24 pb-24">
        <RecommendationContent recommendation={recommendation} />
        <NewsletterSection />
        <MoreRecommendations 
          currentRecommendationId={recommendation.id}
          destinationId={recommendation.destination_id}
          destinationName={recommendation.destinations.name}
        />
      </div>
    </div>
  );
};

export default RecommendationDetails;
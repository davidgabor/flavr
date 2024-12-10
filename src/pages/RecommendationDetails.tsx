import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecommendationHeader from "@/components/recommendation/RecommendationHeader";
import RecommendationContent from "@/components/recommendation/RecommendationContent";
import MoreRecommendations from "@/components/recommendation/MoreRecommendations";
import NewsletterSection from "@/components/recommendation/NewsletterSection";
import type { Recommendation } from "@/types/recommendation";
import { Helmet } from "react-helmet";

const RecommendationDetails = () => {
  const { destinationSlug, recommendationSlug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: recommendation, isLoading } = useQuery({
    queryKey: ["recommendation", destinationSlug, recommendationSlug],
    queryFn: async () => {
      if (!destinationSlug || !recommendationSlug) {
        throw new Error("Missing destination or recommendation slug");
      }

      console.log('Searching with slugs:', { destinationSlug, recommendationSlug });
      
      // First, get the destination ID
      const destinationName = destinationSlug.replace(/-/g, ' ');
      const { data: destination, error: destinationError } = await supabase
        .from("destinations")
        .select("id")
        .ilike('name', destinationName)
        .single();

      if (destinationError) {
        console.error('Error fetching destination:', destinationError);
        throw destinationError;
      }

      if (!destination) {
        throw new Error("Destination not found");
      }

      console.log('Found destination:', destination);

      // Then, use the destination ID to find the recommendation
      const recommendationName = recommendationSlug.replace(/-/g, ' ');
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
        .ilike('name', recommendationName)
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
    return (
      <div className="min-h-screen bg-neutral-900 animate-pulse" />
    );
  }

  if (!recommendation) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">Recommendation not found</h1>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {recommendation && (
        <Helmet>
          <title>{recommendation.name} - Flavr</title>
          <meta 
            name="description" 
            content={recommendation.description || `${recommendation.name} in ${recommendation.destinations.name}, ${recommendation.destinations.country}`}
          />
        </Helmet>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[1400px] mx-auto space-y-24">
          <RecommendationHeader {...recommendation} />
          <RecommendationContent {...recommendation} />
          <MoreRecommendations 
            destinationId={recommendation.destination_id}
            currentRecommendationId={recommendation.id}
            destinationName={recommendation.destinations.name}
          />
          <NewsletterSection />
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;
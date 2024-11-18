import { useParams } from "react-router-dom";
import { Globe, Instagram, Phone, Map } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recommendation } from "@/types/recommendation";
import { Button } from "@/components/ui/button";
import ImageGallery from "@/components/recommendation/ImageGallery";
import MoreRecommendations from "@/components/recommendation/MoreRecommendations";
import BreadcrumbNavigation from "@/components/navigation/Breadcrumb";

const RecommendationDetails = () => {
  const { destinationSlug, recommendationSlug } = useParams();
  
  const { data: recommendation, isLoading } = useQuery({
    queryKey: ["recommendation", destinationSlug, recommendationSlug],
    queryFn: async () => {
      if (!destinationSlug || !recommendationSlug) {
        throw new Error("Missing destination or recommendation slug");
      }

      console.log('Searching with slugs:', { destinationSlug, recommendationSlug });
      
      const { data: destinations, error: destinationError } = await supabase
        .from("destinations")
        .select("id, name")
        .or(`name.ilike.${destinationSlug.replace(/-/g, ' ')}`)
        .single();

      if (destinationError) {
        console.error('Error fetching destination:', destinationError);
        throw destinationError;
      }

      console.log('Found destination:', destinations);

      const { data, error } = await supabase
        .from("recommendations")
        .select(`
          *,
          destinations (
            name,
            country
          )
        `)
        .eq("destination_id", destinations.id)
        .or(`name.ilike.${recommendationSlug.replace(/-/g, ' ')}`)
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

  const {
    name,
    type,
    cuisine,
    price_level,
    description,
    hours,
    images,
    address,
    latitude,
    longitude,
    website,
    instagram,
    phone,
    our_review,
    destinations,
    destination_id
  } = recommendation;

  const handleMapClick = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
    }
  };

  const allImages = images?.length ? images : [recommendation.image];

  return (
    <div className="animate-fade-in pb-16">
      <BreadcrumbNavigation items={breadcrumbItems} />
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-8">
            <ImageGallery images={allImages} name={name} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-5xl md:text-6xl font-judson mb-2">{name}</h1>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <span>{type}</span>
                    <span>•</span>
                    <span>{cuisine}</span>
                    <span>•</span>
                    <span>{price_level}</span>
                  </div>
                </div>

                {our_review && (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-judson">Our Review</h2>
                    <p className="text-neutral-300">{our_review}</p>
                  </div>
                )}

                {description && (
                  <div className="space-y-2">
                    <h2 className="text-2xl font-judson">About</h2>
                    <p className="text-neutral-300">{description}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Location</h3>
                  {address && (
                    <p className="text-neutral-300">{address}</p>
                  )}
                  {latitude && longitude && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleMapClick}>
                        <Map className="h-4 w-4 mr-2" />
                        Open in Maps
                      </Button>
                    </div>
                  )}
                </div>

                {hours && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Opening Hours</h3>
                    <p className="text-neutral-300">{hours}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-medium">Contact & Social</h3>
                  <div className="space-y-2">
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-300 hover:text-primary"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    )}
                    {instagram && (
                      <a
                        href={`https://instagram.com/${instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-300 hover:text-primary"
                      >
                        <Instagram className="h-4 w-4" />
                        {instagram}
                      </a>
                    )}
                    {phone && (
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 text-neutral-300 hover:text-primary"
                      >
                        <Phone className="h-4 w-4" />
                        {phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <MoreRecommendations 
              destinationId={destination_id}
              currentRecommendationId={recommendation.id}
              destinationName={destinations.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationDetails;
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Globe, Instagram, Phone, Map } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { optimizeImageUrl } from "@/utils/imageUtils";
import { supabase } from "@/integrations/supabase/client";
import { Recommendation } from "@/types/recommendation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const RecommendationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const { data: recommendation, isLoading } = useQuery({
    queryKey: ["recommendation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select(`
          *,
          destinations (
            name,
            country
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
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
        <Link to="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const {
    name,
    type,
    cuisine,
    price_level,
    description,
    neighborhood,
    hours,
    images,
    address,
    latitude,
    longitude,
    website,
    instagram,
    phone,
    our_review,
    destinations
  } = recommendation;

  const handleMapClick = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
    }
  };

  const allImages = images?.length ? images : [recommendation.image];

  return (
    <div className="animate-fade-in space-y-6 max-w-6xl mx-auto px-4">
      <Link
        to={`/destinations/${recommendation.destination_id}`}
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to {destinations.name}</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div 
          className="aspect-square rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setSelectedImageIndex(0)}
        >
          <img
            src={optimizeImageUrl(allImages[0])}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 gap-4">
          {allImages.slice(1, 5).map((image, index) => (
            <div 
              key={index}
              className="aspect-square rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImageIndex(index + 1)}
            >
              <img
                src={optimizeImageUrl(image)}
                alt={`${name} ${index + 2}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-judson mb-2">{name}</h1>
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
          {address && (
            <div className="space-y-2">
              <h3 className="font-medium">Location</h3>
              <p className="text-neutral-300">{address}</p>
              {latitude && longitude && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleMapClick}>
                    <Map className="h-4 w-4 mr-2" />
                    Open in Maps
                  </Button>
                </div>
              )}
            </div>
          )}

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

      {/* Image Gallery Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImageIndex !== null && (
            <img
              src={optimizeImageUrl(allImages[selectedImageIndex])}
              alt={`${name} ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendationDetails;
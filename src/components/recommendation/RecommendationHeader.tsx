import { Globe, Instagram, Phone, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageGallery from "./ImageGallery";
import ExpertsList from "./ExpertsList";

interface RecommendationHeaderProps {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  price_level: string;
  images?: string[];
  image: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  instagram?: string;
  phone?: string;
  our_review?: string;
}

const RecommendationHeader = ({
  id,
  name,
  type,
  cuisine,
  price_level,
  images,
  image,
  address,
  latitude,
  longitude,
  website,
  instagram,
  phone,
  our_review,
}: RecommendationHeaderProps) => {
  const handleMapClick = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
    }
  };

  const allImages = images?.length ? images : [image];

  return (
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
            <div>
              <h2 className="text-2xl font-judson mb-2">Our Review</h2>
              <p className="text-neutral-300">{our_review}</p>
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

          <ExpertsList recommendationId={id} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationHeader;
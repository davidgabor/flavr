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
  rating: number;
  images?: string[];
  image: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  instagram?: string;
  phone?: string;
  our_review?: string;
  description?: string;
}

const RecommendationHeader = ({
  id,
  name,
  type,
  cuisine,
  price_level,
  rating,
  images,
  image,
  address,
  latitude,
  longitude,
  website,
  instagram,
  phone,
  description,
}: RecommendationHeaderProps) => {
  const handleMapClick = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
    } else if (address) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    }
  };

  const allImages = images?.length ? images : [image];

  return (
    <div className="space-y-8">
      <ImageGallery images={allImages} name={name} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-judson mb-2">{name}</h1>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>{type}</span>
              <span>•</span>
              <span>{cuisine}</span>
              <span>•</span>
              <span>{price_level}</span>
              <span>•</span>
              <span>{rating} ★</span>
            </div>
          </div>

          {description && (
            <div className="relative bg-neutral-800/30 p-6 border border-white/5">
              <div className="absolute -left-px top-6 bottom-6 w-1 bg-primary" />
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-judson text-white pl-4">About</h2>
                  <p className="text-lg leading-relaxed text-neutral-300 pl-4">
                    {description}
                  </p>
                </div>
                <div className="pl-4 pt-4 border-t border-white/5">
                  <ExpertsList recommendationId={id} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative mt-[72px] overflow-hidden bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative p-6 space-y-8">
            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-white/90 flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                Location
              </h3>
              {address && (
                <p className="text-neutral-300 leading-relaxed">{address}</p>
              )}
              {(latitude || longitude || address) && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleMapClick}
                  className="w-full justify-center bg-primary hover:bg-primary/90 text-white transition-colors"
                >
                  Open in Maps
                </Button>
              )}
            </div>

            {/* Contact & Social Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-white/90">Contact & Social</h3>
              <div className="grid gap-3">
                {website && (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                  >
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Globe className="h-4 w-4" />
                    </div>
                    <span>Visit Website</span>
                  </a>
                )}
                {instagram && (
                  <a
                    href={`https://instagram.com/${instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                  >
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Instagram className="h-4 w-4" />
                    </div>
                    <span>{instagram}</span>
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-neutral-300 hover:text-primary transition-colors group"
                  >
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span>{phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationHeader;
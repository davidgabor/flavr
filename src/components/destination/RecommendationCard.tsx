import { Link } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";
import { optimizeImageUrl } from "@/utils/imageUtils";
import { Recommendation } from "@/types/recommendation";
import { Button } from "@/components/ui/button";

type RecommendationCardProps = Recommendation & {
  priceLevel: string;
};

const RecommendationCard = ({
  id,
  name,
  type,
  cuisine,
  neighborhood,
  price_level,
  priceLevel,
  image
}: RecommendationCardProps) => {
  const handleMapsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const searchQuery = encodeURIComponent(`${name} ${neighborhood || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${searchQuery}`, '_blank');
  };

  const displayPriceLevel = priceLevel || price_level;

  return (
    <Link
      to={`/recommendations/${id}`}
      className="group bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors duration-200"
    >
      <div className="flex items-center p-3 gap-3">
        <div className="w-16 h-16 overflow-hidden rounded-md flex-shrink-0 bg-neutral-100">
          <img
            src={optimizeImageUrl(image, 100)}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
            width={64}
            height={64}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h2 className="font-medium text-neutral-800 truncate">{name}</h2>
            <span className="text-sm text-neutral-500 flex-shrink-0">{displayPriceLevel}</span>
          </div>
          <div className="text-sm text-neutral-600 mb-1 truncate">
            {type} • {cuisine}
          </div>
          <div className="flex items-center justify-between">
            {neighborhood && (
              <div className="flex items-center gap-1 text-neutral-500">
                <MapPin size={14} />
                <span className="text-sm truncate">{neighborhood}</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 ml-auto"
              onClick={handleMapsClick}
            >
              <ExternalLink size={14} className="mr-1" />
              <span className="text-xs">Maps</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendationCard;
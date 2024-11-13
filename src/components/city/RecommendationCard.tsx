import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { optimizeImageUrl } from "@/utils/imageUtils";

interface RecommendationCardProps {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  neighborhood?: string;
  rating: number;
  priceLevel: string;
  image: string;
}

const RecommendationCard = ({
  id,
  name,
  type,
  cuisine,
  neighborhood,
  rating,
  priceLevel,
  image
}: RecommendationCardProps) => (
  <Link
    to={`/recommendations/${id}`}
    className="card group"
  >
    <div className="flex gap-4">
      <div className="w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
        <img
          src={optimizeImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="flex-1 py-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-semibold line-clamp-1">{name}</h2>
          <span className="text-sm text-neutral-600">{priceLevel}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
          <span>{type}</span>
          <span>•</span>
          <span>{cuisine}</span>
        </div>

        <div className="flex items-center gap-4">
          {neighborhood && (
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-neutral-500" />
              <span className="text-sm text-neutral-600 line-clamp-1">
                {neighborhood}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star size={14} className="text-primary" />
            <span className="text-sm text-neutral-600">
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default RecommendationCard;
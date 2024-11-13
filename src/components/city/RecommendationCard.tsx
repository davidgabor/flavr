import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { optimizeImageUrl } from "@/utils/imageUtils";

interface RecommendationCardProps {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  neighborhood: string;
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
    <AspectRatio ratio={16/9} className="overflow-hidden">
      <img
        src={optimizeImageUrl(image)}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </AspectRatio>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <span className="text-neutral-600">{priceLevel}</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
        <span>{type}</span>
        <span>•</span>
        <span>{cuisine}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-neutral-500" />
          <span className="text-sm text-neutral-600">
            {neighborhood}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={16} className="text-primary" />
          <span className="text-sm text-neutral-600">
            {rating}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

export default RecommendationCard;
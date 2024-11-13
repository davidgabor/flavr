import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { optimizeImageUrl } from "@/utils/imageUtils";
import { Recommendation } from "@/types/recommendation";

type RecommendationCardProps = Recommendation;

const RecommendationCard = ({
  id,
  name,
  type,
  cuisine,
  neighborhood,
  priceLevel,
  image
}: RecommendationCardProps) => (
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
          <span className="text-sm text-neutral-500 flex-shrink-0">{priceLevel}</span>
        </div>
        <div className="text-sm text-neutral-600 mb-1 truncate">
          {type} • {cuisine}
        </div>
        {neighborhood && (
          <div className="flex items-center gap-1 text-neutral-500">
            <MapPin size={14} />
            <span className="text-sm truncate">{neighborhood}</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

export default RecommendationCard;
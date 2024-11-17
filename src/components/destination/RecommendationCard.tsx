import { Link } from "react-router-dom";
import { optimizeImageUrl } from "@/utils/imageUtils";
import { Recommendation } from "@/types/recommendation";

type RecommendationCardProps = Recommendation & {
  destinationName: string;
};

const RecommendationCard = ({
  id,
  name,
  neighborhood,
  image,
  destinationName,
  type,
  cuisine
}: RecommendationCardProps) => (
  <Link
    to={`/${destinationName.toLowerCase().replace(/\s+/g, '-')}/${name.toLowerCase().replace(/\s+/g, '-')}`}
    className="text-left group"
  >
    <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-neutral-800 group-hover:shadow-2xl transition-all duration-500">
      <img
        src={optimizeImageUrl(image, 800)}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
    </div>
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-neutral-500">{neighborhood || type}</p>
      <h3 className="text-2xl font-judson transition-colors duration-300 group-hover:text-primary">{name}</h3>
      <p className="text-sm text-neutral-400">{cuisine}</p>
    </div>
  </Link>
);

export default RecommendationCard;
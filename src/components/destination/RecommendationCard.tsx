import { Link } from "react-router-dom";
import { optimizeImageUrl } from "@/utils/imageUtils";
import { Recommendation } from "@/types/recommendation";

type RecommendationCardProps = Recommendation & {
  priceLevel: string;
  destinationName: string;
};

const RecommendationCard = ({
  id,
  name,
  neighborhood,
  image,
  destinationName
}: RecommendationCardProps) => (
  <Link
    to={`/${destinationName.toLowerCase().replace(/\s+/g, '-')}/${name.toLowerCase().replace(/\s+/g, '-')}`}
    className="group block aspect-[4/5] relative overflow-hidden bg-neutral-800"
  >
    <div className="absolute inset-0">
      <img
        src={optimizeImageUrl(image, 800)}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-neutral-900" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      {neighborhood && (
        <p className="text-white/80 text-sm">{neighborhood}</p>
      )}
    </div>
  </Link>
);

export default RecommendationCard;
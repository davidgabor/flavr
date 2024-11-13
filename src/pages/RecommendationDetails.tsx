import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import { RECOMMENDATIONS } from "@/data/recommendations";
import { optimizeImageUrl } from "@/utils/imageUtils";

const RecommendationDetails = () => {
  const { id } = useParams();
  
  const recommendation = Object.values(RECOMMENDATIONS)
    .flatMap((city) => city.recommendations)
    .find((rec) => rec.id === id);

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
    priceLevel,
    description,
    neighborhood,
    hours,
    image
  } = recommendation;

  return (
    <div className="animate-fade-in space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to recommendations</span>
      </Link>

      <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={optimizeImageUrl(image)}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="heading-1 mb-0">{name}</h1>
          <span className="text-lg font-medium text-neutral-600">
            {priceLevel}
          </span>
        </div>

        <div className="flex items-center gap-4 text-neutral-600">
          <span>{type}</span>
          <span>•</span>
          <span>{cuisine}</span>
        </div>

        {(neighborhood || hours) && (
          <div className="flex items-center gap-6 text-neutral-600">
            {neighborhood && (
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{neighborhood}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-center gap-2">
                <span>{hours}</span>
              </div>
            )}
          </div>
        )}

        {description && (
          <p className="text-body">{description}</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationDetails;
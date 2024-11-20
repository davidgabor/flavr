import RecommendationCard from "@/components/destination/RecommendationCard";
import type { RecommendationWithDestination } from "@/types/recommendation";

interface PersonRecommendationGridProps {
  recommendations: RecommendationWithDestination[];
}

const PersonRecommendationGrid = ({ recommendations }: PersonRecommendationGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {recommendations.map((recommendation) => (
      <RecommendationCard
        key={recommendation.id}
        {...recommendation}
        destinationName={recommendation.destinations.name}
      />
    ))}
  </div>
);

export default PersonRecommendationGrid;
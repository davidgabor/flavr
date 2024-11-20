interface PersonRecommendationStatsProps {
  totalRecommendations: number;
  totalDestinations: number;
}

const PersonRecommendationStats = ({ 
  totalRecommendations, 
  totalDestinations 
}: PersonRecommendationStatsProps) => (
  <div className="flex items-center gap-2">
    <h2 className="text-sm font-medium text-neutral-400">Recommendations</h2>
    <span className="text-sm text-neutral-500">
      {totalRecommendations} places in {totalDestinations} cities
    </span>
  </div>
);

export default PersonRecommendationStats;
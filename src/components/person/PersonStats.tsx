type PersonStatsProps = {
  totalRecommendations: number;
  totalDestinations: number;
};

const PersonStats = ({ totalRecommendations, totalDestinations }: PersonStatsProps) => (
  <div className="container mx-auto px-4 mb-8">
    <div className="flex gap-8 text-neutral-400">
      <div>{totalRecommendations} recommendations</div>
      <div>{totalDestinations} destinations</div>
    </div>
  </div>
);

export default PersonStats;
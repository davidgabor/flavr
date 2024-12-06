type PersonStatsProps = {
  totalRecommendations: number;
  totalDestinations: number;
};

const PersonStats = ({ totalRecommendations, totalDestinations }: PersonStatsProps) => (
  <div className="flex gap-4 text-sm text-neutral-400">
    <div>{totalRecommendations} recommendations</div>
    <div>{totalDestinations} destinations</div>
  </div>
);

export default PersonStats;
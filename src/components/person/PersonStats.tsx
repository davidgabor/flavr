type PersonStatsProps = {
  totalRecommendations: number;
  totalDestinations: number;
};

const PersonStats = ({ totalRecommendations, totalDestinations }: PersonStatsProps) => (
  <div className="container mx-auto px-4">
    <div className="flex gap-8 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </div>
        <div>
          <p className="text-neutral-400">Recommendations</p>
          <p className="text-xl font-judson text-white">{totalRecommendations}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <div>
          <p className="text-neutral-400">Destinations</p>
          <p className="text-xl font-judson text-white">{totalDestinations}</p>
        </div>
      </div>
    </div>
  </div>
);

export default PersonStats;
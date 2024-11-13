import { useParams, Link } from "react-router-dom";
import CityHeader from "@/components/city/CityHeader";
import RecommendationCard from "@/components/city/RecommendationCard";
import { RECOMMENDATIONS } from "@/data/recommendations";

const CityDetails = () => {
  const { cityId } = useParams();
  const cityData = RECOMMENDATIONS[cityId as keyof typeof RECOMMENDATIONS];

  if (!cityData) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">City not found</h1>
        <Link to="/cities" className="text-primary hover:underline">
          Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <CityHeader name={cityData.name} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cityData.recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            {...recommendation}
          />
        ))}
      </div>
    </div>
  );
};

export default CityDetails;
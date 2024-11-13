import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import CityHeader from "@/components/city/CityHeader";
import RecommendationCard from "@/components/city/RecommendationCard";
import { RECOMMENDATIONS } from "@/data/recommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const CityDetails = () => {
  const { cityId } = useParams();
  const cityData = RECOMMENDATIONS[cityId as keyof typeof RECOMMENDATIONS];

  const groupedRecommendations = useMemo(() => {
    if (!cityData) return {};
    
    return cityData.recommendations.reduce((acc, recommendation) => {
      const type = recommendation.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(recommendation);
      return acc;
    }, {} as Record<string, typeof cityData.recommendations>);
  }, [cityData]);

  const types = useMemo(() => {
    return Object.keys(groupedRecommendations);
  }, [groupedRecommendations]);

  if (!cityData) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">City not found</h1>
        <Link to="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-8">
      <CityHeader name={cityData.name} />
      
      <Tabs defaultValue={types[0]} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start border-b mb-6">
            {types.map((type) => (
              <TabsTrigger 
                key={type} 
                value={type}
                className="px-6"
              >
                {type} ({groupedRecommendations[type].length})
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {types.map((type) => (
          <TabsContent key={type} value={type} className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {groupedRecommendations[type].map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  {...recommendation}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CityDetails;
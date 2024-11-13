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
          <TabsList className="w-full justify-start h-12 bg-neutral-100 p-1 rounded-lg">
            {types.map((type) => (
              <TabsTrigger 
                key={type} 
                value={type}
                className="px-6 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
              >
                {type} ({groupedRecommendations[type].length})
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {types.map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <div className="grid grid-cols-1 gap-3">
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
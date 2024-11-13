import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { ChevronRight } from "lucide-react";
import CityHeader from "@/components/city/CityHeader";
import RecommendationCard from "@/components/city/RecommendationCard";
import { RECOMMENDATIONS } from "@/data/recommendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";

const CityDetails = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const cityData = RECOMMENDATIONS[cityId as keyof typeof RECOMMENDATIONS];

  const cities = Object.entries(RECOMMENDATIONS).map(([id, city]) => ({
    id,
    name: city.name,
  }));

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

  const handleCityChange = (newCityId: string) => {
    navigate(`/cities/${newCityId}`);
  };

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
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cities">Cities</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{cityData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <CityHeader name={cityData.name} description={cityData.description} />
          <Select value={cityId} onValueChange={handleCityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Switch city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
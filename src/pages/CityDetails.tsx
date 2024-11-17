import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CityHeader from "@/components/city/CityHeader";
import RecommendationCard from "@/components/city/RecommendationCard";
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
import { supabase } from "@/integrations/supabase/client";
import { City, Recommendation } from "@/types/recommendation";

const CityDetails = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cityId]);

  const { data: cityData, isLoading: isLoadingCity } = useQuery({
    queryKey: ["city", cityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", cityId)
        .single();
      
      if (error) throw error;
      return data as City;
    },
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations", cityId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("city_id", cityId);
      
      if (error) throw error;
      return data as Recommendation[];
    },
  });

  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("id, name")
        .order("name");
      
      if (error) throw error;
      return data as { id: string; name: string; }[];
    },
  });

  const groupedRecommendations = useMemo(() => {
    return recommendations.reduce((acc, recommendation) => {
      const type = recommendation.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        ...recommendation,
        priceLevel: recommendation.price_level
      });
      return acc;
    }, {} as Record<string, (Recommendation & { priceLevel: string })[]>);
  }, [recommendations]);

  const types = useMemo(() => {
    return Object.keys(groupedRecommendations);
  }, [groupedRecommendations]);

  const handleCityChange = (newCityId: string) => {
    navigate(`/cities/${newCityId}`);
  };

  if (isLoadingCity || isLoadingRecommendations) {
    return <div>Loading...</div>;
  }

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
      <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-neutral-600 hover:text-primary">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cities" className="text-neutral-600 hover:text-primary">Cities</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">{cityData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <CityHeader name={cityData.name} description={cityData.description} />
          <Select value={cityId} onValueChange={handleCityChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Switch city" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DestinationHeader from "@/components/destination/DestinationHeader";
import RecommendationCard from "@/components/destination/RecommendationCard";
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
import type { Destination, Recommendation } from "@/types/recommendation";

const DestinationDetails = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [destinationId]);

  const { data: destinationData, isLoading: isLoadingDestination } = useQuery({
    queryKey: ["destination", destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", destinationId)
        .single();
      
      if (error) throw error;
      return data as Destination;
    },
  });

  const { data: recommendations = [], isLoading: isLoadingRecommendations } = useQuery({
    queryKey: ["recommendations", destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .eq("destination_id", destinationId);
      
      if (error) throw error;
      return data as Recommendation[];
    },
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
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

  const handleDestinationChange = (newDestinationId: string) => {
    navigate(`/destinations/${newDestinationId}`);
  };

  if (isLoadingDestination || isLoadingRecommendations) {
    return <div>Loading...</div>;
  }

  if (!destinationData) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">Destination not found</h1>
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
                <Link to="/destinations" className="text-neutral-600 hover:text-primary">Destinations</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">{destinationData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <DestinationHeader name={destinationData.name} description={destinationData.description} />
          <Select value={destinationId} onValueChange={handleDestinationChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Switch destination" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {destinations.map((destination) => (
                <SelectItem key={destination.id} value={destination.id}>
                  {destination.name}
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

export default DestinationDetails;
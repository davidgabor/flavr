import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import SearchResults from "./SearchResults";
import type { SearchResult } from "./types";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];

      console.log('Starting search with query:', debouncedQuery);

      const [destinationsRes, recommendationsRes] = await Promise.all([
        supabase
          .from("destinations")
          .select("id, name, description")
          .ilike('name', `%${debouncedQuery}%`)
          .limit(5),
        supabase
          .from("recommendations")
          .select(`
            id,
            name,
            type,
            destinations (
              name
            )
          `)
          .ilike('name', `%${debouncedQuery}%`)
          .limit(5)
      ]);

      console.log('Search results:', {
        destinations: destinationsRes.data,
        recommendations: recommendationsRes.data,
        destinationsError: destinationsRes.error,
        recommendationsError: recommendationsRes.error
      });

      if (destinationsRes.error) {
        console.error('Error searching destinations:', destinationsRes.error);
        return [];
      }

      if (recommendationsRes.error) {
        console.error('Error searching recommendations:', recommendationsRes.error);
        return [];
      }

      const results: SearchResult[] = [
        ...(destinationsRes.data || []).map(d => ({
          id: d.id,
          name: d.name,
          description: d.description,
          resultType: 'destination' as const
        })),
        ...(recommendationsRes.data || []).map(r => ({
          id: r.id,
          name: r.name,
          type: r.type,
          resultType: 'recommendation' as const,
          destination_name: r.destinations?.name
        }))
      ];

      console.log('Processed search results:', results);
      return results;
    },
    enabled: debouncedQuery.length > 0
  });

  const handleResultClick = (result: SearchResult) => {
    console.log('Handling click for result:', result);
    onOpenChange(false);
    setSearchQuery("");
    
    if (result.resultType === "destination") {
      const destinationSlug = result.name.toLowerCase().replace(/\s+/g, '-');
      console.log('Navigating to destination:', destinationSlug);
      navigate(`/${destinationSlug}`);
    } else if (result.destination_name) {
      const destinationSlug = result.destination_name.toLowerCase().replace(/\s+/g, '-');
      const recommendationSlug = result.name.toLowerCase().replace(/[\/\s]+/g, '-');
      console.log('Navigating to recommendation:', `/${destinationSlug}/${recommendationSlug}`);
      navigate(`/${destinationSlug}/${recommendationSlug}`);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b border-neutral-700/50 px-4 py-2">
        <Search className="mr-2 h-5 w-5 shrink-0 text-neutral-400" />
        <CommandInput
          placeholder="Search restaurants, cities and more..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-12 text-base text-white placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
      <CommandList className="max-h-[60vh] overflow-y-auto p-4">
        {debouncedQuery.length > 0 && (
          <SearchResults
            results={searchResults}
            isLoading={isLoading}
            handleResultClick={handleResultClick}
          />
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
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
import { SearchResults } from "../search/SearchResults";
import type { SearchResult } from "../search/types";

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

      console.log('Performing search with query:', debouncedQuery);

      const [destinationsRes, recommendationsRes] = await Promise.all([
        supabase
          .from("destinations")
          .select("id, name, description")
          .textSearch('name_search', debouncedQuery, {
            type: 'websearch',
            config: 'english'
          })
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
          .textSearch('name_search', debouncedQuery, {
            type: 'websearch',
            config: 'english'
          })
          .limit(5)
      ]);

      console.log('Raw search results:', {
        destinations: destinationsRes.data,
        recommendations: recommendationsRes.data
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

      console.log('Transformed search results:', results);
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
      <div className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-sm">
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-700 bg-neutral-900 p-6 shadow-lg duration-200 sm:rounded-lg">
          <div className="flex items-center border-b border-neutral-700/50 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-400" />
            <CommandInput
              placeholder="Search destinations and recommendations..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-14 bg-transparent"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-y-auto px-3">
            <SearchResults
              searchResults={searchResults}
              isLoading={isLoading}
              debouncedQuery={debouncedQuery}
              onResultClick={handleResultClick}
            />
          </CommandList>
        </div>
      </div>
    </CommandDialog>
  );
};

export default SearchDialog;
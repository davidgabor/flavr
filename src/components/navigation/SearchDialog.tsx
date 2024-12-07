import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, MapPin, Utensils } from "lucide-react";

type SearchResult = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  resultType: 'destination' | 'recommendation';
  destination_name?: string;
};

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
      <div className="flex items-center border-b border-neutral-700/50 px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 text-neutral-400" />
        <CommandInput
          placeholder="Search destinations and recommendations..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-14"
        />
      </div>
      <CommandList className="max-h-[400px] overflow-y-auto p-2">
        {debouncedQuery.length > 0 ? (
          <>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-neutral-400">
                Searching...
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <>
                {searchResults.some(r => r.resultType === "destination") && (
                  <CommandGroup heading="Destinations" className="pb-4">
                    {searchResults
                      .filter(r => r.resultType === "destination")
                      .map((result) => (
                        <CommandItem
                          key={`${result.resultType}-${result.id}`}
                          onSelect={() => handleResultClick(result)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-800/50 rounded-lg transition-colors"
                        >
                          <MapPin className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">{result.name}</span>
                            {result.description && (
                              <span className="text-sm text-neutral-400 line-clamp-1">
                                {result.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
                {searchResults.some(r => r.resultType === "recommendation") && (
                  <CommandGroup heading="Recommendations" className="pt-2 border-t border-neutral-700/50">
                    {searchResults
                      .filter(r => r.resultType === "recommendation")
                      .map((result) => (
                        <CommandItem
                          key={`${result.resultType}-${result.id}`}
                          onSelect={() => handleResultClick(result)}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-800/50 rounded-lg transition-colors"
                        >
                          <Utensils className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-white">{result.name}</span>
                            <span className="text-sm text-neutral-400">
                              {result.type} • {result.destination_name}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </>
            ) : (
              <CommandEmpty className="py-6 text-center text-sm text-neutral-400">
                No results found.
              </CommandEmpty>
            )}
          </>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
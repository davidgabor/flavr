import { useState, useEffect } from "react";
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
import { Search } from "lucide-react";

type DestinationResult = {
  id: string;
  name: string;
  description: string;
  resultType: 'destination';
};

type RecommendationResult = {
  id: string;
  name: string;
  type: string;
  resultType: 'recommendation';
  destination_name: string;
};

type SearchResult = DestinationResult | RecommendationResult;

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

      console.log('Searching for:', debouncedQuery);

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
          .limit(5),
      ]);

      console.log('Destinations results:', destinationsRes);
      console.log('Recommendations results:', recommendationsRes);

      if (destinationsRes.error) {
        console.error('Destinations search error:', destinationsRes.error);
        return [];
      }

      if (recommendationsRes.error) {
        console.error('Recommendations search error:', recommendationsRes.error);
        return [];
      }

      const destinations: DestinationResult[] = (destinationsRes.data || []).map((d) => ({
        ...d,
        resultType: 'destination',
      }));

      const recommendations: RecommendationResult[] = (recommendationsRes.data || []).map((r) => ({
        ...r,
        resultType: 'recommendation',
        destination_name: r.destinations?.name || '',
      }));

      return [...destinations, ...recommendations];
    },
    enabled: debouncedQuery.length > 0,
  });

  const handleResultClick = (result: SearchResult) => {
    onOpenChange(false);
    setSearchQuery("");
    if (result.resultType === "destination") {
      navigate(`/${result.name.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigate(`/${result.destination_name.toLowerCase().replace(/\s+/g, '-')}/${result.name.toLowerCase().replace(/[\/\s]+/g, '-')}`);
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput
          placeholder="Search destinations and recommendations..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
      </div>
      <CommandList>
        {debouncedQuery.length > 0 && (
          <>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-neutral-400">
                Searching...
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <CommandGroup heading="Destinations">
                  {searchResults
                    .filter((r): r is DestinationResult => r.resultType === "destination")
                    .map((result) => (
                      <CommandItem
                        key={`${result.resultType}-${result.id}`}
                        onSelect={() => handleResultClick(result)}
                        className="flex flex-col items-start"
                      >
                        <span className="font-medium">{result.name}</span>
                        {result.description && (
                          <span className="text-sm text-neutral-400 line-clamp-1">
                            {result.description}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Recommendations">
                  {searchResults
                    .filter((r): r is RecommendationResult => r.resultType === "recommendation")
                    .map((result) => (
                      <CommandItem
                        key={`${result.resultType}-${result.id}`}
                        onSelect={() => handleResultClick(result)}
                        className="flex flex-col items-start"
                      >
                        <span className="font-medium">{result.name}</span>
                        <span className="text-sm text-neutral-400">
                          {result.type} • {result.destination_name}
                        </span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default SearchDialog;
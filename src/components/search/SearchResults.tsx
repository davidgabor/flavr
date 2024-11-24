import { MapPin, Utensils } from "lucide-react";
import { CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import type { SearchResult } from "./types";

interface SearchResultsProps {
  searchResults: SearchResult[];
  isLoading: boolean;
  debouncedQuery: string;
  onResultClick: (result: SearchResult) => void;
}

export const SearchResults = ({ 
  searchResults, 
  isLoading, 
  debouncedQuery,
  onResultClick 
}: SearchResultsProps) => {
  if (!debouncedQuery.length) {
    return (
      <div className="py-6 text-center text-sm text-neutral-400">
        Start typing to search...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-6 text-center text-sm text-neutral-400">
        Searching...
      </div>
    );
  }

  if (!searchResults.length) {
    return (
      <CommandEmpty className="py-6 text-center text-sm text-neutral-400">
        No results found.
      </CommandEmpty>
    );
  }

  const destinations = searchResults.filter(r => r.resultType === "destination");
  const recommendations = searchResults.filter(r => r.resultType === "recommendation");

  return (
    <>
      {destinations.length > 0 && (
        <CommandGroup heading="Destinations" className="pb-4">
          {destinations.map((result) => (
            <CommandItem
              key={`${result.resultType}-${result.id}`}
              onSelect={() => onResultClick(result)}
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

      {recommendations.length > 0 && (
        <CommandGroup heading="Recommendations" className="pt-2 border-t border-neutral-700/50">
          {recommendations.map((result) => (
            <CommandItem
              key={`${result.resultType}-${result.id}`}
              onSelect={() => onResultClick(result)}
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
  );
};
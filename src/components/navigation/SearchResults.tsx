import { CommandEmpty, CommandGroup } from "@/components/ui/command";
import SearchResultItem from "./SearchResultItem";
import type { SearchResult } from "./types";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  handleResultClick: (result: SearchResult) => void;
}

const SearchResults = ({ results, isLoading, handleResultClick }: SearchResultsProps) => {
  const destinations = results.filter(r => r.resultType === "destination");
  const recommendations = results.filter(r => r.resultType === "recommendation");

  if (isLoading) {
    return (
      <div className="py-6 text-center text-sm text-neutral-400">
        Searching...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <CommandEmpty className="py-6 text-center text-sm text-neutral-400">
        No results found.
      </CommandEmpty>
    );
  }

  return (
    <>
      {destinations.length > 0 && (
        <CommandGroup heading="Destinations" className="pb-4">
          {destinations.map((result) => (
            <SearchResultItem
              key={`${result.resultType}-${result.id}`}
              result={result}
              onSelect={() => handleResultClick(result)}
            />
          ))}
        </CommandGroup>
      )}
      {recommendations.length > 0 && (
        <CommandGroup heading="Recommendations" className="pt-2 border-t border-neutral-700/50">
          {recommendations.map((result) => (
            <SearchResultItem
              key={`${result.resultType}-${result.id}`}
              result={result}
              onSelect={() => handleResultClick(result)}
            />
          ))}
        </CommandGroup>
      )}
    </>
  );
};

export default SearchResults;
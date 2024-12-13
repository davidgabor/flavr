import { CommandItem } from "@/components/ui/command";
import { MapPin, Utensils } from "lucide-react";
import type { SearchResult } from "./types";

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: () => void;
}

const SearchResultItem = ({ result, onSelect }: SearchResultItemProps) => {
  const icon = result.resultType === 'destination' ? (
    <MapPin className="mr-2 h-4 w-4 text-neutral-400" />
  ) : (
    <Utensils className="mr-2 h-4 w-4 text-neutral-400" />
  );

  return (
    <CommandItem
      value={result.name}
      onSelect={onSelect}
      className="flex items-center py-3 px-2 cursor-pointer"
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{result.name}</span>
        {result.resultType === 'recommendation' && result.destination_name && (
          <span className="text-xs text-neutral-400">
            {result.destination_name} • {result.type}
          </span>
        )}
        {result.resultType === 'destination' && result.description && (
          <span className="text-xs text-neutral-400 line-clamp-1">
            {result.description}
          </span>
        )}
      </div>
    </CommandItem>
  );
};

export default SearchResultItem;
import { CommandItem } from "@/components/ui/command";
import { MapPin, Utensils } from "lucide-react";
import type { SearchResult } from "./types";

interface SearchResultItemProps {
  result: SearchResult;
  onSelect: () => void;
}

const SearchResultItem = ({ result, onSelect }: SearchResultItemProps) => {
  const icon = result.resultType === 'destination' ? (
    <MapPin className="mr-3 h-5 w-5 text-neutral-400" />
  ) : (
    <Utensils className="mr-3 h-5 w-5 text-neutral-400" />
  );

  return (
    <CommandItem
      value={result.name}
      onSelect={onSelect}
      className="flex items-center py-4 px-3 cursor-pointer rounded-lg hover:bg-neutral-800 transition-colors duration-200 group"
    >
      {icon}
      <div className="flex flex-col space-y-1">
        <span className="text-base font-medium text-white group-hover:text-white transition-colors duration-200">
          {result.name}
        </span>
        {result.resultType === 'recommendation' && result.destination_name && (
          <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
            {result.destination_name} • {result.type}
          </span>
        )}
        {result.resultType === 'destination' && result.description && (
          <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200 line-clamp-1">
            {result.description}
          </span>
        )}
      </div>
    </CommandItem>
  );
};

export default SearchResultItem;
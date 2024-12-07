import { MapPin, Utensils } from "lucide-react";
import { CommandItem } from "@/components/ui/command";

interface SearchResultItemProps {
  result: {
    id: string;
    name: string;
    description?: string;
    type?: string;
    resultType: 'destination' | 'recommendation';
    destination_name?: string;
  };
  onSelect: () => void;
}

const SearchResultItem = ({ result, onSelect }: SearchResultItemProps) => {
  const isDestination = result.resultType === "destination";
  const Icon = isDestination ? MapPin : Utensils;

  return (
    <CommandItem
      key={`${result.resultType}-${result.id}`}
      onSelect={onSelect}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-800/50 rounded-lg transition-colors"
    >
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="font-medium text-white">{result.name}</span>
        {isDestination && result.description ? (
          <span className="text-sm text-neutral-400 line-clamp-1">
            {result.description}
          </span>
        ) : (
          <span className="text-sm text-neutral-400">
            {result.type} • {result.destination_name}
          </span>
        )}
      </div>
    </CommandItem>
  );
};

export default SearchResultItem;
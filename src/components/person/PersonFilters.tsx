import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import type { Destination, RecommendationWithDestination } from "@/types/recommendation";

type PersonFiltersProps = {
  destinations: Array<{
    id: string;
    name: string;
    recommendations: RecommendationWithDestination[];
  }>;
  currentTab: string;
  currentType: string | null;
  types: string[];
  onDestinationChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

const pluralizeType = (type: string, count: number) => {
  if (count <= 1) return type;
  
  if (type.toLowerCase() === "cafe") return "Cafes";
  if (type.toLowerCase() === "pub") return "Pubs";
  
  return `${type}s`;
};

const PersonFilters = ({
  destinations,
  currentTab,
  currentType,
  types,
  onDestinationChange,
  onTypeChange,
}: PersonFiltersProps) => {
  const selectedDestination = destinations.find(dest => dest.id === currentTab);

  return (
    <div className="bg-neutral-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="py-6 flex flex-col md:flex-row md:items-center gap-6">
          <Select value={currentTab} onValueChange={onDestinationChange}>
            <SelectTrigger className="w-[200px] bg-neutral-800 border-white/10">
              <SelectValue>
                {selectedDestination ? (
                  <span>
                    {selectedDestination.name} ({selectedDestination.recommendations.length})
                  </span>
                ) : (
                  "Select a city"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-white/10">
              {destinations.map((destination) => (
                <SelectItem 
                  key={destination.id} 
                  value={destination.id}
                  className="text-white hover:bg-neutral-700 focus:bg-neutral-700"
                >
                  {destination.name} ({destination.recommendations.length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {types.length > 0 && (
            <RadioGroup 
              value={currentType || ''} 
              onValueChange={onTypeChange}
              className="flex flex-wrap gap-3"
            >
              {types.map((type) => {
                const typeCount = selectedDestination?.recommendations.filter(
                  rec => rec.type === type
                ).length || 0;
                
                return (
                  <div key={type} className="flex items-center">
                    <label 
                      htmlFor={type}
                      className={`px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors ${
                        currentType === type 
                          ? 'bg-primary text-white border-primary' 
                          : 'border-white/20 text-white/80 hover:border-white/40'
                      }`}
                    >
                      <input
                        type="radio"
                        id={type}
                        value={type}
                        className="hidden"
                        onChange={(e) => onTypeChange(e.target.value)}
                        checked={currentType === type}
                      />
                      {pluralizeType(type, typeCount)} ({typeCount})
                    </label>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonFilters;
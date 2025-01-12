import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";

interface MentionedPlace {
  id: string;
  name: string;
  type: string;
  image: string;
  destination_name: string;
}

interface MentionedPlacesProps {
  recommendations: MentionedPlace[];
}

const MentionedPlaces = ({ recommendations }: MentionedPlacesProps) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-primary/10">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-judson text-neutral-800">
            Places mentioned in this story
          </h2>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap scrollbar-hide">
          <div className="flex gap-6">
            {recommendations.map((place) => (
              <Link
                key={place.id}
                to={`/${place.destination_name.toLowerCase().replace(/\s+/g, '-')}/${place.name.toLowerCase().replace(/[\/\s]+/g, '-')}`}
                className="group flex-none"
              >
                <div className="w-[300px]">
                  <div className="relative aspect-[4/3] mb-3 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-judson text-xl text-neutral-800 group-hover:text-primary transition-colors duration-200">
                    {place.name}
                  </h3>
                  <p className="text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors duration-200">
                    {place.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar 
            orientation="horizontal" 
            className="bg-neutral-200 hover:bg-neutral-300 transition-colors scrollbar-hide" 
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default MentionedPlaces;
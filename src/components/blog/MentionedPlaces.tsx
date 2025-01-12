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
    <div className="py-16 bg-black/30 backdrop-blur-md border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 rounded-full bg-primary/10">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-judson text-white">
            Places mentioned in this story
          </h2>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap scrollbar-hide">
          <div className="flex gap-8">
            {recommendations.map((place) => (
              <Link
                key={place.id}
                to={`/${place.destination_name.toLowerCase().replace(/\s+/g, '-')}/${place.name.toLowerCase().replace(/[\/\s]+/g, '-')}`}
                className="group flex-none"
              >
                <div className="w-[300px]">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-judson text-xl text-white group-hover:text-primary transition-colors duration-200">
                    {place.name}
                  </h3>
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-200">
                    {place.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar 
            orientation="horizontal" 
            className="bg-white/5 hover:bg-white/10 transition-colors" 
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default MentionedPlaces;
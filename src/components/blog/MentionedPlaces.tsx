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
    <div className="py-12 bg-neutral-900/50 backdrop-blur-sm border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-lg text-white">Mentioned places in this article</h2>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-6">
            {recommendations.map((place) => (
              <Link
                key={place.id}
                to={`/${place.destination_name.toLowerCase().replace(/\s+/g, '-')}/${place.name.toLowerCase().replace(/[\/\s]+/g, '-')}`}
                className="group flex-none"
              >
                <div className="w-[280px]">
                  <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-neutral-800">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-judson text-xl text-white group-hover:text-primary transition-colors duration-200">
                    {place.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{place.type}</p>
                </div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="bg-white/5" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default MentionedPlaces;
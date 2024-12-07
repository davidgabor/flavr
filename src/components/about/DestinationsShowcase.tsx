import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DestinationsShowcase = () => {
  const { data: destinations = [] } = useQuery({
    queryKey: ["featured-destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select(`
          *,
          recommendations:recommendations(count)
        `)
        .order('recommendations(count)', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-judson">Our Destinations</h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Explore our curated collection of exceptional dining experiences from around the world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-800"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-judson text-white">{destination.name}</h3>
                <p className="text-sm text-neutral-200">
                  {destination.recommendations[0]?.count || 0} recommendations
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;
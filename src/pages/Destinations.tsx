import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";

const Destinations = () => {
  const navigate = useNavigate();
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select(`
          *,
          recommendations:recommendations(count)
        `)
        .order('region');
      
      if (error) throw error;
      return data as (Destination & { recommendations: { count: number }[] })[];
    },
  });

  // Group destinations by region
  const groupedDestinations = destinations.reduce((acc, destination) => {
    const region = destination.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<string, (Destination & { recommendations: { count: number }[] })[]>);

  const handleDestinationClick = (destinationName: string) => {
    window.scrollTo(0, 0);
    navigate(`/${destinationName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const DestinationCard = ({ destination }: { destination: Destination & { recommendations: { count: number }[] } }) => (
    <button
      onClick={() => handleDestinationClick(destination.name)}
      className="text-left group"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-neutral-800 group-hover:shadow-2xl transition-all duration-500">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-neutral-500">{destination.country}</p>
        <h3 className="text-2xl font-judson transition-colors duration-300 group-hover:text-primary">{destination.name}</h3>
        <p className="text-sm text-neutral-400">{destination.recommendations?.[0]?.count || 0} spots</p>
      </div>
    </button>
  );

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-neutral-400">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-32">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1528127269322-539801943592')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Explore Our Destinations</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover our carefully curated collection of cities, each offering unique culinary experiences
            and hidden gems waiting to be explored.
          </p>
        </div>
      </section>

      <div className="container px-4 mx-auto space-y-24">
        {Object.entries(groupedDestinations).map(([region, destinations]) => (
          <section key={region} className="space-y-8">
            <div className="flex items-center gap-8 mb-12">
              <div className="h-px bg-white/20 flex-1" />
              <h2 className="text-3xl font-judson text-center">{region}</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
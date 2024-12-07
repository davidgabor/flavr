import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";
import NewsletterForm from "@/components/common/NewsletterForm";
import { Helmet } from "react-helmet";

const Destinations = () => {
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order('region', { ascending: true });

      if (error) throw error;
      return data as Destination[];
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">Loading...</div>;
  }

  // Group destinations by region
  const destinationsByRegion = destinations.reduce((acc, destination) => {
    if (!acc[destination.region]) {
      acc[destination.region] = [];
    }
    acc[destination.region].push(destination);
    return acc;
  }, {} as Record<string, Destination[]>);

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Helmet>
        <title>Destinations</title>
        <meta 
          name="description" 
          content="Explore our handpicked selection of cities, each filled with unique culinary experiences and hidden gems to discover."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16 pt-32 mb-24">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://i.ibb.co/KzFXhgZ/pexels-cottonbro-3298637-min.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Our Destinations</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Explore our handpicked selection of cities, each filled with unique culinary experiences and hidden gems to discover.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative -mt-32 mb-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container px-4 mx-auto">
        <div className="mt-32 space-y-24">
          {Object.entries(destinationsByRegion).map(([region, regionDestinations]) => (
            <section key={region} className="space-y-8">
              <div className="flex items-center gap-8 mb-12">
                <div className="h-px bg-white/20 flex-1" />
                <h2 className="text-3xl font-judson text-center">{region}</h2>
                <div className="h-px bg-white/20 flex-1" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {regionDestinations.map((destination) => (
                  <Link 
                    key={destination.id} 
                    to={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`} 
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
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destinations;

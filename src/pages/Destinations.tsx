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
        <title>Explore Culinary Destinations with Flavr</title>
        <meta 
          name="description" 
          content="Browse our curated collection of cities and uncover unique culinary experiences, hidden gems, and unforgettable dining spots worldwide."
        />
      </Helmet>

      {/* Hero Section with Newsletter */}
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3270&auto=format&fit=crop"
            alt="Destinations"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Our Destinations</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Explore our curated collection of exceptional dining experiences from around the world.
          </p>
          
          {/* Newsletter Section */}
          <div className="pt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="container px-4 mx-auto py-24">
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
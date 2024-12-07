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

      <section className="container px-4 mx-auto py-24">
        <h1 className="heading-1">Destinations</h1>
        <div className="space-y-16">
          {Object.entries(destinationsByRegion).map(([region, regionDestinations]) => (
            <div key={region} className="space-y-8">
              <h2 className="heading-2 text-neutral-200">{region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regionDestinations.map((destination) => (
                  <Link 
                    key={destination.id} 
                    to={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="group"
                  >
                    <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-2xl font-judson group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destinations;
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
        .select("*");

      if (error) throw error;
      return data as Destination[];
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">Loading...</div>;
  }

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
        <h1 className="text-4xl font-judson mb-8">Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`} className="card group">
              <div className="aspect-[16/9] overflow-hidden bg-neutral-800">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-judson group-hover:text-primary transition-colors">
                  {destination.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destinations;

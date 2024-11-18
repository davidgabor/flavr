import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const { data: destinations = [] } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order('name');
      
      if (error) throw error;
      return data as Destination[];
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
  }, {} as Record<string, Destination[]>);

  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <h4 className="font-judson text-xl mb-4">About Flavr</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Curating and sharing our favorite dining spots from around the world. Every recommendation is personally tested and thoughtfully selected.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-judson text-xl mb-6">Our Destinations</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {Object.entries(groupedDestinations).map(([region, destinations]) => (
                <div key={region} className="space-y-3">
                  <h5 className="text-sm font-medium text-white border-b border-white/10 pb-2 mb-3">
                    {region}
                  </h5>
                  <ul className="space-y-2">
                    {destinations.map((destination) => (
                      <li key={destination.id}>
                        <a
                          href={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-neutral-400 hover:text-white transition-colors block py-0.5"
                        >
                          {destination.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-neutral-500 pt-12 border-t border-white/10 mt-12">
          <div className="mb-4">
            <a href="mailto:hello@flavr.world" className="text-primary hover:text-primary/90 transition-colors">
              hello@flavr.world
            </a>
          </div>
          © {currentYear} Flavr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
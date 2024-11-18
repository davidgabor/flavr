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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-judson text-xl mb-4">About Flavr</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Curating and sharing our favorite dining spots from around the world. Every recommendation is personally tested and thoughtfully selected.
            </p>
          </div>
          <div>
            <h4 className="font-judson text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/destinations" className="text-neutral-400 hover:text-white transition-colors">
                  All Destinations
                </a>
              </li>
              <li>
                <a href="/#newsletter" className="text-neutral-400 hover:text-white transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-judson text-xl mb-4">Our Destinations</h4>
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(groupedDestinations).map(([region, destinations]) => (
                <div key={region}>
                  <h5 className="text-sm font-medium text-neutral-300 mb-2">{region}</h5>
                  <ul className="space-y-2">
                    {destinations.map((destination) => (
                      <li key={destination.id}>
                        <a
                          href={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-sm text-neutral-400 hover:text-white transition-colors"
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
        <div className="text-center text-sm text-neutral-500 pt-12 border-t border-white/10">
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
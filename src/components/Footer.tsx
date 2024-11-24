import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    try {
      console.log('Subscribing email to newsletter:', email);
      
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
      
      if (error) {
        console.error('Error subscribing to newsletter:', error);
        if (error.code === '23505') {
          toast.error("This email is already subscribed to our newsletter!");
        } else {
          toast.error("Failed to subscribe to newsletter. Please try again.");
        }
        return;
      }

      toast.success("Thanks for subscribing!");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
    <footer className="border-t border-white/10 mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 md:gap-x-6">
          {/* About section - full width on mobile */}
          <div className="col-span-full md:col-span-2">
            <h4 className="font-judson text-xl mb-3">About Flavr</h4>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Curating and sharing our favorite dining spots from around the world. Every recommendation is personally tested and thoughtfully selected.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                name="email"
                placeholder="Subscribe to newsletter"
                required
                disabled={isLoading}
                className="flex-1 h-8 text-sm bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-primary/50 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="h-8 px-3 text-sm bg-primary hover:bg-primary/90 text-white font-medium transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
              >
                {isLoading ? '...' : 'Join'}
              </button>
            </form>
          </div>

          {/* Destinations grid - 2 columns on mobile */}
          <div className="col-span-full md:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {Object.entries(groupedDestinations).map(([region, destinations]) => (
                <div key={region} className="space-y-3">
                  <h4 className="font-judson text-xl">{region}</h4>
                  <ul className="space-y-1.5">
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

        {/* Copyright - centered and padded */}
        <div className="text-center text-sm text-neutral-500 pt-8 mt-8 border-t border-white/5">
          © {currentYear} Flavr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
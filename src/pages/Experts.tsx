import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Expert } from "@/types/expert";

const Experts = () => {
  const { data: experts = [], isLoading } = useQuery({
    queryKey: ["experts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experts")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Expert[];
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581092795360-fd1ca04f0952')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Meet Our Food Experts</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover our curated network of food enthusiasts, critics, and local connoisseurs who bring you the best dining experiences from around the world.
          </p>
        </div>
      </section>

      {/* Experts Grid */}
      <div className="container px-4 mx-auto py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <Link
              key={expert.id}
              to={`/expert/${expert.id}`}
              className="group bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-800">
                {expert.image ? (
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-judson group-hover:text-primary transition-colors">
                  {expert.name}
                </h3>
                {expert.bio && (
                  <p className="text-neutral-400 line-clamp-3">
                    {expert.bio}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experts;
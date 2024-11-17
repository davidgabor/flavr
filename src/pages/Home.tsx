import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";

const Home = () => {
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select(`
          *,
          recommendations:recommendations(count)
        `);
      
      if (error) throw error;
      return data as (Destination & { recommendations: { count: number }[] })[];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="https://media.licdn.com/dms/image/v2/D4D03AQGTbmpMLQualw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728313961873?e=1736985600&v=beta&t=-qTMspUk11IuzOzs_g4t5VXH0Jtamkd4Bayq4ZvaXQU"
              alt="David's profile picture"
            />
          </Avatar>
          <div className="max-w-2xl mx-auto">
            <h1 className="heading-1 mb-4">
              Hey! I'm David, and these are my favorite spots around the world
            </h1>
            <p className="text-lg text-neutral-600">
              I love sharing my favorite restaurants and bars with friends and family.
              Here's a curated list of places I personally recommend.
            </p>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <Input
            type="search"
            placeholder="Search destinations or cuisines..."
            className="bg-white"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="heading-2 text-center mb-8">Explore my recommendations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((destination) => (
            <Link to={`/destinations/${destination.id}`} key={destination.id} className="card group">
              <div className="aspect-[3/2] overflow-hidden rounded-t-lg">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-lg mb-0.5">{destination.name}</h3>
                <p className="text-sm text-neutral-600">
                  {destination.recommendations[0]?.count || 0} recommendations
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
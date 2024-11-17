import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";

const Home = () => {
  const navigate = useNavigate();
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

  const groupedDestinations = {
    europe: destinations.filter(d => ["copenhagen", "stockholm", "malaga", "paris", "barcelona", "florence", "milan"].includes(d.id)),
    asia: destinations.filter(d => ["dubai", "bangkok", "singapore", "hongkong"].includes(d.id)),
    unitedStates: destinations.filter(d => ["newyork", "losangeles", "sanfrancisco", "miami"].includes(d.id))
  };

  const handleDestinationClick = (destinationId: string) => {
    window.scrollTo(0, 0);
    navigate(`/destinations/${destinationId}`);
  };

  const DestinationCard = ({ destination, index }: { destination: Destination & { recommendations: { count: number }[] }, index: number }) => (
    <button
      key={destination.id}
      onClick={() => handleDestinationClick(destination.id)}
      className="text-left group animate-fade-in"
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-neutral-800 relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-all duration-500 opacity-0"
          loading="lazy"
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
          }}
        />
      </div>
      <h3 className="text-xl font-judson mb-1">{destination.name}</h3>
      <p className="text-sm text-neutral-400">{destination.recommendations?.[0]?.count || 0} spots</p>
    </button>
  );

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-neutral-400">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2000')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/80 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-judson">Our Favorite Spots, Everywhere</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            We're David and Maja, two food lovers sharing our favorite spots from cities around the
            world. From cozy local haunts to standout dining experiences, each pick is a place we've
            tried, loved, and can't wait for you to enjoy.
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQGTbmpMLQualw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728313961873?e=1736985600&v=beta&t=-qTMspUk11IuzOzs_g4t5VXH0Jtamkd4Bayq4ZvaXQU"
              alt="David's profile"
              className="w-12 h-12 rounded-full border-2 border-white/20"
              loading="eager"
            />
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHA9ZPFYWC8nQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728372617118?e=1737590400&v=beta&t=_hPUlmpjsO-ksPTeiJt4nROwGfDNlN0Smj6VfyWE7mg"
              alt="Maja's profile"
              className="w-12 h-12 rounded-full border-2 border-white/20"
              loading="eager"
            />
          </div>
          <div className="text-sm text-neutral-400">Enjoy,<br />David & Maja</div>
        </div>
      </section>

      {/* Destinations Sections */}
      <div className="container px-4 mx-auto space-y-24">
        <section className="space-y-8 animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center gap-8 mb-12">
            <div className="h-px bg-white/20 flex-1" />
            <h2 className="text-3xl font-judson text-center">Europe</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {groupedDestinations.europe.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        </section>

        {/* Asia Section */}
        <section className="space-y-8 animate-fade-in [animation-delay:400ms]">
          <div className="flex items-center gap-8 mb-12">
            <div className="h-px bg-white/20 flex-1" />
            <h2 className="text-3xl font-judson text-center">Asia</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {groupedDestinations.asia.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        </section>

        {/* United States Section */}
        <section className="space-y-8 animate-fade-in [animation-delay:600ms]">
          <div className="flex items-center gap-8 mb-12">
            <div className="h-px bg-white/20 flex-1" />
            <h2 className="text-3xl font-judson text-center">United States</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {groupedDestinations.unitedStates.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
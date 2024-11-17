import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
        `)
        .order('region');
      
      if (error) throw error;
      return data as (Destination & { recommendations: { count: number }[] })[];
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
  }, {} as Record<string, (Destination & { recommendations: { count: number }[] })[]>);

  const handleDestinationClick = (destinationName: string) => {
    window.scrollTo(0, 0);
    navigate(`/${destinationName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const DestinationCard = ({ destination, index }: { destination: Destination & { recommendations: { count: number }[] }, index: number }) => (
    <button
      key={destination.id}
      onClick={() => handleDestinationClick(destination.name)}
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
        <p className="text-sm text-neutral-400">{destination.recommendations?.[0]?.count || 0} spots</p>
      </div>
    </button>
  );

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-neutral-400">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/2620043/2620043-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
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

      <div className="container px-4 mx-auto space-y-24">
        {Object.entries(groupedDestinations).map(([region, destinations], regionIndex) => (
          <section key={region} className="space-y-8">
            <div className="flex items-center gap-8 mb-12">
              <div className="h-px bg-white/20 flex-1" />
              <h2 className="text-3xl font-judson text-center">{region}</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
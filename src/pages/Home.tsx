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
    <div className="min-h-screen bg-neutral-900 text-white pb-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/2620043/2620043-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6 pt-32">
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
          <div className="text-sm text-neutral-400 mb-24">Enjoy,<br />David & Maja</div>
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

      {/* About Our Process Section */}
      <section className="container px-4 mx-auto mt-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-judson">How We Choose Our Spots</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="text-primary text-2xl font-judson">01</div>
              <h3 className="text-xl font-judson">Personal Experience</h3>
              <p className="text-neutral-400">Every spot we recommend has been personally visited and vetted by us.</p>
            </div>
            <div className="space-y-4">
              <div className="text-primary text-2xl font-judson">02</div>
              <h3 className="text-xl font-judson">Quality First</h3>
              <p className="text-neutral-400">We prioritize exceptional food, service, and atmosphere above all else.</p>
            </div>
            <div className="space-y-4">
              <div className="text-primary text-2xl font-judson">03</div>
              <h3 className="text-xl font-judson">Regular Updates</h3>
              <p className="text-neutral-400">We continuously revisit and update our recommendations to ensure they maintain our standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container px-4 mx-auto mt-32">
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-neutral-800/50 p-12 rounded-lg border border-white/10">
          <h2 className="text-3xl font-judson">Stay Updated</h2>
          <p className="text-neutral-400">Get notified when we add new destinations and recommendations to our collection.</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-neutral-700 border border-white/10 rounded px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="container px-4 mx-auto mt-32">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-judson">Follow Our Journey</h2>
          <p className="text-neutral-400">See our latest food adventures on Instagram</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1484723091739-30a097e8f929"
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-neutral-800 rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
                alt="Food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded transition-colors mt-4"
          >
            @flavr_food
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Destination } from "@/types/recommendation";
import NewsletterForm from "@/components/common/NewsletterForm";
import ProfileImages from "@/components/home/ProfileImages";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["destinations-with-counts"],
    queryFn: async () => {
      console.log('Fetching destinations with recommendation counts...');
      
      const { data: destinationsData, error } = await supabase
        .from("destinations")
        .select(`
          *,
          recommendations!left (
            id
          )
        `)
        .order('region');
      
      if (error) {
        console.error('Error fetching destinations:', error);
        throw error;
      }

      const processedData = destinationsData.map(destination => ({
        ...destination,
        recommendationCount: destination.recommendations?.length || 0
      }));

      console.log('Processed destinations data:', processedData);
      return processedData;
    },
  });

  const groupedDestinations = destinations.reduce((acc, destination) => {
    const region = destination.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<string, typeof destinations[0][]>);

  const handleDestinationClick = (destinationName: string) => {
    const path = `/${destinationName.toLowerCase().replace(/\s+/g, '-')}`;
    window.scrollTo(0, 0);
    navigate(path);
  };

  const DestinationCard = ({ destination }: { destination: typeof destinations[0] }) => (
    <button
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
        <p className="text-sm text-neutral-400">{destination.recommendationCount} spots</p>
      </div>
    </button>
  );

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-neutral-400">Loading...</div>
    </div>;
  }

  // ... keep existing code (Hero section, Newsletter section, About Our Process section)

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-32">
      <Helmet>
        <title>Flavr - Trusted Dining Recommendations</title>
        <meta 
          name="description" 
          content="Discover our favorite restaurants and bars across the world, handpicked by passionate food lovers. Every spot is personally tried and trusted."
        />
      </Helmet>

      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://files-space.ams3.digitaloceanspaces.com/2894881-uhd_3840_2160_24fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/60 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6 pt-40">
          <h1 className="text-4xl md:text-6xl font-judson">Our Favorite Spots, Everywhere</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            We're David and Maja, sharing our favorite spots from around the world—places we've tried, loved, and trust. As Flavr grows, we'll bring friends and family onboard to expand this guide with even more recommendations you can count on.
          </p>
          <ProfileImages />
          <div className="text-sm text-neutral-400">Enjoy,<br />David & Maja</div>
          
          <div className="pt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <div className="mt-32 container px-4 mx-auto space-y-24">
        {Object.entries(groupedDestinations).map(([region, destinations]) => (
          <section key={region} className="space-y-8">
            <div className="flex items-center gap-8 mb-12">
              <div className="h-px bg-white/20 flex-1" />
              <h2 className="text-3xl font-judson text-center">{region}</h2>
              <div className="h-px bg-white/20 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
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
          <div className="pt-8">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"
            >
              Learn more about us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container px-4 mx-auto mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-neutral-800/50 p-12 md:p-16 border border-white/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2" />
            
            <div className="relative space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-4xl font-judson bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                  Stay Updated
                </h2>
                <p className="text-lg text-neutral-300">
                  Join our community and be the first to discover new destinations and hidden gems.
                </p>
              </div>
              
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

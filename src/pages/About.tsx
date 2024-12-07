import NewsletterForm from "@/components/common/NewsletterForm";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MissionSection from "@/components/about/MissionSection";
import StorySection from "@/components/about/StorySection";
import DestinationsShowcase from "@/components/about/DestinationsShowcase";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { data: stats } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      console.log('Fetching site statistics...');
      
      const [
        { count: recommendationsCount },
        { count: destinationsCount },
        { count: subscribersCount }
      ] = await Promise.all([
        supabase.from('recommendations').select('*', { count: 'exact', head: true }),
        supabase.from('destinations').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
      ]);

      console.log('Stats fetched:', { recommendationsCount, destinationsCount, subscribersCount });
      return {
        recommendations: recommendationsCount || 0,
        destinations: destinationsCount || 0,
        subscribers: subscribersCount || 0
      };
    }
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16 pt-32 mb-24">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://i.ibb.co/KzFXhgZ/pexels-cottonbro-3298637-min.jpg')] bg-cover bg-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">About Flavr</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover the story behind our mission to share the world's most memorable dining experiences.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative -mt-32 mb-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto space-y-32 py-16">
          {/* Stats Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-neutral-800/50 blur-3xl transform -translate-y-1/2" />
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">
                  {stats?.recommendations || 0}+
                </div>
                <div className="text-neutral-400">Curated Recommendations</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">
                  {stats?.destinations || 0}
                </div>
                <div className="text-neutral-400">Global Destinations</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">
                  {stats?.subscribers || 0}+
                </div>
                <div className="text-neutral-400">Newsletter Subscribers</div>
              </div>
            </div>
          </section>

          <StorySection />
          <MissionSection />
          <DestinationsShowcase />

          {/* CTA Section */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-judson">Start Exploring</h2>
              <p className="text-lg text-neutral-300">
                Ready to discover your next favorite restaurant? Browse our curated collection of exceptional dining experiences.
              </p>
              <div className="flex">
                <Link 
                  to="/destinations" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  View Destinations
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Restaurant interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent" />
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="relative">
            <div className="relative bg-neutral-800/50 p-12 md:p-16 border border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 blur-2xl transform translate-x-1/2 translate-y-1/2" />
              
              <div className="relative grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-4xl font-judson bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                    Join Our Community
                  </h2>
                  <p className="text-lg text-neutral-300">
                    Be the first to discover new recommendations and travel guides.
                  </p>
                </div>
                <div>
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
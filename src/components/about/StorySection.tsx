import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const StorySection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-[4/3] md:aspect-square order-2 md:order-1">
        <div className="absolute -inset-4 bg-primary/5 -z-10" />
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Restaurant interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent" />
      </div>
      <div className="space-y-6 order-1 md:order-2">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-judson">Our Story</h2>
          <div className="h-1 w-12 bg-primary mt-2" />
        </div>
        <div className="prose prose-invert space-y-6">
          <p className="text-lg text-neutral-300 leading-relaxed">
            We're David and Maja, two food enthusiasts who love discovering great places to eat and drink. What started as a personal list of our favorite spots has grown into a way to share recommendations with others.
          </p>
          <p className="text-lg text-neutral-300 leading-relaxed mb-8">
            Each place we share is one we've tried, loved, and truly believe you'll enjoy too. We hope Flavr helps you find your next favorite meal or drink, whether it's a hidden gem or a standout destination.
          </p>
          <div>
            <Link 
              to="/destinations" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Explore Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
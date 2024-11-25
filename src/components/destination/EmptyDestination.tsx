import { Compass, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyDestination = ({ destinationName }: { destinationName: string }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 -z-10" />
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Restaurant interior"
            className="w-full aspect-video object-cover rounded-lg opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-4">
            <MapPin className="w-8 h-8 text-primary animate-bounce" />
            <Compass className="w-8 h-8 text-secondary animate-pulse" />
            <Utensils className="w-8 h-8 text-primary animate-bounce delay-100" />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-judson mb-4">Coming Soon to {destinationName}</h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              We're currently exploring the best dining spots in {destinationName}. Our team is carefully curating a selection of exceptional restaurants, cafes, and hidden gems for you.
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Explore Other Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyDestination;
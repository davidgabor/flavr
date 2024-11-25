import { Compass, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyDestination = ({ destinationName }: { destinationName: string }) => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Restaurant ambiance"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/90 to-neutral-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto text-center space-y-12 animate-fade-in relative">
        {/* Decorative Elements */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-3xl opacity-30 rounded-full" />
        
        {/* Icons */}
        <div className="flex justify-center gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
            <MapPin className="w-10 h-10 text-primary animate-bounce" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 blur-xl" />
            <Compass className="w-10 h-10 text-secondary animate-pulse" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
            <Utensils className="w-10 h-10 text-primary animate-bounce delay-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 relative">
          <h2 className="text-4xl md:text-5xl font-judson">
            Coming Soon to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {destinationName}
            </span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            We're currently exploring the best dining spots in {destinationName}. Our team is carefully curating a selection of exceptional restaurants, cafes, and hidden gems for you.
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative pt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl" />
          <Link
            to="/destinations"
            className="relative inline-flex items-center gap-2 px-8 py-3 bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Explore Other Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyDestination;
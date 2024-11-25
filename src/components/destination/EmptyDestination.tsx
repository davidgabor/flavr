import { Compass, MapPin, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyDestination = ({ destinationName }: { destinationName: string }) => {
  return (
    <div className="relative min-h-screen md:min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
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

      {/* Extended gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-64 bg-gradient-to-t from-neutral-900 to-transparent" />

      {/* Content */}
      <div className="max-w-2xl mx-auto text-center space-y-8 md:space-y-12 animate-fade-in relative py-16 md:py-0">
        {/* Decorative Elements */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-3xl opacity-30 rounded-full" />
        
        {/* Icons */}
        <div className="flex justify-center gap-4 md:gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
            <MapPin className="w-8 h-8 md:w-10 md:h-10 text-primary animate-bounce" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/20 blur-xl" />
            <Compass className="w-8 h-8 md:w-10 md:h-10 text-secondary animate-pulse" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
            <Utensils className="w-8 h-8 md:w-10 md:h-10 text-primary animate-bounce delay-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 md:space-y-6 relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-judson">
            Coming Soon to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {destinationName}
            </span>
          </h2>
          <p className="text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed px-4">
            We're currently exploring the best dining spots in {destinationName}. Our team is carefully curating a selection of exceptional restaurants, cafes, and hidden gems for you.
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative pt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl" />
          <Link
            to="/destinations"
            className="relative inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-sm md:text-base"
          >
            Explore Other Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyDestination;
import { Globe, Heart, Utensils } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-5xl font-judson">Our Mission</h2>
        <div className="h-full flex flex-col justify-between space-y-12">
          <div className="group space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Utensils className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-judson">Curate Excellence</h3>
            <p className="text-neutral-400 leading-relaxed">
              We personally visit and review each restaurant to ensure exceptional quality and memorable experiences.
            </p>
          </div>
          <div className="group space-y-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Globe className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-judson">Connect Cultures</h3>
            <p className="text-neutral-400 leading-relaxed">
              Through food, we bridge cultural gaps and create connections between people and places.
            </p>
          </div>
          <div className="group space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-judson">Share Passion</h3>
            <p className="text-neutral-400 leading-relaxed">
              We're dedicated to sharing our love for exceptional dining experiences with food enthusiasts worldwide.
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-full">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Restaurant atmosphere" 
          className="rounded-lg shadow-2xl w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
      </div>
    </section>
  );
};

export default MissionSection;
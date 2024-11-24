import { Shield, Sparkles, Star } from "lucide-react";

const ValuesSection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative h-full order-2 md:order-1">
        <img 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Food preparation" 
          className="rounded-lg shadow-2xl w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
      </div>
      <div className="space-y-8 order-1 md:order-2">
        <h2 className="text-4xl md:text-5xl font-judson">Our Values</h2>
        <div className="h-full flex flex-col justify-between space-y-12">
          <div className="space-y-4 p-6 bg-neutral-800/50 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-primary" />
              <div className="text-primary text-2xl font-judson">Authenticity</div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Every recommendation comes from our personal experiences. We only share places we've visited and genuinely loved.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-neutral-800/50 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <div className="text-primary text-2xl font-judson">Quality First</div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              We prioritize exceptional food, service, and atmosphere in our recommendations.
            </p>
          </div>
          <div className="space-y-4 p-6 bg-neutral-800/50 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="text-primary text-2xl font-judson">Innovation</div>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              We continuously explore new ways to enhance your dining discovery experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
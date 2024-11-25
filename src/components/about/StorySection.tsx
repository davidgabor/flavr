const StorySection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-[3/2] md:aspect-[4/3] order-2 md:order-1">
        <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10" />
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Restaurant interior" 
          className="rounded-2xl shadow-2xl w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-2xl" />
      </div>
      <div className="space-y-6 order-1 md:order-2">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-judson">Our Story</h2>
          <div className="h-1 w-12 bg-primary mt-2" />
        </div>
        <div className="prose prose-invert">
          <p className="text-xl text-neutral-300 leading-relaxed">
            We're David and Maja, two food enthusiasts who turned our passion for discovering exceptional dining spots into a mission to help others find their next favorite place.
          </p>
          <p className="text-xl text-neutral-300 leading-relaxed">
            What started as a personal collection of restaurant recommendations for friends has grown into a curated platform of our favorite dining experiences from around the world. Our journey began in the vibrant streets of Barcelona, where we discovered that every meal could tell a story and create lasting memories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
const StorySection = () => {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <h2 className="text-4xl md:text-5xl font-judson">Our Story</h2>
        <div className="prose prose-invert">
          <p className="text-xl text-neutral-300 leading-relaxed">
            We're David and Maja, two food enthusiasts who turned our passion for discovering exceptional dining spots into a mission to help others find their next favorite place.
          </p>
          <p className="text-xl text-neutral-300 leading-relaxed">
            What started as a personal collection of restaurant recommendations for friends has grown into a curated platform of our favorite dining experiences from around the world. Our journey began in the vibrant streets of Barcelona, where we discovered that every meal could tell a story and create lasting memories.
          </p>
        </div>
      </div>
      <div className="relative h-full">
        <img 
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Restaurant interior" 
          className="rounded-lg shadow-2xl w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
      </div>
    </section>
  );
};

export default StorySection;
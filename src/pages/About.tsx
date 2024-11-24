import NewsletterForm from "@/components/common/NewsletterForm";
import ProfileImages from "@/components/home/ProfileImages";

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16 pt-32">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://i.ibb.co/KzFXhgZ/pexels-cottonbro-3298637-min.jpg')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">About Flavr</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover the story behind our mission to share the world's most memorable dining experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 mx-auto py-24">
        <div className="max-w-4xl mx-auto space-y-24">
          {/* Our Story Section */}
          <section className="space-y-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-judson">Our Story</h2>
              <div className="prose prose-invert mx-auto">
                <p className="text-lg text-neutral-300 leading-relaxed">
                  We're David and Maja, two food enthusiasts who turned our passion for discovering exceptional dining spots into a mission to help others find their next favorite place.
                </p>
                <div className="my-12">
                  <ProfileImages />
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  What started as a personal collection of restaurant recommendations for friends has grown into a curated platform of our favorite dining experiences from around the world.
                </p>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="space-y-12">
            <h2 className="text-3xl font-judson text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-primary text-2xl font-judson">01</div>
                <h3 className="text-xl font-judson">Authenticity</h3>
                <p className="text-neutral-400">
                  Every recommendation comes from our personal experiences. We only share places we've visited and genuinely loved.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-primary text-2xl font-judson">02</div>
                <h3 className="text-xl font-judson">Quality First</h3>
                <p className="text-neutral-400">
                  We prioritize exceptional food, service, and atmosphere in our recommendations, ensuring a memorable dining experience.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-primary text-2xl font-judson">03</div>
                <h3 className="text-xl font-judson">Local Perspective</h3>
                <p className="text-neutral-400">
                  We seek out both hidden gems and standout establishments, offering a mix of local favorites and destination dining.
                </p>
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="relative">
            <div className="relative bg-neutral-800/50 p-12 md:p-16 border border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2" />
              
              <div className="relative space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl font-judson bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
                    Join Our Community
                  </h2>
                  <p className="text-lg text-neutral-300">
                    Be the first to discover new recommendations and travel guides.
                  </p>
                </div>
                <NewsletterForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
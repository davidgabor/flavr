import NewsletterForm from "@/components/common/NewsletterForm";
import ProfileImages from "@/components/home/ProfileImages";
import { ArrowRight, Globe, Users, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4 -mt-16">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://i.ibb.co/KzFXhgZ/pexels-cottonbro-3298637-min.jpg')] bg-cover bg-fixed bg-center opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-judson">About Flavr</h1>
          <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Discover the story behind our mission to share the world's most memorable dining experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 mx-auto">
        <div className="max-w-7xl mx-auto space-y-32 py-16">
          {/* Stats Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-neutral-800/50 blur-3xl rounded-full transform -translate-y-1/2" />
            <div className="relative grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">150+</div>
                <div className="text-neutral-400">Curated Restaurants</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">12</div>
                <div className="text-neutral-400">Global Cities</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-judson text-primary">1000+</div>
                <div className="text-neutral-400">Happy Food Lovers</div>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
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
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Restaurant interior" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
            </div>
          </section>

          {/* Mission Section */}
          <section className="relative overflow-hidden bg-neutral-800/50 rounded-3xl">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-16 p-12 md:p-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-judson">Our Mission</h2>
                <div className="space-y-8">
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
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Restaurant atmosphere" 
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Food preparation" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-judson">Our Values</h2>
              <div className="space-y-6">
                <div className="space-y-4 p-6 bg-neutral-800/50 rounded-xl border border-white/10">
                  <div className="text-primary text-2xl font-judson">01 — Authenticity</div>
                  <p className="text-neutral-300 leading-relaxed">
                    Every recommendation comes from our personal experiences. We only share places we've visited and genuinely loved.
                  </p>
                </div>
                <div className="space-y-4 p-6 bg-neutral-800/50 rounded-xl border border-white/10">
                  <div className="text-primary text-2xl font-judson">02 — Quality First</div>
                  <p className="text-neutral-300 leading-relaxed">
                    We prioritize exceptional food, service, and atmosphere in our recommendations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-judson">Start Exploring</h2>
              <p className="text-lg text-neutral-300">
                Ready to discover your next favorite restaurant? Browse our curated collection of exceptional dining experiences.
              </p>
              <div className="flex">
                <Link 
                  to="/destinations" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View Destinations
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Restaurant interior" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent rounded-lg" />
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="relative">
            <div className="relative bg-neutral-800/50 p-12 md:p-16 rounded-xl border border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2" />
              
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
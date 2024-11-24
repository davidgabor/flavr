import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Person } from "@/types/person";
import NewsletterForm from "@/components/common/NewsletterForm";

const People = () => {
  const { data: people = [], isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      console.log('Fetching all people');
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .order("name");
      
      if (error) {
        console.error('Error fetching people:', error);
        throw error;
      }
      
      console.log('Fetched people:', data);
      return data as Person[];
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section - Reduced bottom margin from mb-24 to mb-16 */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16 pt-32 mb-16">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://i.ibb.co/6YN33Lj/pexels-anntarazevich-6937451-min.jpg')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Meet Our Food Experts</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover our curated network of food enthusiasts, critics, and local connoisseurs who bring you the best dining experiences from around the world.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* People Grid - Reduced top padding from py-24 to py-16 */}
      <div className="container px-4 mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {people.map((person) => (
            <Link
              key={person.id}
              to={`/p/${person.id}`}
              className="card group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-neutral-800">
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                    No image available
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-judson group-hover:text-primary transition-colors">
                  {person.name}
                </h3>
                {person.bio && (
                  <p className="text-neutral-400 line-clamp-3">
                    {person.bio}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
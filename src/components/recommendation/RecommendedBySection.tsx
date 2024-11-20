import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Person } from "@/types/person";

interface RecommendedBySectionProps {
  recommendationId: string;
}

const RecommendedBySection = ({ recommendationId }: RecommendedBySectionProps) => {
  const { data: people = [], isLoading } = useQuery({
    queryKey: ["recommendation-people", recommendationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("person_recommendations")
        .select(`
          people (
            *
          )
        `)
        .eq('recommendation_id', recommendationId);
      
      if (error) throw error;
      return data.map(item => item.people) as Person[];
    },
  });

  if (isLoading) return null;

  return (
    <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 space-y-6">
      <h2 className="text-2xl font-judson">Recommended by</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((person) => (
          <Link
            key={person.id}
            to={`/p/${person.id}`}
            className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-lg border border-white/5 hover:border-white/20 transition-colors group"
          >
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-primary transition-colors"
              />
            )}
            <div>
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                {person.name}
              </h3>
              {person.bio && (
                <p className="text-sm text-neutral-400 line-clamp-2">
                  {person.bio}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBySection;
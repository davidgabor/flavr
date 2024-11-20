import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Person } from "@/types/person";

interface ExpertsListProps {
  recommendationId: string;
}

const ExpertsList = ({ recommendationId }: ExpertsListProps) => {
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
    <div className="space-y-4">
      <h3 className="font-medium">Recommended by</h3>
      <div className="flex flex-wrap gap-4">
        {people.map((person) => (
          <Link
            key={person.id}
            to={`/p/${person.id}`}
            className="flex items-center gap-3 group"
          >
            {person.image && (
              <img
                src={person.image}
                alt={person.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-neutral-300 group-hover:text-primary transition-colors">
              {person.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpertsList;
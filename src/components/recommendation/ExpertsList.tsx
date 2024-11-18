import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Expert } from "@/types/expert";

interface ExpertsListProps {
  recommendationId: string;
}

const ExpertsList = ({ recommendationId }: ExpertsListProps) => {
  const { data: experts = [], isLoading } = useQuery({
    queryKey: ["recommendation-experts", recommendationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("expert_recommendations")
        .select(`
          experts (
            *
          )
        `)
        .eq('recommendation_id', recommendationId);
      
      if (error) throw error;
      return data.map(item => item.experts) as Expert[];
    },
  });

  if (isLoading) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Recommended by</h3>
      <div className="flex flex-wrap gap-4">
        {experts.map((expert) => (
          <Link
            key={expert.id}
            to={`/expert/${expert.id}`}
            className="flex items-center gap-3 group"
          >
            {expert.image && (
              <img
                src={expert.image}
                alt={expert.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-neutral-300 group-hover:text-primary transition-colors">
              {expert.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExpertsList;
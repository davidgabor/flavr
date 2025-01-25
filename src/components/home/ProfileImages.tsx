import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProfileImages = () => {
  const { data: people = [], isLoading } = useQuery({
    queryKey: ["profile-images"],
    queryFn: async () => {
      console.log('Fetching profile images for David and Maja...');
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .in('name', ['David', 'Maja']);
      
      if (error) {
        console.error('Error fetching profile images:', error);
        throw error;
      }

      console.log('Fetched profile data:', data);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center -space-x-3">
        <div className="w-12 h-12 rounded-full bg-neutral-800 animate-pulse" />
        <div className="w-12 h-12 rounded-full bg-neutral-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center -space-x-3">
      {people.map((person) => (
        <div key={person.id} className="relative">
          <div className="w-12 h-12 rounded-full border-[1.5px] border-white overflow-hidden">
            <img
              src={person.image || '/placeholder.svg'}
              alt={`${person.name}'s profile`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileImages;
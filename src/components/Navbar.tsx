import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];

      const [destinationsRes, recommendationsRes] = await Promise.all([
        supabase
          .from("destinations")
          .select("id, name, description")
          .ilike("name", `%${debouncedQuery}%`)
          .limit(5),
        supabase
          .from("recommendations")
          .select("id, name, type")
          .ilike("name", `%${debouncedQuery}%`)
          .limit(5)
      ]);

      return [
        ...(destinationsRes.data || []).map(d => ({ ...d, resultType: 'destination' })),
        ...(recommendationsRes.data || []).map(r => ({ ...r, resultType: 'recommendation' }))
      ];
    },
    enabled: debouncedQuery.length > 0
  });

  const handleResultClick = (result: any) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (result.resultType === 'destination') {
      navigate(`/destinations/${result.id}`);
    } else {
      navigate(`/recommendations/${result.id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-neutral-900/90 to-neutral-900/0 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-judson text-white">
            Flavr
          </Link>

          <div className="relative">
            {isSearchOpen ? (
              <div className="absolute right-0 w-[300px] md:w-[400px]">
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search destinations and recommendations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {debouncedQuery && (
                  <div className="absolute top-full w-full mt-2 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden shadow-xl">
                    {isLoading ? (
                      <div className="p-4 text-neutral-400">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((result: any) => (
                          <button
                            key={`${result.resultType}-${result.id}`}
                            onClick={() => handleResultClick(result)}
                            className="w-full px-4 py-2 text-left hover:bg-neutral-700 text-white"
                          >
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-neutral-400">
                              {result.resultType === 'destination' ? 'Destination' : result.type}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-neutral-400">No results found</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
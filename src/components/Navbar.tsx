import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type DestinationResult = {
  id: string;
  name: string;
  description: string;
  resultType: 'destination';
};

type RecommendationResult = {
  id: string;
  name: string;
  type: string;
  resultType: 'recommendation';
};

type SearchResult = DestinationResult | RecommendationResult;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];

      const [destinationsRes, recommendationsRes] = await Promise.all([
        supabase
          .from("destinations")
          .select("id, name, description")
          .ilike('name', `%${debouncedQuery}%`),
        supabase
          .from("recommendations")
          .select("id, name, type")
          .ilike('name', `%${debouncedQuery}%`),
      ]);

      if (destinationsRes.error) {
        console.error('Destinations search error:', destinationsRes.error);
        return [];
      }

      if (recommendationsRes.error) {
        console.error('Recommendations search error:', recommendationsRes.error);
        return [];
      }

      const results: SearchResult[] = [
        ...(destinationsRes.data || []).map((d) => ({
          ...d,
          resultType: 'destination' as const,
        })),
        ...(recommendationsRes.data || []).map((r) => ({
          ...r,
          resultType: 'recommendation' as const,
        })),
      ];

      return results;
    },
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });

  const handleResultClick = (result: SearchResult) => {
    setOpen(false);
    setSearchQuery("");
    if (result.resultType === "destination") {
      navigate(`/destinations/${result.id}`);
    } else {
      navigate(`/recommendations/${result.id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/50 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-judson text-white">
            Flavr
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 rounded-md border border-neutral-700"
          >
            <Search size={16} />
            <span>Search...</span>
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search destinations and recommendations..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          {debouncedQuery.length > 0 && (
            <>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-neutral-400">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <CommandGroup heading="Destinations">
                    {searchResults
                      .filter((r): r is DestinationResult => r.resultType === "destination")
                      .map((result) => (
                        <CommandItem
                          key={`${result.resultType}-${result.id}`}
                          onSelect={() => handleResultClick(result)}
                          className="flex flex-col items-start"
                        >
                          <span className="font-medium">{result.name}</span>
                          {result.description && (
                            <span className="text-sm text-neutral-400 line-clamp-1">
                              {result.description}
                            </span>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                  <CommandGroup heading="Recommendations">
                    {searchResults
                      .filter((r): r is RecommendationResult => r.resultType === "recommendation")
                      .map((result) => (
                        <CommandItem
                          key={`${result.resultType}-${result.id}`}
                          onSelect={() => handleResultClick(result)}
                          className="flex flex-col items-start"
                        >
                          <span className="font-medium">{result.name}</span>
                          <span className="text-sm text-neutral-400">
                            {result.type}
                          </span>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </>
              ) : (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
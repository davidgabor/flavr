import { Person } from "@/types/person";

interface PersonHeaderProps {
  person: Person;
  totalRecommendations?: number;
  totalDestinations?: number;
}

const PersonHeader = ({ person, totalRecommendations = 0, totalDestinations = 0 }: PersonHeaderProps) => (
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row gap-8 mb-8">
      {/* Left column with profile info */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {person.image && (
            <img
              src={person.image}
              alt={person.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/10"
            />
          )}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-judson">{person.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Expert Curator
                </span>
              </div>
            </div>
            {person.bio && (
              <p className="text-neutral-400 max-w-2xl leading-relaxed">{person.bio}</p>
            )}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/></svg>
                <span className="text-neutral-300">Italian, Japanese</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span className="text-neutral-300">Barcelona, London</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column with stats card */}
      <div className="lg:w-72 bg-neutral-800/50 rounded-xl border border-white/10 p-6 self-start">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </div>
            <div>
              <p className="text-2xl font-judson text-white">{totalRecommendations}</p>
              <p className="text-sm text-neutral-400">Recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <div>
              <p className="text-2xl font-judson text-white">{totalDestinations}</p>
              <p className="text-sm text-neutral-400">Destinations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonHeader;
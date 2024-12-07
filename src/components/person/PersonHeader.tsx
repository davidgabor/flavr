import { Person } from "@/types/person";

interface PersonHeaderProps {
  person: Person;
}

const PersonHeader = ({ person }: PersonHeaderProps) => (
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
      <div className="lg:w-80 bg-neutral-800/50 rounded-xl border border-white/10 p-6 self-start">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Profile completion</span>
              <span className="text-sm text-neutral-300">85%</span>
            </div>
            <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-primary rounded-full" />
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Favorite spots</span>
              <span className="text-sm text-neutral-300">Restaurants, Bars</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Reviews written</span>
              <span className="text-sm text-neutral-300">124</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Member since</span>
              <span className="text-sm text-neutral-300">2023</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonHeader;
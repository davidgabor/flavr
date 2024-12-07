import { Person } from "@/types/person";

interface PersonHeaderProps {
  person: Person;
}

const PersonHeader = ({ person }: PersonHeaderProps) => (
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
      <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {person.image && (
            <img
              src={person.image}
              alt={person.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-judson mb-4">{person.name}</h1>
            {person.bio && <p className="text-neutral-400 max-w-2xl">{person.bio}</p>}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block w-80 bg-neutral-800/50 rounded-xl border border-white/10 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="m7.5 4.27 9 5.15"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></svg>
            </div>
            <div>
              <p className="text-sm text-neutral-400">Recommendations</p>
              <p className="text-2xl font-judson">Expert Curator</p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Top cuisines</span>
              <span className="text-sm text-neutral-300">Italian, Japanese</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Most visited</span>
              <span className="text-sm text-neutral-300">Barcelona, London</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Favorite spots</span>
              <span className="text-sm text-neutral-300">Restaurants, Bars</span>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-1 bg-neutral-700 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-primary rounded-full" />
              </div>
              <p className="text-xs text-neutral-500 mt-1">Profile completion</p>
            </div>
            <span className="text-sm text-neutral-300">85%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PersonHeader;
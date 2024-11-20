import { Person } from "@/types/person";

interface PersonHeaderProps {
  person: Person;
}

const PersonHeader = ({ person }: PersonHeaderProps) => (
  <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
    {person.image && (
      <img
        src={person.image}
        alt={person.name}
        className="w-32 h-32 rounded-full object-cover border-2 border-white/10"
      />
    )}
    <div className="flex-1">
      <h1 className="text-4xl font-judson mb-4">{person.name}</h1>
      {person.bio && <p className="text-neutral-400 max-w-2xl">{person.bio}</p>}
    </div>
  </div>
);

export default PersonHeader;
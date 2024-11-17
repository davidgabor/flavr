import { Link } from "react-router-dom";

interface DestinationHeaderProps {
  name: string;
  description?: string;
  image: string;
  country: string;
}

const DestinationHeader = ({ name, description, image, country }: DestinationHeaderProps) => (
  <div className="relative h-[50vh] w-full flex items-center justify-center text-center">
    <div 
      className="absolute inset-0 bg-cover bg-center -mt-16"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/60 to-neutral-900 -top-16" />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto px-4 animate-fade-in">
      <p className="text-white/80 mb-2 text-sm tracking-wide uppercase">{country}</p>
      <h1 className="font-judson text-5xl text-white mb-4">{name}</h1>
      {description && (
        <p className="text-white/90 text-lg max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  </div>
);

export default DestinationHeader;
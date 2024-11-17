import { Link } from "react-router-dom";

interface DestinationHeaderProps {
  name: string;
  description?: string;
  image: string;
  country: string;
}

const DestinationHeader = ({ name, description, image, country }: DestinationHeaderProps) => (
  <div className="absolute top-0 left-0 right-0 h-[70vh] flex items-center justify-center text-center">
    <div 
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/80 to-neutral-900" />
    <div className="relative z-10 max-w-3xl mx-auto px-4 pt-16">
      <p className="text-white/80 mb-4 text-sm tracking-wide uppercase">{country}</p>
      <h1 className="font-judson text-6xl text-white mb-6">{name}</h1>
      {description && (
        <p className="text-white/90 text-xl">{description}</p>
      )}
    </div>
  </div>
);

export default DestinationHeader;
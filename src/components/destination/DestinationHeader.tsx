import { Link } from "react-router-dom";

interface DestinationHeaderProps {
  name: string;
  description?: string;
}

const DestinationHeader = ({ name, description }: DestinationHeaderProps) => (
  <div className="flex-1">
    <h1 className="text-3xl font-bold text-neutral-800 mb-2">{name}</h1>
    {description && (
      <p className="text-neutral-600 text-lg">
        {description}
      </p>
    )}
  </div>
);

export default DestinationHeader;
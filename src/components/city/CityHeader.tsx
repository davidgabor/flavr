import { Link } from "react-router-dom";

interface CityHeaderProps {
  name: string;
  description?: string;
}

const CityHeader = ({ name, description }: CityHeaderProps) => (
  <div className="text-center mb-12">
    <h1 className="heading-1">{name}</h1>
    {description && (
      <p className="text-body text-lg">
        {description}
      </p>
    )}
  </div>
);

export default CityHeader;
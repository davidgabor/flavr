interface Destination {
  id: string;
  name: string;
  image: string;
}

interface Recommendation {
  id: string;
  name: string;
  type: string;
  image: string;
  destination_name: string;
}

interface RelatedContentProps {
  destinations: Destination[];
  recommendations: Recommendation[];
}

const RelatedContent = ({ destinations, recommendations }: RelatedContentProps) => {
  if (destinations.length === 0 && recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-neutral-800">
      <h2 className="heading-2 mb-8">Related Places</h2>
      
      {/* Destinations */}
      {destinations.length > 0 && (
        <div className="space-y-6 mb-12">
          <h3 className="heading-3">Featured Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {destinations.map((destination) => (
              <a
                key={destination.id}
                href={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {destination.name}
                </h4>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="heading-3">Featured Places</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((recommendation) => (
              <a
                key={recommendation.id}
                href={`/${recommendation.destination_name.toLowerCase().replace(/\s+/g, '-')}/${recommendation.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-2">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-medium group-hover:text-primary transition-colors">
                  {recommendation.name}
                </h4>
                <p className="text-sm text-neutral-400">
                  {recommendation.type}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedContent;
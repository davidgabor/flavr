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
    <div className="py-24 border-t border-neutral-800">
      <h2 className="text-4xl font-judson mb-16 text-center">Related Places</h2>
      
      {/* Destinations */}
      {destinations.length > 0 && (
        <div className="space-y-12 mb-24">
          <h3 className="text-2xl font-judson text-center">Featured Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <a
                key={destination.id}
                href={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-judson group-hover:text-primary transition-colors">
                  {destination.name}
                </h4>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {recommendations.map((recommendation) => (
              <a
                key={recommendation.id}
                href={`/${recommendation.destination_name.toLowerCase().replace(/\s+/g, '-')}/${recommendation.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-judson group-hover:text-primary transition-colors">
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
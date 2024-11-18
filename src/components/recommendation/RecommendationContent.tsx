interface RecommendationContentProps {
  description?: string;
  our_review?: string;
  hours?: string;
}

const RecommendationContent = ({
  description,
  our_review,
  hours,
}: RecommendationContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        {our_review && (
          <div className="space-y-2">
            <h2 className="text-2xl font-judson">Our Review</h2>
            <p className="text-neutral-300">{our_review}</p>
          </div>
        )}

        {description && (
          <div className="space-y-2">
            <h2 className="text-2xl font-judson">About</h2>
            <p className="text-neutral-300">{description}</p>
          </div>
        )}
      </div>

      <div>
        {hours && (
          <div className="space-y-2">
            <h3 className="font-medium">Opening Hours</h3>
            <p className="text-neutral-300">{hours}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationContent;
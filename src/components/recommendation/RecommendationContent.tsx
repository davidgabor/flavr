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
      <div className="md:col-span-2">
        {our_review && (
          <div className="mb-6">
            <h2 className="text-2xl font-judson mb-2">Our Review</h2>
            <p className="text-neutral-300">{our_review}</p>
          </div>
        )}

        {description && (
          <div>
            <h2 className="text-2xl font-judson mb-2">About</h2>
            <p className="text-neutral-300">{description}</p>
          </div>
        )}
      </div>

      <div>
        {hours && (
          <div>
            <h3 className="font-medium mb-2">Opening Hours</h3>
            <p className="text-neutral-300">{hours}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationContent;
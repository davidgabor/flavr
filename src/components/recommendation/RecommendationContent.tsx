interface RecommendationContentProps {
  hours?: string;
}

const RecommendationContent = ({
  hours,
}: RecommendationContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2" />

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
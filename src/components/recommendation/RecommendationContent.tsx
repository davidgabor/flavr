import RecommendedBySection from "./RecommendedBySection";

interface RecommendationContentProps {
  id: string;
  hours?: string;
}

const RecommendationContent = ({
  id,
  hours,
}: RecommendationContentProps) => {
  return (
    <div className="space-y-8">
      {hours && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2" />
          <div>
            <h3 className="font-medium mb-2">Opening Hours</h3>
            <p className="text-neutral-300">{hours}</p>
          </div>
        </div>
      )}
      
      <RecommendedBySection recommendationId={id} />
    </div>
  );
};

export default RecommendationContent;
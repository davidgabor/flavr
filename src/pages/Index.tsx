import SubscriptionPopup from "@/components/common/SubscriptionPopup";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <SubscriptionPopup delay={15000} /> {/* Will show after 15 seconds */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Flavr</h1>
        <p className="text-xl text-neutral-300">Start exploring amazing food spots!</p>
      </div>
    </div>
  );
};

export default Index;
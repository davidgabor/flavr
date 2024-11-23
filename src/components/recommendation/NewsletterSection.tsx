import NewsletterForm from "@/components/common/NewsletterForm";

const NewsletterSection = () => {
  return (
    <section className="w-full">
      <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-white/10 p-12 md:p-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        
        <div className="relative space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-judson bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-lg text-neutral-300">
              Join our community and be the first to discover new recommendations and hidden gems.
            </p>
          </div>
          
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
import NewsletterForm from "@/components/common/NewsletterForm";

const NewsletterSection = () => {
  return (
    <section className="relative max-w-3xl mx-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-3xl opacity-30" />
      
      <div className="relative bg-neutral-800/50 p-12 md:p-16 border border-white/10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2" />
        
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
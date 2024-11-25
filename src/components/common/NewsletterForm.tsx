import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const NewsletterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    try {
      console.log('Subscribing email to newsletter:', email);
      
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
      
      if (error) {
        console.error('Error subscribing to newsletter:', error);
        if (error.code === '23505') { // unique_violation
          toast.error("This email is already subscribed to our newsletter!");
        } else {
          toast.error("Failed to subscribe to newsletter. Please try again.");
        }
        return;
      }

      toast.success("Thanks for subscribing! We'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-primary/50 focus:ring-primary/50 h-10"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 px-8 bg-primary hover:bg-primary/90 text-white font-medium transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      <p className="text-sm text-neutral-500 mt-3 text-center">Join our newsletter for weekly recommendations</p>
    </div>
  );
};

export default NewsletterForm;
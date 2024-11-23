import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const NewsletterForm = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    console.log('Newsletter signup:', email);
    toast.success("Thanks for subscribing! We'll be in touch soon.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pt-8">
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
        <div className="relative flex-1 w-full">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-primary/50 focus:ring-primary/50"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-medium transition-colors duration-200 w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-neutral-500 mt-2">Join our newsletter for weekly recommendations</p>
    </div>
  );
};

export default NewsletterForm;
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
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-primary/50 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="px-8 py-2 bg-primary hover:bg-primary/90 text-white font-medium transition-colors duration-200 whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
      <p className="text-sm text-neutral-500 mt-3 text-center">Join our newsletter for weekly recommendations</p>
    </div>
  );
};

export default NewsletterForm;
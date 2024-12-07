import { useEffect } from 'react';
import NewsletterForm from "@/components/common/NewsletterForm";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative h-[70vh] flex items-center justify-center text-center px-4 -mt-16">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-[url('https://i.ibb.co/6YN33Lj/pexels-anntarazevich-6937451-min.jpg')] bg-cover bg-center opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
      <div className="relative max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-judson">Welcome to Flavr</h1>
        <p className="text-base md:text-xl text-neutral-200 max-w-2xl mx-auto">
          We're David and Maja, sharing our favorite spots from around the world—places we've tried, loved, and trust. As Flavr grows, we'll bring friends and family onboard to expand this guide with even more recommendations you can count on.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
};

export default Home;

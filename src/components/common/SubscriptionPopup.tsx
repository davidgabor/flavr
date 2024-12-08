import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NewsletterForm from '@/components/common/NewsletterForm';

interface SubscriptionPopupProps {
  delay?: number; // Delay in milliseconds
}

const SubscriptionPopup = ({ delay = 30000 }: SubscriptionPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenSubscriptionPopup');
    
    if (!hasSeenPopup) {
      console.log('Setting up subscription popup timer...');
      const timer = setTimeout(() => {
        console.log('Showing subscription popup');
        setIsOpen(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as seen
    localStorage.setItem('hasSeenSubscriptionPopup', 'true');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-judson text-center">Stay Updated</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-neutral-300 text-center">
            Join our newsletter to discover new destinations and hidden gems.
          </p>
          <NewsletterForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPopup;
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  title: string;
}

const BlogSidebar = ({ title }: BlogSidebarProps) => {
  const shareUrl = window.location.href;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  return (
    <div className="sticky top-8 space-y-8">
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <h3 className="font-judson text-xl mb-4 flex items-center gap-2 text-neutral-900">
          <Share2 className="w-5 h-5" />
          Share this article
        </h3>
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-neutral-200 hover:bg-neutral-100"
            onClick={() => window.open(shareLinks.twitter, '_blank')}
          >
            <Twitter className="w-4 h-4" />
            Share on Twitter
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-neutral-200 hover:bg-neutral-100"
            onClick={() => window.open(shareLinks.facebook, '_blank')}
          >
            <Facebook className="w-4 h-4" />
            Share on Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-neutral-200 hover:bg-neutral-100"
            onClick={() => window.open(shareLinks.linkedin, '_blank')}
          >
            <Linkedin className="w-4 h-4" />
            Share on LinkedIn
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
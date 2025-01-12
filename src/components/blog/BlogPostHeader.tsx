import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
  author?: {
    id: string;
    name: string;
    image: string | null;
  } | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage, author }: BlogPostHeaderProps) => {
  return (
    <header className="relative">
      <div className="h-[80vh] relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/50 to-neutral-900" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-judson text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
              {title}
            </h1>
            <div className="space-y-6">
              {publishedAt && (
                <time
                  dateTime={publishedAt}
                  className="text-neutral-300 text-lg md:text-xl block"
                >
                  {format(new Date(publishedAt), "MMMM d, yyyy")}
                </time>
              )}
              {author && (
                <Link 
                  to={`/people/${author.id}`}
                  className="inline-flex items-center justify-center space-x-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-200"
                >
                  <Avatar className="h-14 w-14 border-2 border-white/20">
                    {author.image ? (
                      <AvatarImage src={author.image} alt={author.name} />
                    ) : (
                      <AvatarFallback className="bg-neutral-800 text-white">
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-neutral-400 text-sm">Written by</span>
                    <span className="text-white text-lg font-medium">
                      {author.name}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
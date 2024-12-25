import { format } from "date-fns";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage }: BlogPostHeaderProps) => {
  return (
    <header className="relative min-h-[70vh] flex items-end">
      {coverImage && (
        <div className="absolute inset-0">
          <img 
            src={coverImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/80 to-neutral-900" />
        </div>
      )}
      
      <div className="relative w-full z-10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="space-y-8 animate-fade-in">
            <h1 className="font-judson text-4xl md:text-6xl lg:text-7xl leading-tight">{title}</h1>
            {publishedAt && (
              <time 
                dateTime={publishedAt}
                className="block text-neutral-400 text-lg md:text-xl"
              >
                {format(new Date(publishedAt), "MMMM d, yyyy")}
              </time>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
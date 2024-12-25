import { format } from "date-fns";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage }: BlogPostHeaderProps) => {
  return (
    <header className="relative">
      {coverImage && (
        <div className="relative h-[70vh] w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-neutral-900/40 to-neutral-900" />
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-judson text-5xl md:text-7xl leading-tight">{title}</h1>
            {publishedAt && (
              <time 
                dateTime={publishedAt}
                className="text-neutral-400 text-lg"
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
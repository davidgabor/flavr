import { format } from "date-fns";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage }: BlogPostHeaderProps) => {
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
            {publishedAt && (
              <time
                dateTime={publishedAt}
                className="text-neutral-300 text-lg md:text-xl block"
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
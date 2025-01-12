import { format } from "date-fns";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage }: BlogPostHeaderProps) => {
  return (
    <header className="relative">
      <div className="h-[70vh] relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-10">
        <div className="space-y-4">
          <h1 className="font-judson text-4xl md:text-6xl lg:text-7xl leading-tight text-white">
            {title}
          </h1>
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="text-neutral-400 block"
            >
              {format(new Date(publishedAt), "MMMM d, yyyy")}
            </time>
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
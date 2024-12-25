import { format } from "date-fns";

interface BlogPostHeaderProps {
  title: string;
  publishedAt: string | null;
  coverImage: string | null;
}

const BlogPostHeader = ({ title, publishedAt, coverImage }: BlogPostHeaderProps) => {
  return (
    <header className="space-y-8 mb-12">
      {coverImage && (
        <div className="aspect-[2/1] overflow-hidden rounded-lg">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-judson">{title}</h1>
        {publishedAt && (
          <time 
            dateTime={publishedAt}
            className="text-neutral-400"
          >
            {format(new Date(publishedAt), "MMMM d, yyyy")}
          </time>
        )}
      </div>
    </header>
  );
};

export default BlogPostHeader;
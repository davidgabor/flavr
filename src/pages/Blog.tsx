import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
}

const Blog = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      console.log('Fetching blog posts');
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false, nullsLast: true });
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }
      
      console.log('Fetched blog posts:', data);
      return data as BlogPost[];
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-center px-4 -mt-16 pt-32">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d')] bg-cover bg-center opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/40 to-neutral-900" />
        <div className="relative max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-judson">Travel Stories & Guides</h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto">
            Discover our latest travel stories, city guides, and culinary adventures from around the world.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="container px-4 mx-auto py-24">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="card group"
              >
                <div className="aspect-[16/9] overflow-hidden bg-neutral-800">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">
                      No image available
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-judson group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-neutral-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="text-sm text-neutral-500">
                    {post.published_at ? (
                      <time dateTime={post.published_at}>
                        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                      </time>
                    ) : (
                      "Draft"
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-400">
            No blog posts available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/utils/dateUtils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
}

const MoreStories = ({ currentPostId }: { currentPostId: string }) => {
  const { data: posts = [] } = useQuery({
    queryKey: ["more-blog-posts", currentPostId],
    queryFn: async () => {
      console.log('Fetching more blog posts, excluding:', currentPostId);
      
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, published_at")
        .neq("id", currentPostId)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching more blog posts:', error);
        throw error;
      }

      console.log('Fetched more blog posts:', data);
      return data as BlogPost[];
    },
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-neutral-200">
      <div className="space-y-8">
        <h2 className="text-3xl font-judson text-neutral-900">More Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-lg mb-4 bg-neutral-100">
                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-judson text-neutral-900 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                {post.published_at && (
                  <p className="text-sm text-neutral-500">
                    {formatDate(post.published_at)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreStories;
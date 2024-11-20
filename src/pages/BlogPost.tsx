import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  destinations: {
    id: string;
    name: string;
    image: string;
  }[];
  recommendations: {
    id: string;
    name: string;
    type: string;
    image: string;
    destination_name: string;
  }[];
}

const BlogPost = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      console.log('Fetching blog post:', slug);
      
      const { data: postData, error: postError } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_post_destinations(
            destinations(
              id,
              name,
              image
            )
          ),
          blog_post_recommendations(
            recommendations(
              id,
              name,
              type,
              image,
              destinations(name)
            )
          )
        `)
        .eq("slug", slug)
        .single();

      if (postError) {
        console.error('Error fetching blog post:', postError);
        throw postError;
      }

      // Transform the data to a more usable format
      const transformedData = {
        ...postData,
        destinations: postData.blog_post_destinations.map((d: any) => d.destinations),
        recommendations: postData.blog_post_recommendations.map((r: any) => ({
          ...r.recommendations,
          destination_name: r.recommendations.destinations.name
        }))
      };

      console.log('Fetched blog post:', transformedData);
      return transformedData as BlogPost;
    },
  });

  if (isLoading) {
    return <div className="min-h-screen bg-neutral-900" />;
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="heading-1">Blog post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white pt-24">
      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="space-y-8 mb-12">
          {post.cover_image && (
            <div className="aspect-[2/1] overflow-hidden rounded-lg">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-judson">{post.title}</h1>
            {post.published_at && (
              <time 
                dateTime={post.published_at}
                className="text-neutral-400"
              >
                {format(new Date(post.published_at), "MMMM d, yyyy")}
              </time>
            )}
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Content */}
        {(post.destinations.length > 0 || post.recommendations.length > 0) && (
          <div className="mt-16 pt-8 border-t border-neutral-800">
            <h2 className="heading-2 mb-8">Related Places</h2>
            
            {/* Destinations */}
            {post.destinations.length > 0 && (
              <div className="space-y-6 mb-12">
                <h3 className="heading-3">Featured Destinations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.destinations.map((destination) => (
                    <a
                      key={destination.id}
                      href={`/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-2">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {destination.name}
                      </h4>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {post.recommendations.length > 0 && (
              <div className="space-y-6">
                <h3 className="heading-3">Featured Places</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {post.recommendations.map((recommendation) => (
                    <a
                      key={recommendation.id}
                      href={`/${recommendation.destination_name.toLowerCase().replace(/\s+/g, '-')}/${recommendation.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group"
                    >
                      <div className="aspect-square overflow-hidden rounded-lg mb-2">
                        <img
                          src={recommendation.image}
                          alt={recommendation.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {recommendation.name}
                      </h4>
                      <p className="text-sm text-neutral-400">
                        {recommendation.type}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPost;
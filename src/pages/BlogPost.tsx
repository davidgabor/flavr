import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedContent from "@/components/blog/RelatedContent";
import MoreStories from "@/components/blog/MoreStories";
import ExploreDestination from "@/components/blog/ExploreDestination";
import { Helmet } from "react-helmet";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
  author: {
    id: string;
    name: string;
    image: string | null;
  } | null;
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
          author:people(
            id,
            name,
            image
          ),
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

      const transformedData = {
        ...postData,
        author: postData.author,
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
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="h-[80vh] bg-neutral-100" />
        <div className="max-w-3xl mx-auto px-4 -mt-32 relative z-10">
          <div className="space-y-8">
            <div className="w-3/4 h-12 bg-neutral-200 rounded" />
            <div className="w-1/4 h-6 bg-neutral-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-neutral-900">
        <div className="text-center">
          <h1 className="heading-1">Blog post not found</h1>
        </div>
      </div>
    );
  }

  // Get the first destination from the post's destinations array
  const mainDestination = post.destinations[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content.slice(0, 155)} />
      </Helmet>

      <article>
        <BlogPostHeader 
          title={post.title}
          publishedAt={post.published_at}
          coverImage={post.cover_image}
          author={post.author}
        />
        
        <div className="relative z-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                <BlogPostContent content={post.content} />
              </div>
              <aside className="lg:col-span-4">
                <BlogSidebar title={post.title} />
              </aside>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <RelatedContent 
              destinations={post.destinations}
              recommendations={post.recommendations}
            />
            
            <MoreStories currentPostId={post.id} />
            
            {mainDestination && (
              <ExploreDestination 
                destinationId={mainDestination.id}
                destinationName={mainDestination.name}
              />
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
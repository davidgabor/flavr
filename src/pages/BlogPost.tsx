import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedContent from "@/components/blog/RelatedContent";
import { Helmet } from "react-helmet";

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
    return (
      <div className="min-h-screen bg-white animate-pulse">
        <div className="h-[70vh] bg-neutral-100" />
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
        />
        
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8">
                <BlogPostContent content={post.content} />
              </div>
              <div className="lg:col-span-4">
                <BlogSidebar title={post.title} />
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 pb-24">
            <RelatedContent 
              destinations={post.destinations}
              recommendations={post.recommendations}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
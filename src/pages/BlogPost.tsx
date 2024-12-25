import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import BlogPostContent from "@/components/blog/BlogPostContent";
import RelatedContent from "@/components/blog/RelatedContent";

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
        <BlogPostHeader 
          title={post.title}
          publishedAt={post.published_at}
          coverImage={post.cover_image}
        />
        
        <BlogPostContent content={post.content} />

        <RelatedContent 
          destinations={post.destinations}
          recommendations={post.recommendations}
        />
      </article>
    </div>
  );
};

export default BlogPost;
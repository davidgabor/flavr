import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    })
  }

  try {
    console.log('Initializing Supabase client...');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch all destinations with their recommendations
    console.log('Fetching destinations...');
    const { data: destinations, error: destinationsError } = await supabaseClient
      .from('destinations')
      .select(`
        id,
        name,
        recommendations (
          id,
          name
        )
      `)
    
    if (destinationsError) {
      console.error('Error fetching destinations:', destinationsError);
      throw destinationsError;
    }
    console.log('Fetched destinations:', destinations?.length);

    // Fetch all published blog posts
    console.log('Fetching blog posts...');
    const { data: blogPosts, error: blogError } = await supabaseClient
      .from('blog_posts')
      .select('slug')
      .not('published_at', 'is', null)
    
    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
      throw blogError;
    }
    console.log('Fetched blog posts:', blogPosts?.length);

    // Fetch all people
    console.log('Fetching people...');
    const { data: people, error: peopleError } = await supabaseClient
      .from('people')
      .select('id')
    
    if (peopleError) {
      console.error('Error fetching people:', peopleError);
      throw peopleError;
    }
    console.log('Fetched people:', people?.length);

    // Generate XML
    console.log('Generating XML sitemap...');
    const baseUrl = 'https://flavr.world'
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Static routes
    const staticRoutes = ['', '/about', '/destinations', '/people', '/blog']
    staticRoutes.forEach(route => {
      xml += `  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>\n`
    })

    // Add destinations and their recommendations
    console.log('Adding destinations and recommendations to sitemap...');
    destinations?.forEach(destination => {
      const destinationSlug = destination.name.toLowerCase().replace(/\s+/g, '-')
      
      // Add destination URL
      xml += `  <url>
    <loc>${baseUrl}/${destinationSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`

      // Add recommendation URLs for this destination
      destination.recommendations?.forEach(recommendation => {
        const recommendationSlug = recommendation.name.toLowerCase().replace(/[\/\s]+/g, '-')
        xml += `  <url>
    <loc>${baseUrl}/${destinationSlug}/${recommendationSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
      })
    })

    // Add blog posts
    console.log('Adding blog posts to sitemap...');
    blogPosts?.forEach(post => {
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
    })

    // Add people profiles
    console.log('Adding people profiles to sitemap...');
    people?.forEach(person => {
      xml += `  <url>
    <loc>${baseUrl}/p/${person.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
    })

    xml += '</urlset>'

    console.log('Sitemap generation complete.');
    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 500,
    })
  }
})
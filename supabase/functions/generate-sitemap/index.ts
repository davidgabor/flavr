import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Fetch all destinations
    const { data: destinations, error: destinationsError } = await supabaseClient
      .from('destinations')
      .select('name')
    
    if (destinationsError) throw destinationsError

    // Fetch all blog posts
    const { data: blogPosts, error: blogError } = await supabaseClient
      .from('blog_posts')
      .select('slug')
      .not('published_at', 'is', null)
    
    if (blogError) throw blogError

    // Fetch all recommendations with their destinations
    const { data: recommendations, error: recommendationsError } = await supabaseClient
      .from('recommendations')
      .select('name, destinations(name)')
    
    if (recommendationsError) throw recommendationsError

    // Generate XML
    const baseUrl = 'https://flavr.vercel.app'
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

    // Destinations
    destinations?.forEach(destination => {
      const slug = destination.name.toLowerCase().replace(/\s+/g, '-')
      xml += `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`
    })

    // Blog posts
    blogPosts?.forEach(post => {
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
    })

    // Recommendations
    recommendations?.forEach(recommendation => {
      if (recommendation.destinations) {
        const destinationSlug = recommendation.destinations.name.toLowerCase().replace(/\s+/g, '-')
        const recommendationSlug = recommendation.name.toLowerCase().replace(/[\/\s]+/g, '-')
        xml += `  <url>
    <loc>${baseUrl}/${destinationSlug}/${recommendationSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
      }
    })

    xml += '</urlset>'

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
      status: 400,
    })
  }
})
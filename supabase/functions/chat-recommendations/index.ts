import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get recommendations from Supabase based on the message
    const { data: recommendations, error: recommendationsError } = await supabase
      .from('recommendations')
      .select(`
        *,
        destinations (
          name,
          description
        )
      `)
      .limit(5);

    if (recommendationsError) {
      console.error('Supabase error:', recommendationsError);
      throw recommendationsError;
    }

    console.log('Retrieved recommendations:', recommendations?.length);

    // Use GPT to generate a response
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are FlavrAI, a friendly and knowledgeable food and travel recommendation bot. 
            You help users discover great restaurants and destinations.
            Be concise but friendly in your responses.
            Here are some recommendations you can use: ${JSON.stringify(recommendations)}`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const aiData = await openAIResponse.json();
    console.log('OpenAI response received');

    if (!aiData.choices || !aiData.choices[0]) {
      console.error('Unexpected OpenAI response format:', aiData);
      throw new Error('Invalid response format from OpenAI');
    }

    const aiResponse = aiData.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        message: aiResponse,
        recommendations: recommendations 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in chat-recommendations function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
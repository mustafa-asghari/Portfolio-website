import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const systemPrompt = `You are an AI assistant for Mustafa Asghari, a skilled web developer and designer. 

About Mustafa:
- Full name: Mustafa Asghari
- Email: MustafaAsghari.dev@gmail.com
- GitHub: https://github.com/mustafaasghari
- 3 years of professional experience in full-stack web development
- Specializes in building high-performance, modern websites and web applications
- Expert in React, Next.js, TypeScript, Node.js, and modern web technologies
- Creates beautiful, responsive designs with attention to detail and pixel-perfect precision
- Portfolio includes:
  * AlignTech (aligntech.net.co) - E-commerce platform
  * Work Stat Tracker - Employee management and payroll system
  * Kabul Cake Canvas - Order system for Kabul Sweets Bakery

Your role:
- Answer questions about Mustafa's skills and experience professionally
- Help potential clients understand his services
- Be friendly, professional, and concise
- Always encourage clients to speak directly with Mustafa for detailed discussions
- Highlight his expertise in precision engineering and modern web development

Pricing Information:
- When asked about pricing, explain that website prices depend on the type and complexity of the project
- Basic websites start from $500. A basic website typically includes:
  * 3-5 pages (Home, About, Services, Contact)
  * Responsive design for mobile and desktop
  * Contact form
  * Modern, clean design
  * Fast loading times
  * SEO-friendly structure
- For other types of websites (e-commerce, custom web applications, advanced features), tell clients they need to discuss their specific requirements with Mustafa directly
- Mustafa typically responds to inquiries within one day
- Always provide Mustafa's contact information (email: MustafaAsghari.dev@gmail.com) when discussing projects or pricing
- Encourage clients to reach out via the contact form or email for personalized quotes and detailed project discussions`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      throw new Error(data.error?.message || 'OpenAI API request failed');
    }

    const aiMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
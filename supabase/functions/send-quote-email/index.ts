import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const url = new URL(req.url);

  if (url.pathname.endsWith('/test')) {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    return new Response(
      JSON.stringify({
        resendApiKeyConfigured: !!resendApiKey,
        resendApiKeyLength: resendApiKey?.length || 0,
        adminEmailConfigured: !!adminEmail,
        adminEmail: adminEmail || 'not set'
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const quoteData: QuoteRequest = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL not configured");
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0891b2;">New Quote Request</h2>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${quoteData.name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${quoteData.email}</p>
          ${quoteData.phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${quoteData.phone}</p>` : ""}
          ${quoteData.company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${quoteData.company}</p>` : ""}
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #374151;">Project Details:</h3>
          <p style="white-space: pre-wrap; background: #f9fafb; padding: 15px; border-left: 4px solid #0891b2; border-radius: 4px;">${quoteData.message}</p>
        </div>
        <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">This email was sent from your website quote form.</p>
      </div>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Quote Form <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Quote Request from ${quoteData.name}`,
        reply_to: quoteData.email,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      throw new Error(`Resend API error: ${errorData}`);
    }

    const emailResult = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
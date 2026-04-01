// Supabase Edge Function: get-download-url
// Called from the /success page with a Stripe session_id.
// Looks up the purchase in the DB and returns a fresh signed URL.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Map pack IDs to their ZIP file paths in Supabase Storage
const PACK_FILES: Record<string, string> = {
  'viral-video-pack': 'packs/viral-video-pack.zip',
  'ad-copy-pack': 'packs/ad-copy-pack.zip',
  'content-strategy-pack': 'packs/content-strategy-pack.zip',
  'ai-image-pack': 'packs/ai-image-pack.zip',
  'viral-captions-pack': 'packs/viral-captions-pack.zip',
  'ultimate-bundle': 'packs/ultimate-bundle.zip',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { sessionId } = await req.json()

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing sessionId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Use service role key to bypass RLS
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Look up the purchase by Stripe session ID
    const { data: purchase, error: dbError } = await supabase
      .from('purchases')
      .select('pack_id, pack_title, email, amount_paid, created_at')
      .eq('stripe_session_id', sessionId)
      .single()

    if (dbError || !purchase) {
      // Webhook may not have fired yet — give a helpful message
      return new Response(
        JSON.stringify({ error: 'Purchase not found. Please wait a moment and refresh.' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const filePath = PACK_FILES[purchase.pack_id]

    if (!filePath) {
      return new Response(JSON.stringify({ error: 'Unknown pack' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Generate a fresh signed URL (valid 1 hour)
    const { data: signedUrlData, error: storageError } = await supabase.storage
      .from('prompt-packs')
      .createSignedUrl(filePath, 3600)

    if (storageError || !signedUrlData) {
      console.error('Storage error:', storageError)
      return new Response(JSON.stringify({ error: 'Failed to generate download link' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({
        downloadUrl: signedUrlData.signedUrl,
        packTitle: purchase.pack_title,
        packId: purchase.pack_id,
        email: purchase.email,
        expiresInSeconds: 3600,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// Supabase Edge Function: stripe-webhook
// Handles Stripe payment events:
// 1. Verifies webhook signature
// 2. On successful payment: records purchase in DB, generates signed download URL, sends email

import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// Map pack IDs to their ZIP file paths in Supabase Storage bucket "prompt-packs"
const PACK_FILES: Record<string, string> = {
  'viral-video-pack': 'packs/viral-video-pack.zip',
  'ad-copy-pack': 'packs/ad-copy-pack.zip',
  'content-strategy-pack': 'packs/content-strategy-pack.zip',
  'ai-image-pack': 'packs/ai-image-pack.zip',
  'viral-captions-pack': 'packs/viral-captions-pack.zip',
  'ultimate-bundle': 'packs/ultimate-bundle.zip',
}

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''

  let event: Stripe.Event

  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Only handle successful payments
  if (event.type !== 'checkout.session.completed') {
    return new Response(JSON.stringify({ received: true }), { status: 200 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const packId = session.metadata?.pack_id
  const packTitle = session.metadata?.pack_title
  const customerEmail = session.customer_details?.email

  if (!packId || !customerEmail) {
    console.error('Missing metadata or customer email')
    return new Response('Missing data', { status: 400 })
  }

  // Create Supabase admin client (service role bypasses RLS)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Generate a signed URL (valid 1 hour = 3600 seconds)
  const filePath = PACK_FILES[packId]
  const expiresIn = 3600 // 1 hour

  const { data: signedUrlData, error: storageError } = await supabase.storage
    .from('prompt-packs')
    .createSignedUrl(filePath, expiresIn)

  if (storageError) {
    console.error('Failed to create signed URL:', storageError)
    // Don't fail the webhook — record purchase anyway
  }

  const signedUrl = signedUrlData?.signedUrl ?? null
  const downloadExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

  // Record the purchase in the database
  const { error: dbError } = await supabase.from('purchases').insert({
    email: customerEmail,
    pack_id: packId,
    pack_title: packTitle,
    stripe_session_id: session.id,
    amount_paid: (session.amount_total ?? 0) / 100,
    download_expires_at: downloadExpiresAt,
  })

  if (dbError) {
    console.error('Failed to insert purchase:', dbError)
  }

  // Send purchase confirmation email with download link
  if (signedUrl) {
    const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL') ?? ''
    const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? ''

    // Email to customer
    await sendEmail(resendApiKey, {
      to: customerEmail,
      subject: `Your download is ready — ${packTitle}`,
      html: buildCustomerEmail(packTitle ?? packId, signedUrl),
    })

    // Notification to store owner
    if (notificationEmail) {
      await sendEmail(resendApiKey, {
        to: notificationEmail,
        subject: `💰 New sale: ${packTitle} — $${(session.amount_total ?? 0) / 100}`,
        html: buildOwnerEmail(packTitle ?? packId, customerEmail, session.amount_total ?? 0),
      })
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})

async function sendEmail(
  apiKey: string,
  { to, subject, html }: { to: string; subject: string; html: string }
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ContentAgent.Space <hello@contentagent.space>',
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
  }
}

function buildCustomerEmail(packTitle: string, downloadUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Inter, sans-serif; background: #000; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 2px; border-radius: 16px;">
    <div style="background: #111; border-radius: 14px; padding: 40px;">
      <h1 style="color: #c084fc; margin: 0 0 8px;">✅ Your Download is Ready!</h1>
      <p style="color: #9ca3af; margin: 0 0 32px;">Thank you for purchasing <strong style="color: #fff;">${packTitle}</strong></p>

      <a href="${downloadUrl}"
         style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: #fff;
                text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600;
                font-size: 16px; margin-bottom: 24px;">
        ⬇️ Download Your ZIP File
      </a>

      <p style="color: #6b7280; font-size: 13px; margin: 24px 0 0;">
        ⏳ This link expires in <strong>1 hour</strong>. If it expires, reply to this email and we'll send a new one.<br><br>
        🔄 You have <strong>lifetime access</strong> — future updates will be sent to this email address.<br><br>
        💬 Join our community and share your results!
      </p>

      <hr style="border: 1px solid #1f2937; margin: 24px 0;">
      <p style="color: #4b5563; font-size: 12px; margin: 0;">ContentAgent.Space · Northwest UK · hello@contentagent.space</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function buildOwnerEmail(packTitle: string, customerEmail: string, amountTotal: number): string {
  const amount = (amountTotal / 100).toFixed(2)
  return `
<html>
<body style="font-family: sans-serif; padding: 20px;">
  <h2>💰 New Sale!</h2>
  <table style="border-collapse: collapse; width: 100%;">
    <tr><td style="padding: 8px; color: #555;">Product:</td><td style="padding: 8px;"><strong>${packTitle}</strong></td></tr>
    <tr><td style="padding: 8px; color: #555;">Amount:</td><td style="padding: 8px;"><strong>$${amount}</strong></td></tr>
    <tr><td style="padding: 8px; color: #555;">Customer:</td><td style="padding: 8px;">${customerEmail}</td></tr>
    <tr><td style="padding: 8px; color: #555;">Time:</td><td style="padding: 8px;">${new Date().toUTCString()}</td></tr>
  </table>
</body>
</html>
  `.trim()
}

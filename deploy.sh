#!/bin/bash
# deploy.sh — Run this AFTER setting your env vars below
# Usage: bash deploy.sh
set -e

PROJECT_REF="jpfmfvivpywoxywbgxuc"
BUCKET="prompt-packs"
ZIPS_DIR="public/digital-products"

echo "🔐 Setting Supabase Edge Function secrets..."
supabase secrets set --project-ref "$PROJECT_REF" \
  STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
  STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" \
  RESEND_API_KEY="$RESEND_API_KEY" \
  NOTIFICATION_EMAIL="$NOTIFICATION_EMAIL"

echo "🗄️  Applying database migration..."
supabase db push --project-ref "$PROJECT_REF"

echo "🪣  Creating storage bucket '$BUCKET'..."
supabase storage create "$BUCKET" --project-ref "$PROJECT_REF" --private 2>/dev/null || echo "  (bucket already exists)"

echo "📦  Uploading ZIP files to '$BUCKET/packs/'..."
for zip in "$ZIPS_DIR"/*.zip; do
  filename=$(basename "$zip")
  packid="${filename%.zip}"
  echo "  → $filename"
  supabase storage cp "$zip" "ss:///$BUCKET/packs/$filename" --project-ref "$PROJECT_REF"
done

echo "🚀  Deploying Edge Functions..."
supabase functions deploy create-checkout-session --project-ref "$PROJECT_REF"
supabase functions deploy get-download-url --project-ref "$PROJECT_REF"
supabase functions deploy stripe-webhook --project-ref "$PROJECT_REF"

echo ""
echo "✅ Done! Next step: register the Stripe webhook"
echo "   URL: https://$PROJECT_REF.supabase.co/functions/v1/stripe-webhook"
echo "   Event: checkout.session.completed"
echo "   Then add STRIPE_WEBHOOK_SECRET and re-run: supabase secrets set --project-ref $PROJECT_REF STRIPE_WEBHOOK_SECRET=whsec_..."

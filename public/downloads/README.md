# /public/downloads

This folder holds all ZIP prompt packs available for download.

## File naming convention

Use the same `id` as the pack defined in `PromptStorePage.tsx`:

| Pack ID                  | Expected filename                        |
|--------------------------|------------------------------------------|
| `viral-video-pack`       | `viral-video-pack.zip`                   |
| `ad-copy-pack`           | `ad-copy-pack.zip`                       |
| `content-strategy-pack`  | `content-strategy-pack.zip`              |
| `ai-image-pack`          | `ai-image-pack.zip`                      |
| `viral-captions-pack`    | `viral-captions-pack.zip`                |
| `ultimate-bundle`        | `ultimate-bundle.zip`                    |

## How it works

After a successful Stripe/PayPal purchase, the Supabase Edge Function
delivers a signed download URL pointing to the file in Supabase Storage.

Files in this folder are served statically by Vite / Netlify and can
also be uploaded to the **Supabase Storage bucket** for gated delivery.

## Uploading to Supabase Storage

```bash
supabase storage cp ./public/downloads/viral-video-pack.zip \
  ss:///prompt-packs/viral-video-pack.zip
```

---
Drop your `.zip` files directly into this folder, then commit and push.

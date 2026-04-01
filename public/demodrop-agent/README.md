# contentagent.space — AI Demo Agent

> Value-first prospecting chatbot. Built on Netlify Functions + Anthropic Claude.
> The digital donuts system — your agent, your brand, delivered automatically.

---

## Project Structure

```
demodrop-agent/
├── netlify/
│   └── functions/
│       └── agent.js          ← POST /agent — the Claude API proxy
├── public/
│   ├── index.html            ← Standalone chat widget page
│   └── widget.js             ← Embeddable floating widget (drop on any site)
├── .env.example              ← Copy → .env for local dev
├── netlify.toml              ← Netlify build + redirect config
└── package.json
```

---

## Deploy in 5 Steps

### 1. Clone & install

```bash
git clone <your-repo>
cd demodrop-agent
npm install
```

### 2. Set environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key vars to set:

| Variable             | What it is                                        |
|----------------------|---------------------------------------------------|
| `ANTHROPIC_API_KEY`  | Your Anthropic API key                            |
| `BUSINESS_NAME`      | The client/prospect business name                 |
| `AGENT_NAME`         | The agent's first name (e.g. Emma, Alex)          |
| `BUSINESS_CONTEXT`   | Scraped website content — services, FAQs, USPs    |
| `BUSINESS_REGION`    | Where they operate                                |
| `BUSINESS_BOOKING_URL` | Calendly / booking page URL                     |
| `ALLOWED_ORIGIN`     | Your domain (e.g. `https://contentagent.space`)   |

> **Tip for BUSINESS_CONTEXT**: Paste the About page, Services page, and FAQ
> content from the prospect's website. Keep under ~3000 characters. This is
> what makes each demo feel personalised to that specific business.

### 3. Local dev

```bash
npm run dev
# → http://localhost:8888
# → POST http://localhost:8888/.netlify/functions/agent
```

### 4. Deploy to Netlify

```bash
npm run deploy
# or connect your repo to Netlify and it auto-deploys on push
```

Set all `.env` variables in:
**Netlify Dashboard → Site → Environment Variables**

### 5. Test the endpoint

```bash
curl -X POST https://YOUR-SITE.netlify.app/.netlify/functions/agent \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi, what services do you offer?"}]}'
```

---

## Embed on Any Website

Drop this single script tag before `</body>`:

```html
<script
  src="https://YOUR-SITE.netlify.app/widget.js"
  data-endpoint="https://YOUR-SITE.netlify.app/.netlify/functions/agent"
  data-business="Cooper Built Homes"
  data-agent="Emma"
  data-accent="#7c6ef0"
></script>
```

The floating chat bubble appears bottom-right. No other dependencies needed.

---

## API Reference

### `POST /.netlify/functions/agent`

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hi, what services do you offer?" },
    { "role": "assistant", "content": "Hi! I'm Emma from Cooper Built Homes..." },
    { "role": "user", "content": "Do you build on my own land?" }
  ]
}
```

**Success response (200):**
```json
{ "reply": "Yes, we absolutely build on your own land..." }
```

**Error responses:**
- `400` — Invalid input
- `429` — Rate limited (20 req/hour per IP)
- `500/502` — Agent offline

---

## Customising the System Prompt

The system prompt is built dynamically from your environment variables in `agent.js`.
To add custom behaviour, edit the `buildSystemPrompt()` function directly.

Common additions:
- Hard-code specific pricing tiers
- Add competitor deflection language
- Add escalation phrases: "Let me get a human to call you right back"
- Inject seasonal promotions

---

## Scaling to Multi-Client (Agency Mode)

To run this as a prospecting tool across multiple clients:

1. Deploy one Netlify site per client (or use Netlify branch deploys)
2. Each deployment gets its own set of env vars (different `BUSINESS_CONTEXT`, `BUSINESS_NAME` etc.)
3. Use a CRM/pipeline (GoHighLevel, HubSpot) to track which prospect received which demo link
4. The `/agent` endpoint is stateless — all conversation history is sent client-side,
   so no database is needed unless you want conversation logging

---

## Rate Limiting

Current config: **20 requests per IP per hour** (in-memory, resets on cold start).

For production agency use, replace with Redis-backed rate limiting:
```bash
npm install @upstash/redis
```

---

## Powered by contentagent.space

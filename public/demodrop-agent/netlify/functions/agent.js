/**
 * contentagent.space — /agent Netlify Function
 * AI Demo Agent endpoint — value-first prospecting chatbot
 *
 * Env vars required (set in Netlify dashboard):
 *   ANTHROPIC_API_KEY     — your Anthropic key
 *   AGENT_MODEL           — claude-sonnet-4-20250514 (default)
 *   AGENT_MAX_TOKENS      — 600 (default)
 *   BUSINESS_NAME         — e.g. "Cooper Built Homes"
 *   AGENT_NAME            — e.g. "Emma"
 *   BUSINESS_CONTEXT      — scraped website content / FAQ / services
 *   BUSINESS_REGION       — e.g. "Oklahoma"
 *   BUSINESS_BOOKING_URL  — calendar or contact URL
 *   ALLOWED_ORIGIN        — your site domain (CORS)
 */

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

// ─── Rate limiting (in-memory, resets per function cold start) ───────────────
const rateLimitMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, windowStart: now };

  if (now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  rateLimitMap.set(ip, entry);
  return false;
}

// ─── Input sanitisation ───────────────────────────────────────────────────────
function sanitiseMessages(messages) {
  if (!Array.isArray(messages)) throw new Error("messages must be an array");
  if (messages.length > 40) throw new Error("Conversation too long");

  return messages.map((msg) => {
    if (!["user", "assistant"].includes(msg.role)) {
      throw new Error(`Invalid role: ${msg.role}`);
    }
    const content = String(msg.content || "").slice(0, 2000); // hard cap per message
    return { role: msg.role, content };
  });
}

// ─── System prompt builder ────────────────────────────────────────────────────
function buildSystemPrompt() {
  const businessName = process.env.BUSINESS_NAME || "this business";
  const agentName = process.env.AGENT_NAME || "Alex";
  const context = process.env.BUSINESS_CONTEXT || "A professional service business.";
  const region = process.env.BUSINESS_REGION || "your area";
  const bookingUrl = process.env.BUSINESS_BOOKING_URL || "";

  return `ROLE:
You are an AI demo agent for ${businessName}. Your name is ${agentName}.
You represent ${businessName} exactly as their best, most knowledgeable team member would — warm, helpful, and conversion-focused.

CONTEXT:
${context}

Operating area: ${region}
${bookingUrl ? `Booking / contact: ${bookingUrl}` : ""}

TASK:
Your job is to:
1. Greet the visitor warmly and identify what they need
2. Answer questions accurately using ONLY the business information in CONTEXT above
3. Guide the conversation naturally toward a consultation or booking
4. Capture: full name, phone number, email, and relevant project details
5. Confirm all captured details back to the visitor before closing

FORMAT:
- Keep responses concise (2–4 sentences max unless more detail is requested)
- Ask one question at a time — never stack multiple questions
- Mirror the visitor's tone: casual if they're casual, direct if they're direct
- Never mention competitor businesses or make unsupported claims

CONSTRAINTS:
- Never invent information not in the CONTEXT section above
- If asked something you don't know, say: "Great question — let me have someone confirm that for you. Can I take your details?"
- Do not discuss pricing unless it is listed in the CONTEXT section
- Never break character — you are always ${agentName} from ${businessName}
- Strip all PII from any reasoning — never echo back sensitive data in unexpected ways

GOAL:
Every conversation should end with either:
a) A booked appointment / consultation, OR
b) Contact details captured for human follow-up`;
}

// ─── CORS headers ─────────────────────────────────────────────────────────────
function corsHeaders(event) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  const origin = event.headers?.origin || "";
  const finalOrigin =
    allowedOrigin === "*" || origin === allowedOrigin ? origin || "*" : "";

  return {
    "Access-Control-Allow-Origin": finalOrigin || allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// ─── Main handler ─────────────────────────────────────────────────────────────
exports.handler = async (event) => {
  const headers = { ...corsHeaders(event), "Content-Type": "application/json" };

  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // Rate limit
  const ip =
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    event.headers?.["client-ip"] ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too many requests. Please try again later." }),
    };
  }

  // Parse + validate body
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  let messages;
  try {
    messages = sanitiseMessages(body.messages || []);
  } catch (err) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: err.message }) };
  }

  if (!messages.length) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "No messages provided" }) };
  }

  // API key check
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Agent temporarily offline." }) };
  }

  // Call Anthropic
  try {
    const response = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.AGENT_MODEL || "claude-sonnet-4-20250514",
        max_tokens: parseInt(process.env.AGENT_MAX_TOKENS || "600", 10),
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ error: "Agent temporarily offline. Please try again." }),
      };
    }

    const data = await response.json();
    const text = data.content?.find((b) => b.type === "text")?.text || "";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: text }),
    };
  } catch (err) {
    console.error("Handler error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Agent temporarily offline. Please try again shortly." }),
    };
  }
};

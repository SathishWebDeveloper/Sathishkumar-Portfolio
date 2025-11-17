// api/sendMail.js
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

// initialize Upstash Redis (works in serverless)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// helper escape to avoid HTML injection
function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// basic server-side validation
function validate(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = "Name required";
  if (!body.email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(body.email))
    errors.email = "Valid email required";
  if (!body.message || !body.message.trim()) errors.message = "Message required";
  return errors;
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: "Only POST allowed" });

  try {
    const body = req.body || {};
    const errors = validate(body);
    if (Object.keys(errors).length) return res.status(400).json({ success: false, errors });

    // --- RATE LIMITING (Upstash Redis) ---
    // Simple per-ip rate limit: max 5 requests per 60 seconds
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    const key = `rl:${ip}`;

    // increment and get count (Upstash INCR + EXPIRE pattern)
    const count = await redis.incr(key);
    if (count === 1) {
      // first request, set TTL
      await redis.expire(key, 60); // 60 seconds window
    }

    const MAX = 5;
    if (count > MAX) {
      return res.status(429).json({ success: false, error: 'Too many requests. Try again later.' });
    }
    // --- end rate limiting ---

    // Prepare html email
    const html = `
      <h3>New contact message</h3>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
    `;

    // Send via Resend
    await resend.emails.send({
      from: `Portfolio <no-reply@yourdomain.com>`,
      to: process.env.TO_EMAIL,
      subject: `Contact from ${escapeHtml(body.name)}`,
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}

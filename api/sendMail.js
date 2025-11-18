// api/sendMail.js
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
    : null;

function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validate(body) {
  const errors = {};
  if (!body.name || !body.name.trim()) errors.name = "Name required";
  if (!body.email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(body.email)) errors.email = "Valid email required";
  if (!body.message || !body.message.trim()) errors.message = "Message required";
  return errors;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Only POST allowed" });

  try {
    const body = req.body || {};
    const errors = validate(body);
    if (Object.keys(errors).length) return res.status(400).json({ success: false, errors });

    // Rate limit (Upstash Redis)
    if (redis) {
      try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
        const key = `rl:${ip}`;
        const count = await redis.incr(key);
        if (count === 1) await redis.expire(key, 60);
        if (count > 5) return res.status(429).json({ success: false, error: "Too many requests" });
      } catch (rerr) {
        console.warn("Upstash error (non-fatal):", rerr.message || rerr);
      }
    }

    if (!resend) return res.status(500).json({ success: false, error: "Email provider not configured" });

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) return res.status(500).json({ success: false, error: "TO_EMAIL not configured" });

    const html = `
      <h3>New contact message</h3>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
    `;

    try {
      const result = await resend.emails.send({
        from: `Portfolio <${fromEmail}>`,
        to: toEmail,
        subject: `Contact from ${escapeHtml(body.name)}`,
        html,
      });

      console.log("Resend OK:", result);
      return res.status(200).json({ success: true, id: result.id || null });
    } catch (sendErr) {
      console.error("Resend error:", sendErr);
      // return provider error info to frontend for debugging (safe)
      return res.status(502).json({ success: false, error: sendErr?.message || "Send failed", raw: sendErr });
    }
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}

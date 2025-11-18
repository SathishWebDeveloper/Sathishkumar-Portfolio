// api/sendMail.js  (temporary debug version)
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

// debug: print when module is imported
console.log("api/sendMail module loaded");

// safe check for envs for local testing
console.log("ENV RESEND_API_KEY present:", !!process.env.RESEND_API_KEY);
console.log("ENV TO_EMAIL:", !!process.env.TO_EMAIL);
console.log("ENV UPSTASH URL present:", !!process.env.UPSTASH_REDIS_REST_URL);

// initialize only if key present to avoid hard crash
let resend, redis;
try {
  if (process.env.RESEND_API_KEY) resend = new Resend(process.env.RESEND_API_KEY);
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (err) {
  console.error("INIT ERROR:", err);
}

// helper escape
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
  if (!body.email || !/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(body.email))
    errors.email = "Valid email required";
  if (!body.message || !body.message.trim()) errors.message = "Message required";
  return errors;
}

export default async function handler(req, res) {
  console.log("handler called method:", req.method);
  try {
    if (req.method !== "POST") {
      console.log("Non-POST request");
      return res.status(405).json({ success: false, error: "Only POST allowed" });
    }

    console.log("Incoming body:", req.body);

    const body = req.body || {};
    const errors = validate(body);
    if (Object.keys(errors).length) {
      console.log("Validation errors:", errors);
      return res.status(400).json({ success: false, errors });
    }

    // rate limit block (only if redis initialized)
    if (redis) {
      try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
        const key = `rl:${ip}`;
        const count = await redis.incr(key);
        if (count === 1) await redis.expire(key, 60);
        console.log("Rate limit count for", ip, count);
        if (count > 5) return res.status(429).json({ success: false, error: "Too many requests" });
      } catch (rerr) {
        console.error("REDIS ERROR:", rerr);
      }
    } else {
      console.log("Redis not initialized (OK for local debug)");
    }

    // prepare html
    const html = `
      <h3>New contact message</h3>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(body.message).replace(/\n/g, "<br/>")}</p>
    `;

    if (!resend) {
      console.warn("Resend not initialized — skipping actual send (local mode)");
      console.log("Would send to:", process.env.TO_EMAIL);
      return res.status(200).json({ success: true, note: "local-skip-send" });
    }

    // send via resend
    console.log("Calling resend.emails.send()");
    const result = await resend.emails.send({
      from: `Portfolio <no-reply@yourdomain.com>`,
      to: process.env.TO_EMAIL,
      subject: `Contact from ${escapeHtml(body.name)}`,
      html,
    });
    console.log("Resend result:", result);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}

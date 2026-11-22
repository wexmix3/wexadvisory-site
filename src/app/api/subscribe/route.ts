export const dynamic = "force-dynamic";

import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { readSecret } from "@/lib/secret";
import { signSignupToken } from "@/lib/newsletter-token";
import { NEWSLETTER_NAME, toSignupSource } from "@/lib/newsletter";

// Newsletter signup, step 1 of 2 (2026-11-17). Sends a confirm email and
// stores nothing: the address only becomes a Resend contact when its owner
// clicks the link (POST /api/subscribe/confirm). Contacts are never imported
// from the outreach tool or any other list.

// Two in-memory limits (per serverless instance, so best effort): 5 requests
// per 10 minutes per IP, and 2 confirm emails per hour per address. The
// address limit also rides on Resend's Idempotency-Key below, which holds
// across instances: a repeat for the same address in the same hour sends
// nothing new. Together they stop the form being used to mail-bomb someone.
const ipMap = new Map<string, { count: number; resetAt: number }>();
const emailMap = new Map<string, { count: number; resetAt: number }>();
function limited(map: typeof ipMap, key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (map.size > 5000) {
    map.forEach((v, k) => {
      if (now > v.resetAt) map.delete(k);
    });
  }
  const entry = map.get(key);
  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

const SITE_URL = "https://www.wexadvisory.com";
// Plain addresses only: no display names, quotes, brackets, commas or spaces.
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
// Confirm emails go out from the newsletter subdomain, so abuse of this form
// can never touch the reputation of the main wexadvisory.com mail.
const CONFIRM_FROM = "Max Wexley <max@news.wexadvisory.com>";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The confirm link must never follow the request's Host header on production,
// or a forged Host would put someone else's link in an email sent from
// max@wexadvisory.com. Previews and local dev use their own origin so the
// flow can be tested there.
function confirmBase(req: NextRequest): string {
  if (process.env.VERCEL_ENV === "production") return SITE_URL;
  return new URL(req.url).origin;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ipMap, ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let email: string, firstName: string, source: string, honeypot: string;
  try {
    const body = await req.json();
    email = String(body.email ?? "").trim().toLowerCase();
    firstName = String(body.firstName ?? "").trim().slice(0, 60);
    source = toSignupSource(body.source);
    honeypot = String(body.website ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  // A bot filled the hidden field. Answer like a success so it learns nothing,
  // and send nothing.
  if (honeypot) return NextResponse.json({ ok: true });
  // Same answer as a success: the caller learns nothing about the address.
  if (limited(emailMap, email, 2, 60 * 60 * 1000)) return NextResponse.json({ ok: true });

  const apiKey = readSecret("RESEND_API_KEY");
  const secret = readSecret("NEWSLETTER_SIGNING_SECRET");
  if (!apiKey || apiKey.startsWith("re_your") || !secret || secret.length < 32) {
    console.error("[subscribe] RESEND_API_KEY or NEWSLETTER_SIGNING_SECRET (32+ chars) is not set");
    return NextResponse.json({ error: "Signup is not configured" }, { status: 503 });
  }

  const token = signSignupToken({ email, firstName, source }, secret);
  const link = `${confirmBase(req)}/newsletter/confirm?t=${encodeURIComponent(token)}`;
  const hi = firstName ? `Hi ${esc(firstName)},` : "Hi,";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>${hi}</p>
      <p>Someone, hopefully you, asked to get ${esc(NEWSLETTER_NAME)}, the weekly email from Wex Advisory.</p>
      <p><a href="${esc(link)}" style="display: inline-block; background: #0F1F3D; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">Confirm my subscription</a></p>
      <p>If you didn't ask for this, ignore this email and nothing happens. You won't hear from us again.</p>
      <p>Max<br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span></p>
    </div>
  `;

  const hour = Math.floor(Date.now() / 3_600_000);
  const idempotencyKey = createHash("sha256").update(`${email}:${hour}`).digest("hex");
  const failed = () =>
    NextResponse.json({ error: "Could not send the confirm email. Try again in a minute." }, { status: 502 });
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `nl-confirm-${idempotencyKey}`,
      },
      body: JSON.stringify({
        from: CONFIRM_FROM,
        to: email,
        reply_to: "max@wexadvisory.com",
        subject: `Confirm your subscription to ${NEWSLETTER_NAME}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[subscribe] confirm email failed:", res.status, await res.text());
      return failed();
    }
  } catch (err) {
    console.error("[subscribe] confirm email failed:", err);
    return failed();
  }
  return NextResponse.json({ ok: true });
}

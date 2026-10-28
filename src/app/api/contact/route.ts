export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { readSecret } from "@/lib/secret";

// Simple in-memory rate limiter: 5 submissions per 10 minutes per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS  = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now  = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests — try again later" }, { status: 429 });
  }

  let name: string, company: string, email: string, message: string;
  // Only known sources change anything; any other value is ignored.
  let isReporting = false;
  let isInvoiceCheck = false;
  let isCardFeeCheck = false;
  let isCanon = false;
  let viaSite = false;
  try {
    const body = await req.json();
    name    = String(body.name    ?? "").trim();
    company = String(body.company ?? "").trim();
    email   = String(body.email   ?? "").trim();
    message = String(body.message ?? "").trim();
    isReporting = body.source === "reporting";
    isInvoiceCheck = body.source === "invoice-check";
    isCardFeeCheck = body.source === "card-fee-check";
    isCanon = body.source === "canon";
    viaSite = body.via === "site";
    if (!name || !email || !message) throw new Error("Missing required fields");
    if (!email.includes("@")) throw new Error("Invalid email");
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Invalid request" },
      { status: 400 }
    );
  }

  const apiKey = readSecret("RESEND_API_KEY");
  if (!apiKey || apiKey.startsWith("re_your")) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  // Everything a visitor typed is escaped before it goes into HTML.
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const firstName = esc(name.split(" ")[0]);

  const notificationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #0F1F3D;">New Inquiry, Wex Advisory</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      ${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ""}
      <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <hr style="border: 1px solid #eee; margin: 16px 0;" />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${esc(message)}</p>
    </div>
  `;

  // Replaced 2026-10-18: the old auto-reply was written for the competitor
  // analysis product ("I'll have your report ready… top 3 competitors?") and
  // went to everyone once the homepage form went live.
  const autoReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>

      <p>Thanks for reaching out. I read every message myself and I'll reply within 24 hours.</p>

      <p>If it's easier to talk it through, you can book a free 30-minute call here:
      <a href="https://calendly.com/maxwexley-wexadvisory/30min" style="color: #C8A84B;">calendly.com/maxwexley-wexadvisory/30min</a></p>

      <p>And if you want something useful before we talk, the free AI Audit takes about two minutes:
      <a href="https://www.wexadvisory.com/audit" style="color: #C8A84B;">wexadvisory.com/audit</a></p>

      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  // From the /automated-reporting "Send me one report" form.
  const reportingReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>

      <p>Thanks for sending this. I read every one myself and I'll reply within 24 hours with how I'd automate it.</p>

      <p>If you can, reply to this email with a screenshot or export of the report, with any sensitive numbers removed, and tell me where its data comes from (which tools or files). That's all I need.</p>

      <p>If it's easier to walk me through it, book a free 30-minute call here:
      <a href="https://calendly.com/maxwexley-wexadvisory/30min" style="color: #C8A84B;">calendly.com/maxwexley-wexadvisory/30min</a></p>

      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  // From /invoice-check, the page the restaurant letters' QR code opens.
  const invoiceCheckReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>
      <p>Thanks for asking for the free supplier invoice check.</p>
      <p>Reply to this email with your last 4 weeks of supplier invoices, from every supplier you use. PDFs and clear phone photos both work.</p>
      <p>I'll read every line and send you a 2-page report: what went up and what it cost you, any invoice billed twice, and where the same item is cheaper from a supplier you already use. It's free, and you keep the report either way.</p>
      <p>Only I see your invoices. They're used for your report and nothing else.</p>
      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  // From /card-fee-check.
  const cardFeeReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>
      <p>Thanks for asking for the free card fee check.</p>
      <p>Reply to this email with your last 1 to 3 monthly card processing statements, for one location. Every page, please, including the fee pages at the back. PDFs and clear phone photos both work. You can black out the account number and card digits; the check doesn't need them.</p>
      <p>I'll check every fee line against the statement's own totals and send you a short report: what processing really costs you, which printed fees are worth questioning, and whether your rate is fair. If it isn't, you also get a ready letter to send your processor. If a statement doesn't add up, I'll tell you what's missing instead of guessing.</p>
      <p>I don't sell card processing and I'm paid nothing if you switch. Only I see your statements, and they're used for your report and nothing else.</p>
      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  // From /canon.
  const canonReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a; line-height: 1.6;">
      <p>Hi ${firstName},</p>
      <p>Thanks for your interest in Canon. I'll reply within 24 hours to set up a demo on documents like yours.</p>
      <p>If you'd rather pick a time now, book a free 30-minute call here:
      <a href="https://calendly.com/maxwexley-wexadvisory/30min" style="color: #C8A84B;">calendly.com/maxwexley-wexadvisory/30min</a></p>
      <p>It helps to know which documents your team asks about most (handbooks, contracts, SOPs, product specs). There's no need to send any yet.</p>
      <p>Talk soon,<br />
      <strong>Max</strong><br />
      <span style="color: #888; font-size: 14px;">Wex Advisory · <a href="mailto:max@wexadvisory.com" style="color: #C8A84B;">max@wexadvisory.com</a></span>
      </p>
    </div>
  `;

  async function sendEmail(to: string, subject: string, html: string) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Max Wexley <max@wexadvisory.com>",
        to,
        reply_to: "max@wexadvisory.com",
        subject,
        html,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  try {
    await sendEmail(
      "max@wexadvisory.com",
      `${isReporting ? "[Reporting] " : isInvoiceCheck ? (viaSite ? "[Invoice check, from site] " : "[Invoice check] ") : isCardFeeCheck ? "[Card fee check] " : isCanon ? "[Canon] " : ""}New inquiry from ${name}${company ? ` at ${company}` : ""}`,
      notificationHtml
    );

    // Awaited: on Vercel a promise left running after the response can be cut
    // off, so an un-awaited auto-reply may never send. Max already has the
    // inquiry at this point, so an auto-reply failure is logged, not shown.
    try {
      if (isReporting) {
        await sendEmail(email, "Thanks for sending your report, Wex Advisory", reportingReplyHtml);
      } else if (isInvoiceCheck) {
        await sendEmail(email, "Your free invoice check, Wex Advisory", invoiceCheckReplyHtml);
      } else if (isCardFeeCheck) {
        await sendEmail(email, "Your free card fee check, Wex Advisory", cardFeeReplyHtml);
      } else if (isCanon) {
        await sendEmail(email, "Your Canon demo, Wex Advisory", canonReplyHtml);
      } else {
        await sendEmail(email, "Thanks for reaching out, Wex Advisory", autoReplyHtml);
      }
    } catch (err) {
      console.error("[contact] Auto-reply failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

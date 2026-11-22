export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { readSecret } from "@/lib/secret";
import { verifySignupToken } from "@/lib/newsletter-token";

// Newsletter signup, step 2 of 2 (2026-11-17). Called by the button on
// /newsletter/confirm, never by the email link itself: mail scanners open
// links before people do, so a GET that subscribed would confirm addresses
// nobody clicked. Adds (or re-subscribes) the contact and puts it in the
// newsletter segment, then tells Max. Any Resend failure is a 502.

const RESEND = "https://api.resend.com";

class ResendError extends Error {}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: NextRequest) {
  let token: string;
  try {
    token = String((await req.json()).t ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const apiKey = readSecret("RESEND_API_KEY");
  const secret = readSecret("NEWSLETTER_SIGNING_SECRET");
  const segmentId = readSecret("NEWSLETTER_SEGMENT_ID");
  if (!apiKey || !secret || secret.length < 32 || !segmentId) {
    console.error("[subscribe/confirm] RESEND_API_KEY, NEWSLETTER_SIGNING_SECRET (32+ chars) or NEWSLETTER_SEGMENT_ID is not set");
    return NextResponse.json({ error: "Signup is not configured" }, { status: 503 });
  }

  // A real token is about 200 characters; anything far longer is not one.
  // Known, accepted risk: within its 48 hours a token can be clicked again
  // after an unsubscribe and re-subscribe the address. Only someone holding
  // that inbox's confirm email can do it, and they clicked, so it stays.
  const check = token.length > 1024 ? ({ ok: false, reason: "malformed" } as const) : verifySignupToken(token, secret);
  if (!check.ok) {
    const error =
      check.reason === "expired"
        ? "This link has expired. Sign up again and we'll send a fresh one."
        : "This link isn't valid. Sign up again and we'll send a fresh one.";
    return NextResponse.json({ error, reason: check.reason }, { status: 400 });
  }
  const { e: email, n: firstName, s: source } = check.payload;

  async function call(method: string, path: string, body?: unknown): Promise<Response> {
    return fetch(`${RESEND}${path}`, {
      method,
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  }
  async function must(res: Response, what: string): Promise<void> {
    if (!res.ok) throw new ResendError(`${what}: ${res.status} ${await res.text()}`);
  }

  const contactPath = `/contacts/${encodeURIComponent(email)}`;
  // A conflict (409) or an "already exists/already in" message means the
  // state we want is already there: a double click, or a second confirm.
  const isAlready = (status: number, text: string) => status === 409 || /already/i.test(text);

  async function resubscribe() {
    // They clicked a confirm link, so a past unsubscribe is undone on purpose.
    await must(
      await call("PATCH", contactPath, { unsubscribed: false, ...(firstName ? { first_name: firstName } : {}) }),
      "re-subscribe contact"
    );
    const add = await call("POST", `${contactPath}/segments/${encodeURIComponent(segmentId!)}`);
    if (!add.ok) {
      const text = await add.text();
      if (!isAlready(add.status, text)) throw new ResendError(`add to segment: ${add.status} ${text}`);
    }
  }

  try {
    const existing = await call("GET", contactPath);
    if (existing.status === 404) {
      const created = await call("POST", "/contacts", {
        email,
        ...(firstName ? { first_name: firstName } : {}),
        unsubscribed: false,
        segments: [{ id: segmentId }],
      });
      if (!created.ok) {
        const text = await created.text();
        // Created by a concurrent click between our GET and POST.
        if (isAlready(created.status, text)) await resubscribe();
        else throw new ResendError(`create contact: ${created.status} ${text}`);
      }
    } else {
      await must(existing, "look up contact");
      await resubscribe();
    }
  } catch (err) {
    console.error("[subscribe/confirm] Resend write failed:", err);
    return NextResponse.json({ error: "We couldn't finish your signup. Try the link again in a minute." }, { status: 502 });
  }

  // The subscriber is in. A failed notice to Max is logged, not shown to them.
  try {
    await must(
      await call("POST", "/emails", {
        from: "Wex Advisory site <max@wexadvisory.com>",
        to: "max@wexadvisory.com",
        subject: `[Newsletter] New subscriber (${source})`,
        html: `<p style="font-family: Arial, sans-serif;">${esc(email)} confirmed from <strong>${esc(source)}</strong>.</p>`,
      }),
      "notify Max"
    );
  } catch (err) {
    console.error("[subscribe/confirm] notice to Max failed:", err);
  }

  return NextResponse.json({ ok: true });
}

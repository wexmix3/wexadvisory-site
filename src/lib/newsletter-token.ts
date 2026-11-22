import { createHmac, timingSafeEqual } from "node:crypto";

// Double opt-in token for the newsletter (2026-11-17). Nobody becomes a
// Resend contact until they click the link in the confirm email, so a typed
// or spam-submitted address never reaches the list. The token carries what
// the confirm step needs and is signed with NEWSLETTER_SIGNING_SECRET.
// Format: base64url(JSON payload) + "." + base64url(HMAC-SHA256 of that part).

export type SignupPayload = {
  /** Lowercased email address. */
  e: string;
  /** First name, may be empty. */
  n: string;
  /** Where the signup form was (footer, blog, newsletter-page, ...). */
  s: string;
  /** Expiry, unix seconds. */
  x: number;
};

// 48 hours: long enough to find the email, short enough that an old one
// sitting in an inbox stops working.
export const TOKEN_TTL_SECONDS = 48 * 60 * 60;

const b64url = (buf: Buffer) => buf.toString("base64url");
const mac = (body: string, secret: string) => createHmac("sha256", secret).update(body).digest();

export function signSignupToken(
  data: { email: string; firstName: string; source: string },
  secret: string,
  nowMs = Date.now()
): string {
  if (!secret) throw new Error("NEWSLETTER_SIGNING_SECRET is empty");
  const payload: SignupPayload = {
    e: data.email,
    n: data.firstName,
    s: data.source,
    x: Math.floor(nowMs / 1000) + TOKEN_TTL_SECONDS,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${b64url(mac(body, secret))}`;
}

export type VerifyResult =
  | { ok: true; payload: SignupPayload }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function verifySignupToken(token: string, secret: string, nowMs = Date.now()): VerifyResult {
  if (!secret) throw new Error("NEWSLETTER_SIGNING_SECRET is empty");
  const parts = typeof token === "string" ? token.split(".") : [];
  if (parts.length !== 2 || !parts[0] || !parts[1]) return { ok: false, reason: "malformed" };
  const [body, sig] = parts;

  const expected = mac(body, secret);
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { ok: false, reason: "bad-signature" };
  }

  let payload: SignupPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (
    typeof payload?.e !== "string" ||
    typeof payload.n !== "string" ||
    typeof payload.s !== "string" ||
    typeof payload.x !== "number"
  ) {
    return { ok: false, reason: "malformed" };
  }
  if (payload.x * 1000 < nowMs) return { ok: false, reason: "expired" };
  return { ok: true, payload };
}

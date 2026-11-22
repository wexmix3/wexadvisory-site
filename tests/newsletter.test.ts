// Newsletter signup: token, both API routes (Resend mocked, nothing is sent),
// and the issue file validation. Run: npm test
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { signSignupToken, verifySignupToken, TOKEN_TTL_SECONDS } from "../src/lib/newsletter-token";
import { readIssueFile, toSignupSource } from "../src/lib/newsletter";

const SECRET = "test-secret-that-is-at-least-32-characters-long";
process.env.RESEND_API_KEY = "re_mock";
process.env.NEWSLETTER_SIGNING_SECRET = SECRET;
process.env.NEWSLETTER_SEGMENT_ID = "seg_news";

// ---------- token ----------

test("token round-trips its payload", () => {
  const t = signSignupToken({ email: "a@b.co", firstName: "Ann", source: "footer" }, SECRET);
  const r = verifySignupToken(t, SECRET);
  assert.ok(r.ok);
  if (r.ok) assert.deepEqual([r.payload.e, r.payload.n, r.payload.s], ["a@b.co", "Ann", "footer"]);
});

test("token is rejected when tampered, signed with another secret, or malformed", () => {
  const t = signSignupToken({ email: "a@b.co", firstName: "", source: "blog" }, SECRET);
  const [body, sig] = t.split(".");
  const forged = Buffer.from(JSON.stringify({ e: "evil@x.co", n: "", s: "blog", x: 9e9 })).toString("base64url");
  assert.deepEqual(verifySignupToken(`${forged}.${sig}`, SECRET), { ok: false, reason: "bad-signature" });
  assert.deepEqual(verifySignupToken(t, "other"), { ok: false, reason: "bad-signature" });
  assert.deepEqual(verifySignupToken(body, SECRET), { ok: false, reason: "malformed" });
  assert.deepEqual(verifySignupToken("", SECRET), { ok: false, reason: "malformed" });
});

test("token lives 48 hours, then expires", () => {
  assert.equal(TOKEN_TTL_SECONDS, 48 * 3600);
  const now = Date.UTC(2026, 10, 17);
  const t = signSignupToken({ email: "a@b.co", firstName: "", source: "blog" }, SECRET, now);
  assert.ok(verifySignupToken(t, SECRET, now + (TOKEN_TTL_SECONDS - 60) * 1000).ok);
  assert.deepEqual(verifySignupToken(t, SECRET, now + (TOKEN_TTL_SECONDS + 60) * 1000), { ok: false, reason: "expired" });
});

test("an empty secret throws instead of signing", () => {
  assert.throws(() => signSignupToken({ email: "a@b.co", firstName: "", source: "x" }, ""));
});

test("unknown signup sources become 'site'", () => {
  assert.equal(toSignupSource("footer"), "footer");
  assert.equal(toSignupSource("<script>"), "site");
  assert.equal(toSignupSource(undefined), "site");
});

// ---------- Resend mock ----------

type Call = { method: string; url: string; body: Record<string, unknown> | null; headers: Record<string, string> };
let calls: Call[] = [];
let respond: (c: Call) => Response;

globalThis.fetch = (async (url: string, init: { method?: string; body?: string; headers?: Record<string, string> }) => {
  const c: Call = { method: init.method ?? "GET", url, body: init.body ? JSON.parse(init.body) : null, headers: init.headers ?? {} };
  calls.push(c);
  return respond(c);
}) as unknown as typeof fetch;

const ok = () => new Response("{}", { status: 200 });
beforeEach(() => {
  calls = [];
  respond = ok;
});

let ip = 0;
async function subscribe(body: Record<string, unknown>) {
  const { POST } = await import("../src/app/api/subscribe/route");
  return POST(new Request("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "x-forwarded-for": `10.1.0.${++ip}` },
    body: JSON.stringify(body),
  }) as never);
}
async function confirm(t: string) {
  const { POST } = await import("../src/app/api/subscribe/confirm/route");
  return POST(new Request("http://localhost/api/subscribe/confirm", { method: "POST", body: JSON.stringify({ t }) }) as never);
}

// ---------- /api/subscribe ----------

test("subscribe sends one confirm email and creates no contact", async () => {
  const res = await subscribe({ email: "  Jane@Example.com ", source: "footer" });
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/emails$/);
  assert.equal(calls[0].body!.to, "jane@example.com");
  assert.match(String(calls[0].body!.html), /http:\/\/localhost\/newsletter\/confirm\?t=/);
  assert.ok(!calls.some((c) => c.url.includes("/contacts")));
});

test("subscribe rejects a bad email with 400 and sends nothing", async () => {
  for (const email of ["", "no-at-sign", "a@b", "x".repeat(250) + "@b.co", "Evil<victim@x.com>", "a@b.co,c@d.co", '"x"@b.co']) {
    const res = await subscribe({ email });
    assert.equal(res.status, 400, email);
  }
  assert.equal(calls.length, 0);
});

test("subscribe with the honeypot filled answers 200 and sends nothing", async () => {
  const res = await subscribe({ email: "bot@spam.co", website: "http://spam" });
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});

test("subscribe returns 502 when Resend fails or the network throws", async () => {
  respond = () => new Response("boom", { status: 500 });
  assert.equal((await subscribe({ email: "fail1@example.com" })).status, 502);
  respond = () => {
    throw new TypeError("fetch failed");
  };
  assert.equal((await subscribe({ email: "fail2@example.com" })).status, 502);
});

test("confirm emails come from the newsletter subdomain with an idempotency key", async () => {
  await subscribe({ email: "idem@example.com" });
  assert.match(String(calls[0].body!.from), /@news\.wexadvisory\.com>$/);
  assert.match(calls[0].headers["Idempotency-Key"], /^nl-confirm-[0-9a-f]{64}$/);
});

test("one address gets at most 2 confirm emails an hour, and the 3rd still looks like success", async () => {
  for (let i = 0; i < 3; i++) assert.equal((await subscribe({ email: "target@example.com" })).status, 200);
  assert.equal(calls.length, 2);
});

test("a short signing secret is refused as not configured", async () => {
  process.env.NEWSLETTER_SIGNING_SECRET = "short";
  try {
    assert.equal((await subscribe({ email: "short@example.com" })).status, 503);
    assert.equal(calls.length, 0);
  } finally {
    process.env.NEWSLETTER_SIGNING_SECRET = SECRET;
  }
});

test("on production the confirm link always uses the real site, not the Host header", async () => {
  process.env.VERCEL_ENV = "production";
  try {
    const { POST } = await import("../src/app/api/subscribe/route");
    await POST(new Request("http://evil.example/api/subscribe", {
      method: "POST",
      headers: { "x-forwarded-for": `10.1.0.${++ip}` },
      body: JSON.stringify({ email: "prod@example.com" }),
    }) as never);
    assert.match(String(calls[0].body!.html), /https:\/\/www\.wexadvisory\.com\/newsletter\/confirm\?t=/);
    assert.ok(!String(calls[0].body!.html).includes("evil.example"));
  } finally {
    delete process.env.VERCEL_ENV;
  }
});

// ---------- /api/subscribe/confirm ----------

const tokenFor = (email: string, source = "blog") => signSignupToken({ email, firstName: "Jane", source }, SECRET);

test("confirm creates a new contact in the segment, subscribed, and tells Max", async () => {
  respond = (c) => (c.method === "GET" ? new Response('{"name":"not_found"}', { status: 404 }) : ok());
  const res = await confirm(tokenFor("jane@example.com"));
  assert.equal(res.status, 200);
  const create = calls.find((c) => c.method === "POST" && c.url.endsWith("/contacts"))!;
  assert.deepEqual(create.body, { email: "jane@example.com", first_name: "Jane", unsubscribed: false, segments: [{ id: "seg_news" }] });
  const notice = calls.find((c) => c.url.endsWith("/emails"))!;
  assert.equal(notice.body!.to, "max@wexadvisory.com");
  assert.match(String(notice.body!.subject), /\[Newsletter\] New subscriber \(blog\)/);
});

test("confirm re-subscribes an existing contact and adds it to the segment", async () => {
  const res = await confirm(tokenFor("old@example.com"));
  assert.equal(res.status, 200);
  const patch = calls.find((c) => c.method === "PATCH")!;
  assert.match(patch.url, /\/contacts\/old%40example\.com$/);
  assert.equal(patch.body!.unsubscribed, false);
  assert.ok(calls.some((c) => c.method === "POST" && c.url.endsWith("/contacts/old%40example.com/segments/seg_news")));
});

test("confirm treats 'already in segment' as success but any other segment error as 502", async () => {
  respond = (c) => (c.url.includes("/segments/") ? new Response('{"message":"Contact already in segment"}', { status: 422 }) : ok());
  assert.equal((await confirm(tokenFor("a@example.com"))).status, 200);
  respond = (c) => (c.url.includes("/segments/") ? new Response('{"message":"rate limited"}', { status: 429 }) : ok());
  assert.equal((await confirm(tokenFor("a@example.com"))).status, 502);
});

test("a double click (contact created between GET and POST) still succeeds", async () => {
  respond = (c) =>
    c.method === "GET"
      ? new Response("{}", { status: 404 })
      : c.method === "POST" && c.url.endsWith("/contacts")
        ? new Response('{"message":"Contact already exists"}', { status: 409 })
        : ok();
  assert.equal((await confirm(tokenFor("double@example.com"))).status, 200);
  assert.ok(calls.some((c) => c.method === "PATCH"), "fell through to re-subscribe");
});

test("confirm with a bad, oversized or expired token is 400 and touches nothing", async () => {
  assert.equal((await confirm("garbage")).status, 400);
  assert.equal((await confirm("a".repeat(5000) + "." + "b")).status, 400);
  const old = signSignupToken({ email: "a@b.co", firstName: "", source: "blog" }, SECRET, Date.now() - 3 * 24 * 3600 * 1000);
  const res = await confirm(old);
  assert.equal(res.status, 400);
  assert.equal((await res.json()).reason, "expired");
  assert.equal(calls.length, 0);
});

test("confirm returns 502 when the contact write fails", async () => {
  respond = (c) => (c.method === "GET" ? new Response("{}", { status: 404 }) : new Response("down", { status: 500 }));
  assert.equal((await confirm(tokenFor("jane@example.com"))).status, 502);
  assert.ok(!calls.some((c) => c.url.endsWith("/emails")), "no notice to Max when the signup failed");
});

test("a failed notice to Max does not fail the signup", async () => {
  respond = (c) => (c.method === "GET" ? new Response("{}", { status: 404 }) : c.url.endsWith("/emails") ? new Response("x", { status: 500 }) : ok());
  assert.equal((await confirm(tokenFor("jane@example.com"))).status, 200);
});

// ---------- issue files ----------

const issue = (front: string, body = "Hello") => `---\n${front}\n---\n${body}\n`;
const good = 'number: 1\ntitle: "Three things"\ndescription: "One line"\ndate: 2026-11-24\ndraft: true';

test("a valid issue file parses", () => {
  const i = readIssueFile("2026-11-24-three-things.md", issue(good));
  assert.equal(i.number, 1);
  assert.equal(i.date, "2026-11-24");
  assert.equal(i.draft, true);
});

test("issue files with missing or bad fields throw with the file name", () => {
  assert.throws(() => readIssueFile("x.md", issue(good.replace("draft: true", ""))), /x\.md.*draft/);
  assert.throws(() => readIssueFile("x.md", issue(good.replace("number: 1", "number: 0"))), /number/);
  assert.throws(() => readIssueFile("x.md", issue(good.replace("2026-11-24", "2026-02-30"))), /date/);
  assert.throws(() => readIssueFile("Bad_Name.md", issue(good)), /slug/);
  assert.throws(() => readIssueFile("x.md", issue(good, "")), /no body/);
});

test("checker comments never reach the rendered body", () => {
  const i = readIssueFile("x.md", issue(good, ["### Item", "<!-- published: 2026-11-20 -->", "Text"].join(String.fromCharCode(10))));
  assert.ok(!i.body.includes("<!--"));
  assert.ok(i.body.includes("Text"));
});

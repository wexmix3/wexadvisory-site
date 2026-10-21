// /api/contact with Resend mocked: no real email is ever sent.
// Run: npm test
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

type Sent = { to: string; subject: string; html: string };
let sent: Sent[] = [];
let failVisitorReply = false;

globalThis.fetch = (async (_url: string, init: { body: string }) => {
  const body = JSON.parse(init.body);
  sent.push({ to: body.to, subject: body.subject, html: body.html });
  if (failVisitorReply && body.to !== "max@wexadvisory.com") return new Response("boom", { status: 500 });
  return new Response("{}", { status: 200 });
}) as unknown as typeof fetch;
process.env.RESEND_API_KEY = "re_mock";

let ip = 0;
async function post(body: Record<string, unknown>) {
  const { POST } = await import("../src/app/api/contact/route");
  const req = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": `10.0.0.${++ip}` },
    body: JSON.stringify(body),
  });
  return POST(req as never);
}
const base = { name: "Jane Doe", company: "Acme", email: "jane@example.com", message: "Weekly sales report" };
const toMax = () => sent.find((s) => s.to === "max@wexadvisory.com")!;
const toVisitor = () => sent.find((s) => s.to === "jane@example.com")!;

beforeEach(() => {
  sent = [];
  failVisitorReply = false;
});

test("reporting source tags subject and sends reporting reply", async () => {
  const res = await post({ ...base, source: "reporting" });
  assert.equal(res.status, 200);
  assert.match(toMax().subject, /^\[Reporting\] New inquiry from Jane Doe/);
  assert.equal(toVisitor().subject, "Thanks for sending your report, Wex Advisory");
  assert.ok(toVisitor().html.includes("screenshot or export"));
  assert.ok(toVisitor().html.includes("calendly.com/maxwexley-wexadvisory/free-strategy-call"));
  assert.ok(!toVisitor().html.includes("competitors"));
});

test("invoice-check source tags subject and asks for invoices", async () => {
  const res = await post({ ...base, source: "invoice-check" });
  assert.equal(res.status, 200);
  assert.match(toMax().subject, /^\[Invoice check\] New inquiry from Jane Doe/);
  assert.equal(toVisitor().subject, "Your free invoice check, Wex Advisory");
  assert.ok(toVisitor().html.includes("last 4 weeks of supplier invoices"));
  assert.ok(!toVisitor().html.includes("screenshot or export"));
  assert.ok(!toVisitor().html.includes("competitors"));
});

test("no source keeps general reply", async () => {
  await post(base);
  assert.match(toMax().subject, /^New inquiry from Jane Doe/);
  assert.equal(toVisitor().subject, "Thanks for reaching out, Wex Advisory");
  assert.ok(!toVisitor().html.includes("screenshot or export"));
});

test("unknown source is ignored", async () => {
  for (const source of ["<script>", "audit", 1, null]) {
    sent = [];
    await post({ ...base, source });
    assert.match(toMax().subject, /^New inquiry from/);
    assert.equal(toVisitor().subject, "Thanks for reaching out, Wex Advisory");
    assert.ok(!toVisitor().html.includes("screenshot or export"));
  }
});

test("fields are escaped", async () => {
  await post({ ...base, name: "Jane <b>Doe</b>", message: "<script>x</script>", source: "reporting" });
  for (const s of sent) {
    assert.ok(!s.html.includes("<b>Doe"));
    assert.ok(!s.html.includes("<script>"));
  }
});

test("auto-reply failure still returns 200", async () => {
  failVisitorReply = true;
  const res = await post({ ...base, source: "reporting" });
  assert.equal(res.status, 200);
  assert.equal(sent.length, 2);
});

test("missing fields returns 400", async () => {
  const res = await post({ name: "", email: "x", message: "" });
  assert.equal(res.status, 400);
  assert.equal(sent.length, 0);
});

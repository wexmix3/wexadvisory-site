import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const isDev = process.env.NODE_ENV !== "production";

// Is at least one blog post visible in this build? Nav is a client component
// and cannot read the filesystem, so the answer is baked in at build time as
// NEXT_PUBLIC_BLOG_LIVE and Nav and Footer render the Blog link from it.
// Same rule as src/lib/blog.ts: drafts count everywhere except production
// (VERCEL_ENV, because preview builds also run with NODE_ENV=production).
// The /blog index page throws at build if the two ever disagree.
function blogIsLive() {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return false;
  const showDrafts = process.env.VERCEL_ENV !== "production";
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .some((file) => showDrafts || matter(fs.readFileSync(path.join(dir, file), "utf8")).data.draft !== true);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_BLOG_LIVE: blogIsLive() ? "1" : "0" },
  // Apex -> www. Canonicals already point at www; this makes the apex host
  // agree with them (301, not the 200 duplicate it served before).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "wexadvisory.com" }],
        destination: "https://www.wexadvisory.com/:path*",
        // statusCode instead of `permanent: true`, which would emit a 308.
        statusCode: 301,
      },
      // The law page moved on 2026-10-07. Google had filed the old address as a
      // duplicate of an unrelated site and would not index it, although the
      // page it fetched was correct. A new address gets a fresh evaluation.
      {
        source: "/ai-for-law-firms",
        destination: "/ai-automation-for-law-firms",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' is dev-only — Next.js Fast Refresh / webpack HMR need it and
              // silently break (no error beyond a console EvalError) without it. Never shipped
              // to production.
              `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://js.stripe.com https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://api.resend.com https://vitals.vercel-insights.com",
              "frame-src https://js.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

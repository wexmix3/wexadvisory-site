import { ImageResponse } from "next/og";

export const runtime = "edge";

const DEFAULT_HEADLINE = "AI is complex. Working with us isn't.";
const DEFAULT_SUB =
  "Custom AI automation and systems work, scoped to what your team actually needs, plus a free AI Audit.";

const MAX_TITLE_LENGTH = 110;

// Optional ?title= for per-post images (blog). The value is only ever drawn as
// text, never used as markup or a URL. Control characters are dropped,
// whitespace is collapsed and the length is capped so a crafted link cannot
// overflow the card. No param (or an empty one) renders the default card.
function readTitle(request: Request): string | null {
  const raw = new URL(request.url).searchParams.get("title");
  if (!raw) return null;
  const clean = raw
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return null;
  return clean.length > MAX_TITLE_LENGTH ? `${clean.slice(0, MAX_TITLE_LENGTH - 3).trimEnd()}...` : clean;
}

export async function GET(request: Request) {
  const title = readTitle(request);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0F1F3D",
          padding: "80px 88px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold accent bar */}
        <div style={{ width: "56px", height: "4px", backgroundColor: "#C8A84B", marginBottom: "40px" }} />

        {/* Wordmark */}
        <div style={{ fontSize: "18px", color: "#C8A84B", letterSpacing: "0.25em", marginBottom: "28px", fontWeight: 700 }}>
          WEX ADVISORY
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: title && title.length > 60 ? "48px" : "56px",
            color: "#FFFFFF",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "28px",
            maxWidth: title ? "1000px" : "880px",
            ...(title ? { wordBreak: "break-word" as const } : {}),
          }}
        >
          {title ?? DEFAULT_HEADLINE}
        </div>

        {/* Sub */}
        <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.45)", maxWidth: "700px", lineHeight: 1.4 }}>
          {title ? "By Max Wexley" : DEFAULT_SUB}
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", gap: "14px" }}>
          <div style={{ width: "8px", height: "8px", backgroundColor: "#C8A84B", borderRadius: "50%" }} />
          <div style={{ fontSize: "20px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
            wexadvisory.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

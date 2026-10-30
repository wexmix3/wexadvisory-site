import { ImageResponse } from "next/og";

export const runtime = "edge";

const DEFAULT_HEADLINE = "Stop running your brand out of a spreadsheet.";
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

// Brand fonts (2026-10-29 redesign): Inter Tight for type, JetBrains Mono for
// the small labels, the same pair the site loads. Fetched from Google Fonts as
// TrueType, subset to the characters drawn (Satori needs ttf/otf/woff). If a
// fetch fails the card still renders in the default sans: a missing font must
// never turn a share image into an error.
type OgFont = { name: string; data: ArrayBuffer; weight: 500 | 800; style: "normal" };

async function loadGoogleFont(family: string, weight: 500 | 800, text: string): Promise<OgFont | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    if (!res.ok) return null;
    return { name: family, data: await res.arrayBuffer(), weight, style: "normal" };
  } catch {
    return null;
  }
}

// Brand tokens (src/app/globals.css :root). Gold is a small accent only.
const CANVAS = "#FBF8F1";
const INK = "#0F1F3D";
const MUTED = "#5B6474";
const GRID = "#E4DED0";
const GOLD = "#C8A84B";

export async function GET(request: Request) {
  const title = readTitle(request);
  const headline = title ?? DEFAULT_HEADLINE;
  const sub = title ? "By Max Wexley" : DEFAULT_SUB;
  const mono = "WEX ADVISORYwexadvisory.com";

  const fonts = (
    await Promise.all([
      loadGoogleFont("Inter Tight", 800, headline),
      loadGoogleFont("Inter Tight", 500, sub),
      loadGoogleFont("JetBrains Mono", 500, mono),
    ])
  ).filter((f): f is OgFont => f !== null);
  const hasTight = fonts.some((f) => f.name === "Inter Tight");
  const hasMono = fonts.some((f) => f.name === "JetBrains Mono");
  const sans = hasTight ? "Inter Tight" : "sans-serif";
  const monoFamily = hasMono ? "JetBrains Mono" : "monospace";

  // Long post titles step down so they stay inside the card in 3 lines.
  const size = !title ? 76 : title.length > 80 ? 56 : title.length > 50 ? 64 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: CANVAS,
          padding: "72px 88px 64px",
          fontFamily: sans,
          color: INK,
        }}
      >
        {/* Wordmark: mono label with the one gold accent */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "44px" }}>
          <div style={{ width: "12px", height: "12px", backgroundColor: GOLD, borderRadius: "2px" }} />
          <div style={{ fontFamily: monoFamily, fontSize: "20px", color: MUTED, letterSpacing: "3px", fontWeight: 500 }}>
            WEX ADVISORY
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: `${size}px`,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: `${-0.03 * size}px`,
            color: INK,
            maxWidth: title ? "1020px" : "900px",
            ...(title ? { wordBreak: "break-word" as const } : {}),
          }}
        >
          {headline}
        </div>

        {/* Sub */}
        <div style={{ fontSize: "26px", fontWeight: 500, color: MUTED, maxWidth: "760px", lineHeight: 1.4, marginTop: "28px" }}>
          {sub}
        </div>

        {/* Bottom row: hairline, then the domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "24px",
            borderTop: `1px solid ${GRID}`,
          }}
        >
          <div style={{ fontFamily: monoFamily, fontSize: "20px", color: MUTED, fontWeight: 500 }}>wexadvisory.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, ...(fonts.length ? { fonts } : {}) }
  );
}

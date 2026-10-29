import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Even padding on every table cell, first and last column included (the
// plugin zeroes those, which leaves text touching the table frame).
const cell = {
  paddingTop: "0.85rem",
  paddingBottom: "0.85rem",
  paddingInlineStart: "1rem",
  paddingInlineEnd: "1rem",
};
const tableCellPadding = {
  "thead th": cell,
  "thead th:first-child": cell,
  "thead th:last-child": cell,
  "tbody td, tfoot td": cell,
  "tbody td:first-child, tfoot td:first-child": cell,
  "tbody td:last-child, tfoot td:last-child": cell,
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Brand system (2026-10-29, Option B lock in aios refs.md): warm canvas,
      // navy ink, gold only on CTAs and selection. Mirrored as CSS variables on
      // :root in globals.css for the CSS modules. navy / navy-light /
      // gold-muted stay defined until Phase 2 converts the last dark pages.
      colors: {
        canvas: "#FBF8F1",
        band: "#F6EDD3",
        ink: "#0F1F3D",
        muted: "#5B6474",
        grid: "#E4DED0",
        selection: "#F3E3B0",
        paper: "#FFFDF8", // card fill, a shade lifted off the canvas
        chrome: "#F6F2E8", // window title bars, sheet headers and gutters
        gold: "#C8A84B",
        "gold-hover": "#D4B65C",
        navy: "#0F1F3D",
        "navy-light": "#1a3060",
        "gold-muted": "#a8893a",
      },
      fontFamily: {
        sans: ["var(--font-tight)", "system-ui", "sans-serif"],
        tight: ["var(--font-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        // Serif kept only for pages not yet converted (Phase 2 removes it).
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      // Brand type scale: Inter Tight 800, tight tracking. display = homepage
      // h1, title = inner-page h1, h2 = section headings, h2-sm = a heading in a
      // two-column block (a case, a form), h3 = card headings.
      fontSize: {
        display: ["clamp(2.6rem, 8.4vw, 5.4rem)", { lineHeight: "0.98", letterSpacing: "-0.035em", fontWeight: "800" }],
        title: ["clamp(2.3rem, 6vw, 4.2rem)", { lineHeight: "1.0", letterSpacing: "-0.032em", fontWeight: "800" }],
        h2: ["clamp(2rem, 4.6vw, 3.2rem)", { lineHeight: "1.03", letterSpacing: "-0.03em", fontWeight: "800" }],
        "h2-sm": ["clamp(1.75rem, 3.2vw, 2.4rem)", { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "800" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
      },
      // Long-form article styles (blog posts), used as `prose prose-invert`.
      // The invert palette is remapped to the site tokens so an article reads
      // as part of this site: gold links, DM Serif Display H2s, navy surfaces.
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-invert-body": "rgb(255 255 255 / 0.74)",
            "--tw-prose-invert-headings": "#ffffff",
            "--tw-prose-invert-lead": "rgb(255 255 255 / 0.8)",
            "--tw-prose-invert-links": "#C8A84B",
            "--tw-prose-invert-bold": "#ffffff",
            "--tw-prose-invert-counters": "#C8A84B",
            "--tw-prose-invert-bullets": "rgb(200 168 75 / 0.7)",
            "--tw-prose-invert-hr": "rgb(255 255 255 / 0.1)",
            "--tw-prose-invert-quotes": "rgb(255 255 255 / 0.9)",
            "--tw-prose-invert-quote-borders": "#C8A84B",
            "--tw-prose-invert-captions": "rgb(255 255 255 / 0.5)",
            "--tw-prose-invert-code": "#ffffff",
            "--tw-prose-invert-pre-code": "rgb(255 255 255 / 0.85)",
            "--tw-prose-invert-pre-bg": "#071220",
            "--tw-prose-invert-th-borders": "rgb(255 255 255 / 0.18)",
            "--tw-prose-invert-td-borders": "rgb(255 255 255 / 0.08)",
            lineHeight: "1.75",
            a: {
              fontWeight: "500",
              textDecorationColor: "rgb(200 168 75 / 0.45)",
              textUnderlineOffset: "4px",
              "&:hover": { textDecorationColor: "#C8A84B" },
            },
            h2: {
              fontFamily: "var(--font-display), Georgia, serif",
              fontWeight: "400",
              letterSpacing: "0",
              lineHeight: "1.2",
            },
            h3: { fontWeight: "700", lineHeight: "1.35" },
            blockquote: {
              fontStyle: "normal",
              fontWeight: "400",
              backgroundColor: "rgb(255 255 255 / 0.04)",
              borderLeftWidth: "2px",
              borderRadius: "0 0.75rem 0.75rem 0",
              padding: "0.25rem 1.5rem",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            code: {
              fontWeight: "500",
              backgroundColor: "rgb(255 255 255 / 0.08)",
              borderRadius: "0.375rem",
              padding: "0.15em 0.4em",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            "pre code": { backgroundColor: "transparent", padding: "0" },
            pre: { border: "1px solid rgb(255 255 255 / 0.08)", borderRadius: "0.75rem" },
            // Tables sit inside a scroll wrapper (see blog/[slug]/page.tsx),
            // so the wrapper owns the margin and the table can be wider than
            // a phone without pushing the page sideways.
            table: { marginTop: "0", marginBottom: "0", minWidth: "32rem" },
            thead: { backgroundColor: "rgb(255 255 255 / 0.05)" },
            ...tableCellPadding,
            "thead th": {
              ...cell,
              color: "#C8A84B",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            },
          },
        },
        // prose-lg resets cell padding and header size, so repeat them for
        // the desktop size.
        lg: { css: { ...tableCellPadding, "thead th": { ...cell, fontSize: "0.75rem" } } },
      },
    },
  },
  plugins: [typography],
};
export default config;

import { Inter_Tight, JetBrains_Mono } from "next/font/google";

// Art-direction lab, Hybrid (2026-10-29, branch art-direction-lab): Option B's
// system everywhere, plus Option A's agent thread (homepage case) and Option
// C's covers (/products). Loads B's two fonts under B's CSS variable names so
// the B stylesheet works unchanged on both hybrid pages. Never merge to master.
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--labb-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--labb-mono",
});

export default function HybridLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${mono.variable}`}>{children}</div>;
}

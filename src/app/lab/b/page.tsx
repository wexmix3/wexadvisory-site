import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import LabBPage from "@/components/lab/b/LabBPage";

// Art-direction lab, Option B "The sheet sorts itself" (2026-10-29, branch
// art-direction-lab). Local comparison page only; never merge to master.
export const metadata: Metadata = {
  title: "Lab B · Wex Advisory",
  robots: { index: false, follow: false },
};

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

export default function LabB() {
  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <LabBPage />
    </div>
  );
}

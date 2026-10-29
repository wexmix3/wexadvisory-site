import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import LabC from "@/components/lab/c/LabC";

// Art-direction lab, Option C "Systems on the shelf" (2026-10-29, branch
// art-direction-lab). Local comparison page only; never merge to master.
// Archivo is loaded as a variable font with the width axis so cover titles can
// run condensed (wdth 62) at weight 800 while the UI stays at 500.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-lab-c",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab C · Wex Advisory",
  robots: { index: false, follow: false },
};

export default function LabCPage() {
  return (
    <div className={archivo.variable}>
      <LabC />
    </div>
  );
}

import type { Metadata } from "next";
import HybridPage from "@/components/lab/hybrid/HybridPage";

// Hybrid homepage: Option B's page with the RECO case rebuilt around Option A's
// agent thread (redrawn in B's palette). Local comparison page only.
export const metadata: Metadata = {
  title: "Lab Hybrid · Wex Advisory",
  robots: { index: false, follow: false },
};

export default function LabHybrid() {
  return <HybridPage />;
}

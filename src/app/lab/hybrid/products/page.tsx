import type { Metadata } from "next";
import HybridProducts from "@/components/lab/hybrid/HybridProducts";

// Hybrid /products: B's heading, then Option C's shelf of covers on B's canvas,
// then a plain scannable list of the same products. Local comparison page only.
export const metadata: Metadata = {
  title: "Lab Hybrid Products · Wex Advisory",
  robots: { index: false, follow: false },
};

export default function LabHybridProducts() {
  return <HybridProducts />;
}

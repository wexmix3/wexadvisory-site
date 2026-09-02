import type { Metadata } from "next";
import AuditSurface from "./AuditSurface";

export const metadata: Metadata = {
  title: "Free AI Opportunity Audit — Wex Advisory",
  description:
    "Watch a real AI audit run on a real business — quantified savings, labor math, ranked automation opportunities. Then run your own, free. PDF in minutes.",
  // Preview route: flip to index:true when this graduates to /audit.
  robots: { index: false, follow: false },
};

export default function AuditV2Page() {
  return <AuditSurface />;
}

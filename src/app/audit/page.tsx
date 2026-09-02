import type { Metadata } from "next";
import AuditSurface from "./AuditSurface";

export const metadata: Metadata = {
  title: "Free AI Opportunity Audit — Wex Advisory",
  description:
    "Watch a real AI audit run on a real business — quantified savings, labor math, ranked automation opportunities. Then run your own, free. PDF in minutes.",
  alternates: {
    canonical: "https://www.wexadvisory.com/audit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free AI Opportunity Audit — Wex Advisory",
    description:
      "Watch a real AI audit run on a real business, then run your own, free. PDF in minutes.",
    url: "https://www.wexadvisory.com/audit",
    siteName: "Wex Advisory",
    type: "website",
  },
};

export default function AuditPage() {
  return <AuditSurface />;
}

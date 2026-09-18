import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Retired preview route: it redirects, but keep it out of the index in case
// the redirect is ever removed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// This preview's content graduated to the real "/audit" route on 2026-09-02.
// Redirecting rather than deleting, since this URL was shared during review
// (same pattern as homepage-v3's redirect).
export default function AuditV2Redirect() {
  redirect("/audit");
}

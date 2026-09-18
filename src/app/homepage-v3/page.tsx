import type { Metadata } from "next";
import { redirect } from "next/navigation";

// Retired preview route: it redirects, but keep it out of the index in case
// the redirect is ever removed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// This pilot's content graduated to the real "/" route 2026-08-28.
// Redirecting rather than deleting outright, since this URL was shared in
// review links during the build (same pattern as homepage-v2's redirect).
export default function HomepageV3Redirect() {
  redirect("/");
}

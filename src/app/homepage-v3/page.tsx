import { redirect } from "next/navigation";

// This pilot's content graduated to the real "/" route 2026-08-28.
// Redirecting rather than deleting outright, since this URL was shared in
// review links during the build (same pattern as homepage-v2's redirect).
export default function HomepageV3Redirect() {
  redirect("/");
}

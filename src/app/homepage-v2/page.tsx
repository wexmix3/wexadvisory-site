import { redirect } from "next/navigation";

// This pilot's content graduated to the real "/" route. Redirecting rather
// than deleting outright, since this URL was shared in review links/PRs.
export default function HomepageV2Redirect() {
  redirect("/");
}

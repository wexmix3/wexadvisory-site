import type { Metadata } from "next";

// Retired preview route (permanent redirect in page.tsx). No title of its
// own: it never renders. Kept out of the index in case the redirect is removed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomepageV2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

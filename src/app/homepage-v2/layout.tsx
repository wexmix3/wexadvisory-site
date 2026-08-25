import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wex Advisory — Homepage Redesign Pilot",
  robots: { index: false, follow: false },
};

export default function HomepageV2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

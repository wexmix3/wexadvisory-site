import type { Metadata } from "next";
import "./scrollcraft.css";

export const metadata: Metadata = {
  title: "Wex Advisory — Homepage Preview (v2)",
  robots: { index: false, follow: false },
};

export default function HomepageV2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

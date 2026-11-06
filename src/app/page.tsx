import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealScope from "@/components/brand/RevealScope";
import HomeHero from "@/components/home/HomeHero";
import ProblemPicker from "@/components/home/ProblemPicker";
import Cases from "@/components/home/Cases";
import Pricing from "@/components/home/Pricing";
import Close from "@/components/home/Close";

// Homepage, built from the brand primitives in src/components/brand (2026-10-29
// brand redesign). Since the 2026-11-06 trim (Max: "feels busy, reads like
// essays") it is five sections: hero (sample sheet feeding a dashboard and the
// agents' queue) -> three problems (the one gold band) -> RECO proof with the
// real blurred dashboard and measured strip, 25N one line (past tense) ->
// three-line pricing -> founder letter, one booking button and the folded
// contact form. Section ids: #services, #work, #case-reco, #case-25n, #pricing,
// #contact, #about (the letter). How it works and the audit card left (both
// live on /solutions and /audit); the FAQ moved to /faq 2026-10-30.
// Earlier history: 2026-10-16 wireframe rebuild; 2026-10-29 Tenex teardown cut
// the homepage to one buyer (owner-led businesses; widened from consumer brands 2026-10-29, Max's call), RECO as lead proof.
export const metadata: Metadata = {
  title: "AI Automation for Growing Businesses | Wex Advisory",
  description:
    "Dashboards, reporting and AI agents for owner-led businesses, from consumer brands to service firms. Free for 30 days, then $1,000 setup and $300 a month.",
  alternates: { canonical: "https://www.wexadvisory.com" },
  openGraph: {
    title: "AI Automation for Growing Businesses | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led businesses: consumer brands, service firms, property managers and more. Free for 30 days, then $1,000 setup and $300 a month.",
    url: "https://www.wexadvisory.com",
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Wex Advisory | AI Automation for Growing Businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Growing Businesses | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led businesses: consumer brands, service firms, property managers and more. Free for 30 days, then $1,000 setup and $300 a month.",
    images: ["/api/og"],
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <HomeHero />
          <ProblemPicker />
          <Cases />
          <Pricing />
          <Close />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}

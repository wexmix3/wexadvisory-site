import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/homepage-v3/Hero";
import Methodology from "@/components/homepage-v3/Methodology";
import ClientsMarquee from "@/components/homepage-v3/ClientsMarquee";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import FAQ from "@/components/FAQ";
import CloseSection from "@/components/homepage-v3/CloseSection";

// Preview route for the 2026-08-28 homepage redesign
// (docs/superpowers/specs/2026-08-28-homepage-v3-redesign-design.md).
// Order: hero hooks -> Methodology sets expectations -> ClientsMarquee
// teases proof -> CaseStudies delivers the detailed proof -> ToolsShowcase
// -> AuditHighlight asks -> FAQ handles objections -> CloseSection closes.
// Not linked from nav; review at /homepage-v3 directly. Swaps into "/"
// only after approval (see spec's Rollout section).
export default function HomepageV3Preview() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <Methodology />
        </ScrollReveal>
        <ScrollReveal>
          <ClientsMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal>
          <ToolsShowcase />
        </ScrollReveal>
        <ScrollReveal>
          <AuditHighlight />
        </ScrollReveal>
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal>
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

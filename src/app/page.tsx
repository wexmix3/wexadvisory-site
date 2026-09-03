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

// homepage-v3 redesign graduated to the real "/" route 2026-08-28 (see
// docs/superpowers/specs/2026-08-28-homepage-v3-redesign-design.md and
// state/worksheets/homepage-v3-redesign-2026-08-28.md in aios). Order:
// hero hooks -> Methodology sets expectations -> ClientsMarquee teases
// proof -> CaseStudies delivers the detailed proof -> ToolsShowcase ->
// AuditHighlight asks -> FAQ handles objections -> CloseSection closes.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load.
            Variants below are deliberately varied per section (see ScrollReveal.tsx) so the
            page doesn't read as one uniform fade-up repeated eight times — 2026-09-02. */}
        <Hero />
        <ScrollReveal variant="up">
          <Methodology />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <ClientsMarquee />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal variant="left">
          <ToolsShowcase />
        </ScrollReveal>
        <ScrollReveal variant="right">
          <AuditHighlight />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <FAQ />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

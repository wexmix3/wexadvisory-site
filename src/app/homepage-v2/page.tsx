import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AuditCTA from "@/components/AuditCTA";
import HeroLoop from "@/components/homepage-v2/HeroLoop";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import HowWeWork from "@/components/homepage-v2/HowWeWork";
import CloseSection from "@/components/homepage-v2/CloseSection";

export default function HomepageV2() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <HeroLoop />
        {/* AI Audit surfaced right after the hero — it's the primary lead-gen tool, needs top-of-page visibility */}
        <ScrollReveal>
          <AuditCTA />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal>
          <ToolsShowcase />
        </ScrollReveal>
        <ScrollReveal>
          <HowWeWork />
        </ScrollReveal>
        <ScrollReveal>
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

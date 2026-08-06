import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Flagship from "@/components/Flagship";
import SupportingTier from "@/components/SupportingTier";
import SampleReport from "@/components/SampleReport";
import CaseStudy from "@/components/CaseStudy";
import AboutFounder from "@/components/AboutFounder";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero renders above the fold — no reveal wrapper so it's visible immediately on load */}
        <Hero />
        <ProofStrip />
        <ScrollReveal><Flagship /></ScrollReveal>
        <ScrollReveal><SupportingTier /></ScrollReveal>
        <ScrollReveal><SampleReport /></ScrollReveal>
        <ScrollReveal><CaseStudy /></ScrollReveal>
        <ScrollReveal><AboutFounder /></ScrollReveal>
        <ScrollReveal><FAQ /></ScrollReveal>
        <ScrollReveal><ContactForm /></ScrollReveal>
      </main>
      <Footer />
    </>
  );
}

import PageHero from "@/components/brand/PageHero";
import { CALENDLY, HERO } from "./content";

// 2026-10-29 brand pass: the shared PageHero (was a navy hero with a gold
// gradient accent line). Copy unchanged.
export default function ReportingHero() {
  return (
    <PageHero
      align="center"
      eyebrow={HERO.eyebrow}
      title={
        <>
          {HERO.h1}
          <br />
          {HERO.h1Accent}
        </>
      }
      subhead={HERO.sub}
      primary={{ href: CALENDLY, label: "Book a 30-minute call", external: true }}
      secondary={{ href: "#send-a-report", label: "Send me one report" }}
      proof={
        <>
          Free · 30 minutes · no pitch
          <br />
          {HERO.proof}
        </>
      }
    />
  );
}

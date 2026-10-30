import FounderLetter from "@/components/brand/FounderLetter";

// Homepage founder block, rendered inside the Close section under the booking
// CTA: Max's signed letter (2026-10-30 imagery pick, B + C). The full story
// lives on /about; the landing pages use AboutFounder.tsx. id="about" is a
// legacy anchor.
export default function Founder() {
  return (
    <div className="border-t border-ink/10 pt-8">
      <FounderLetter id="about" />
    </div>
  );
}

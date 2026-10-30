import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";

// The "How I help" pair: the free audit and the scoped build, each with a
// mono terms line and one quiet link. The body can carry inline links.
export type Offer = { title: string; terms: string; body: React.ReactNode; href: string; cta: string };

export default function OfferCards({ offers }: { offers: Offer[] }) {
  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-2">
      {offers.map((o) => (
        <Card as="li" key={o.title} padding="lg" className="flex flex-col">
          <h3 className="text-h3 text-ink">{o.title}</h3>
          <p className="mt-2 font-mono text-[12.5px] text-muted">{o.terms}</p>
          <p className="mt-4 text-[15.5px] leading-relaxed">{o.body}</p>
          <div className="mt-auto pt-4">
            <Button href={o.href} variant="quiet">
              {o.cta}
            </Button>
          </div>
        </Card>
      ))}
    </ul>
  );
}

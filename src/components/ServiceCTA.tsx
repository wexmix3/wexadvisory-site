const AUDIT_URL = "https://audit.wexadvisory.com/audit";

export default function ServiceCTA({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <section className="bg-gold py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{heading}</h2>
        <p className="text-navy/65 text-base leading-relaxed mb-8">{subheading}</p>
        <a
          href={AUDIT_URL}
          className="inline-block bg-navy hover:bg-navy-light text-gold font-bold text-base px-10 py-4 rounded-xl
            transition-all duration-150 hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]"
        >
          Analyze My Business →
        </a>
        <div className="mt-8 border-t border-navy/20 pt-6">
          <p className="text-navy/50 text-sm mb-3">Prefer to talk first?</p>
          <a
            href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy/70 hover:text-navy font-semibold text-sm underline underline-offset-4 transition-colors"
          >
            Book a free 30-min strategy call →
          </a>
        </div>
      </div>
    </section>
  );
}

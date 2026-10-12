import type { PostFaqItem } from "@/lib/blog";

// Props-driven FAQ for blog posts. A server component with every answer always
// visible, so the answers are in the HTML crawlers and AI engines fetch. The
// post page builds its FAQPage JSON-LD from the same array passed in here.
export default function PostFaq({ faqs }: { faqs: PostFaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-[#0a1a30] py-20 px-6" aria-labelledby="post-faq-heading">
      <div className="max-w-[37rem] mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
        <h2 id="post-faq-heading" className="text-3xl md:text-4xl font-bold text-white mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
              <h3 className="text-white font-semibold text-lg mb-2">{f.q}</h3>
              <p className="text-white/65 text-base leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

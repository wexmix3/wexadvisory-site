import Image from "next/image";

// Compact author box for blog posts. AboutFounder is a full-width section that
// reads too heavy under an article, so posts use this.
export default function PostAuthor() {
  return (
    <section className="bg-[#071220] py-16 px-6" aria-labelledby="post-author-heading">
      <div className="max-w-[37rem] mx-auto">
        <div className="bg-white/[0.04] rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 sm:items-center">
          <Image
            src="/headshot.jpg"
            alt="Max Wexley"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover object-top flex-shrink-0"
          />
          <div>
            <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">Written by</p>
            <h2 id="post-author-heading" className="text-white text-xl font-bold mb-2">
              Max Wexley
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-3">
              Founder of Wex Advisory in New York City, University of Michigan 2024, with a background
              in finance. I build AI automation, dashboards and reporting systems for small and
              mid-sized businesses, and I scope, build and support every project myself.
            </p>
            <p className="text-sm">
              <a
                href="https://www.linkedin.com/in/max-wexley"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                LinkedIn
              </a>
              <span className="text-white/50 mx-3">/</span>
              <a
                href="https://x.com/wexadvisory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                X
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

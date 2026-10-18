import Image from "next/image";

export default function AboutFounder() {
  return (
    <section id="about" className="bg-[#071220] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Who you&apos;ll work with
        </h2>

        <div className="bg-white/[0.04] rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Photo */}
            <div className="md:w-56 flex-shrink-0">
              <div className="relative w-full h-64 md:h-full min-h-[240px]">
                <Image
                  src="/headshot.jpg"
                  alt="Max Wexley"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 px-8 py-8 flex flex-col justify-center">
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Founder
              </p>
              <h3 className="text-white text-2xl font-bold mb-1">Max Wexley</h3>
              <p className="text-white/60 text-sm mb-5">New York City</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                I&apos;m Max Wexley, the founder of Wex Advisory, based in New York City. I studied at
                the University of Michigan (class of 2024) and come from a background in finance.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                I build AI automation, dashboards and reporting systems for small and mid-sized
                businesses. I scope, build and support every project personally, so you always talk to
                the person who built your system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

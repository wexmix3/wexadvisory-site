import styles from "./ClientsMarquee.module.css";

const CLIENTS = ["25N Coworking", "RECO"];
// Duplicated once so the loop is seamless — the track scrolls exactly
// -50% (one full copy's width), then resets invisibly.
const LOOP = [...CLIENTS, ...CLIENTS];

export default function ClientsMarquee() {
  return (
    <section className="bg-[#0A1226] py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-8 text-center">
          Built by builders, trusted by operators
        </p>
        <div className={styles.marquee}>
          <div className={styles.track}>
            {LOOP.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-white/40 text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap px-10"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

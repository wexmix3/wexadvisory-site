import styles from "./ClientsMarquee.module.css";

const CLIENTS = ["25N Coworking", "RECO"];
// Repeated so one half of LOOP exceeds any realistic viewport width —
// with only 2 short names, a single duplication left the track narrower
// than the container, causing a visible blank gap mid-cycle. LOOP must
// stay exactly two copies of the same base sequence so the CSS's
// translateX(-50%) reset lands seamlessly.
const BASE = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];
const LOOP = [...BASE, ...BASE];

export default function ClientsMarquee() {
  return (
    <section className="bg-[#0A1226] py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-8 text-center">
          Built by builders, trusted by operators
        </p>
        <p className="sr-only">Clients: {CLIENTS.join(", ")}</p>
        <div className={styles.marquee} aria-hidden="true">
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

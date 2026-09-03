import Image from "next/image";
import styles from "./ClientsMarquee.module.css";

const CLIENTS = [
  { name: "25N Coworking", logo: "/25n-logo.png", width: 130, height: 25 },
  { name: "RECO", logo: "/reco-logo.png", width: 108, height: 21 },
];
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
        <p className="sr-only">Clients: {CLIENTS.map((c) => c.name).join(", ")}</p>
        <div className={styles.marquee} aria-hidden="true">
          <div className={styles.track}>
            {LOOP.map((client, i) => (
              <Image
                key={`${client.name}-${i}`}
                src={client.logo}
                alt=""
                width={client.width}
                height={client.height}
                className="opacity-40 hover:opacity-70 transition-opacity grayscale brightness-0 invert px-10"
                style={{ width: "auto", height: client.height }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

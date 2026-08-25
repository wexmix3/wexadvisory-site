export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
      {children}
    </p>
  );
}

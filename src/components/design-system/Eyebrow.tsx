import BrandEyebrow from "@/components/brand/Eyebrow";

// Legacy export, re-skinned onto brand/Eyebrow (2026-10-29). New code: import
// the brand one directly.
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return <BrandEyebrow>{children}</BrandEyebrow>;
}

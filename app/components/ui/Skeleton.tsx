// components/ui/Skeleton.tsx
export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/10 ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[#f1dc7f33] to-transparent" />
    </div>
  );
}
export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-[#2A2A2A]/30 rounded ${className}`} />;
}
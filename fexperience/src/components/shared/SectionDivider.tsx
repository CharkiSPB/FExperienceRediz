type SectionDividerProps = {
  className?: string;
  color?: 'accent' | 'border';
  direction?: 'up' | 'down';
};

export function SectionDivider({ className = '', color = 'border', direction = 'down' }: SectionDividerProps) {
  const fillClass = color === 'accent' ? 'text-[#F7931A]/10' : 'text-[#2A2A2A]/40';
  const flip = direction === 'up' ? 'rotate-180' : '';

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-full h-6 md:h-10 lg:h-12 ${fillClass} ${flip}`}
        aria-hidden="true"
      >
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 V80 H0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
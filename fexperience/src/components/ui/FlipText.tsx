'use client';

type FlipTextProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Эффект «переворачивающейся грани» — текст уезжает вверх,
 * а на его место заезжает тот же текст снизу.
 * Использовать с group на родительском элементе (Link/button).
 */
export function FlipText({ children, className = '' }: FlipTextProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden align-middle leading-none h-[1em] ${className}`}
    >
      {/* Видимый слой — уезжает вверх при hover */}
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
      {/* Невидимый слой снизу — заезжает на место при hover */}
      <span className="absolute inset-x-0 top-[calc(100%+1px)] block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

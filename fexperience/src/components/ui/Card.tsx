import { cn } from '@/lib/utils';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('bg-bg-card rounded-xl p-6 border border-[#2A2A2A]/50', className)} {...props}>
      {children}
    </div>
  );
}
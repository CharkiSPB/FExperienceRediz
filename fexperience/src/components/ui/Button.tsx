import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] shadow-lg shadow-[#F7931A]/20',
    secondary: 'bg-bg-card border border-[#2A2A2A] text-white hover:bg-white/5',
    ghost: 'bg-transparent text-[#A0A0A0] hover:text-white',
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
import Image from 'next/image';
import { partners } from '@/data/partner';
import { config } from '@/data/config';

export function PartnerBlock({ variant = 'section' }: { variant?: 'header' | 'section' }) {
  if (!config.partnerBlock.pageVisible) return null;
  const general = partners.find(p => p.role === 'general');
  if (!general) return null;

  if (variant === 'header') {
    return (
      <div className="flex items-center justify-center gap-4 py-4 border-b border-[#2A2A2A]/50">
        <span className="text-sm text-[#A0A0A0]">{general.headerLabel}</span>
        <a href={general.website} target="_blank" rel="noopener noreferrer" className="inline-block relative h-10 w-32">
          <Image src={general.logo} alt={general.name} fill className="object-contain hover:opacity-80 transition-opacity" />
        </a>
      </div>
    );
  }

  return (
    <section className="py-12 border-b border-[#2A2A2A]/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-[#A0A0A0] text-sm uppercase tracking-wider mb-4">{general.mainLabel}</p>
        <a href={general.website} target="_blank" rel="noopener noreferrer" className="inline-block relative h-20 w-48 mx-auto hover:opacity-80 transition-opacity mb-4">
          <Image src={general.logo} alt={general.name} fill className="object-contain" />
        </a>
        <p className="text-white/80 max-w-xl mx-auto">{general.description}</p>
      </div>
    </section>
  );
}
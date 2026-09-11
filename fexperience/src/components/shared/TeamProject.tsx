'use client';
import { config } from '@/data/config';
import Link from 'next/link';
import Image from 'next/image';

export function TeamProject({ className = '' }: { className?: string }) {
  if (!config.hero.teamProject.enabled) return null;

  const { label, logo, website } = config.hero.teamProject;

  // Изменено на flex-col: текст сверху, логотип снизу
  const content = (
    <div className={`flex flex-col items-start gap-1.5 ${className}`}>
      <span className="text-[#A0A0A0] text-[10px] uppercase tracking-widest font-medium">
        {label}
      </span>
      {logo && (
        <div className="relative h-7 w-24">
          <Image 
            src={logo} 
            alt="Логотип проекта" 
            fill
            className="object-contain brightness-0 invert opacity-90" 
          />
        </div>
      )}
    </div>
  );

  return website ? (
    <Link href={website} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity block">
      {content}
    </Link>
  ) : content;
}
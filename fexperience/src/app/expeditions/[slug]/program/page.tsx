import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import { programs } from '@/data/program';
import { expeditions } from '@/data/expeditions';
import { config } from '@/data/config';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const expedition = expeditions.find(e => e.slug === slug);
  
  if (!expedition) {
    return {
      title: 'Программа не найдена | FExperience',
    };
  }

  return {
    title: `Программа экспедиции в ${expedition.country} | FExperience`,
    description: `Детальная программа по дням бизнес-экспедиции в ${expedition.country}. Бизнес-сессии, встречи, культурная программа.`,
    alternates: {
      canonical: `${config.site.url}/expeditions/${slug}/program`,
    },
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const expedition = expeditions.find(e => e.slug === slug);
  
  // Получаем программу по slug программы из экспедиции
  const programSlug = expedition?.programSlug || slug;
  const program = programs[programSlug];
  
  if (!expedition || !program) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#0D0805]">
      {/* Hero с затемнением */}
      <div className="relative h-[30vh] md:h-[40vh] bg-[#1A1A1A] z-10">
        <Image
          src={expedition.image}
          alt={expedition.title}
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0805] via-[#0D0805]/80 to-transparent" />
        
        {/* Кнопка "Назад" */}
        <div className="absolute top-0 left-0 w-full z-[60] pt-24 md:pt-28 px-4 md:px-8">
          <Link
            href={`/expeditions/${slug}`}
            className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group bg-[#0D0805]/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#2A2A2A]/50"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Назад к экспедиции</span>
          </Link>
        </div>

        {/* Заголовок программы */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7931A]/10 text-[#F7931A] rounded-full text-sm font-medium mb-4">
              <CalendarDays className="w-4 h-4" />
              {expedition.dates}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Программа экспедиции в {expedition.country}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Инфо-блок */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-12 pb-8 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2 text-[#A0A0A0]">
            <Clock className="w-4 h-4" />
            <span>{program.length} дней</span>
          </div>
          <div className="flex items-center gap-2 text-[#A0A0A0]">
            <CalendarDays className="w-4 h-4" />
            <span>{expedition.dates}</span>
          </div>
          <div className="text-[#A0A0A0]">
            {expedition.country}
          </div>
        </div>

        {/* Программа по дням */}
        <div className="space-y-8">
          {program.map((day, index) => (
            <div 
              key={day.day} 
              className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Изображение дня */}
                <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-[#1A1A1A]">
                  <Image
                    src={day.image}
                    alt={`День ${day.day}: ${day.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
                
                {/* Контент */}
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#F7931A]/10 text-[#F7931A] rounded-full text-sm font-medium">
                      День {day.day}
                    </span>
                    {index < program.length - 1 && (
                      <div className="h-px flex-1 bg-[#2A2A2A]" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-white mb-3">
                    {day.title.toUpperCase().replace(/\.( |$)/g, ' · ').replace(/ · $/, '')}
                  </h3>
                  
                  <p className="text-[#A0A0A0] mb-6 leading-relaxed">
                    {day.description.split('|').map((part, i) => (
                      <span key={i}>
                        {part.trim()}
                        {i < day.description.split('|').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  
                  {/* Расписание */}
                  {/* <div className="space-y-3">
                    {day.schedule.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex gap-4 text-sm group"
                      >
                        <span className="text-[#F7931A] font-medium min-w-[70px] font-mono">
                          {item.time}
                        </span>
                        <span className="text-[#D0D0D0] group-hover:text-white transition-colors">
                          {item.event}
                        </span>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA после программы */}
        {/* <div className="mt-16 p-8 bg-[#110F0D] border border-[#2A2A2A] rounded-xl text-center">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">
            Готовы стать участником?
          </h3>
          <p className="text-[#A0A0A0] mb-6">
            Оставьте заявку, и наш эксперт свяжется с вами для обсуждения деталей участия.
          </p>
          <Link
            href={`/consultation?expedition=${slug}`}
            className="inline-block bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white px-8 py-3 rounded-lg font-medium hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20"
          >
            Оставить заявку
          </Link>
        </div> */}
      </div>
    </article>
  );
}
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, MapPin } from 'lucide-react';
import { speakers } from '@/data/speakers';
import { expeditions } from '@/data/expeditions';

export default function SpeakersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Состояние фильтра (экспедиции)
  // Инициализируем из URL параметра ?expedition=...
  const [activeFilter, setActiveFilter] = useState(() => {
    return searchParams.get('expedition') || 'all';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Обновляем URL при смене фильтра (для красивых ссылок и закладок)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeFilter && activeFilter !== 'all') {
      params.set('expedition', activeFilter);
    } else {
      params.delete('expedition');
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [activeFilter]);

  // Список уникальных экспедиций для вкладок
  const availableExpeditions = useMemo(() => {
    const exps = new Set(
      speakers.flatMap(s => s.expeditionSlugs || []).filter(Boolean)
    );
    return ['all', ...Array.from(exps)];
  }, []);

  // Логика фильтрации
  const filteredSpeakers = useMemo(() => {
    return speakers.filter(speaker => {
      const matchesExpedition = activeFilter === 'all' || speaker.expeditionSlugs?.includes(activeFilter);
      const matchesSearch = searchQuery === '' ||
        speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (speaker.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      return matchesExpedition && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Получаем название экспедиции для заголовка вкладки
  const getExpeditionLabel = (slug: string) => {
    if (slug === 'all') return 'Все спикеры';
    const exp = expeditions.find(e => e.slug === slug);
    return exp?.country || slug;
  };

  return (
    <section className="min-h-screen bg-[#0D0805] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Кнопка Назад (с отступом сверху) */}
      <div className="mb-8">
        <Link
          href="/expeditions"
          className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Назад к экспедициям
        </Link>
      </div>

      {/* Заголовок */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-8">
        Эксперты и спикеры
      </h1>

      {/* Панель управления: Поиск + Вкладки */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        {/* Поиск */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Поиск по имени, компании или теме..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#110F0D] border border-[#2A2A2A] rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A] transition-colors"
          />
        </div>

        {/* Вкладки (Экспедиции) */}
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
          {availableExpeditions.map((exp) => (
            <button
              key={exp}
              onClick={() => setActiveFilter(exp)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeFilter === exp
                  ? 'bg-[#F7931A] text-white shadow-lg shadow-[#F7931A]/20'
                  : 'bg-[#110F0D] text-[#A0A0A0] border border-[#2A2A2A] hover:text-white hover:border-[#A0A0A0]'
              }`}
            >
              {getExpeditionLabel(exp)}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка спикеров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSpeakers.map((speaker, index) => (
            <motion.article
              key={speaker.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#110F0D] border border-[#2A2A2A] rounded-xl overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#000000]/50 transition-all duration-300 flex flex-col"
            >
              {/* Фото */}
              <div className="relative w-full aspect-[3/4] bg-[#1A1A1A]">
                <Image
                  src={speaker.photo}
                  alt={speaker.photoAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {speaker.isTop && (
                  <span className="absolute top-3 right-3 bg-[#F7931A] text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                    TOP
                  </span>
                )}
              </div>

              {/* Контент */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                  {speaker.name}
                </h3>
                <p className="text-[#F7931A] text-sm font-medium mb-1">
                  {speaker.role}
                </p>
                <p className="text-[#A0A0A0] text-sm mb-4">
                  {speaker.company}
                </p>

                <div className="mt-auto space-y-3 pt-4 border-t border-[#2A2A2A]">
                  {speaker.topic && (
                    <div>
                      <p className="text-[10px] text-[#666666] uppercase tracking-wider mb-1">Тема</p>
                      <p className="text-white text-xs leading-relaxed line-clamp-2">
                        {speaker.topic}
                      </p>
                    </div>
                  )}
                  {speaker.achievement && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#F7931A] mt-0.5 flex-shrink-0" />
                      <p className="text-white text-xs leading-relaxed">
                        {speaker.achievement}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Пустое состояние */}
      {filteredSpeakers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-[#A0A0A0]"
        >
          <p className="text-xl mb-4">Спикеры не найдены</p>
          <button
            onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
            className="text-[#F7931A] hover:underline transition-colors"
          >
            Сбросить фильтры
          </button>
        </motion.div>
      )}
    </section>
  );
}
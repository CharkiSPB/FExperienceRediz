'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ArticlesGrid from './ArticlesGrid';

const REGIONS = [
  { slug: 'all', label: 'Все регионы' },
  // { slug: 'south-africa', label: 'ЮАР' },
  // { slug: 'марокко', label: 'Марокко' },
  { slug: 'африка', label: 'Африка' },
  // { slug: 'вьетнам', label: 'Вьетнам' },
  // { slug: 'индия', label: 'Индия' },
  // { slug: 'thailand', label: 'Таиланд' },
  // { slug: 'brazil', label: 'Бразилия' },
  { slug: 'прочее', label: 'Прочее' },
];

type ArticlesFiltersProps = {
  currentRegion: string;
  allArticles: Array<{
    slug: string;
    title: string;
    excerpt: string;
    image?: string;
    date: string;
    region?: string;
  }>;
};

export default function ArticlesFilters({ 
  currentRegion, 
  allArticles 
}: ArticlesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeRegion = searchParams.get('region') || currentRegion || 'all';

  const handleFilterChange = (slug: string) => {
  const params = new URLSearchParams(searchParams.toString());
  
  if (slug === 'all') {
    params.delete('region'); // Удаляем параметр, чтобы вернуться к значению по умолчанию
  } else {
    params.set('region', slug);
  }
  
  // Обновляем URL без перезагрузки страницы
  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};

  // Фильтрация на клиенте для мгновенного отклика
  const displayedArticles = activeRegion && activeRegion !== 'all'
    ? allArticles.filter(article => article.region === activeRegion)
    : allArticles;

  return (
    <>
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-12">
        {REGIONS.map((regionItem) => (
          <button
            key={regionItem.slug}
            onClick={() => handleFilterChange(regionItem.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeRegion === regionItem.slug
                ? 'bg-brand-600 text-white'
                : 'bg-white/60 border border-[var(--color-border)] text-text-secondary hover:text-text-primary hover:border-text-tertiary'
            }`}
          >
            {regionItem.label}
          </button>
        ))}
      </div>

      {/* Сетка статей */}
      <ArticlesGrid articles={displayedArticles} />
    </>
  );
}
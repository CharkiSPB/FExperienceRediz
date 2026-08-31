'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  cover?: string;
  category?: string; // Убедитесь, что это поле есть в frontmatter статей
};

type ArticlesListProps = {
  articles: Article[];
};

export function ArticlesList({ articles }: ArticlesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Собираем все уникальные категории из статей
  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category).filter((cat): cat is string => !!cat));
    return ['all', ...Array.from(cats)];
  }, [articles]);

  // Фильтрация статей
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Панель управления: Поиск + Фильтры */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Поиск */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Поиск по статьям..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#110F0D] border border-[#2A2A2A] rounded-lg py-3 pl-10 pr-4 text-white placeholder-[#666666] focus:outline-none focus:border-[#F7931A] transition-colors"
          />
        </div>

        {/* Фильтры категорий */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#F7931A] text-white'
                  : 'bg-[#110F0D] text-[#A0A0A0] hover:bg-[#2A2A2A] hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка статей */}
      {filteredArticles.length === 0 ? (
        <p className="text-[#A0A0A0] text-center py-12">Ничего не найдено</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#F7931A] transition-colors"
            >
              {article.cover && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-[#1A1A1A]">
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
              )}
              {/* Бейдж категории */}
              {article.category && (
                <span className="inline-block px-2 py-1 bg-[#F7931A]/10 text-[#F7931A] text-xs rounded mb-3">
                  {article.category}
                </span>
              )}
              <h2 className="text-xl font-bold text-white group-hover:text-[#F7931A] transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-[#A0A0A0] text-sm mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#666666]">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>{article.readingTime}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
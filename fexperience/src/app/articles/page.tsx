import Link from 'next/link';
import { getArticles } from '@/lib/mdx';
import ArticlesFilters from './ArticlesFilters';

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;
  const allArticles = await getArticles();

  return (
    <section className="min-h-screen bg-canvas py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="about-breadcrumbs" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          {' / '}
          <span aria-current="page">Статьи</span>
        </nav>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-8">
          Статьи и аналитика
        </h1>
        
        {/* Клиентский компонент фильтров */}
        <ArticlesFilters 
          currentRegion={region || 'all'}
          allArticles={allArticles}
        />
      </div>
    </section>
  );
}
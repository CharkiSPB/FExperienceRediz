import type { MetadataRoute } from 'next';
import { expeditions } from '@/data/expeditions';
import { articles } from '@/data/articles/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fexperience.ru';

  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/expeditions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/speakers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Страницы экспедиций
  const expeditionPages: MetadataRoute.Sitemap = expeditions
    .filter(exp => exp.status !== 'upcoming') // предстоящие не индексируем
    .map(exp => ({
      url: `${baseUrl}/expeditions/${exp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  // Программы экспедиций
  const programPages: MetadataRoute.Sitemap = expeditions
    .filter(exp => exp.status !== 'upcoming' && exp.programSlug)
    .map(exp => ({
      url: `${baseUrl}/expeditions/${exp.slug}/program`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Статьи
  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...expeditionPages, ...programPages, ...articlePages];
}

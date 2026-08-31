import { expeditions } from '@/data/expeditions';
import type { Expedition } from '@/types/expedition';

function findExpedition(slug: string): Expedition {
  const expedition = expeditions.find((e) => e.slug === slug);
  if (!expedition) {
    throw new Error(`Экспедиция ${slug} не найдена в src/data/expeditions.ts`);
  }
  return expedition;
}

export const featuredMarkets = {
  eyebrow: 'Ближайшие экспедиции',
  featuredSlug: 'south-africa',
  secondarySlugs: ['vietnam'],
  rowSlugs: ['new-delhi'],
  navSlugs: ['brazil', 'kenya', 'thailand', 'indonesia', 'sakhalin'],
  cta: 'Участвовать в экспедиции',
  moreLabel: 'В разработке',
} as const;

export const featured = findExpedition(featuredMarkets.featuredSlug);
export const secondary = featuredMarkets.secondarySlugs.map(findExpedition);
export const additionalRows = featuredMarkets.rowSlugs.map(findExpedition);
export const navExpeditions = featuredMarkets.navSlugs.map(findExpedition);

export const statusLabels: Record<Expedition['status'], string> = {
  active: 'Активна',
  upcoming: 'Скоро',
  completed: 'Завершена',
};
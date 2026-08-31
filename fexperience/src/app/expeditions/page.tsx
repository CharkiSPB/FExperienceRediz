import type { Metadata } from 'next';
import { ExpeditionsDirectory } from '@/components/sections/ExpeditionsDirectory';
import { config } from '@/data/config';

export const metadata: Metadata = {
  title: 'Направления экспедиций | Бизнес-путешествия с Forbes',
  description: 'Актуальные и предстоящие бизнес-экспедиции с Forbes: Вьетнам, ЮАР, Марокко. Нетворкинг, встречи с регуляторами, медийное сопровождение.',
  openGraph: {
    title: 'Направления экспедиций | FExperience',
    description: 'Бизнес-экспедиции на перспективные зарубежные рынки с экспертами Forbes',
    url: `${config.site.url}/expeditions`,
    type: 'website',
    images: [{ url: '/images/og-expeditions.jpg', width: 1200, height: 630, alt: 'Экспедиции FExperience' }],
  },
  alternates: {
    canonical: `${config.site.url}/expeditions`,
  },
};

export default function ExpeditionsPage() {
  return <ExpeditionsDirectory />;
}
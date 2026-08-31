import type { Metadata } from 'next';
import { config } from '@/data/config';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'О проекте FExperience | Бизнес-экспедиции с Forbes',
  description: 'Миссия, команда и партнёрство с Forbes. Экспертиза, опыт и надёжность в организации международных бизнес-экспедиций для российских предпринимателей.',
  openGraph: {
    title: 'FExperience - новый проект команды Forbes Russia.',
    description: 'Мы помогаем предпринимателям открывать новые горизонты на самых перспективных рынках - в России и за рубежом. Мы не организуем туристические поездки. | Мы проводим бизнес-экспедиции.',
    url: `${config.site.url}/about`,
    type: 'website',
    images: [{ url: '/images/og-about.jpg', width: 1200, height: 630, alt: 'О проекте FExperience' }],
  },
  alternates: {
    canonical: `${config.site.url}/about`,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { RootClientLayout } from '@/components/layout/RootClientLayout';
import { YandexMetrika } from '@/components/shared/YandexMetrika';

const helveticaSans = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-helvetica-sans',
  display: 'swap',
});

// --font-helvetica-serif оставляем на Helvetica (используется в body)
const helveticaSerif = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Roman.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNeue/HelveticaNeueCyr-Light.woff2', weight: '300', style: 'normal' },
  ],
  variable: '--font-helvetica-serif',
  display: 'swap',
});

// Playfair Display — только для заголовков H1/H2/H3 (локально из public/fonts)
const playfair = localFont({
  src: [
    { path: '../../public/fonts/PlayfairDisplay/PlayfairDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/PlayfairDisplay/PlayfairDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/PlayfairDisplay/PlayfairDisplay-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-playfair',
  display: 'swap',
});

// Рукописный editorial-шрифт (2.5A manifesto) — Marck Script, полная кириллица
const marckScript = localFont({
  src: [
    { path: '../../public/fonts/MarckScript/MarckScript-Regular.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-handwritten',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | FExperience', default: 'Бизнес-экспедиции с Forbes | FExperience' },
  description: 'Бизнес-экспедиции для российских предпринимателей на перспективные зарубежные рынки',
  metadataBase: new URL('https://fexperience.forbes.ru'),
  verification: {
    yandex: '4facb07931b3fd31',
    google: 'TTyyANnmVGkerAJNk4ZQOK5xdvLODbXOLkfKjSnNByA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${helveticaSans.variable} ${helveticaSerif.variable} ${playfair.variable} ${marckScript.variable}`}
    >
      <body className="antialiased bg-canvas text-text-primary" suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
        <YandexMetrika />
      </body>
    </html>
  );
}

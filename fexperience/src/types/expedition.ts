export type ExpeditionRegion = 'africa' | 'asia' | 'latam' | 'russia';

export type Expedition = {
  slug: string;
  title: string;
  country: string;
  dates: string;
  status: 'active' | 'completed' | 'upcoming';
  description: string;
  image: string;
  imageEvening?: string;
  videoUrl?: string;
  speakersCount?: number;
  programSlug?: string;
  rubrics?: { enabled?: boolean };
  additionalInfo?: string;
  duration?: string;
  participantsCount?: string;
  participantsDescription?: string;
  showDatesInMenu?: boolean;
  includes?: string[];
  fullDescription?: string;
  price?: string;
  spots?: number;

  timer?: {
    enabled: boolean;
    targetDate: string;
    label: string;     
  };

  generalPartner?: {
    name: string;
    logo: string;
    description?: string;
  };

  // ── Поля для редизайна (опциональные, из раздела 12.3) ──
  region?: ExpeditionRegion;
  industries?: string[];
  city?: string;
  shortDescription?: string;
  heroVideo?: string;
  heroPoster?: string;
  ogImage?: string;

  // ── Hero-поля для главной (раздел 10.2) ──
  heroSketch?: string; // скетч ТОЛЬКО для Hero детальной страницы
  startDate?: string;
  endDate?: string;
  heroTitlePrimary?: string;
  heroTitleOpen?: string;
  heroTitleCountry?: string;
  heroPills?: string[];
  heroTheses?: { title: string; sub: string }[];
  pullQuote?: {
    text: string;
    author: string;
    company: string;
  };
  liveStats?: {
    businessPercent: number;
    culturePercent: number;
    localBusinessPercent: number;
    russianCompaniesPercent: number;
    govPercent: number;
    participantsTurnover: string;
  };
  completedStats?: {
    speakersCount: number;
    participantsCount: number;
  };
};
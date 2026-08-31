export type SiteConfig = {
  site: { name: string; url: string; description: string };
  partnerBlock: {
    enabled: boolean;
    headerVisible: boolean;
    pageVisible: boolean;
    pagePosition: string;
  };
  timer: {
    enabled: boolean;
    targetDate: string;
    label: string;
  };
  faqPreview: { showCount: number };
  map: { activeExpedition: string };
  hero: {
    teamProject: { enabled: boolean; label: string; logo: string; website?: string };
  };
  social: {
    telegram: string;
    whatsapp: string;
    max: string;
  };
  header: {
    slogan: string;
    phone: string;
    partnerLogo: {
      enabled:boolean;
      src: string;
      alt: string;
      url: string;
    };
  };
};
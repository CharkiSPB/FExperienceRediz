export type Partner = {
  name: string;
  logo: string;
  website: string;
  description: string;
  headerLabel?: string;
  mainLabel?: string;
  role?: 'general' | 'partner' | 'info';
};
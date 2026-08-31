export type Article = {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  author?: string;
  region?: string;
  countries?: string[];
};
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Типы должны точно соответствовать тому, что ожидает page.tsx
export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorImage?: string;
  category: string;
  image: string;
  slug: string;
  region?: string;
};

export type Article = {
  frontmatter: ArticleFrontmatter;
  content: string;
};

const ARTICLES_DIR = path.join(process.cwd(), 'src/data/articles');

// Получить все статьи для списка /articles
export async function getArticles(): Promise<ArticleFrontmatter[]> {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.warn('Articles directory not found:', ARTICLES_DIR);
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.mdx'));
  
  const articles = files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(ARTICLES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    return {
      ...data,
      slug,
    } as ArticleFrontmatter;
  });

  // Сортировка: новые сверху
  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Получить одну статью для /articles/[slug]
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: mdxContent } = matter(content);
  
  return {
    frontmatter: {
      ...data,
      slug,
    } as ArticleFrontmatter,
    content: mdxContent,
  };
}

// Получить все слагы для generateStaticParams (опционально, для SSG)
export function getAllArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  
  return fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}
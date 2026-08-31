import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticles } from '@/lib/mdx';
import { config } from '@/data/config';
import { CTACard } from '@/components/shared/CTACard';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Статья не найдена | FExperience',
    };
  }

  return {
    title: `${article.frontmatter.title} | FExperience`,
    description: article.frontmatter.excerpt,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.excerpt,
      type: 'article',
      publishedTime: article.frontmatter.date,
      authors: [article.frontmatter.author],
      images: [{ url: article.frontmatter.image, width: 1200, height: 630, alt: article.frontmatter.title }],
    },
    alternates: {
      canonical: `${config.site.url}/articles/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  // Похожие статьи (той же категории)
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter(a => a.slug !== slug && a.category === article.frontmatter.category)
    .slice(0, 2);

  return (
    <article className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Навигация "Назад" */}
      <Link
        href="/articles"
        className="inline-flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Назад к статьям
      </Link>

      {/* Заголовок и мета */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-[#A0A0A0] mb-4">
          <span className="px-2 py-1 bg-[#F7931A]/10 text-[#F7931A] rounded-full">
            {article.frontmatter.category}
          </span>
          <span>{new Date(article.frontmatter.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>•</span>
          <span>{article.frontmatter.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
          {article.frontmatter.title}
        </h1>
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#2A2A2A]">
          {article.frontmatter.authorImage ? (
            <Image
              src={article.frontmatter.authorImage}
              alt={article.frontmatter.author}
              width={80}
              height={80}
              quality={75}
              className="w-20 h-20 rounded-full object-cover object-[center_20%] border-2 border-[#F7931A]/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#2A2A2A] flex items-center justify-center text-sm text-[#A0A0A0] font-medium">
              {article.frontmatter.author.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-white font-medium">{article.frontmatter.author}</p>
            <p className="text-[#A0A0A0] text-sm">{article.frontmatter.authorRole}</p>
          </div>
        </div>
      </header>

      {/* Изображение */}
      <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-10 bg-[#1A1A1A]">
        <Image
          src={article.frontmatter.image}
          alt={article.frontmatter.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
          priority
        />
      </div>

      {/* Контент статьи */}
      <div className="prose prose-invert prose-lg max-w-none text-[#D0D0D0] leading-relaxed">
        <MDXRemote source={article.content}
        components={{
          img: (props) => (
            <img {...props} className="max-w-full h-auto rounded-lg" alt={props.alt || ''} />
          ),
          Image
        }} />
      </div>

      {/* CTA после статьи */}
      <CTACard />

      {/* Похожие статьи */}
      {relatedArticles.length > 0 && (
        <section className="mt-20 pt-10 border-t border-[#2A2A2A]">
          <h2 className="text-2xl font-serif font-bold text-white mb-8">
            Похожие материалы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/articles/${related.slug}`}
                className="group flex gap-4 p-4 bg-[#110F0D] border border-[#2A2A2A] rounded-lg hover:border-[#F7931A]/40 transition-all"
              >
                <div className="relative w-24 h-16 flex-shrink-0 bg-[#1A1A1A] rounded overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm group-hover:text-[#F7931A] transition-colors mb-1">
                    {related.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-xs line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  region?: string;
};

type ArticlesGridProps = {
  articles: Article[];
};

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
  if (articles.length === 0) {
    return (
      <p className="text-[#A0A0A0] text-center py-20">
        Статьи по этому региону пока нет
      </p>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={`/articles/${article.slug}`}
              className="group block bg-[#110F0D] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#F7931A] transition-colors"
            >
              {article.image && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-[#1A1A1A]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-white group-hover:text-[#F7931A] transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-[#A0A0A0] text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#666666]">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                {article.region && (
                  <>
                    <span>•</span>
                    <span className="text-[#F7931A]">
                      {article.region}
                    </span>
                  </>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
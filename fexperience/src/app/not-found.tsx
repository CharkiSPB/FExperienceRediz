'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#0D0805] flex items-center justify-center px-4 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-8xl md:text-9xl font-serif font-bold text-[#F7931A] mb-4 leading-none"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl font-serif font-bold text-white mb-4"
        >
          Страница не найдена
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-[#A0A0A0] mb-10 leading-relaxed"
        >
          Возможно, она была перемещена или удалена. Но вы всегда можете вернуться на главную или изучить наши материалы.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="px-8 py-3.5 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all duration-300 shadow-lg shadow-[#F7931A]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0805]"
          >
            На главную
          </Link>
          <Link
            href="/expeditions"
            className="px-6 py-3.5 rounded-lg font-medium border border-[#2A2A2A] text-white hover:bg-white/5 hover:border-[#F7931A]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0805]"
          >
            Экспедиции
          </Link>
          <Link
            href="/articles"
            className="px-6 py-3.5 rounded-lg font-medium border border-[#2A2A2A] text-white hover:bg-white/5 hover:border-[#F7931A]/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7931A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0805]"
          >
            Статьи
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
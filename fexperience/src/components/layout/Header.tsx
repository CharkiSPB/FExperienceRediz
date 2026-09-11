'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Send } from 'lucide-react';
import { RequestModal } from '@/components/shared/RequestModal';
import { PartnerModal } from '@/components/shared/PartnerModal';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLenis } from '@/components/providers/LenisProvider';

const TG_LINK = 'https://t.me/Milena_Amor';

const NAV_ITEMS = [
  { label: 'Экспедиции', href: '/expeditions' },
  { label: 'Отзывы', href: '/#reviews', hash: '#reviews' },
  { label: 'Статьи', href: '/articles' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '#contacts', hash: '#contacts' },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Плавный скролл к якорю (Lenis + отступ под фикс-шапку)
  const scrollToHash = useCallback((e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const target = document.querySelector(hash);
    if (!target) {
      // Якоря нет на этой странице (напр. #reviews вне главной) — переход
      router.push('/' + hash);
      return;
    }
    e.preventDefault();
    window.history.pushState(null, '', hash);
    if (lenis?.scrollTo) {
      lenis.scrollTo(target as HTMLElement, { offset: -88 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lenis, router]);

  // Детальная страница экспедиции (/expeditions/[slug])
  const isExpeditionDetail = /^\/expeditions\/[^/]+$/.test(pathname ?? '');
  const expeditionSlug = pathname?.match(/^\/expeditions\/([^/]+)/)?.[1];

  // На главной hero — видео/фото (тёмный) → наверху страницы светлый текст и логотип
  // На детальной странице экспедиции hero тоже тёмный (100svh фото) — светлый текст.
  const overDarkHero = (pathname === '/' || isExpeditionDetail) && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);

      // Кнопка «Стать участником» — только после полного скролла hero,
      // скрывается, когда на экране появляется блок Final CTA
      const hero = document.querySelector('.hero-slider');
      const heroHeight = hero?.getBoundingClientRect().height ?? window.innerHeight;
      const scrolledPastHero = y > heroHeight;

      let onFinalCta = false;
      const finalCta = document.querySelector('.final-cta');
      if (finalCta) {
        const rect = finalCta.getBoundingClientRect();
        onFinalCta = rect.top <= window.innerHeight * 0.6;
      }

      setShowJoin(scrolledPastHero && !onFinalCta);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка скролла и пауза Lenis при открытом мобильном меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.dispatchEvent(new CustomEvent('lenis:pause'));
    } else {
      document.body.style.overflow = 'unset';
      document.dispatchEvent(new CustomEvent('lenis:resume'));
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.dispatchEvent(new CustomEvent('lenis:resume'));
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/expeditions') return pathname === '/expeditions' || pathname.startsWith('/expeditions/');
    return pathname === href;
  };

  const navColor = (active: boolean) => {
    if (active) return 'text-brand-600';
    if (overDarkHero) return 'text-white hover:text-brand-300';
    return 'text-text-primary hover:text-brand-600';
  };

  return (
    <>
      <header className={`header-bar fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-bar__glass" aria-hidden="true" />
        <div className="header-bar__inner mx-auto flex h-16 md:h-20 max-w-[1600px] items-center justify-between px-6 lg:px-16">
          {/* Логотип — слева, тёмная версия без подложек и ореолов */}
          <Link href="/" aria-label="FExperience — на главную" className="header-bar__logo">
            <Image
              src="/images/logo/logoFExperience2_black.svg"
              alt="FExperience"
              width={197}
              height={34}
              priority
              className="h-6 md:h-7 w-auto"
            />
          </Link>

          {/* Навигация — desktop */}
          <nav className="hidden xl:flex items-center gap-8 ml-24">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const underline = active
                ? 'after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-full after:bg-brand-600'
                : '';
              const linkClass = `relative text-[15px] font-medium leading-none whitespace-nowrap transition-colors duration-200 cursor-pointer ${navColor(active)} ${underline}`;
              if ('hash' in item) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToHash(e, item.hash)}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden xl:flex items-center gap-3">
            {isExpeditionDetail && (
              <button onClick={() => setIsPartnerModalOpen(true)} className="btn-outline btn-outline--sm">
                Стать партнёром
              </button>
            )}
            <div className={`header-bar__join ${showJoin ? 'is-visible' : ''}`}>
            <button onClick={() => setIsParticipantModalOpen(true)} className="btn-liquid btn-liquid--sm">
              <span className="btn-liquid-text">Стать участником</span>
            </button>
          </div>
        </div>

          {/* Бургер — mobile */}
          <button onClick={() => setIsOpen(true)} className={`xl:hidden p-2 ${overDarkHero ? 'text-white' : 'text-text-primary'}`} aria-label="Открыть меню">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Мобильное меню — overlay с правого края (раздел 10.10) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 xl:hidden overflow-y-auto"
            style={{
              background: 'rgba(250,250,248,.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Верх: логотип + крестик закрытия 44×44 */}
            <div className="flex h-16 items-center justify-between px-6">
              <Link href="/" onClick={closeMenu} aria-label="FExperience — на главную">
                <Image src="/images/logo/logoFExperience.svg" alt="FExperience" width={205} height={45} className="h-6 w-auto" />
              </Link>
              <button onClick={closeMenu} aria-label="Закрыть меню" className="flex h-11 w-11 items-center justify-center text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Навигация — Philosopher (--font-display) 28px, staggered */}
            <nav className="flex flex-col gap-6 px-6 pt-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {'hash' in item ? (
                    <a
                      href={item.href}
                      onClick={(e) => { scrollToHash(e, item.hash); closeMenu(); }}
                      className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`mobile-nav-link ${isActive(item.href) ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Разделитель 1px */}
            <div className="mx-6 mt-8 h-px bg-[rgba(26,26,26,.08)]" />

            {/* Telegram */}
            <div className="px-6 py-6">
              <motion.a
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center gap-2 text-text-secondary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Send className="w-5 h-5" />
                Написать нам
              </motion.a>
            </div>

            {/* CTA — full-width кнопки */}
            <div className="px-6 flex flex-col gap-3">
              <motion.button
                onClick={() => { setIsParticipantModalOpen(true); closeMenu(); }}
                className="btn-liquid w-full"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="btn-liquid-text">Стать участником</span>
              </motion.button>
              {isExpeditionDetail && (
                <motion.button
                  onClick={() => { setIsPartnerModalOpen(true); closeMenu(); }}
                  className="btn-outline w-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  Стать партнёром
                </motion.button>
              )}
            </div>

            {/* Низ: copyright + privacy */}
            <div className="px-6 pt-8 pb-10 flex flex-col gap-2">
              <p className="text-xs text-text-tertiary">© Forbes FExperience 2024-2026</p>
              <Link href="/privacy" onClick={closeMenu} className="text-xs text-text-tertiary underline underline-offset-2">
                Политика конфиденциальности
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RequestModal
        isOpen={isParticipantModalOpen}
        onClose={() => setIsParticipantModalOpen(false)}
        defaultExpeditionSlug={isExpeditionDetail ? expeditionSlug : undefined}
      />
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </>
  );
}

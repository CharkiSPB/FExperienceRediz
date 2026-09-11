'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { contacts } from '@/data/contacts';
import { regions } from '@/data/regions';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribed) return;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
    }
  };

  return (
    <div className="mb-14 flex flex-col gap-8 border-b border-black/[.06] pb-14 md:flex-row md:items-center md:justify-between md:gap-10">
      <h3 className="max-w-[420px] font-display text-[24px] font-semibold leading-[1.25] text-text-primary">
        Узнайте первыми о предстоящих мероприятиях
      </h3>

      {subscribed ? (
        <p className="font-sans text-[15px] text-brand-700">Спасибо! Вы подписаны. До новых рынков.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш e-mail"
            aria-label="Ваш e-mail"
            className="h-12 flex-1 rounded-full border border-border bg-white px-5 font-sans text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-brand-600"
          />
          <button type="submit" className="btn-liquid btn-liquid--sm shrink-0">
            <span className="btn-liquid-text">Подписаться</span>
          </button>
        </form>
      )}
    </div>
  );
}

function ContinentalNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-x-8 gap-y-3" aria-label="Рынки">
      {regions.map((region) => (
        <Link
          key={region.id}
          href="/expeditions"
          className="font-sans text-[14px] font-medium leading-none text-text-primary transition-colors hover:text-brand-600"
        >
          {region.label}
        </Link>
      ))}
    </nav>
  );
}

type FooterLink = { label: string; href?: string };

function FooterColumns() {
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: 'Разделы',
      links: [
        { label: 'Экспедиции', href: '/expeditions' },
        { label: 'Отзывы', href: '/#reviews' },
        { label: 'Статьи', href: '/articles' },
        { label: 'О нас', href: '/about' },
      ],
    },
    {
      title: 'Экспедиции',
      links: [
        { label: 'Вьетнам', href: '/expeditions/vietnam' },
        { label: 'ЮАР', href: '/expeditions/south-africa' },
        { label: 'Бразилия', href: '/expeditions/brazil' },
        { label: 'Сахалин', href: '/expeditions/sakhalin' },
      ],
    },
    {
      title: 'Контакты',
      links: [
        { label: contacts.phone, href: contacts.phoneHref },
        { label: contacts.email, href: contacts.emailHref },
        { label: contacts.telegramLabel, href: contacts.telegram },
      ],
    },
    {
      title: 'Документы',
      links: [
        { label: 'Политика обработки персональных данных', href: '/privacy' },
        { label: 'Пользовательское соглашение', href: '/terms' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
      {columns.map((column) => (
        <div key={column.title}>
          <h4 className="mb-4 font-sans text-[13px] font-semibold uppercase tracking-[.05em] text-text-tertiary">
            {column.title}
          </h4>
          <ul className="text-[15px] leading-[2.2]">
            {column.links.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-text-secondary transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span className="text-text-secondary">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contacts" className="bg-footer border-t border-brand-600/15 px-6 pb-10 pt-16 md:px-16 md:pt-20 scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <Newsletter />

        <ContinentalNav />

        <FooterColumns />

        <div className="mt-14 flex flex-col gap-4 border-t border-black/[.06] pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/" aria-label="FExperience — на главную">
              <Image
                src="/images/logo/logoFExperience.svg"
                alt="FExperience"
                width={197}
                height={34}
                className="h-6 w-auto"
              />
            </Link>
            <p className="max-w-[280px] text-[13px] leading-snug text-text-tertiary sm:max-w-none">
              {contacts.copyright}
            </p>
          </div>

          <p className="flex items-start gap-1.5 text-[13px] leading-snug text-text-tertiary">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {contacts.address}
          </p>
        </div>
      </div>
    </footer>
  );
}
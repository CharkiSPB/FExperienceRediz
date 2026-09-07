'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqItems } from '@/data/faq';

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="faq">
      <div className="mx-auto max-w-[1280px] px-6 md:px-16">
        <div className="faq-inner">
          <header className="faq-header">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/faq/roza-vetrov1.webp"
              alt=""
              aria-hidden="true"
              className="faq-emblem"
            />
            <h2 className="whitespace-nowrap font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-tight text-text-primary">
              <span className="block">Часто задаваемые</span>
              <span className="block">вопросы</span>
            </h2>
          </header>

          <div className="faq-list">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    className="faq-question"
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon">
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`faq-answer-wrap ${isOpen ? 'is-open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
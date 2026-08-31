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
            <p className="font-sans text-[13px] font-semibold uppercase tracking-[.08em] text-brand-600">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-[clamp(28px,3vw,40px)] font-semibold leading-tight text-text-primary">
              Часто задаваемые вопросы
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
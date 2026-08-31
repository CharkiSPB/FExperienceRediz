'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export type DropdownItem = {
  label: string | React.ReactNode;
  href?: string;
  subtitle?: React.ReactNode;
  icon?: React.ElementType;
  external?: boolean;
  type?: 'header' | 'divider' | 'item';
  color?: 'orange' | 'gray' | 'black'; // Добавляем тип цвета для заголовков
};

type DropdownProps = {
  trigger: React.ReactNode;
  items: DropdownItem[];
  className?: string;
};

export function Dropdown({ trigger, items, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new CustomEvent('lenis:pause'));
    } else {
      document.dispatchEvent(new CustomEvent('lenis:resume'));
    }
    return () => void document.dispatchEvent(new CustomEvent('lenis:resume'));
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Цвета для заголовков секций
  const headerColors = {
    orange: 'text-[#F39200]',
    gray: 'text-[#999999]',
    black: 'text-[#000004]',
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        onClick={toggle}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        type="button"
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
            style={{
              background: 'rgba(13, 8, 5, 0.75)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="py-2 max-h-[70vh] overflow-y-auto">
              {items.map((item, idx) => {
                // Заголовок секции
                if (item.type === 'header') {
                  const colorClass = item.color ? headerColors[item.color] : 'text-[#A0A0A0]';
                  return (
                    <div
                      key={`header-${idx}`}
                      className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border-b border-white/5 ${colorClass}`}
                    >
                      {item.label}
                    </div>
                  );
                }
                
                // Разделитель
                if (item.type === 'divider') {
                  return (
                    <div
                      key={`divider-${idx}`}
                      className="my-2 border-t border-white/10"
                    />
                  );
                }
                
                // Обычный пункт меню
                return (
                  <Link
                    key={`${item.href}-${idx}`}
                    href={item.href || '#'}
                    onClick={close}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between px-3 py-1.5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1">
                      {item.label}
                    </div>
                    
                    {item.subtitle && (
                      <div className="text-xs ml-2 flex-shrink-0">
                        {item.subtitle}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
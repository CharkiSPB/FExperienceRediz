'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Send, MessageCircle, MessageCircleMore } from 'lucide-react';
import { FlipText } from '@/components/ui/FlipText';
import { RequestModal } from '@/components/shared/RequestModal';

type FloatingCTAProps = {
  onOpenModal?: (type?: 'expedition' | 'consultation') => void;
};

export function FloatingCTA({ onOpenModal }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Показываем кнопку после прокрутки Hero (примерно 100vh)
  useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Показываем после прокрутки Hero (~80% высоты экрана)
    const pastHero = scrollY > vh * 0.8;
    
    // Скрываем, если страница достаточно длинная И мы в 800px от конца
    const nearFooter = docHeight > vh * 2 && scrollY > docHeight - vh - 800;
    
    setIsVisible(pastHero && !nearFooter);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll); // Пересчёт при изменении размера окна
  handleScroll(); // Проверка при монтировании
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
  };
}, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
          >
            {/* 🔹 1. Кнопка "Стать участником" (ПЕРВОЙ) */}
            <button
              onClick={() => onOpenModal ? onOpenModal('expedition') : setIsModalOpen(true)}
              className="group cursor-pointer px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20 active:scale-[0.98] whitespace-nowrap"
            >
              <FlipText className="flex items-center justify-center">Стать участником</FlipText>
            </button>

            {/* 🔹 2. Соцсети (ПОСЛЕ кнопки) */}
            <div className="hidden sm:flex items-center gap-2 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-[#2A2A2A]/50">
              <a href="https://t.me/fexperience" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#F7931A] transition-colors" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://wa.me/79001909003" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#F7931A] transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#A0A0A0] hover:text-[#F7931A] transition-colors" aria-label="Max">
                <MessageCircleMore className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Модалка заявки */}
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
'use client';

import { useState } from 'react';
import { RequestModal } from '@/components/shared/RequestModal';

export function CTACard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-16 p-8 bg-[#110F0D] border border-[#2A2A2A] rounded-xl text-center">
        <h3 className="text-2xl font-serif font-bold text-white mb-3">
          Хотите узнать больше?
        </h3>
        <p className="text-[#A0A0A0] mb-6">
          Запишитесь на бесплатную консультацию с экспертом и обсудите возможности для вашего бизнеса.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block cursor-pointer bg-gradient-to-r from-[#F7931A] to-[#E8850F] text-white px-8 py-3 rounded-lg font-medium hover:from-[#FFA733] hover:to-[#F7931A] transition-all shadow-lg shadow-[#F7931A]/20"
        >
          Записаться на консультацию
        </button>
      </div>

      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultLeadType="consultation"
      />
    </>
  );
}

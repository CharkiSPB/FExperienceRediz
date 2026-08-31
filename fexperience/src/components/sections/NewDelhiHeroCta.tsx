'use client';

import { useState } from 'react';
import { FlipText } from '@/components/ui/FlipText';
import { ParticipantModal } from '@/components/shared/ParticipantModal';

export function NewDelhiHeroCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer px-8 py-2.5 rounded-full font-medium bg-[#F39200] text-white border border-transparent hover:bg-[#FFA733] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F7931A]/30 transition-all duration-300 shadow-lg shadow-[#F7931A]/20 inline-flex"
      >
        <FlipText className="flex items-center justify-center">СТАТЬ УЧАСТНИКОМ</FlipText>
      </button>

      <ParticipantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultExpeditionSlug="new-delhi"
      />
    </>
  );
}

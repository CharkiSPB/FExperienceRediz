'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Preloader } from '@/components/shared/Preloader';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { RequestModal } from '@/components/shared/RequestModal';
import { CookieBanner } from '@/components/shared/CookieBanner';
import { ExpeditionProvider } from '@/components/providers/ExpeditionContext';

export function RootClientLayout({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState<{ open: boolean; type: 'consultation' | 'expedition' }>({
    open: false,
    type: 'expedition',
  });

  const openModal = (type: 'consultation' | 'expedition' = 'expedition') => {
    setModalState({ open: true, type });
  };

  const closeModal = () => setModalState({ open: false, type: 'expedition' });

  return (
    <ExpeditionProvider>
      <Preloader />
      <LenisProvider>
        <Header />
        
        <main className="min-h-screen relative">{children}</main>
        
        <Footer />
      </LenisProvider>

      <RequestModal 
        isOpen={modalState.open} 
        onClose={closeModal} 
        defaultLeadType={modalState.type} 
      />
      <CookieBanner />
    </ExpeditionProvider>
  );
}
'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ExpeditionContextType = {
  activeExpeditionSlug: string;
  setActiveExpeditionSlug: (slug: string) => void;
};

const ExpeditionContext = createContext<ExpeditionContextType | undefined>(undefined);

export function ExpeditionProvider({ children }: { children: ReactNode }) {
  const [activeExpeditionSlug, setActiveExpeditionSlug] = useState('vietnam');

  return (
    <ExpeditionContext.Provider value={{ activeExpeditionSlug, setActiveExpeditionSlug }}>
      {children}
    </ExpeditionContext.Provider>
  );
}

export function useExpedition(): ExpeditionContextType {
  const context = useContext(ExpeditionContext);
  if (!context) {
    throw new Error('useExpedition must be used within ExpeditionProvider');
  }
  return context;
}

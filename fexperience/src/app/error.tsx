'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route Error:', error);
    // TODO: Интеграция с Sentry/Vercel Error Tracking
    // if (process.env.NODE_ENV === 'production') captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0D0805] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          Что-то пошло не так
        </h2>
        <p className="text-[#A0A0A0] mb-8 leading-relaxed">
          Мы не можем загрузить эту страницу. Пожалуйста, попробуйте обновить или вернуться на главную.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <p className="text-xs text-[#666666] mb-6 font-mono break-all p-3 bg-[#110F0D] rounded border border-[#2A2A2A]">
            {error.digest || error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => reset()} variant="primary">
            Попробовать снова
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="secondary">
            На главную
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
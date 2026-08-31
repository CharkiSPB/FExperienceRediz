'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (mounted) setIsLoaded(true);
      }, 2800);
    });

    const fallbackTimer = setTimeout(() => {
      if (mounted) setIsLoaded(true);
    }, 3500);

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.2 } }}
          className="fixed inset-0 z-[100] bg-[#000004] flex items-center justify-center overflow-hidden"
        >
          <div className="flex items-start scale-[0.42] md:scale-100 origin-center">
            {/* F — стартует большая по центру, уменьшается */}
            <motion.div
              initial={{ scale: 1.66, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/logo/preloaderF.svg"
                alt=""
                width={137}
                height={148}
                priority
              />
            </motion.div>

            {/* Experience — раскрывается и СДВИГАЕТСЯ влево одновременно */}
            <motion.div
              initial={{ width: 0, x: 0, opacity: 0 }}
              animate={{ width: 574, x: -30, opacity: 1 }}
              transition={{ 
                delay: 0.9,
                duration: 1.0, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              className="flex-shrink-0 overflow-hidden mt-3"
            >
              <Image
                src="/images/logo/preloaderExper.svg"
                alt=""
                width={574}
                height={157}
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

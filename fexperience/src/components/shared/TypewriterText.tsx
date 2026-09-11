'use client';
import { useState, useEffect, useRef } from 'react';

type TypewriterTextProps = {
  text: string;
  isInView: boolean;
};

export function TypewriterText({ text, isInView }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef({ status: 'waiting', index: 0 });

  useEffect(() => {
    if (!isInView) {
      setDisplayed('');
      stateRef.current = { status: 'waiting', index: 0 };
      return;
    }

    let timeout: NodeJS.Timeout;
    const typeSpeed = 80;      // Скорость печати (мс на символ)
    const deleteSpeed = 60;    // Скорость стирания
    const holdTime = 4000;     // Пауза после полной печати (2 сек)
    const waitTime = 3000;     // Пауза в скрытом состоянии (2 сек)

    const loop = () => {
      const { status, index } = stateRef.current;

      switch (status) {
        case 'waiting':
          timeout = setTimeout(() => {
            stateRef.current = { status: 'typing', index: 0 };
            loop();
          }, waitTime);
          break;
        case 'typing':
          if (index < text.length) {
            setDisplayed(text.slice(0, index + 1));
            stateRef.current.index = index + 1;
            timeout = setTimeout(loop, typeSpeed);
          } else {
            stateRef.current.status = 'holding';
            timeout = setTimeout(loop, holdTime);
          }
          break;
        case 'holding':
          stateRef.current.status = 'deleting';
          timeout = setTimeout(loop, 0);
          break;
        case 'deleting':
          if (index > 0) {
            setDisplayed(text.slice(0, index - 1));
            stateRef.current.index = index - 1;
            timeout = setTimeout(loop, deleteSpeed);
          } else {
            stateRef.current.status = 'waiting';
            timeout = setTimeout(loop, 0);
          }
          break;
      }
    };

    loop();
    return () => clearTimeout(timeout);
  }, [text, isInView]);

  return (
    <span className="text-[#FFFFFF] text-xs font-bold tracking-[0.15em] uppercase min-h-[20px] block mb-4 text-center">
      {displayed}
      {/* Мигающий курсор */}
      {/* {(displayed.length < text.length || stateRef.current.status === 'deleting') && (
        <span className="inline-block w-0.5 h-3.5 bg-[#F7931A] ml-0.5 animate-pulse" />
      )} */}
    </span>
  );
}
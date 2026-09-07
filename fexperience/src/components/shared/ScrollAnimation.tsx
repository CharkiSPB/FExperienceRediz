'use client';
import { useRef, ReactNode, ElementType, ComponentProps } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export type VariantName = 'fade-in' | 'slide-up' | 'slide-left' | 'scale';

const variants: Record<VariantName, Variants> = {
  'fade-in': { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1 } 
  },
  'slide-up': { 
    hidden: { opacity: 0, y: 60 }, 
    visible: { opacity: 1, y: 0 } 
  },
  'slide-left': { 
    hidden: { opacity: 0, x: 60 }, 
    visible: { opacity: 1, x: 0 } 
  },
  'scale': { 
    hidden: { opacity: 0, scale: 0.95 }, 
    visible: { opacity: 1, scale: 1 } 
  },
};

type ScrollAnimationProps = {
  children: ReactNode;
  variant?: VariantName;
  delay?: number;
  duration?: number;
  threshold?: number; // 0 to 1, сколько элемента должно появиться
  className?: string;
  as?: ElementType; // Позволяет использовать семантические теги
};

export function ScrollAnimation({
  children,
  variant = 'slide-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className,
  as: Component = 'div',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // useInView автоматически использует IntersectionObserver
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px', 
    amount: threshold as any // amount: 'some' | 'all' | number
  });
  
  // Создаём Motion-компонент с нужным тегом (h2, p, section и т.д.)
  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;
  const MotionAny = MotionComponent as any;

  // Если пользователь предпочитает уменьшенное движение, отключаем анимацию
  return (
    <MotionAny
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Кастомный easing из дизайн-системы
      }}
    >
      {children}
    </MotionAny>
  );
}
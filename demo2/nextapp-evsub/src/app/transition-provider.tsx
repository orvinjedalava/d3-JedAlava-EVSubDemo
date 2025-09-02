"use client";

import { useRef } from 'react';
import { TransitionRouter } from 'next-transition-router';
import { animate } from 'framer-motion/dom';
import { appSettings } from '@/config/app';

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function TransitionProvider({ children }: ProvidersProps) {
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const transitionDuration = appSettings.transitionDuration;

  return (
    <TransitionRouter
      auto
      leave={(next) => {
        animate(
          wrapperRef.current,
          { opacity: [1, 0] },
          { duration: transitionDuration, onComplete: next }
        );
      }}
      enter={(next) => {
        animate(
          wrapperRef.current, 
          { opacity: [0, 1] },
          { duration: transitionDuration, onComplete: next }
        );
      }}
    >
      <div ref={wrapperRef}>
        {children}
      </div>
      
    </TransitionRouter>
  );
}

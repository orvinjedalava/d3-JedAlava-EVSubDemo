'use client';

import { motion } from 'framer-motion';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function ExplorePage() {
  const { stage } = useTransitionState();

  return (
    <motion.div
      initial="initial"
      animate={ stage === 'leaving' ? variants.exit : variants.animate }
      variants={variants}
      transition={{ duration: appSettings.transitionDuration }}
    >
      <h1>Calculator</h1>
      <p>This is the calculator page.</p>
    </motion.div>
  );
}

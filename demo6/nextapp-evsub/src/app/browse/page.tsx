'use client';

import { motion } from 'framer-motion';
import { CardsPanel } from '@/components/cards-panel';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';

import { motionOpacity } from '@/utils/framer-motion-helpers';

import { getInitialMessages } from '@/actions/get-chat-messages';

export default function BrowsePage() {
  const { stage } = useTransitionState();
  
  return (
    <section className="flex-grow w-full relative flex flex-col gap-2 lg:flex-row">
      <CardsPanel/>
    </section>
  );
}
'use client';

import { ChatUI } from "@/components/chat-ui";
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
      <div className="h-screen lg:h-auto lg:w-1/4 flex flex-col py-8">
      <motion.div
        className="flex-grow flex flex-col"
        initial="initial"
        animate={ stage === 'leaving' ? motionOpacity.exit : motionOpacity.animate }
        variants={motionOpacity}
        transition={{ duration: appSettings.transitionDuration }}
      >
      <ChatUI initialMessages={getInitialMessages()} height="800px" />
      
    </motion.div></div>
      <div className="h-screen lg:h-auto lg:w-3/4 flex flex-col py-8 justify-center">
        <CardsPanel/>
      </div>
    </section>
  );
}
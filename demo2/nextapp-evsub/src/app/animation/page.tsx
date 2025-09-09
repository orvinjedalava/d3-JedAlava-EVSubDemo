'use client';

import { useEffect, useState, useRef } from 'react';
import { ChatUI } from "@/components/chat-ui";
import { motion } from 'framer-motion';
import { CardsPanel } from '@/components/cards-panel';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import type { CarState } from '@/types';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { getCars, getCarGroups } from '@/actions/get-cars';
import { generateCarsStateFrom } from '@/utils/coordinates-helpers';
import { getInitialMessages } from '@/actions/get-chat-messages';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { stage } = useTransitionState();
  
  const { 
    setCarGroupStates,
  } = useCarsStore();

  useEffect(() => {
    // Wrap async logic in an IIFE since useEffect cannot be async
    (async () => {
      // Await the cars data
      // const cars = await getCars();
      
      // const initialCardStates: CarState[] = getDisplayCoordinates(cars);
      // Update the store with the combined data
      // setCarStates(initialCardStates);

      const carGroups = await getCarGroups();
      const initialCardGroupStates = generateCarsStateFrom(carGroups);

      // Update the store with the combined data
      if (setCarGroupStates) {
        setCarGroupStates(initialCardGroupStates);
      }
      // Log for debugging
      console.log("Initialized card group states:", initialCardGroupStates);
    })();


  }, []);

  
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
      <div ref={containerRef} className="h-screen lg:h-auto lg:w-3/4 flex flex-col py-8">
        <CardsPanel width={780} height={860} />
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { ChatUI } from "@/components/chat-ui";
import { motion } from 'framer-motion';
import { CardsPanel } from '@/components/cards-panel';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";
import type { CarCardState } from '@/types';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { getCars } from '@/actions/get-cars';
import { getDisplayCoordinates} from '@/utils/coordinates-helpers';
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
    carCardStates,
    setCarCardStates,
  } = useCarGroupStore();

  useEffect(() => {
    // Wrap async logic in an IIFE since useEffect cannot be async
    (async () => {
      // Await the cars data
      const cars = await getCars();
      const initialCardStates: CarCardState[] = getDisplayCoordinates(cars);

      // Update the store with the combined data
      setCarCardStates(initialCardStates);

      // Log for debugging
      console.log("Initialized card states:", initialCardStates);
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
      <div ref={containerRef} className="h-screen lg:h-auto lg:w-3/4 flex flex-col py-8 border border-red-500">
        {/* <ZoomableBubbleChart width={780} height={860} />  */}
        <CardsPanel width={780} height={860} />
      </div>
    </section>
  );
}

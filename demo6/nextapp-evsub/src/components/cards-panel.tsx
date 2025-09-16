'use client';

import { useRef, useEffect, useState } from "react";
import { Chip } from "@heroui/chip";
import { CarGroupPanel } from "@/components/car-group-panel";
import { useCarsStore, useCarPanelDimensionsStore } from "@/stores/animations/cards-panel-store";
import { getSuggestions } from '@/actions/get-cars';
import { CarPark } from "@/components/car-park";
import { ChipStack } from "@/components/chip-stack";
import { SuggestionsPanel } from "@/components/suggestions-panel";
import { AnimatePresence, motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';

export const CardsPanel = () => {
  const {
    currentSuggestion, 
    carGroupStates,
    refreshClientSize,
    setCarGroupSelected,
    setSuggestions,
    toggleFavoriteCar,
  } = useCarsStore();

  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  const { setDimensions } = useCarPanelDimensionsStore();

  // Set up the resize observer
  useEffect(() => {
    if (process.env.SUPPRESS_FRAMER_WARNINGS === 'true') {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0] && typeof args[0] === 'string' && 
          args[0].includes('AnimatePresence')) {
        return;
      }
      originalWarn.apply(console, args);
    };
  }
  
    if (!containerRef.current) return;

    // Create a new ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions(width, height);
        
        refreshClientSize();
      }
    });
    
    // Start observing the container
    resizeObserver.observe(containerRef.current);

    // Wrap async logic in an IIFE since useEffect cannot be async
    (async () => {
      
      const suggestions = await getSuggestions('', 0);
      if (suggestions) {
        setSuggestions(suggestions);
      }
    })();
    
    // Clean up the observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    
    <div 
      ref={containerRef}
      className="flex-grow relative min-h-[1040px] max-h-[1040px]"
    >
      <ChipStack />
      <AnimatePresence mode="wait">
      {
        carGroupStates && carGroupStates.map((carGroupState) => (
          <motion.div 
            key={`car-group-${currentSuggestion}-${carGroupState.info.name}`} 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionOpacity}
            transition={{ duration: 0.5 }}
          >
            <CarGroupPanel 
              key={`car-group-panel-${carGroupState.info.name}`} 
              carGroupState={carGroupState} 
            />
            <Chip 
              key={`car-group-chip-${carGroupState.info.name}`} 
              className={`m-2 h-[56px] text-[20px] p-2 absolute transition-all duration-500 ease-in-out cursor-pointer rounded-[16px] bg-white/40 ${
                carGroupState.chipState.opacity === 1 ? 'car-card-appear-delay' : 'car-card-default'
              }`}
              
              {...(!carGroupState.isSelected ? { 
                onClick: () => { 
                  setCarGroupSelected(carGroupState.info.id, true);
                }
              } : {})}

              style={{ 
                top: carGroupState.chipState.boundingBox.top,
                left: carGroupState.chipState.boundingBox.left,
                opacity: carGroupState.chipState.opacity,
              }}  
            >
              {carGroupState.info.name}
            </Chip>
          </motion.div>
        ))
      }
      </AnimatePresence>
      <SuggestionsPanel />
      <CarPark />
      
    </div>
  );
}
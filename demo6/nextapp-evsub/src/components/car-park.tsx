'use client';

import { Button } from "@heroui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { useState, useCallback } from "react";
import type { CarState, CarGroupState } from "@/types";
import { CarCard } from "@/components/car-card";
import { AnimatePresence, motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { CarGroupPanel } from "@/components/car-group-panel";
import { getCarParkWidth, getCarParkHeight } from '@/utils/scale-helper';

export const CarPark = () => {
  const { setFavoriteCar, favoriteCarGroupState } = useCarsStore();
  const [isDragOver, setIsDragOver] = useState(false);

  // Add drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    // Prevent default to allow drop
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data && data.carState) {
        // Call setFavoriteCar with the dropped car state
        setFavoriteCar(data.carState);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  }, [setFavoriteCar]);

  return (
    <div
      className={`absolute top-[880px] left-[120px] min-w-[${getCarParkWidth()}px] max-w-[${getCarParkWidth()}px] min-h-[${getCarParkHeight()}px] 
        flex flex-col items-center justify-center
        rounded-tl-lg rounded-tr-lg 
        transition-all duration-200 ease-in-out
        ${isDragOver 
          ? 'bg-white/60 dark:bg-white/60 border-2 border-dashed border-secondary' 
          : 'bg-white/40 dark:bg-white/40'
        }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragExit={handleDragLeave}
      onDrop={handleDrop}
      style={{
            minWidth: getCarParkWidth(),
            maxWidth: getCarParkWidth(),
            minHeight: getCarParkHeight(),
            // maxHeight: getCarParkHeight(),
          }}
    >
      { favoriteCarGroupState.carStates.length > 0 ? (
        <div
          className={`overflow-x-auto overflow-y-hidden min-w-[${getCarParkWidth()}px] max-w-[${getCarParkWidth()}px] min-h-[${getCarParkHeight()}px] `}
          // className={`overflow-x-auto overflow-y-hidden`}
          // style={{
          //   minWidth: getCarParkWidth(),
          //   maxWidth: getCarParkWidth(),
          //   minHeight: getCarParkHeight(),
          //   // maxHeight: getCarParkHeight(),
          // }}
        >
          {/* <AnimatePresence mode="wait"> */}
          <motion.div 
              key={`favorite-car-card-${favoriteCarGroupState.info.name}`}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={motionOpacity}
              transition={{ duration: 0.5 }}
            >
              <CarGroupPanel 
                key={`favorite-car-group-panel-${favoriteCarGroupState.info.name}`} 
                carGroupState={favoriteCarGroupState}
                isFromCarPark={true} 
              />
            </motion.div>
          {/* </AnimatePresence> */}
        </div>) 
      : (
        <motion.div
          key={`favorite-car-park`}
          className='flex flex-col items-center justify-center gap-1 text-center'
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionOpacity}
          transition={{ duration: 0.5 }}
        >
          <PlusCircleIcon className="text-secondary size-8" />
          <span>Favourited vehicles will appear here OR drag vehicles that interest you</span></motion.div>
        ) 
      }
      
    </div>
  );
};

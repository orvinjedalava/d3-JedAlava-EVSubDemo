'use client';

import { useRef, useEffect, useState } from "react";
import { Chip } from "@heroui/chip";
import { CarGroupPanel } from "@/components/car-group-panel";
import { useCarsStore, useCarPanelDimensionsStore } from "@/stores/animations/cards-panel-store";
import { getCarGroups, getSuggestions, getCars } from '@/actions/get-cars';
import { generateCarGroupStatesFrom } from '@/utils/state-helpers';
import { CardDisplayMode } from "@/types";
import { CarPark } from "@/components/car-park";
import { ChipStack } from "@/components/chip-stack";
import { SuggestionsPanel } from "@/components/suggestions-panel";

export const CardsPanel = () => {
  const { 
    carGroupStates,
    setCarGroupStates,
    refreshClientSize,
    setCarGroupSelected,
    setSuggestions,
  } = useCarsStore();

  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  const { setDimensions } = useCarPanelDimensionsStore();

  // Set up the resize observer
  useEffect(() => {
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

    // // Wrap async logic in an IIFE since useEffect cannot be async
    // (async () => {
      
    //   const carGroups = await getCarGroups();
    //   if (containerRef.current) {
    //     const { width, height } = containerRef.current.getBoundingClientRect();
    //     const initialCardGroupStates = generateCarGroupStatesFrom(carGroups, width, height);

    //     // Update the store with the combined data
    //     if (setCarGroupStates) {
    //       setCarGroupStates(initialCardGroupStates);
    //     }
    //   }
    // })();

    // Wrap async logic in an IIFE since useEffect cannot be async
    (async () => {
      
      const carGroups = await getCarGroups();
      
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const initialCardGroupStates = generateCarGroupStatesFrom(carGroups, width, height);

        // Update the store with the combined data
        if (setCarGroupStates) {
          setCarGroupStates(initialCardGroupStates);
        }
      }

      const suggestions = await getSuggestions('', 0);
      if (suggestions) {
        setSuggestions(suggestions);
        console.log('Fetched car group suggestions:', suggestions);
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
      {
        carGroupStates.map((carGroupState) => (
          <div key={`car-group-${carGroupState.info.name}`} >
            <CarGroupPanel 
              key={`car-group-panel-${carGroupState.info.name}`} 
              carGroupState={carGroupState} 
            />
            <Chip 
              key={`car-group-chip-${carGroupState.info.name}`} 
              className={`m-2 absolute transition-all duration-500 ease-in-out cursor-pointer ${
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
          </div>
        ))
      }
      <SuggestionsPanel />
      <CarPark />
      
    </div>
  );
}
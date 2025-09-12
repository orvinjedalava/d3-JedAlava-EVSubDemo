'use client';

import { useRef, useEffect, useState } from "react";
import { Chip } from "@heroui/chip"
import { CarGroupPanel } from "@/components/car-group-panel";
import { useCarsStore, useCarPanelDimensionsStore } from "@/stores/animations/cards-panel-store";
import { getCarGroups } from '@/actions/get-cars';
import { generateCarGroupStatesFrom } from '@/utils/state-helpers';
import { CardDisplayMode } from "@/types";

// interface CardsPanelProps {
//   width: number;
//   height: number;
// }

export const CardsPanel = () => {
  const { 
    carGroupStates,
    setCarGroupStates,
    refreshClientSize,
    setCarGroupSelected,
    setCarGroupDisplayMode,
  } = useCarsStore();

  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  // State to store dimensions
  // const [dimensions, setDimensions] = useState({
  //   width:  0,
  //   height: 0
  // });

  const { width, height, setDimensions } = useCarPanelDimensionsStore();

  // Set up the resize observer
  useEffect(() => {
    if (!containerRef.current) return;

    
    // setDimensions({ width, height });
    
    // Create a new ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // setDimensions({ width, height });
        setDimensions(width, height);
        // console.log(`Container resized: ${width}px × ${height}px`);
        
        // If you need to update a store with these values:
        // updateDimensionsInStore(width, height);
        
        refreshClientSize(width, height);
        // console.log('Observed dimensions change:', width, height);
      }
    });
    
    // Start observing the container
    resizeObserver.observe(containerRef.current);

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
      // Log for debugging
      // console.log("Initialized card group states:", initialCardGroupStates);
    })();
    
    // Clean up the observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    
    <div 
      ref={containerRef}
      // className="flex-grow relative max-h-[950px] max-w-[950px]"
      // className="flex-grow relative min-h-[930px] min-w-[950px] max-h-[1000px] max-w-[1000px]"
      className="flex-grow relative min-h-[930px] max-h-[1000px] border"
    >
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
              
              {...(carGroupState.isSelected ? { 
                onClose: () => {
                  setCarGroupSelected(carGroupState.info.name, false);
                  setCarGroupDisplayMode(carGroupState.info.name, CardDisplayMode.ShowCriteria); 
                  refreshClientSize(width, height);
                }
              } : {})}

              {...(!carGroupState.isSelected ? { 
                onClick: () => { 
                  setCarGroupSelected(carGroupState.info.name, true);
                  setCarGroupDisplayMode(carGroupState.info.name, CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton); // Reset display mode when selecting 
                  refreshClientSize(width, height);
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
      
    </div>
  );
}
'use client';

import { useRef, useEffect, useState } from "react";
import { Chip } from "@heroui/chip"
import { CarGroupPanel } from "@/components/car-group-panel";
import { useCarsStore } from "@/stores/animations/cards-panel-store";

interface CardsPanelProps {
  width: number;
  height: number;
}

export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  const { 
    carGroupStates,
  } = useCarsStore();

  // Create a ref for the container div
  const containerRef = useRef<HTMLDivElement>(null);

  // State to store dimensions
  const [dimensions, setDimensions] = useState({
    width: width || 0,
    height: height || 0
  });

  // Set up the resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a new ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        console.log(`Container resized: ${width}px × ${height}px`);
        
        // If you need to update a store with these values:
        // updateDimensionsInStore(width, height);
      }
    });
    
    // Start observing the container
    resizeObserver.observe(containerRef.current);
    
    // Clean up the observer when component unmounts
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    
    <div 
      ref={containerRef}
      className="flex-grow relative"
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
              className="m-2 absolute transition-all duration-500 ease-in-out"

              {...(carGroupState.isSelected ? { 
                onClose: () => console.log(`Close chip for ${carGroupState.info.name}`)
              } : {})}

              style={{ 
                top: carGroupState.chipState.boundingBox.top,
                left: carGroupState.chipState.boundingBox.left,
                opacity: carGroupState.chipState.opacity,
                // zIndex: carGroupState.displayCoordinates.zIndex,
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
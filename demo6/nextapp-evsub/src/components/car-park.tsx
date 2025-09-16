import { Button } from "@heroui/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { useState, useCallback } from "react";
import { CarState } from "@/types";

export const CarPark = () => {
  const { toggleFavoriteCar } = useCarsStore();
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
        toggleFavoriteCar(data.carState);
      }
    } catch (error) {
      console.error('Error parsing dropped data:', error);
    }
  }, [toggleFavoriteCar]);

  return (
    <div
      className={`absolute top-[910px] left-[120px] min-w-[1300px] max-w-[1300px] min-h-[135px] 
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
    >
      <Button isIconOnly variant="light">
        <PlusCircleIcon className="text-secondary size-8" />
      </Button>
      <span>Favourited vehicles will appear here OR drag vehicles that interest you</span>
    </div>
  );
};

import { CarCard } from "@/components/car-card";
import { Button, ButtonGroup } from "@heroui/button";
import { useState, useEffect } from "react";
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";

interface CardsPanelProps {
  width: number;
  height: number;
}

export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  // State to track the left position
  const [cardWidth, setCardWidth] = useState(253);
  const [cardHeight, setCardHeight] = useState(276);

  const { 
    carCardStates,
    setCarCardPosition
  } = useCarGroupStore();

  // State to track if we're animating
  // const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation with useEffect
  // useEffect(() => {
  //   if (!isAnimating) return;

  //   let startTime: number | null = null;
  //   const duration = 500; // Animation duration in milliseconds
  //   const startPosition = 20;
  //   const endPosition = 100;

  //   const animateFrame = (timestamp: number) => {
  //     if (!startTime) {
  //       startTime = timestamp;
  //     }
  //     const elapsed = timestamp - startTime;
  //     const progress = Math.min(elapsed / duration, 1);
      
  //     // Calculate new position using easing function
  //     const newPosition = startPosition + (endPosition - startPosition) * progress;
  //     setLeftPosition(newPosition);
      
  //     if (progress < 1) {
  //       requestAnimationFrame(animateFrame);
  //     } else {
  //       setIsAnimating(false);
  //     }
  //   };

  //   requestAnimationFrame(animateFrame);
  // }, [isAnimating]);

  const onNext = () => {
    setCarCardPosition(0, { left: 200, zIndex: 1 });
    setCarCardPosition(1, { opacity: 0.4 });
  }

  const onBack = () => {
    setCarCardPosition(0, { left: 20, zIndex: 0 });
    setCarCardPosition(1, { opacity: 1 });
  }

  const onResize = () => {
    const carCard = carCardStates[0];

    setCarCardPosition(0, 
      { 
        width: carCard.displayProperties.width === 253 ? 715 : 253, 
        height: carCard.displayProperties.height === 350 ? 688 : 350,
        left: carCard.displayProperties.left === 200 ? 50 : 200, 
      });
  }

  return (
    
    <div className="flex-grow relative">
      {carCardStates.map((cardState, index) => (
        <div 
          key={`car-card-${index}`}
          className="absolute transition-all duration-500 ease-in-out" 
          style={{ 
            width: cardState.displayProperties.width || cardWidth,
            height: cardState.displayProperties.height || cardHeight,
            top: cardState.displayProperties.top || 0,
            left: cardState.displayProperties.left || 0,
            opacity: cardState.displayProperties.opacity !== undefined ? cardState.displayProperties.opacity : 1,
            zIndex: cardState.displayProperties.zIndex || 0,
          }}>
          <CarCard car={cardState.detail} />
        </div>
      ))}
      <div className="p-8 flex flex-row justify-center">
        <ButtonGroup>
          <Button variant="solid" onPress={onNext}>Next</Button>
          <Button variant="solid" onPress={onBack}>Back</Button>
          <Button variant="solid" onPress={onResize}>Resize</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
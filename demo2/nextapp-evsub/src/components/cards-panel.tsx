import { CarCard } from "@/components/car-card";
import { Button, ButtonGroup } from "@heroui/button";
import { useState, useEffect } from "react";
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";

interface CardsPanelProps {
  width: number;
  height: number;
}

const carData = [
  {
    title: "Car 1",
    img: "/images/Volvo EX30.png",
    price: "$20,000",
  },
  {
    title: "Car 2",
    img: "/images/KIA EV5 Earth 2025.png",
    price: "$25,000",
  },
  {
    title: "Car 3",
    img: "/images/BMW I4 EDrive35 2023.png",
    price: "$30,000",
  },
  {
    title: "Car 4",
    img: "/images/Tesla Model 3 Earth 2025.png",
    price: "$35,000",
  },
];

// const cardWidth = 253; // 64 * 4
// const cardHeight = 276; // 80 * 4

export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  // State to track the left position
  const [leftPosition, setLeftPosition] = useState(20);

  const [opacity, setOpacity] = useState(1);

  const [cardWidth, setCardWidth] = useState(253);
  const [cardHeight, setCardHeight] = useState(276);

  const { 
    carCardStates
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
    console.log('Next button clicked');
    // setIsAnimating(true);
    setLeftPosition(105.22312); // Move card to the right
    setOpacity(0.4); // Start fading out
  }

  const onBack = () => {  
    console.log('Back button clicked');
    setLeftPosition(20); // Reset position when going back
    setOpacity(1); // Reset opacity
  }

  const onResize = () => {
    console.log('Resize button clicked');
    setCardWidth(cardWidth === 253 ? 500 : 253);
    setCardHeight(cardHeight === 276 ? 400 : 276);
    // Logic to resize cards can be added here
  }

  return (
    // <div className="flex-grow relative">
    //   <div 
    //     className="absolute transition-all duration-500 ease-in-out" 
    //     style={{ 
    //       width: cardWidth, 
    //       height: cardHeight,
    //       top: 250,
    //       left: leftPosition
    //     }}>
    //     <CarCard car={carData[0]} />
    //   </div>
    //   <div 
    //     className="absolute transition-all duration-500 ease-in-out" 
    //     style={{ 
    //       width: 253, 
    //       height: 276,
    //       top: 350,
    //       left: 500,
    //       opacity: opacity
    //     }}>
    //     <CarCard car={carData[1]} />
    //   </div>
    //   <div className="p-8 flex flex-row justify-center">
    //     <ButtonGroup>
    //       <Button variant="solid" onPress={onNext}>Next</Button>
    //       <Button variant="solid" onPress={onBack}>Back</Button>
    //       <Button variant="solid" onPress={onResize}>Resize</Button>
    //     </ButtonGroup>
    //   </div>
    // </div>
    <div className="flex-grow relative">
      {carCardStates.map((cardState, index) => (
        <div 
          key={`car-card-${index}`}
          className="absolute transition-all duration-500 ease-in-out" 
          style={{ 
            width: cardState.width || cardWidth,
            height: cardState.height || cardHeight,
            top: cardState.top,
            left: cardState.left,
            opacity: cardState.opacity !== undefined ? cardState.opacity : 1
          }}>
          <CarCard car={carData[index]} />
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
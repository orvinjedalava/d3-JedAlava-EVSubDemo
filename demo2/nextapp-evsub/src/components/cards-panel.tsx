import { CarCard } from "@/components/car-card";
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";

interface CardsPanelProps {
  width: number;
  height: number;
}

export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  const { 
    carCardStates,
  } = useCarGroupStore();

  return (
    
    <div className="flex-grow relative">
      {carCardStates.map((cardState, index) => (
        <div 
          key={`car-card-${index}`}
          className="absolute transition-all duration-500 ease-in-out" 
          style={{ 
            width: cardState.displayProperties.width,
            // height: cardState.displayProperties.height,
            top: cardState.displayProperties.top || 0,
            left: cardState.displayProperties.left || 0,
            opacity: cardState.displayProperties.opacity !== undefined ? cardState.displayProperties.opacity : 1,
            zIndex: cardState.displayProperties.zIndex || 0,
          }}>
          <CarCard car={cardState} />
        </div>
      ))}
      
    </div>
  );
}
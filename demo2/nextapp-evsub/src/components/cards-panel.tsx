import { CarCard } from "@/components/car-card";
import { useCarsStore } from "@/stores/animations/cards-panel-store";

interface CardsPanelProps {
  width: number;
  height: number;
}

export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  const { 
    carGroupStates,
  } = useCarsStore();

  return (
    
    <div className="flex-grow relative">
      {/* {carCardStates.map((cardState, index) => (
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
      ))} */}
      {
        carGroupStates.map((carGroupState) => (
          
          carGroupState.carStates.map((carState, index) => (
              <div 
                key={`car-card-${index}`}
                className="absolute transition-all duration-500 ease-in-out" 
                style={{ 
                  width: carState.displayProperties.width,
                  // height: cardState.displayProperties.height,
                  top: carState.displayProperties.top || 0,
                  left: carState.displayProperties.left || 0,
                  opacity: carState.displayProperties.opacity !== undefined ? carState.displayProperties.opacity : 1,
                  zIndex: carState.displayProperties.zIndex || 0,
                }}>
                <CarCard car={carState} carGroupName={carGroupState.info.name}/>
              </div>
          ))
        )

      )
    
      }
      
    </div>
  );
}
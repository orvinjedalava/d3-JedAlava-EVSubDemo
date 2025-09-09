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

  return (
    
    <div className="flex-grow relative">
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
              style={{ 
                top: carGroupState.displayCoordinates.chipY,
                left: carGroupState.displayCoordinates.chipX,
                opacity: carGroupState.displayCoordinates.chipOpacity,
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
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
import { CarGroupState } from "@/types";
import { CarCard } from "@/components/car-card";

export const CarGroupPanel = ({ carGroupState }: { carGroupState: CarGroupState }) => {
  return (
    <div>
      {carGroupState.carStates.map((carState) => (
        <div 
          key={`car-card-${carState.info.title}`}
          className="absolute transition-all duration-500 ease-in-out" 
          style={{ 
            width: carState.displayProperties.boundingBox.width,
            // height: carState.displayProperties.boundingBox.height,
            top: carState.displayProperties.boundingBox.top || 0,
            left: carState.displayProperties.boundingBox.left || 0,
            opacity: carState.displayProperties.opacity !== undefined ? carState.displayProperties.opacity : 1,
            zIndex: carState.displayProperties.zIndex || 0,
          }}
        >
          <CarCard car={carState} carGroupName={carGroupState.info.name} />
        </div>
      ))}
    </div>
  );
}
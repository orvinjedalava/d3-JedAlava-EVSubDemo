import { CarGroupState } from "@/types";
import { CarCard } from "@/components/car-card";

interface CarGroupPanelProps {
  carGroupState: CarGroupState;
  isFromCarPark?: boolean;
}

export const CarGroupPanel = ({ carGroupState, isFromCarPark = false }: CarGroupPanelProps) => {
  return (
    <div>
      {carGroupState.carStates.map((carState) => (
        <div 
          key={`car-card-${carState.info.title}`}
          className={`absolute  ${
            carState.displayProperties.opacity === 1 ? 'car-card-appear-delay' : 'car-card-default'
          }`}
          style={{ 
            width: carState.displayProperties.boundingBox.width,
            // height: carState.displayProperties.boundingBox.height,
            top: carState.displayProperties.boundingBox.top || 0,
            left: carState.displayProperties.boundingBox.left || 0,
            opacity: carState.displayProperties.opacity,
            zIndex: carState.displayProperties.zIndex || 0,
            transform: `rotate(${carState.displayProperties.rotateAngle}deg)`,
            transformOrigin: 'center',
          }}
        >
          <CarCard carState={carState} carGroupState={carGroupState} isFromCarPark={isFromCarPark} />
        </div>
      ))}
    </div>
  );
}
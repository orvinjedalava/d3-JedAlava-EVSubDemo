import { CarCard } from "@/components/car-card";
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
          <CarGroupPanel key={`car-group-${carGroupState.info.name}`} carGroupState={carGroupState} />
        ))
      }
      
    </div>
  );
}
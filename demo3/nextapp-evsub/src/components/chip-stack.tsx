import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";

export const ChipStack = () => {
  const { 
    chipCrumbStack,
    setCarGroupSelected, 
  } = useCarsStore(state => state);

  return (
    <div className="absolute top-[10px] left-[10px] flex flex-row gap-1">
      {chipCrumbStack.map((crumb, index) => (
        <Chip 
          key={index}
          onClose={() => setCarGroupSelected(crumb.carGroupState.info.name, false)}
        >
          {crumb.carGroupState.info.name}
        </Chip>
      ))}
    </div>
  );
};
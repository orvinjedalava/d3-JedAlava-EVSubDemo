import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";

export const ChipStack = () => {
  const { 
    chipCrumbStack,
    setCarGroupSelected, 
    setCarStateIsExpanded,
  } = useCarsStore(state => state);

  return (
    <div className="absolute top-[10px] left-[10px] flex flex-row gap-1">
      {chipCrumbStack.map((crumb, index) => (
        <Chip
          key={index}
          onClose={() => {
            console.log('Closing crumb:', crumb); 
            if (crumb.carState && crumb.carGroupState)
            {
              console.log('Setting car state to not expanded:', crumb.carState.info.title);
              setCarStateIsExpanded(crumb.carGroupState.info.name, crumb.carState.info.title, false)
            }
            else if (crumb.carGroupState) 
            {
              setCarGroupSelected(crumb.carGroupState.info.name, false) 
            }
            
          }}
        >
          { crumb.carState ? crumb.carState.info.title : crumb.carGroupState?.info.name}
        </Chip>
      ))}
    </div>
  );
};
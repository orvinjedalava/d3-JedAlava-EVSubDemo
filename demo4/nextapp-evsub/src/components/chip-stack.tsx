import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { ChipCrumb } from "@/types";

export const ChipStack = () => {
  const { 
    chipCrumb,
    setCarGroupSelected, 
    setCarStateIsExpanded,
    removeSuggestion,
    setCarStateFromLastSuggestion
  } = useCarsStore(state => state);

  // Create an array to hold our chip components
  const chipComponents: React.ReactNode[] = [];
  
  // Use a counter for unique keys
  let index = 0;
  
  // Start with the current chipCrumb
  let currentCrumb: ChipCrumb | undefined = chipCrumb;
  
  // Traverse the linked list until we reach undefined
  while (currentCrumb) {
    // Only process crumbs that have a carGroupState
    if (currentCrumb.carGroupStates) {
      const crumb = currentCrumb; // Create a constant reference for the closure
      
      chipComponents.push(
        <motion.div
          key={`motion-crumb-${index}`} 
          initial="initial"
          animate={motionOpacity.animate}
          variants={motionOpacity}
          transition={{ duration: 0.5 }}
        >
          <Chip
            key={`crumb-${index}`} 
            onClose={async () => {
              if (crumb.selectedCarState && crumb.selectedCarGroupState) {
                setCarStateIsExpanded(crumb.selectedCarGroupState.info.id, crumb.selectedCarState.info.id, false);
              } else if (crumb.selectedCarGroupState) {
                setCarGroupSelected(crumb.selectedCarGroupState.info.id, false);
              } else {
                removeSuggestion(crumb.id);
                await setCarStateFromLastSuggestion();
              }
            }}
          >
            {crumb.selectedCarState ? 
            crumb.selectedCarState.info.title 
            : crumb.selectedCarGroupState?.info.name || crumb.suggestion}
          </Chip>
        </motion.div>
      );
      
      index++;
    }
    
    // Move to the next crumb in the linked list
    currentCrumb = currentCrumb.chipCrumb;
  }

  return (
    <div className="absolute top-[10px] left-[10px] flex flex-row gap-1">
      {chipComponents}
    </div>
  );
};

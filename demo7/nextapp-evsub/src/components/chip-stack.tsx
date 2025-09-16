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
    setCarStateFromLastSuggestion,
    setFavoriteCarStateIsExpanded
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
            className='bg-white/40 border border-[#ababab] rounded-[8px]'
            key={`crumb-${index}`} 
            onClose={async () => {
              if (crumb.selectedCarState && crumb.selectedCarGroupState) {
                
                if (crumb.isFavoriteCrumb) {
                  // Handle favorite crumb removal
                  setFavoriteCarStateIsExpanded(crumb.selectedCarState.info.id, false);
                  console.log(`Removing crumb for favorite ${crumb.selectedCarState.info.title}`);
                } else {
                  // Handle regular crumb removal
                  setCarStateIsExpanded(crumb.selectedCarGroupState.info.id, crumb.selectedCarState.info.id, false);
                  console.log(`Removing crumb for car ${crumb.selectedCarState.info.title}`);
                }
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
            : crumb.selectedCarGroupState?.info.name || crumb.suggestion.name}
          </Chip>
        </motion.div>
      );
      
      index++;
    }
    
    // Move to the next crumb in the linked list
    currentCrumb = currentCrumb.chipCrumb;
  }

  return (
    <div className="absolute top-[24px] left-[100px] flex flex-row gap-4">
      {chipComponents}
    </div>
  );
};

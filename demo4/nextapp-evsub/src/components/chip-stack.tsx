import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';

export const ChipStack = () => {
  const { 
    chipCrumbStack,
    setCarGroupSelected, 
    setCarStateIsExpanded,
  } = useCarsStore(state => state);

  return (
    <div className="absolute top-[10px] left-[10px] flex flex-row gap-1">
      {chipCrumbStack.map((crumb, index) => (
        <motion.div
          key={`motion-crumb-${index}`} 
          initial="initial"
          animate={ motionOpacity.animate }
          variants={motionOpacity}
          transition={{ duration: 0.5 }}
        >
          <Chip
            key={`crumb-${index}`} 
            onClose={() => {
              if (crumb.carState && crumb.carGroupState)
              {
                setCarStateIsExpanded(crumb.carGroupState.info.id, crumb.carState.info.id, false)
              }
              else if (crumb.carGroupState) 
              {
                setCarGroupSelected(crumb.carGroupState.info.name, false) 
              }
              
            }}
          >
            { crumb.carState ? crumb.carState.info.title : crumb.carGroupState?.info.name}
          </Chip>
        </motion.div>
      ))}
    </div>
  );
};
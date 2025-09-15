import type { Suggestions } from '@/types';
import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';

export const SuggestionsPanel = () => {
  const { 
    suggestions,
    getCarGroupsFrom,
  } = useCarsStore();

  return (
    <div
      className={`absolute top-[810px] left-[120px] min-w-[1300px] max-w-[1300px] min-h-[100px] 
        flex flex-col items-center justify-center
        `}
    >
      { suggestions && suggestions.groups &&  suggestions.groups.length > 0 && (
        <motion.div
          key={`motion-car-group-suggestions`} 
          initial="initial"
          animate={motionOpacity.animate}
          variants={motionOpacity}
          transition={{ duration: 0.5 }}
        >
          <span 
            className="text-red-500 font-bold mb-1"
          >
            {suggestions.name}
          </span>
          <div className="flex flex-row gap-2 overflow-x-auto p-2">
            {suggestions.groups.map((suggestion) => (
              <Chip 
                key={`suggestion-name-${suggestion.name}`} 
                className="cursor-pointer" 
                onClick={() => getCarGroupsFrom(suggestion.name)}
              >
                {suggestion.name}
              </Chip>
            ))}
          </div>
        </motion.div>
      )}
      
    </div>
  );
};

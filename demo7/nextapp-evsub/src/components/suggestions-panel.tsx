'use client';

import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { AnimatePresence, motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';

export const SuggestionsPanel = () => {
  const { 
    suggestions,
    getCarGroupsFrom,
  } = useCarsStore();

  return (
    <div
      className={`absolute top-[785px] left-[120px] min-w-[1300px] max-w-[1300px] min-h-[100px] 
        flex flex-col items-center justify-center
        `}
    >
      <AnimatePresence mode="wait">
        {suggestions && suggestions.groups && suggestions.groups.length > 0 && (
          <motion.div
            key={`motion-car-group-suggestions-${suggestions.name}`} 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={motionOpacity}
            transition={{ duration: 0.5 }}
          >
            <span 
              className="text-primary font-bold mb-1"
            >
              {suggestions.name}
            </span>
            <div className="flex flex-row gap-2 overflow-x-auto p-2">
              {suggestions.groups.map((suggestion) => (
                <motion.div
                  key={`motion-suggestion-name-${suggestion.name}`}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={motionOpacity}
                  transition={{ duration: 0.5 }}
                >
                  <Chip 
                    key={`suggestion-name-${suggestion.shortName}`} 
                    className="cursor-pointer rounded-[8px] bg-white/40 border border-[#ababab]" 
                    onClick={() => getCarGroupsFrom(suggestion)}
                  >
                    {suggestion.name}
                  </Chip>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

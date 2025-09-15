'use client';

import type { Suggestions } from '@/types';
import { Chip } from "@heroui/chip";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { AnimatePresence, motion } from 'framer-motion';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { useTransitionState } from 'next-transition-router';

export const SuggestionsPanel = () => {
  const { 
    suggestions,
    getCarGroupsFrom,
  } = useCarsStore();

  const { stage } = useTransitionState();

  return (
    <AnimatePresence>
    <div
      className={`absolute top-[810px] left-[120px] min-w-[1300px] max-w-[1300px] min-h-[100px] 
        flex flex-col items-center justify-center
        `}
    >
      { suggestions && suggestions.groups &&  suggestions.groups.length > 0 && (
        <motion.div
          key={`motion-car-group-suggestions`} 
          initial="initial"
          animate={ stage === 'leaving' ? motionOpacity.exit : motionOpacity.animate }
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
              <motion.div
                key={`motion-suggestion-name-${suggestion.name}`}
                animate={ stage === 'leaving' ? motionOpacity.exit : motionOpacity.animate }
                exit={motionOpacity.exit}
                variants={motionOpacity}
                transition={{ duration: 0.5 }}
              >
                <Chip 
                  key={`suggestion-name-${suggestion.name}`} 
                  className="cursor-pointer" 
                  onClick={() => getCarGroupsFrom(suggestion.name)}
                >
                  {suggestion.name}
                </Chip>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      
    </div>
    </AnimatePresence>
  );
};

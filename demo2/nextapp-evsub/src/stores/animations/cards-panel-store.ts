import { create } from 'zustand';
import type { CarCardState, CarGroupState, CarGroupCoordinates, CarCardDisplayProperties, CardDisplayMode  } from '@/types';

export const useCarGroupStore = create<CarGroupState>((set) => ({
  carCardStates: new Array<CarCardState>(),

  setCarCardStates: (carCardStates) => set({ carCardStates }),

  setCarCardPosition: (index: number, displayProperties: CarCardDisplayProperties ) => set((state) => {
    const updatedCarCardStates = [...state.carCardStates];
    if (index >= 0 && index < updatedCarCardStates.length) {
      updatedCarCardStates[index] = {
        ...updatedCarCardStates[index],
        displayProperties: { ...updatedCarCardStates[index].displayProperties, ...displayProperties }
      };
    }
    return {
      carCardStates: updatedCarCardStates
    };
  }),

  setCarCardMode: (index: number, mode: CardDisplayMode) => set((state) => {
    const updatedCarCardStates = [...state.carCardStates];
    if (index >= 0 && index < updatedCarCardStates.length) {
      updatedCarCardStates[index] = {
        ...updatedCarCardStates[index],
        displayMode: mode
      };
    }
    return {
      carCardStates: updatedCarCardStates
    };
  })
}));

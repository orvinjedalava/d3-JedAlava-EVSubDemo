import { create } from 'zustand';
import type { CarCardState, CarGroupState, CarGroupCoordinates  } from '@/types';

// export const useCarCardStore = create<CarCardState>((set) => ({
//   width: 250,
//   height: 300,
//   top: 0,
//   left: 0,
//   setDimensions: (width, height, top, left, opacity) => set({ width, height, top, left, opacity }),
// }));

export const useCarGroupStore = create<CarGroupState>((set) => ({
  carCardStates: new Array<CarCardState>(),
  setCarCards: (carCardStates) => set({ carCardStates }),
}));

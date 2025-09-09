import { create } from 'zustand';
import type { CarState, CarGroupState, CarGroupCoordinates, CarDisplayProperties, CardDisplayMode, CarGroupInfo, CarsState  } from '@/types';

// export const useCarGroupStore = create<CarGroupState>((set) => ({
//   carCardStates: new Array<CarState>(),

//   setCarCardStates: (carCardStates) => set({ carCardStates }),

//   setCarCardPosition: (index: number, displayProperties: CarDisplayProperties ) => set((state) => {
//     const updatedCarCardStates = [...state.carCardStates];
//     if (index >= 0 && index < updatedCarCardStates.length) {
//       updatedCarCardStates[index] = {
//         ...updatedCarCardStates[index],
//         displayProperties: { ...updatedCarCardStates[index].displayProperties, ...displayProperties }
//       };
//     }
//     return {
//       carCardStates: updatedCarCardStates
//     };
//   }),

//   setCarCardMode: (index: number, mode: CardDisplayMode) => set((state) => {
//     const updatedCarCardStates = [...state.carCardStates];
//     if (index >= 0 && index < updatedCarCardStates.length) {
//       updatedCarCardStates[index] = {
//         ...updatedCarCardStates[index],
//         displayMode: mode
//       };
//     }
//     return {
//       carCardStates: updatedCarCardStates
//     };
//   })
// }));

export const useCarsStore = create<CarsState>((set) => ({
  carGroupStates: new Array<CarGroupState>(),
  setCarGroupStates: (carGroupStates) => set({ carGroupStates }),

  setCarStates: (carGroupName: string, carStates: CarState[]) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates
    };
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarPosition: (carGroupName: string, carInfoTitle: string, displayProperties: CarDisplayProperties) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];

    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);
    if (index >= 0 && index < updatedCarStates.length) {
      updatedCarStates[index] = {
        ...updatedCarStates[index],
        displayProperties: { ...updatedCarStates[index].displayProperties, ...displayProperties }
      };
    }

    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarDisplayMode: (carGroupInfoName: string, carInfoTitle: string, mode: CardDisplayMode) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupInfoName);
    if (!carGroupState) return state;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];

    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);

    if (index >= 0 && index < updatedCarStates.length) {
      updatedCarStates[index] = {
        ...updatedCarStates[index],
        displayMode: mode
      };
    }

    
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarGroupChipPosition: (carGroupName: string, chipX: number, chipY: number, chipOpacity: number) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarGroupState = {
      ...carGroupState,
      displayCoordinates: {
        ...carGroupState.displayCoordinates,
        chipX,
        chipY,
        chipOpacity
      }
    };
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = updatedCarGroupState;
    return {
      carGroupStates: updatedCarGroupStates
    };
  })
}));

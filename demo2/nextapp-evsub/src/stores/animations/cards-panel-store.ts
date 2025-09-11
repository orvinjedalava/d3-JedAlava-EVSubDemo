import { create } from 'zustand';
import type { 
  CarState, 
  CarGroupState, 
  CarGroupDisplayProperties, 
  CarDisplayProperties, 
  CarGroupInfo, 
  CarsState,
  ChipState  
} from '@/types';

import { CardDisplayMode } from '@/types';

import { refreshClientSize } from '@/utils/state-helpers';

export const useCarPanelDimensionsStore = create<{
  width: number;
  height: number;
  setDimensions: (width: number, height: number) => void;
}>((set) => ({

  width: 0,
  height: 0,
  setDimensions: (width: number, height: number) => set({ width, height }),
}));

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

  setCarGroupDisplayMode: (carGroupInfoName: string, mode: CardDisplayMode) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupInfoName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = carGroupState.carStates.map((carState) => ({
      ...carState,
      displayMode: mode
    }));
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateIsExpanded: (carGroupInfoName: string, carInfoTitle: string, isExpanded: boolean, clientWidth: number, clientHeight: number) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupInfoName);
    
    if (!carGroupState) return state;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];

    updatedCarStates.forEach(carState => { carState.isExpanded = false });

    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);

    if (index >= 0 && index < updatedCarStates.length) {
      updatedCarStates[index] = {
        ...updatedCarStates[index],
        isExpanded
      };
    }

    
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };

    refreshClientSize(updatedCarGroupStates, clientWidth, clientHeight);

    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateOnTop: (carGroupName: string, carInfoTitle: string, clientWidth: number, clientHeight: number) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);

    if (!carGroupState) return state;

    const carState = carGroupState.carStates.find((carState) => carState.info.title === carInfoTitle); 

    if (!carState) return state;

    const originalCarStateTargetPriority = carState.priority;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];
    // const maxZIndex = Math.max(...updatedCarStates.map(carState => carState.displayProperties.zIndex || 0));
    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);
    if (updatedCarStates[index].priority === 1) {
      // Already on top
      return state;
    }

    updatedCarStates[index] = {
      ...updatedCarStates[index],
      priority: 0
    };

    // // How do I switch the carState priority between the carState with index and carState with priority = 1?
    // if (index >= 0 && index < updatedCarStates.length) {
    //   const carStateTarget = updatedCarStates[index];
    //   const carStateWithPriorityOneIndex = updatedCarStates.findIndex(carState => carState.priority === 1);
    //   if (carStateWithPriorityOneIndex >= 0 && carStateWithPriorityOneIndex < updatedCarStates.length) {
    //     // // Swap priorities
    //     // updatedCarStates[carStateWithPriorityOneIndex] = {
    //     //   ...updatedCarStates[carStateWithPriorityOneIndex],
    //     //   priority: carStateTarget.priority
    //     // };

        
    //   }
    // }

    // I need to loop through all carStates inside updatedCarStates and increment their priority by 1
    updatedCarStates.forEach((carState, idx) => {
      updatedCarStates[idx] = {
          ...carState,
          priority: originalCarStateTargetPriority === carState.priority ? 0 
          : originalCarStateTargetPriority < carState.priority ? carState.priority : carState.priority + 1
        };
    });

    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };

    refreshClientSize(updatedCarGroupStates, clientWidth, clientHeight);

    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarGroupChipPosition: (carGroupName: string, chipState: ChipState) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarGroupState = {
      ...carGroupState,
      displayCoordinates: {
        ...carGroupState.displayProperties,
        
      },
      chipState: {
        ...carGroupState.chipState,
        boundingBox: {
          top: chipState.boundingBox.top,
          left: chipState.boundingBox.left,
          width: chipState.boundingBox.width,
          height: chipState.boundingBox.height
        },
        opacity: chipState.opacity
      }
    };
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = updatedCarGroupState;
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarGroupSelected: (carGroupName: string, isSelected: boolean) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarGroupState = {
      ...carGroupState,
      isSelected
    };
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = updatedCarGroupState;
    return {
      carGroupStates: updatedCarGroupStates
    };
  }),

  refreshClientSize: (clientWidth: number, clientHeight: number) => set((state) => {
    refreshClientSize(state.carGroupStates, clientWidth, clientHeight);
    return state;
  }),

}));

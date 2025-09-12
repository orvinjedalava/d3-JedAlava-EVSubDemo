import { create } from 'zustand';
import type { 
  CarState, 
  CarGroupState, 
  CarsState,
  ChipState,
  ChipCrumb,  
} from '@/types';

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
  chipCrumbStack: new Array<ChipCrumb>(),

  setCarGroupStates: (carGroupStates) => set({ carGroupStates }),

  setChipCrumbStack: (chipCrumbStack: ChipCrumb[]) => set({ chipCrumbStack }),

  setCarStateIsExpanded: (carGroupInfoId: string, carInfoId: string, isExpanded: boolean) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.id === carGroupInfoId);
    if (!carGroupState) return state;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];

    updatedCarStates.forEach(carState => { carState.isExpanded = false });

    const index = updatedCarStates.findIndex((carState) => carState.info.id === carInfoId);

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

    if (isExpanded) {
      const carState = carGroupState.carStates.find((carState) => carState.info.id === carInfoId);
      
      if (carState) {
        const originalCarStateTargetPriority = carState.priority;

        updatedCarStates[index] = {
          ...updatedCarStates[index],
          priority: 0,
          // isFlipped: false,
        };

        // I need to loop through all carStates inside updatedCarStates and increment their priority by 1
        updatedCarStates.forEach((carState, idx) => {
          updatedCarStates[idx] = {
              ...carState,
              priority: originalCarStateTargetPriority === carState.priority ? 0 
              : originalCarStateTargetPriority < carState.priority ? carState.priority : carState.priority + 1
            };
        });
      }
      
    }

    // I need to add the updatedCarGroupState to chipCrumbStack if isSelected is true and remove it if isSelected is false
    let updatedChipCrumbStack = [...state.chipCrumbStack];
    if (isExpanded) {
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
      updatedChipCrumbStack.push({
        carGroupState: updatedCarGroupStates[carGroupIdx],
        carState: updatedCarStates[index]
      });
    } else {
      updatedChipCrumbStack = updatedChipCrumbStack.filter(
        crumb => !crumb.carState
      );
    }

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      chipCrumbStack: updatedChipCrumbStack,
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateIsFlipped: (carGroupInfoId: string, carInfoId: string, isFlipped: boolean) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.id === carGroupInfoId);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];
    const index = updatedCarStates.findIndex((carState) => carState.info.id === carInfoId);

    if (updatedCarStates[index].priority === 1) {
      // Already on top
      return state;
    }

    if (index >= 0 && index < updatedCarStates.length) {
      updatedCarStates[index] = {
        ...updatedCarStates[index],
        isFlipped
      };
    }
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates: updatedCarStates
    };

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateOnTop: (carGroupInfoId: string, carInfoId: string) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.id === carGroupInfoId);

    if (!carGroupState) return state;

    const carState = carGroupState.carStates.find((carState) => carState.info.id === carInfoId);

    if (!carState) return state;

    const originalCarStateTargetPriority = carState.priority;

    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];
    // const maxZIndex = Math.max(...updatedCarStates.map(carState => carState.displayProperties.zIndex || 0));
    const index = updatedCarStates.findIndex((carState) => carState.info.id === carInfoId);
    if (updatedCarStates[index].priority === 1) {
      // Already on top
      return state;
    }

    updatedCarStates[index] = {
      ...updatedCarStates[index],
      priority: 0,
      isFlipped: false,
    };

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

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
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

    // need to set all carStates.isExpanded = false 
    const updatedCarStates = carGroupState.carStates.map((carState) => ({
      ...carState,
      isExpanded: false
    }));

    Object.assign(updatedCarGroupState, {
      carStates: updatedCarStates
    });
    
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = updatedCarGroupState;

    // I need to add the updatedCarGroupState to chipCrumbStack if isSelected is true and remove it if isSelected is false
    let updatedChipCrumbStack = [...state.chipCrumbStack];
    if (isSelected) {
      updatedChipCrumbStack.push({
        carGroupState: updatedCarGroupState
      });
    } else {
      updatedChipCrumbStack = updatedChipCrumbStack.filter(
        crumb => crumb.carGroupState && crumb.carGroupState.info.name !== carGroupName
      );
    }

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      chipCrumbStack: updatedChipCrumbStack,
      carGroupStates: updatedCarGroupStates
    };
  }),

  refreshClientSize: (clientWidth: number, clientHeight: number) => set((state) => {
    refreshClientSize(state.carGroupStates, clientWidth, clientHeight);
    return state;
  }),

}));

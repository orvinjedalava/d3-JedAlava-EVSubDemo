import { create } from 'zustand';
import type { 
  CarState, 
  CarGroupState, 
  CarGroupDisplayProperties, 
  CarDisplayProperties, 
  CarGroupInfo, 
  CarsState,
  ChipState,
  ChipCrumb,  
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
  chipCrumbStack: new Array<ChipCrumb>(),

  setCarGroupStates: (carGroupStates) => set({ carGroupStates }),

  setChipCrumbStack: (chipCrumbStack: ChipCrumb[]) => set({ chipCrumbStack }),

  setCarStates: (carGroupName: string, carStates: CarState[]) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    updatedCarGroupStates[updatedCarGroupStates.indexOf(carGroupState)] = {
      ...carGroupState,
      carStates
    };
    return {
      ...state,
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
      ...state,
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateIsExpanded: (carGroupInfoName: string, carInfoTitle: string, isExpanded: boolean) => set((state) => {
    console.log('setCarStateIsExpanded called with:', carGroupInfoName, carInfoTitle, isExpanded);

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

    if (isExpanded) {
      const carState = carGroupState.carStates.find((carState) => carState.info.title === carInfoTitle); 
      
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
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.name === carGroupInfoName);
      updatedChipCrumbStack.push({
        carGroupState: updatedCarGroupStates[carGroupIdx],
        carState: updatedCarStates[index]
      });
    } else {
      updatedChipCrumbStack = updatedChipCrumbStack.filter(
        crumb => !crumb.carState
      );
    }

    console.log('Updated chipCrumbStack:', updatedChipCrumbStack);

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      chipCrumbStack: updatedChipCrumbStack,
      carGroupStates: updatedCarGroupStates
    };
  }),

  setCarStateIsFlipped: (carGroupInfoName: string, carInfoTitle: string, isFlipped: boolean, clientWidth: number, clientHeight: number) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.name === carGroupInfoName);
    if (!carGroupState) return state;
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];
    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);

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
    refreshClientSize(updatedCarGroupStates, clientWidth, clientHeight);
    return {
      ...state,
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

    refreshClientSize(updatedCarGroupStates, clientWidth, clientHeight);

    return {
      ...state,
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

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
    const updatedCarGroupStates = [...state.carGroupStates];
    const updatedCarStates = [...carGroupState.carStates];
    // const maxZIndex = Math.max(...updatedCarStates.map(carState => carState.displayProperties.zIndex || 0));
    const index = updatedCarStates.findIndex((carState) => carState.info.title === carInfoTitle);

    // How do I set the carState with index to be the last carState inside updatedCarStates.carStates array?
    // One way is to remove it from its current position and push it to the end of the array
    if (index >= 0 && index < updatedCarStates.length) {
      const [carState] = updatedCarStates.splice(index, 1);
      updatedCarStates.push(carState);
    }

    // if (index >= 0 && index < updatedCarStates.length) {
    //   updatedCarStates[index] = {
    //     ...updatedCarStates[index],
    //     displayProperties: {
    //       ...updatedCarStates[index].displayProperties,
    //       zIndex: maxZIndex + 1
    //     }
    //   };
    // } 
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

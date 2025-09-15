import { create } from 'zustand';
import type { 
  CarState, 
  CarGroupState, 
  CarsState,
  ChipState,
  ChipCrumb,
  Suggestions,
    
} from '@/types';

import { refreshClientSize, addToChipCrumb, removeFromChipCrumb, generateCarGroupStatesFrom } from '@/utils/state-helpers';
import { getCarGroupsFrom } from '@/actions/get-cars';

export const useCarPanelDimensionsStore = create<{
  width: number;
  height: number;
  setDimensions: (width: number, height: number) => void;
}>((set) => ({

  width: 0,
  height: 0,
  setDimensions: (width: number, height: number) => set({ width, height }),
}));

export const useCarsStore = create<CarsState>((set, get) => ({
  carGroupStates: new Array<CarGroupState>(),
  chipCrumb: {} as ChipCrumb,
  suggestions: {} as Suggestions,
  currentSuggestion: '' as string,

  setCarGroupStates: (carGroupStates) => set({ carGroupStates }),

  setChipCrumb: (chipCrumb: ChipCrumb) => set({ chipCrumb }),

  setSuggestions: (suggestions: Suggestions) => set({ suggestions }),

  setCurrentSuggestion: (suggestion: string) => set({ currentSuggestion: suggestion }),

  getCarGroupsFrom: async (suggestion: string) => {
    const carGroupInfos = await getCarGroupsFrom(suggestion);

    const { width, height } = useCarPanelDimensionsStore.getState();
    const retrievedCarGroupStates = generateCarGroupStatesFrom(carGroupInfos, width, height);

    set({ currentSuggestion: suggestion });

    console.log('Fetched car groups from suggestion:', get().currentSuggestion, retrievedCarGroupStates);

    // Update the store with the combined data
    set({ carGroupStates: retrievedCarGroupStates });

    let updatedChipCrumb = structuredClone(get().chipCrumb);
    addToChipCrumb(updatedChipCrumb, get().currentSuggestion, retrievedCarGroupStates, undefined, undefined);


    // let updatedChipCrumb = structuredClone(state.chipCrumb);
    // if (isSelected) {
    //   const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
    //   addToChipCrumb(updatedChipCrumb, updatedCarGroupStates[carGroupIdx], undefined);

    // } else {
    //   removeFromChipCrumb(updatedChipCrumb, carGroupInfoId, undefined);
    // }

  },

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

    let updatedChipCrumb = structuredClone(state.chipCrumb);
    if (isExpanded) {
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
      addToChipCrumb(updatedChipCrumb, get().currentSuggestion, updatedCarGroupStates, updatedCarGroupStates[carGroupIdx], updatedCarStates[index]);

    } else {
      removeFromChipCrumb(updatedChipCrumb, carGroupInfoId, carInfoId);
    }

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      chipCrumb: updatedChipCrumb,
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

  setCarGroupSelected: (carGroupInfoId: string, isSelected: boolean) => set((state) => {
    const carGroupState = state.carGroupStates.find((group) => group.info.id === carGroupInfoId);
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

    let updatedChipCrumb = structuredClone(state.chipCrumb);
    if (isSelected) {
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
      addToChipCrumb(updatedChipCrumb, get().currentSuggestion, updatedCarGroupStates, updatedCarGroupStates[carGroupIdx], undefined);

    } else {
      removeFromChipCrumb(updatedChipCrumb, carGroupInfoId, undefined);
    }

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(updatedCarGroupStates, width, height);

    return {
      ...state,
      chipCrumb: updatedChipCrumb,
      carGroupStates: updatedCarGroupStates
    };
  }),

  refreshClientSize: () => set((state) => {
    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(state.carGroupStates, width, height);
    return state;
  }),

}));

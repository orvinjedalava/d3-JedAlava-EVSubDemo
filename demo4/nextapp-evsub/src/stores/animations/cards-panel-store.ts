import { create } from 'zustand';
import type { 
  CarState, 
  CarGroupState, 
  CarsState,
  ChipState,
  ChipCrumb,
  Suggestions,
  Suggestion,
    
} from '@/types';

import { 
  refreshClientSize, 
  addToChipCrumb, 
  removeFromChipCrumb, 
  generateCarGroupStatesFrom,
  getLastChipCrumb,
  getSelectedSuggestionCount,
  removeSuggestionFromChipCrumb,
  createChipCrumbRoot, 
  isEmptyChipCrumb,
} from '@/utils/state-helpers';

import { 
  getCarGroupsFrom, 
  getSuggestions } from '@/actions/get-cars';

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
  chipCrumb: undefined as ChipCrumb | undefined,
  suggestions: {} as Suggestions,
  currentSuggestion: {} as Suggestion,

  setCarGroupStates: (carGroupStates) => set({ carGroupStates }),

  setChipCrumb: (chipCrumb: ChipCrumb) => set({ chipCrumb }),

  setSuggestions: (suggestions: Suggestions) => set({ suggestions }),

  setCurrentSuggestion: (suggestion: Suggestion) => set({ currentSuggestion: suggestion }),

  getCarGroupsFrom: async (suggestion: Suggestion) => {
    const retrievedCarGroupInfos = await getCarGroupsFrom(suggestion.name, getSelectedSuggestionCount(get().chipCrumb));
    
    const retrievedCarGroupStates = generateCarGroupStatesFrom(retrievedCarGroupInfos);

    const retrievedSuggestions = await getSuggestions(suggestion.name, getSelectedSuggestionCount(get().chipCrumb) + 1);

    let updatedChipCrumb : ChipCrumb | undefined = undefined;
    
    if (isEmptyChipCrumb(get().chipCrumb)) {
      updatedChipCrumb = createChipCrumbRoot(retrievedSuggestions, suggestion, retrievedCarGroupStates);
    }
    else {
      updatedChipCrumb = structuredClone(get().chipCrumb)!;
      updatedChipCrumb = addToChipCrumb(updatedChipCrumb, retrievedSuggestions, suggestion, retrievedCarGroupStates, undefined, undefined);
    }

    // Update the store with the combined data
    set({ 
      currentSuggestion: suggestion,
      carGroupStates: retrievedCarGroupStates,
      chipCrumb: updatedChipCrumb,
      suggestions: retrievedSuggestions
    });

    const { width, height } = useCarPanelDimensionsStore.getState();
    refreshClientSize(retrievedCarGroupStates, width, height);
    
  },

  removeSuggestion: (crumbId: string) => set((state) => {
    if (state.chipCrumb === undefined) {
      return state;
    }

    let updatedChipCrumb = structuredClone(state.chipCrumb);

    const result =  removeSuggestionFromChipCrumb(updatedChipCrumb, crumbId)

    return {
      ...state,
      chipCrumb: result,
    };
  }),

  setCarStateFromLastSuggestion: async () => {
    const state = get();
    
    const lastCrumb = !state.chipCrumb || getLastChipCrumb(state.chipCrumb);
    
    if (!lastCrumb || lastCrumb === true || !lastCrumb.id || !lastCrumb.suggestion) {
      const retrievedSuggestions = await getSuggestions('', 0 );

      set({
        chipCrumb: {} as ChipCrumb,
        suggestions: retrievedSuggestions,
        carGroupStates: [],
        currentSuggestion: {} as Suggestion
      });
    }
    else {

      set({
      suggestions: lastCrumb.parentSuggestions,
      carGroupStates: lastCrumb.carGroupStates,
      currentSuggestion: lastCrumb.suggestion
    });
    }
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
    if (isExpanded && updatedChipCrumb) {
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
      addToChipCrumb(updatedChipCrumb, get().suggestions, get().currentSuggestion, updatedCarGroupStates, updatedCarGroupStates[carGroupIdx], updatedCarStates[index]);

    } else if (updatedChipCrumb) {
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
    if (isSelected && updatedChipCrumb) {
      const carGroupIdx = updatedCarGroupStates.findIndex((carGroup) => carGroup.info.id === carGroupInfoId);
      addToChipCrumb(updatedChipCrumb, get().suggestions, get().currentSuggestion, updatedCarGroupStates, updatedCarGroupStates[carGroupIdx], undefined);

    } else if (updatedChipCrumb) {
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

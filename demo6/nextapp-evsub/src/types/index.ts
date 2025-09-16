import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum CardDisplayMode {
  None = 0,
  ShowCriteria = 1 << 0,    // 2 (binary: 0010)
  ShowButton = 1 << 1,   // 4 (binary: 0100)
  Expand = 1 << 2,     // 8 (binary: 1000)
  ClickExpandable = 1 << 3,   // 16 (binary: 10000)
  ClickFlipable = 1 << 4,   // 32 (binary: 100000)
  ShowFavorite = 1 << 5,   // 64 (binary: 1000000)
}

export interface Suggestions {
  name: string;
  groups: Suggestion[];
}

export interface Suggestion {
  name: string;
  shortName: string;
}

export interface CarDisplayProperties {
  boundingBox: BoundingBox;
  opacity: number;
  zIndex: number;
  displayMode: CardDisplayMode;
  rotateAngle: number;
  favoriteBoxWidth?: number;
}

export interface CarInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  criteria: Record<string, string>;
}

export interface CarState {
  displayProperties: CarDisplayProperties;
  info: CarInfo;
  isExpanded: boolean;
  isClickable: boolean;
  priority: number;
  isFlipped: boolean;
  isFavorite: boolean;
}

export interface CarGroupInfo {
  id: string;
  name: string;
  carInfos: CarInfo[];
}

export interface CarGroupState {
  carStates: CarState[];
  info: CarGroupInfo;
  displayProperties: CarGroupDisplayProperties;
  chipState: ChipState;
  isSelected: boolean;
}

export interface BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CarGroupDisplayProperties {
  boundingBox: BoundingBox;
} 

export interface ChipState {
  boundingBox: BoundingBox;
  opacity: number;
}

export interface ChipCrumb {
  id: string;
  parentSuggestions: Suggestions;
  suggestion: Suggestion;
  carGroupStates: CarGroupState[];
  selectedCarGroupState?: CarGroupState;
  selectedCarState?: CarState;
  chipCrumb?: ChipCrumb;
  isFavoriteCrumb?: boolean;
}

export interface CarsState {
  carGroupStates: CarGroupState[];
  chipCrumb: ChipCrumb | undefined;
  suggestions: Suggestions;
  currentSuggestion: Suggestion;
  favoriteCars: CarState[];
  favoriteCarGroupState: CarGroupState;

  setCarGroupStates: (carGroupStates: CarGroupState[]) => void;
  setChipCrumb: (chipCrumb: ChipCrumb) => void;

  removeSuggestion: (suggestionId: string) => void;
  setSuggestions: (suggestions: Suggestions) => void;
  setCurrentSuggestion: (suggestion: Suggestion) => void;
  setCarStateFromLastSuggestion: () => Promise<void>;

  setCarStateIsExpanded: (carGroupInfoId: string, carInfoId: string, isExpanded: boolean) => void;
  setCarStateOnTop: (carGroupInfoId: string, carInfoId: string) => void;
  setCarStateIsFlipped: (carGroupInfoId: string, carInfoId: string, isFlipped: boolean) => void;
  
  setCarGroupSelected: (carGroupInfoId: string, isSelected: boolean) => void;
  getCarGroupsFrom: (suggestion: Suggestion) => Promise<void>;

  setFavoriteCar: (carInfoId: CarState) => void;
  toggleFavoriteCar: (carInfoId: CarState) => void;
  setFavoriteCarStateIsExpanded: (carInfoId: string, isExpanded: boolean) => void;

  refreshClientSize: () => void;
}

export interface ChatMessage {
  id: string,
  text: string,
  isUser: boolean,
  timestamp: Date
}
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
}

export interface CarDisplayProperties {
  boundingBox: BoundingBox;
  opacity: number;
  zIndex: number;
  displayMode: CardDisplayMode;
  rotateAngle: number;
}

export interface CarInfo {
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
}

export interface CarGroupInfo {
  id: number;
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

export interface ChipInfo {
  title: string;
}

export interface CarsState {
  carGroupStates: CarGroupState[];

  setCarGroupSelected: (carGroupName: string, isSelected: boolean) => void;

  setCarStates: (carGroupName: string, carStates: CarState[]) => void;
  setCarPosition: (carGroupName: string, carInfoTitle: string, displayProperties: CarDisplayProperties) => void;
  
  setCarStateIsExpanded: (carGroupInfoName: string, carInfoTitle: string, isExpanded: boolean, clientWidth: number, clientHeight: number) => void;
  setCarStateOnTop: (carGroupName: string, carInfoTitle: string, clientWidth: number, clientHeight: number) => void;
  setCarStateIsFlipped: (carGroupInfoName: string, carInfoTitle: string, isFlipped: boolean, clientWidth: number, clientHeight: number) => void;

  setCarGroupChipPosition: (carGroupName: string, chipState: ChipState) => void;
  setCarGroupDisplayMode: (carGroupInfoName: string, mode: CardDisplayMode) => void;
  setCarGroupStates: (carGroupStates: CarGroupState[]) => void;

  refreshClientSize: (clientWidth: number, clientHeight: number) => void;
}

export interface ChatMessage {
  id: string,
  text: string,
  isUser: boolean,
  timestamp: Date
}
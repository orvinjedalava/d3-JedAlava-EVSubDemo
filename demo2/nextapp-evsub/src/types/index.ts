import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum CardDisplayMode {
  None = 0,
  ShowCriteria = 1 << 0,    // 2 (binary: 0010)
  ShowButton = 1 << 1,   // 4 (binary: 0100)
  Expand = 1 << 2     // 8 (binary: 1000)
}

export interface CarCardState {
  displayProperties: CarCardDisplayProperties;
  detail: CarCardDetail;
  displayMode: CardDisplayMode;
}

export interface CarCardDisplayProperties {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  opacity?: number;
  zIndex?: number;
}

export interface CarCardDetail {
  title: string;
  subtitle: string;
  description: string;
  img: string;
  criteria: Record<string, string>;
}

export interface CarGroup {
  id: number;
  name: string;
  cars: CarCardDetail[];
}

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface CarGroupCoordinates {
  cx: number;
  cy: number;
  boundingBox: BoundingBox;
} 

export interface CarGroupState {
  carCardStates: CarCardState[];
  setCarCardStates: (carCardStates: CarCardState[]) => void;
  setCarCardPosition: (index: number, displayProperties: CarCardDisplayProperties) => void;
  setCarCardMode: (index: number, mode: CardDisplayMode) => void;
}

export interface ChatMessage {
  id: string,
  text: string,
  isUser: boolean,
  timestamp: Date
}
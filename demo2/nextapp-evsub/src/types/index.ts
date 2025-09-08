import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum CardDisplayMode {
  Minimum = "minimum",
  ReadOnly = "readonly",
  Clickable = "clickable",
  Expanded = "expanded"
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
  img: string;
  criteria: Record<string, string>;
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
}

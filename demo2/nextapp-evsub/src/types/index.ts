import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CarCardState {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity?: number;
  setDimensions: (width: number, height: number, top: number, left: number, opacity?: number) => void;
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
  setCarCards: (carCardStates: CarCardState[]) => void;
}

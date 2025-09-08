import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CarCardState {
  displayProperties: CarCardDisplayProperties;
  detail: CarCardDetail;
}

export interface CarCardDisplayProperties {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity?: number;
}

export interface CarCardDetail {
  title: string;
  img: string;
  price: string;
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
}

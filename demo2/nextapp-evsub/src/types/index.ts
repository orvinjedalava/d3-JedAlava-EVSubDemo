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

export interface CarDisplayProperties {
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  opacity?: number;
  zIndex?: number;
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
  displayMode: CardDisplayMode;
}

export interface CarGroupInfo {
  id: number;
  name: string;
  carInfos: CarInfo[];
}

export interface CarGroupState {
  carStates: CarState[];
  info: CarGroupInfo;
  displayCoordinates: CarGroupCoordinates;
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
  chipX: number;
  chipY: number;
  chipOpacity: number;
} 

export interface CarsState {
  carGroupStates: CarGroupState[];

  setCarStates: (carGroupName: string, carStates: CarState[]) => void;
  setCarPosition: (carGroupName: string, carInfoTitle: string, displayProperties: CarDisplayProperties) => void;
  setCarGroupStates?: (carGroupStates: CarGroupState[]) => void;
  setCarDisplayMode: (carGroupInfoName: string, carInfoTitle: string, mode: CardDisplayMode) => void;

  setCarGroupChipPosition: (carGroupName: string, chipX: number, chipY: number, chipOpacity: number) => void;
}

export interface ChatMessage {
  id: string,
  text: string,
  isUser: boolean,
  timestamp: Date
}
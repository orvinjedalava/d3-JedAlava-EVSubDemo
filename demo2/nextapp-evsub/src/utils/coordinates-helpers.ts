import type { 
  BoundingBox, 
  CarGroupCoordinates, 
  CarDisplayProperties, 
  CarInfo, 
  CarState,
  CarGroupInfo,
  CarsState,
  CarGroupState } from '@/types';

import { CardDisplayMode } from '@/types';

export const getDisplayCoordinates = (carInfos: CarInfo[]): CarState[] => {
  const carsCoordinates =  [
    { width: 253, height: 350, top: 80, left: 50, opacity: 1 , zIndex: 0},
    { width: 253, height: 350, top: 350, left: 500, opacity: 1 , zIndex: 0},
    // { width: 253, height: 276, top: 0, left: 250, opacity: 1 },
    // { width: 253, height: 276, top: 0, left: 350, opacity: 1 },
  ]

  return carInfos.map((info, index) => {
    // Get the display properties for this card, or use defaults if not available
    const displayProperties = carsCoordinates[index];

    // Return the CarState object with separate info and displayProperties
    return {
      displayProperties,
      info,
      displayMode: CardDisplayMode.ShowCriteria
    };
  });

};

export const generateCarsStateFrom = (carGroupInfos: CarGroupInfo[]): CarGroupState[] => {
  const carsCoordinates =  [
    { width: 253, height: 350, top: 80, left: 50, opacity: 1 , zIndex: 0},
    { width: 253, height: 350, top: 350, left: 500, opacity: 1 , zIndex: 0},
    // { width: 253, height: 276, top: 0, left: 250, opacity: 1 },
    // { width: 253, height: 276, top: 0, left: 350, opacity: 1 },
  ]

  // let result: CarState = {};
  let carGroupState: CarGroupState[] = [];

  carGroupInfos.map((carGroupInfo, index) => {

    let carState: CarState[] = [];

    carGroupInfo.carInfos.forEach((info, idx) => {
      // Get the display properties for this card, or use defaults if not available
      const displayProperties = carsCoordinates[index];
      // Assign display properties to each carInfo
      carState.push({
        displayProperties,
        info,
        displayMode: CardDisplayMode.ShowCriteria
      });
    });

    carGroupState.push({
      carStates: carState,
      info: carGroupInfo,
      displayCoordinates: { cx: 0, cy: 0, boundingBox: { x1: 0, y1: 0, x2: 0, y2: 0 } }
    });
  });

  return carGroupState;
}
import type { 
  BoundingBox, 
  CarGroupDisplayProperties, 
  CarDisplayProperties, 
  CarInfo, 
  CarState,
  CarGroupInfo,
  CarsState,
  CarGroupState } from '@/types';

import { CardDisplayMode } from '@/types';

export const refreshClientSize = (clientWidth: number, clientHeight: number) => {
  console.log('Refreshing client size to:', clientWidth, clientHeight);
}

export const generateCarGroupStatesFrom = (
  carGroupInfos: CarGroupInfo[], 
  clientWidth: number, 
  clientHeight: number): CarGroupState[] => {


  const carsCoordinates =  [
    { width: 253, height: 350, top: 80, left: 50, opacity: 1 , zIndex: 0},
    { width: 253, height: 350, top: 350, left: 500, opacity: 1 , zIndex: 0},
    // { width: 253, height: 276, top: 0, left: 250, opacity: 1 },
    // { width: 253, height: 276, top: 0, left: 350, opacity: 1 },
  ]

  refreshClientSize(clientWidth, clientHeight);

  // let result: CarState = {};
  let carGroupState: CarGroupState[] = [];

  carGroupInfos.map((carGroupInfo, index) => {

    let carState: CarState[] = [];
    // Get the display properties for this card, or use defaults if not available
    let displayProperties = carsCoordinates[index];

    carGroupInfo.carInfos.forEach((info, idx) => {
      // Get the display properties for this card, or use defaults if not available
      // const displayProperties = carsCoordinates[index];
      // Assign display properties to each carInfo
      carState.push({
        displayProperties: {
          boundingBox: { 
            width: displayProperties.width, 
            height: displayProperties.height,
            left: displayProperties.left,
            top: displayProperties.top
          },
          opacity: displayProperties.opacity,
          zIndex: displayProperties.zIndex
        },
        info,
        displayMode: CardDisplayMode.ShowCriteria
      });
    });

    carGroupState.push({
      carStates: carState,
      info: carGroupInfo,
      displayProperties: { 
        boundingBox: { top: 0, left: 0, width: 0, height: 0 },
      },
      chipState: { 
        boundingBox: { 
          top: ( displayProperties.top + displayProperties.height )|| 0, 
          left: ( displayProperties.left + displayProperties.width / 4 )|| 0, 
          width: 0, 
          height: 0 
        },
        opacity: displayProperties.opacity || 1
      },
      isSelected: false
    });
  });

  return carGroupState;
}
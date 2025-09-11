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
import { 
  generateBoundingBoxes,
  generateCarGroupCoordinates,
  getChipCoordinates,
  getEmptyBoundingBox, 
  generateCarGroupSelectedCoordinates,
  getSelectedChipCoordinates,
  getCarGroupExpandedCoordinates,
  getCarStateFlipCoordinates,
} from '@/utils/scale-helper';

export const refreshClientSize = (carGroupStates: CarGroupState[], clientWidth: number, clientHeight: number) => {
  const carGroupBoxes = generateBoundingBoxes(carGroupStates.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });

  carGroupStates.forEach((carGroupState, carGroupIdx) => {

    const carGroupBox = carGroupBoxes[carGroupIdx];
    const carBoxes = generateCarGroupCoordinates(carGroupState.info.carInfos.length, carGroupBox, clientWidth);
    const chipBox = getChipCoordinates(carGroupBox);
    
    carGroupState.displayProperties.boundingBox = carGroupBox;

    Object.assign(carGroupState.chipState, {
      boundingBox: chipBox,
      opacity: 0.05
    });

    // carGroupState.carStates.forEach((carState, carIdx) => {
    //   const carBox = carBoxes[carIdx];

    //   Object.assign(carState.displayProperties, {
    //     boundingBox: carBox,
    //     opacity: 0.05,
    //     zIndex: 0,
    //     // displayMode: CardDisplayMode.ShowCriteria | CardDisplayMode.ClickFlipable,
    //     displayMode: CardDisplayMode.None,
    //     rotateAngle: getCardStateRotateAngles(carGroupState.carStates.length)[carIdx] || 0,
    //   });

    // });
    carGroupState.carStates
      .map((carState, index) => ({ carState, originalIndex: index, priority: carState.priority }))
      .sort((a, b) => b.priority - a.priority)
      .forEach(({ carState, originalIndex }, sortedIndex) => {
        const carBox = carBoxes[sortedIndex]; // Use original index for carBoxes
        
        // console.log('title, priority, originalIndex, sortedIndex', carState.info.title, carState.priority, originalIndex, sortedIndex);

        Object.assign(carState.displayProperties, {
          boundingBox: carBox,
          opacity: 0.05,
          zIndex: 0 + sortedIndex,
          displayMode: CardDisplayMode.None,
          rotateAngle: getCardStateRotateAngles(carGroupState.carStates.length)[sortedIndex] || 0,
          // If you need to store the sorted position:
          // sortPosition: sortedIndex
        });
      });
  });

  const selectedCarGroup = carGroupStates.find((carGroupState) => carGroupState.isSelected);

  if (selectedCarGroup) { 

    const expandedCarState = selectedCarGroup.carStates.find((carState) => carState.isExpanded);

    Object.assign(selectedCarGroup.chipState, {
        opacity: 1
      });
    
    if (expandedCarState) {
      
      const selectedCarBoxes = getCarGroupExpandedCoordinates(selectedCarGroup.info.carInfos.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });

      let indexCounter = 0;

      selectedCarBoxes.forEach((box, boxIdx) => {
        if (boxIdx === 0) {
          // first box is the expanded car
          Object.assign(expandedCarState.displayProperties, {
            boundingBox: box,
            opacity: 1,
            zIndex: 20,
            displayMode: CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton | CardDisplayMode.Expand,
            rotateAngle: 0
          });
        }
        else {
          // other boxes are the other cars
          let carState = selectedCarGroup.carStates[indexCounter];
          if (carState.info.title === expandedCarState.info.title) {

            indexCounter++;
            carState = selectedCarGroup.carStates[indexCounter];
          }
          
          Object.assign(carState.displayProperties, {
              boundingBox: box,
              opacity: 1,
              zIndex: 10,
              displayMode: CardDisplayMode.ClickExpandable,
              rotateAngle: 0
            });
          indexCounter++;
        }
      });
    }
    else {
      const selectedCarBoxes = generateCarGroupSelectedCoordinates(selectedCarGroup.info.carInfos.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });

      selectedCarGroup.carStates.forEach((carState, carIdx) => {
        const carBox = selectedCarBoxes[carIdx];

        Object.assign(carState.displayProperties, {
          boundingBox: carBox,
          opacity: 1,
          zIndex: 10,
          displayMode: CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton | CardDisplayMode.ClickExpandable,
          rotateAngle: 0
        });

      });
    }

    selectedCarGroup.chipState.boundingBox = getSelectedChipCoordinates({ top: 0, left: 0, width: clientWidth, height: clientHeight });
  }
  else {
    carGroupStates.forEach((carGroupState, carGroupIdx) => {

      const carGroupBox = carGroupBoxes[carGroupIdx];
      
      Object.assign(carGroupState.chipState, {
        opacity: 1
      });

      // can you find the carState that is flipped and put it in a const variable?
      const flippedCarState = carGroupState.carStates.find(carState => carState.isFlipped);

      carGroupState.carStates.forEach(carState => {

        Object.assign(carState.displayProperties, {
          opacity: 1,
          //zIndex: 0,
          displayMode: CardDisplayMode.ShowCriteria | CardDisplayMode.ClickFlipable,
        });

        if (flippedCarState) {
          if (carState.info.title === flippedCarState.info.title) {
            Object.assign(carState.displayProperties, {
              boundingBox: getCarStateFlipCoordinates(carGroupBox)[0],
              zIndex: 10,
              rotateAngle: 0
            });
          }
          else {
            Object.assign(carState.displayProperties, {
              boundingBox: getCarStateFlipCoordinates(carGroupBox)[1],
              rotateAngle: 0
            });
          }
        }
        
      });
    });
  }

  return carGroupStates;
  
}

export const generateCarGroupStatesFrom = (
  carGroupInfos: CarGroupInfo[], 
  clientWidth: number, 
  clientHeight: number): CarGroupState[] => {

  let carGroupState: CarGroupState[] = [];

  carGroupInfos.map((carGroupInfo, carGroupIdx) => {

    let carState: CarState[] = [];
    let priorityCounter = 1;
    
    carGroupInfo.carInfos.forEach((info, carIdx) => {
      // Get the display properties for this card, or use defaults if not available
      carState.push({
        displayProperties: {
          boundingBox: getEmptyBoundingBox(),
          opacity: 1,
          zIndex: 0,
          displayMode: CardDisplayMode.ShowCriteria,
          rotateAngle: 0,
        },
        info,
        isExpanded: false,
        isClickable: false,
        priority: priorityCounter,
        isFlipped: false,
      });
      priorityCounter++;
    });

    carGroupState.push({
      carStates: carState,
      info: carGroupInfo,
      displayProperties: { 
        boundingBox: getEmptyBoundingBox(),
      },
      chipState: { 
        boundingBox: getEmptyBoundingBox(),
        opacity: 1
      },
      isSelected: false
    });
  });

  refreshClientSize(carGroupState, clientWidth, clientHeight);

  return carGroupState;
}

export const getCardStateRotateAngles = (count: number ) => {
  const rotateVal = 10

  if (count <= 1) return [0];

  else if (count === 2 ) {
    return [-rotateVal, 0];
  }
  else if (count === 3 ) {
    return [-rotateVal, rotateVal, 0];
  }
  else if (count === 4 ) {
    return [-rotateVal, -rotateVal, rotateVal, 0];
  }

  return [0];
}
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
} from '@/utils/scale-helper';

export const refreshClientSize = (carGroupStates: CarGroupState[], clientWidth: number, clientHeight: number) => {
  console.log('Refreshing client size to:', clientWidth, clientHeight);

  // can you help me check if any of the cargroupstate is selected?
  // const isCarGroupSelected = carGroupStates.some((carGroupState) => carGroupState.isSelected);

  const carGroupBoxes = generateBoundingBoxes(carGroupStates.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });

  // console.log('Refreshing client size to:', clientWidth, clientHeight);
  carGroupStates.forEach((carGroupState, carGroupIdx) => {

    const carGroupBox = carGroupBoxes[carGroupIdx];
    const carBoxes = generateCarGroupCoordinates(carGroupState.info.carInfos.length, carGroupBox, clientWidth);
    const chipBox = getChipCoordinates(carGroupBox);
    
    carGroupState.displayProperties.boundingBox = carGroupBox;

    Object.assign(carGroupState.chipState, {
      boundingBox: chipBox,
      opacity: 0.1
    });

    carGroupState.carStates.forEach((carState, carIdx) => {
      const carBox = carBoxes[carIdx];

      Object.assign(carState.displayProperties, {
        boundingBox: carBox,
        opacity: 0.1,
        zIndex: 0
      });

    });
  })

  const selectedCarGroup = carGroupStates.find((carGroupState) => carGroupState.isSelected);

  if (selectedCarGroup) { 

    const expandedCarState = selectedCarGroup.carStates.find((carState) => carState.displayMode & CardDisplayMode.Expand);

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
            zIndex: 10
          });
        }
        else {
          // other boxes are the other cars
          const carState = selectedCarGroup.carStates[indexCounter];
          if (carState !== expandedCarState) {
            Object.assign(carState.displayProperties, {
              boundingBox: box,
              opacity: 1,
              zIndex: 10
            });
            indexCounter++;
          }
        }
      });

      

      // selectedCarGroup.carStates.forEach((carState, carIdx) => {


      //   Object.assign(carState.displayProperties, {
      //     boundingBox: carState === expandedCarState ? selectedCarBoxes[0] : selectedCarBoxes[carIdx + 1],
      //     opacity: 1,
      //     zIndex: 10
      //   });

      // });
    }
    else {
      const selectedCarBoxes = generateCarGroupSelectedCoordinates(selectedCarGroup.info.carInfos.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });

      // Object.assign(selectedCarGroup.chipState, {
      //   opacity: 1
      // });

      selectedCarGroup.carStates.forEach((carState, carIdx) => {
        const carBox = selectedCarBoxes[carIdx];

        Object.assign(carState.displayProperties, {
          boundingBox: carBox,
          opacity: 1,
          zIndex: 10
        });

      });
    }

    selectedCarGroup.chipState.boundingBox = getSelectedChipCoordinates({ top: 0, left: 0, width: clientWidth, height: clientHeight });
  }
  else {
    carGroupStates.forEach(carGroupState => {

      Object.assign(carGroupState.chipState, {
        opacity: 1
      });
      
      carGroupState.carStates.forEach(carState => {

        Object.assign(carState.displayProperties, {
          opacity: 1,
          zIndex: 0
        });
      });
    });
  }

  return carGroupStates;
  
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

  // refreshClientSize(clientWidth, clientHeight);

  // get the bounding boxes for each car group based on the number of car groups and client size
  const carGroupBoxes = generateBoundingBoxes(carGroupInfos.length, { top: 0, left: 0, width: clientWidth, height: clientHeight });
  // console.log('clientWidth, clientHeight:', clientWidth, clientHeight);
  // console.log(carGroupBoxes);

  // let result: CarState = {};
  let carGroupState: CarGroupState[] = [];

  carGroupInfos.map((carGroupInfo, carGroupIdx) => {

    let carState: CarState[] = [];
    // Get the display properties for this card, or use defaults if not available
    let displayProperties = carsCoordinates[carGroupIdx];

    const carGroupBox = carGroupBoxes[carGroupIdx];
    const carBoxes = generateCarGroupCoordinates(carGroupInfo.carInfos.length, carGroupBox, clientWidth);
    const chipBox = getChipCoordinates(carGroupBox);

    // console.log('carGroupBox:',carGroupBox);
    // console.log('carBoxes:', carBoxes);
    // console.log('chipBox:', chipBox);

    carGroupInfo.carInfos.forEach((info, carIdx) => {
      // Get the display properties for this card, or use defaults if not available
      // const displayProperties = carsCoordinates[index];
      // Assign display properties to each carInfo
      // console.log('carBox:', carBoxes[carIdx]);
      carState.push({
        displayProperties: {
          // boundingBox: { 
          //   width: displayProperties.width, 
          //   height: displayProperties.height,
          //   left: displayProperties.left,
          //   top: displayProperties.top
          // },
          // boundingBox: carBoxes[carIdx],
          boundingBox: getEmptyBoundingBox(),
          // opacity: displayProperties.opacity,
          // zIndex: displayProperties.zIndex
          opacity: 1,
          zIndex: 0
        },
        info,
        displayMode: CardDisplayMode.ShowCriteria
      });
    });

    carGroupState.push({
      carStates: carState,
      info: carGroupInfo,
      displayProperties: { 
        // boundingBox: carGroupBox,
        boundingBox: getEmptyBoundingBox(),
      },
      chipState: { 
        // boundingBox: { 
        //   top: ( displayProperties.top + displayProperties.height )|| 0, 
        //   left: ( displayProperties.left + displayProperties.width / 4 )|| 0, 
        //   width: 0, 
        //   height: 0 
        // },
        // boundingBox: chipBox,
        boundingBox: getEmptyBoundingBox(),
        opacity: 1
      },
      isSelected: false
    });
  });

  refreshClientSize(carGroupState, clientWidth, clientHeight);

  return carGroupState;
}
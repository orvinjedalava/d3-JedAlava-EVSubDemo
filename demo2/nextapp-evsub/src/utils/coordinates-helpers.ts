import type { 
  BoundingBox, 
  CarGroupCoordinates, 
  CarCardDisplayProperties, 
  CarCardDetail, 
  CarCardState } from '@/types';

import { CardDisplayMode } from '@/types';

export const getDisplayCoordinates = (cars: CarCardDetail[]): CarCardState[] => {
  const carsCoordinates =  [
    { width: 253, height: 350, top: 80, left: 50, opacity: 1 , zIndex: 0},
    { width: 253, height: 350, top: 350, left: 500, opacity: 1 , zIndex: 0},
    // { width: 253, height: 276, top: 0, left: 250, opacity: 1 },
    // { width: 253, height: 276, top: 0, left: 350, opacity: 1 },
  ]

  return cars.map((detail, index) => {
    // Get the display properties for this card, or use defaults if not available
    const displayProperties = carsCoordinates[index];

    // Return the CarCardState object with separate detail and displayProperties
    return {
      displayProperties,
      detail,
      displayMode: CardDisplayMode.ShowCriteria
    };
  });

};
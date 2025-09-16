import * as d3 from 'd3';
import type { 
  BoundingBox, 
} from '@/types';

const X_SCALE_WIDTH = 10000;
const Y_SCALE_HEIGHT = 10000;

const X_SCALE_DOMAIN: [number, number] = [0, X_SCALE_WIDTH];
const Y_SCALE_DOMAIN: [number, number] = [0, Y_SCALE_HEIGHT];

const getXScale = (x: number, clientWidth: number) => d3.scaleLinear().domain(X_SCALE_DOMAIN).range([x, clientWidth]);
const getYScale = (y: number, clientHeight: number) => d3.scaleLinear().domain(Y_SCALE_DOMAIN).range([y, clientHeight]);

// const getCardWidth = (clientWidth: number) => {
//   const xScale = getXScale(0, clientWidth);
//   return Math.max(xScale(2500), 255);
// }

export const getCardWidth = (isFromCarPark: boolean = false) => {
  return isFromCarPark ? 160 : 250;
}

export const getCardHeight = (isExpanded: boolean, isFromCarPark: boolean = false) => {
  return isExpanded? 300 : isFromCarPark ? 145: 220; 
}

export const getEmptyBoundingBox = (): BoundingBox => {
  return { top: 0, left: 0, width: 0, height: 0 };
}

export const getCarStateFlipCoordinates = (count: number, carGroupBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(carGroupBoundingBox.left, carGroupBoundingBox.left + carGroupBoundingBox.width);
  const yScale = getYScale(carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  const cardWidth = getCardWidth();

  if (count <= 1)
  {
    return [
      { top: yScale(0), left: xScale(boxWidth / 600 * 135), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 65), left: xScale(boxWidth / 600 * 135), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(0), left: xScale(boxWidth / 600 * 150), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 65), left: xScale(boxWidth / 600 * 150), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 3 )
  {
    return [
      { top: yScale(0), left: xScale(boxWidth / 600 * 120), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 65), left: xScale(boxWidth / 600 * 120), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 4 )
  {
    return [
      { top: yScale(0), left: xScale(boxWidth / 600 * 160), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 65), left: xScale(boxWidth / 600 * 160), width: cardWidth, height: 0 }
    ];
  }

  return [];

}

export const getChipCoordinates = (carGroupBoundingBox: BoundingBox): BoundingBox => {
  const xScale = getXScale(carGroupBoundingBox.left, carGroupBoundingBox.left + carGroupBoundingBox.width);
  const yScale = getYScale(carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  return { 
    top: yScale(boxHeight / 1000 * 870), 
    left: xScale(boxWidth / 1000 * 330),
    width: 0,
    height: 0 
  };
}

export const getSelectedChipCoordinates = (carGroupBoundingBox: BoundingBox): BoundingBox => {
  const xScale = getXScale(carGroupBoundingBox.left, carGroupBoundingBox.left + carGroupBoundingBox.width);
  const yScale = getYScale(carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  return { 
    top: yScale(100), 
    left: xScale(200),
    width: 0,
    height: 0 
  };
}

export const getCarGroupExpandedCoordinates = (count: number, clientBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(clientBoundingBox.left, clientBoundingBox.left + clientBoundingBox.width);
  const yScale = getYScale(clientBoundingBox.top, clientBoundingBox.top + clientBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  // card width should be consistent
  const cardWidth = getCardWidth();

  const expandedCard = { top: yScale(boxHeight / 800 * 50), left: xScale(boxWidth / 1000 * 50), width: xScale(boxWidth * 0.9), height: 0 };

  if (count <= 1) {
    return [expandedCard];
  }
  else if (count === 2) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 60), width: cardWidth, height: 0 },
    ]
  }
  else if (count === 3) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 30), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 90), width: cardWidth, height: 0 },
    ]
  }
  else if (count === 4) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 10), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 60), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 160 * 110), width: cardWidth, height: 0 },
    ]
  }

  return [];
}

export const generateCarGroupCoordinates = (count: number, cardGroupBoundingBox: BoundingBox, clientWidth: number): BoundingBox[] => {
  const xScale = getXScale(cardGroupBoundingBox.left, cardGroupBoundingBox.left + cardGroupBoundingBox.width);
  const yScale = getYScale(cardGroupBoundingBox.top, cardGroupBoundingBox.top + cardGroupBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  // card width should be consistent
  const cardWidth = getCardWidth();

  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 400 * 90), left: xScale(boxWidth / 600 * 135), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 400 * 90), left: xScale(boxWidth / 600 * 120), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 60), left: xScale(boxWidth / 600 * 150), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 3 )
  {
    return [
      { top: yScale(boxHeight / 400 * 90), left: xScale(boxWidth / 600 * 95), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 80), left: xScale(boxWidth / 600 * 145), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 50), left: xScale(boxWidth / 600 * 120), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 4 )
  {
    return [
      { top: yScale(boxHeight / 400 * 55), left: xScale(boxWidth / 600 * 90), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 80), left: xScale(boxWidth / 600 * 130), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 85), left: xScale(boxWidth / 600 * 190), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 65), left: xScale(boxWidth / 600 * 160), width: cardWidth, height: 0 },
    ];
  }

  return [];
}

export const generateCarGroupSelectedCoordinates = (count: number, clientBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(clientBoundingBox.left, clientBoundingBox.left + clientBoundingBox.width);
  const yScale = getYScale(clientBoundingBox.top, clientBoundingBox.top + clientBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  // card width should be consistent
  const cardWidth = getCardWidth();

  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 420), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 520), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 320), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 3 )
  {
    return [
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 620), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 420), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 220), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 4 )
  {
    return [
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 720), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 520), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 320), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 800 * 150), left: xScale(boxWidth / 1000 * 120), width: cardWidth, height: 0 },
    ];
  }

  return [];
}

export const generateBoundingBoxes = (count: number, clientBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(clientBoundingBox.left, clientBoundingBox.left + clientBoundingBox.width);
  const yScale = getYScale(clientBoundingBox.top, clientBoundingBox.top + clientBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  if (count <= 1)
  {
    return [
      { 
        top: yScale(boxHeight / 1000 * 100), 
        left: xScale(boxWidth / 3), 
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      }
    ];
  }
  else if (count === 2)
  {
    return [
      { 
        top: yScale(boxHeight / 1000 * 70), 
        left: xScale(boxWidth / 1000 * 150), 
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 1000 * 120), 
        left: xScale(boxWidth / 1000 * 520), 
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      },
    ];
  }
  else if (count === 3) {
    return [
      { 
        top: yScale(boxHeight / 1000 * 100), 
        left: xScale(0),
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 1000 * 50), 
        left: xScale(boxWidth / 3),
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      },
      {
        top: yScale(boxHeight / 1000 * 150), 
        left: xScale(boxWidth / 3 * 2),
        width: xScale(boxWidth / 3), 
        height: yScale(boxHeight / 2) 
      }

    ]
  }
  else if (count === 4 ) {
    return [
      { 
        top: yScale(boxHeight / 1000 * 260), 
        left: xScale(-(boxHeight / 1000 * 50)), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 1000 * 20), 
        left: xScale(boxWidth / 1000 * 200), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 1000 * 350), 
        left: xScale(boxWidth / 1000 * 450), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 1000 * 10), 
        left: xScale(boxWidth / 1000 * 650), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
    ]
  }
  return [];
};



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

const getCardWidth = (clientWidth: number) => {
  const xScale = getXScale(0, clientWidth);
  return Math.max(xScale(2500), 255);
}

export const getEmptyBoundingBox = (): BoundingBox => {
  return { top: 0, left: 0, width: 0, height: 0 };
}

export const getChipCoordinates = (carGroupBoundingBox: BoundingBox): BoundingBox => {
  const xScale = getXScale(carGroupBoundingBox.left, carGroupBoundingBox.left + carGroupBoundingBox.width);
  const yScale = getYScale(carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  // console.log('getChipCoordinatesBox ', carGroupBoundingBox);
  // console.log('yscale', carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  return { 
    top: yScale(boxHeight / 1000 * 995), 
    left: xScale(boxWidth / 10 * 4),
    width: 0,
    height: 0 
  };
}

export const getSelectedChipCoordinates = (carGroupBoundingBox: BoundingBox): BoundingBox => {
  const xScale = getXScale(carGroupBoundingBox.left, carGroupBoundingBox.left + carGroupBoundingBox.width);
  const yScale = getYScale(carGroupBoundingBox.top, carGroupBoundingBox.top + carGroupBoundingBox.height);

  // const boxWidth = X_SCALE_WIDTH;
  // const boxHeight = Y_SCALE_HEIGHT;


  return { 
    top: yScale(1), 
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
  const cardWidth = getCardWidth(clientBoundingBox.width);

  const expandedCard = { top: yScale(boxHeight / 20 * 1), left: xScale(boxWidth / 16 * 1), width: xScale(boxWidth * 0.9), height: 0 };

  if (count <= 1) {
    return [expandedCard];
  }
  else if (count === 2) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 120 * 94), left: xScale(boxWidth / 12 * 4), width: cardWidth, height: 0 },
    ]
  }
  else if (count === 3) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 12 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 12 * 4), width: cardWidth, height: 0 },
    ]
  }
  else if (count === 4) {
    return [
      expandedCard,
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 12 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 12 * 4), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 24 * 17), left: xScale(boxWidth / 12 * 7), width: cardWidth, height: 0 },
    ]
  }

  return [];
}

export const generateCarGroupCoordinates = (count: number, cardGroupBoundingBox: BoundingBox, clientWidth: number): BoundingBox[] => {
  // console.log('generateCarGroupCoordinates ', cardGroupBoundingBox);
  const xScale = getXScale(cardGroupBoundingBox.left, cardGroupBoundingBox.left + cardGroupBoundingBox.width);
  const yScale = getYScale(cardGroupBoundingBox.top, cardGroupBoundingBox.top + cardGroupBoundingBox.height);

  // const boxWidth = cardGroupBoundingBox.width;
  // const boxHeight = cardGroupBoundingBox.height;
  const boxWidth = X_SCALE_WIDTH;
  const boxHeight = Y_SCALE_HEIGHT;

  // card width should be consistent
  const cardWidth = getCardWidth(clientWidth);

  // console.log('generateCarGroupCoordinates boundingbox', cardGroupBoundingBox);
  // console.log('generateCarGroupCoordinates boxWidth, boxHeight, cardWidth', boxWidth, boxHeight, cardWidth);
  // console.log(yScale(boxHeight / 4 * 1), xScale(boxWidth / 8 * 4));
  // console.log(yScale(boxHeight), xScale(boxWidth));
  
  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 400 * 100), left: xScale(boxWidth / 600 * 90), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 400 * 90), left: xScale(boxWidth / 600 * 150), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 3 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 3), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 4), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 5), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 4 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 4), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 3.5), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 4.5), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 5), width: cardWidth, height: 0 },
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
  const cardWidth = getCardWidth(clientBoundingBox.width);

  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 8 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 8 * 5), width: cardWidth, height: 0 },
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
      { top: xScale(0), left: yScale(0), width: xScale(boxWidth), height: yScale(boxHeight) }
    ];
  }
  else if (count === 2)
  {
    return [
      { 
        top: yScale(boxHeight / 6 * 2), 
        left: xScale(0), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(0), 
        left: xScale(boxWidth / 2), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
    ];
  }
  else if (count === 3) {
    return [
      { 
        top: yScale(0), 
        left: xScale(0),
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(0), 
        left: xScale(boxWidth / 2),
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      {
        top: yScale(boxHeight / 2), 
        left: xScale(boxWidth / 4),
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      }

    ]
  }
  else if (count === 4 ) {
    return [
      { 
        top: yScale(0), 
        left: xScale(0), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(0), 
        left: xScale(boxWidth / 2), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 2), 
        left: xScale(0), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
      { 
        top: yScale(boxHeight / 2), 
        left: xScale(boxWidth / 2), 
        width: xScale(boxWidth / 2), 
        height: yScale(boxHeight / 2) 
      },
    ]
  }
  return [];
};



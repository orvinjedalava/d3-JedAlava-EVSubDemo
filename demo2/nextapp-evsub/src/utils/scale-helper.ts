import * as d3 from 'd3';
import type { 
  BoundingBox, 
} from '@/types';

const X_SCALE_DOMAIN: [number, number] = [0, 1000];
const Y_SCALE_DOMAIN: [number, number] = [0, 1000];

const getXScale = (x: number, clientWidth: number) => d3.scaleLinear().domain(X_SCALE_DOMAIN).range([x, clientWidth]);
const getYScale = (y: number, clientHeight: number) => d3.scaleLinear().domain(Y_SCALE_DOMAIN).range([y, clientHeight]);

const getCardWidth = (clientWidth: number) => {
  const xScale = getXScale(0, clientWidth);
  return xScale(250);
}

export const getCarGroupExpandedCoordinates = (count: number, clientBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(clientBoundingBox.left, clientBoundingBox.width);
  const yScale = getYScale(clientBoundingBox.top, clientBoundingBox.height);

  const boxWidth = clientBoundingBox.width;
  const boxHeight = clientBoundingBox.height;

  // card width should be consistent
  const cardWidth = getCardWidth(clientBoundingBox.width);

  const expandedCard = { top: boxHeight / 10 * 3, left: boxWidth / 10 * 1, width: boxWidth / 10 * 8, height: 0 };

  if (count <= 1) {
    return [expandedCard];
  }
  else if (count === 2) {
    return [
      expandedCard,
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 4, width: cardWidth, height: 0 },
    ]
  }
  else if (count === 3) {
    return [
      expandedCard,
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 1, width: cardWidth, height: 0 },
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 4, width: cardWidth, height: 0 },
    ]
  }
  else if (count === 4) {
    return [
      expandedCard,
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 1, width: cardWidth, height: 0 },
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 4, width: cardWidth, height: 0 },
      { top: boxHeight / 10 * 8, left: boxWidth / 12 * 7, width: cardWidth, height: 0 },
    ]
  }

  return [];
}

export const generateCarGroupCoordinates = (count: number, cardGroupBoundingBox: BoundingBox, clientWidth: number): BoundingBox[] => {
  const xScale = getXScale(cardGroupBoundingBox.left, cardGroupBoundingBox.width);
  const yScale = getYScale(cardGroupBoundingBox.top, cardGroupBoundingBox.height);

  const boxWidth = cardGroupBoundingBox.width;
  const boxHeight = cardGroupBoundingBox.height;

  // card width should be consistent
  const cardWidth = getCardWidth(clientWidth);
  
  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 1), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 3 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 3), width: cardWidth, height: 0 },
    ];
  }
  else if (count === 4 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 1), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 3), width: cardWidth, height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 5 * 4), width: cardWidth, height: 0 },
    ];
  }

  return [];
}

export const generateCarGroupSelectedCoordinates = (count: number, cardGroupBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(cardGroupBoundingBox.left, cardGroupBoundingBox.width);
  const yScale = getYScale(cardGroupBoundingBox.top, cardGroupBoundingBox.height);

  const boxWidth = cardGroupBoundingBox.width;
  const boxHeight = cardGroupBoundingBox.height;
  

  if (count <= 1)
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 4 * 1), width: yScale(250), height: 0 }
    ];
  }
  else if (count === 2 )
  {
    return [
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 2), width: yScale(250), height: 0 },
      { top: yScale(boxHeight / 4 * 1), left: xScale(boxWidth / 6 * 2), width: yScale(250), height: 0 },
    ];
  }

  return [];
}

export const generateBoundingBoxes = (count: number, clientBoundingBox: BoundingBox): BoundingBox[] => {
  const xScale = getXScale(clientBoundingBox.left, clientBoundingBox.width);
  const yScale = getYScale(clientBoundingBox.top, clientBoundingBox.height);

  if (count <= 1)
  {
    return [
      { top: xScale(0), left: yScale(0), width: xScale(1000), height: yScale(1000) }
    ];
  }
  else if (count === 2)
  {
    return [
      { 
        top: yScale(0), 
        left: xScale(0), 
        width: xScale(500), 
        height: yScale(1000) 
      },
      { 
        top: yScale(0), 
        left: xScale(500), 
        width: xScale(500), 
        height: yScale(1000) 
      },
    ];
  }
  else if (count === 3) {
    return [
      { 
        top: yScale(0), 
        left: xScale(0),
        width: xScale(500), 
        height: yScale(500) 
      },
      { 
        top: yScale(0), 
        left: xScale(500),
        width: xScale(500), 
        height: yScale(500) 
      },
      {
        top: yScale(500), 
        left: xScale(250),
        width: xScale(500), 
        height: yScale(500) 
      }

    ]
  }
  else if (count === 4 ) {
    return [
      { 
        top: yScale(0), 
        left: xScale(0), 
        width: xScale(500), 
        height: yScale(500) 
      },
      { 
        top: yScale(0), 
        left: xScale(500), 
        width: xScale(500), 
        height: yScale(500) 
      },
      { 
        top: yScale(500), 
        left: xScale(0), 
        width: xScale(500), 
        height: yScale(500) 
      },
      { 
        top: yScale(500), 
        left: xScale(500), 
        width: xScale(500), 
        height: yScale(500) 
      },
    ]
  }
  return [];
};



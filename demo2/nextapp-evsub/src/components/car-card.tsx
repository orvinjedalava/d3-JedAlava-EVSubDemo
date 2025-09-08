'use client';

import { useRef, useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Image } from "@heroui/image";
import { CarInfoChip } from "./car-info-chip";
import { CardDisplayMode, CarCardState } from "@/types";
import { Button } from "@heroui/button";

interface CarCardProps {
  car: CarCardState;
}

export const CarCard = ({ car }: CarCardProps) => {
  const showCriteria = (car.displayMode & CardDisplayMode.ShowCriteria) !== 0;
  const showButton = (car.displayMode & CardDisplayMode.ShowButton) !== 0;
  const isExpanded = (car.displayMode & CardDisplayMode.Expand) !== 0;

  // Create a ref for the image element
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  // State to store the image height
  const [imageHeight, setImageHeight] = useState<number>(0);

  // Effect to measure the image height after it loads
  useEffect(() => {
    if (imageRef.current) {
      // Set initial height if already loaded
      // setImageHeight(imageRef.current.clientHeight);
      
      // Add resize observer to track height changes
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setImageHeight(entry.target.clientHeight);
          console.log('image height:',entry.target.clientHeight);
        }
      });
      
      resizeObserver.observe(imageRef.current);
      
      // Clean up the observer on component unmount
      return () => {
        if (imageRef.current) {
          resizeObserver.unobserve(imageRef.current);
        }
      };
    }
  }, [imageRef.current]);

  return (
    <Card isPressable={false} shadow="sm" className="w-full h-full transition-all duration-500 ease-in-out" >
      <div 
        // className={`w-full overflow-hidden ${isExpanded ? 'grid grid-cols-2 gap-2' : 'grid grid-rows-[auto_auto]'}`}
        // className={`relative overflow-hidden w-full`}
        // style={{ height: isExpanded ? `${imageHeight}px`  :`${imageHeight * 1.3}px` }}
        style={{ height: isExpanded ? `260px`  :`220px` }}
        >
        {/* <div className={isExpanded ? 'px-4 py-6 w-full h-full' : 'w-[252.986px]'}> */}
        <div 
          ref={imageContainerRef}
          // className={` h-[${imageHeight}px] `}
          className="relative transition-all duration-500 ease-in-out"
          // style={{ height: isExpanded ? `${imageHeight * 1.3}px` : `${imageHeight}px` }}
          style={{ height: isExpanded ? `220px`  :`220px` }}
          >
          <Image
            ref={imageRef}
            alt={car.detail.title}
            className={`absolute ${isExpanded ? "top-5 left-5 rounded-lg" :"top-0 left-0 rounded-b-none"}`}
            // className={`absolute top-0 left-0  ${isExpanded ? "rounded-lg" :"rounded-b-none"}`}
            // className={`${isExpanded ? "rounded-lg" :"rounded-b-none"}`}
            src={car.detail.img}
            // style={{ width: isExpanded ? `${(car.displayProperties.width ?? 0) / 2 }px` :`${(car.displayProperties.width ?? 0)}px` }}
            width={isExpanded ?  `${(car.displayProperties.width ?? 0) / 2 }px` :  `${(car.displayProperties.width ?? 0)}px`}
            
          />
        </div>
        {/* </div> */}
        {/* { isExpanded && (
          <div className="grid grid-rows-[auto_auto] transition-all duration-500 ease-in-out">
            <div>
              <h3 className="text-sm font-semibold">{car.detail.title}</h3>
              <p className="text-sm text-default-500">{car.detail.subtitle}</p>
            </div>
          </div>
        )} */}
        {/* <div className="absolute grid grid-rows-[auto_auto] transition-all duration-500 ease-in-out"
          style={{ 
            top: isExpanded ? '16px' : `${imageHeight * 1.05}px`,
            left: isExpanded ? `${(car.displayProperties.width ?? 0) / 7 * 4}px` : '16px',
          }}>
            <div>
              <h3 className="text-sm font-semibold">{car.detail.title}</h3>
              <p className="text-sm text-default-500">{car.detail.subtitle}</p>
            </div>
        </div> */}
        { isExpanded && (
          <div className={`absolute grid grid-rows-[auto_auto] transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              top: '16px',
              left: `${(car.displayProperties.width ?? 0) / 7 * 4}px`,
            }}>
              <div>
                <h3 className="text-sm font-semibold">{car.detail.title}</h3>
                <p className="text-sm text-default-500">{car.detail.subtitle}</p>
              </div>
          </div>)
        }

        {/* { !isExpanded && (<div className={`absolute grid grid-rows-[auto_auto] transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            top: `${imageHeight * 1.05}px`,
            left: '16px',
          }}>
            <div>
              <h3 className="text-sm font-semibold">{car.detail.title}</h3>
              <p className="text-sm text-default-500">{car.detail.subtitle}</p>
            </div>
        </div>)} */}

        <div className={`absolute grid grid-rows-[auto_auto] transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            top: `${imageHeight * 1.05}px`,
            left: '16px',
          }}>
            <div>
              <h3 className="text-sm font-semibold">{car.detail.title}</h3>
              <p className="text-sm text-default-500">{car.detail.subtitle}</p>
            </div>
        </div>

        
      </div>

      <div className="grid grid-rows-[auto_auto_auto] transition-all duration-500 ease-in-out">
        <CardBody className="flex-grow p-3 gap-2">
        {/* <div className={`transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-sm font-semibold">{car.detail.title}</h3>
          <p className="text-sm text-default-500">{car.detail.subtitle}</p>
        </div> */}
        
        { showCriteria && 
            <div className="flex flex-row items-center justify-center gap-2">
              <CarInfoChip 
                icon="/icons/weeklycosticon.svg"
                description="Weekly Cost" 
                value={car.detail.criteria.weeklyCost} 
              />
              <CarInfoChip 
                icon="/icons/internetspeedicon.svg"
                description="Odometer" 
                value={car.detail.criteria.odometer} 
              />
            </div>
          }
        
        <div className={`w-full flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${showButton ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <Button className="w-[229px]" variant="solid" color="secondary" onPress={() => console.log("Clicked!")}>
            See more details
          </Button>
        </div>
        </CardBody>
      </div>
    </Card>
  );
}
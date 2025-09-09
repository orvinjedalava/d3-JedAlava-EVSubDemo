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
      <div className="grid grid-rows-[auto_auto]">
        <div id="image container"
          style={{ height: isExpanded ? `260px`  :`220px` }}
          >
          <div 
            ref={imageContainerRef}
            className="relative transition-all duration-500 ease-in-out"
            style={{ height: isExpanded ? `220px`  :`220px` }}
            >
            {/* <Image
              ref={imageRef}
              alt={car.detail.title}
              className={`absolute ${isExpanded ? "top-5 left-5 rounded-lg" :"top-0 left-0 rounded-b-none"}`}
              src={car.detail.img}
              width={isExpanded ?  `${(car.displayProperties.width ?? 0) / 2 }px` :  `${(car.displayProperties.width ?? 0)}px`}
              
            /> */}
            <Image
              ref={imageRef}
              alt={car.detail.title}
              className={`absolute transition-all duration-500 ease-in-out ${isExpanded ? "top-[20px] left-[20px] rounded-lg" : "top-0 left-0 rounded-b-none"}`}
              style={{
                transform: isExpanded ? `scale(0.5)` : `scale(1)`,
                transformOrigin: 'top left'
              }}
              width={`${car.displayProperties.width ?? 0}px`}
              src={car.detail.img}
            />
          </div>
          
          {/* { isExpanded && (
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
          } */}

          <div className={`absolute transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              top: '16px',
              left: `${(car.displayProperties.width ?? 0) / 7 * 4}px`,
            }}>
              <div >
                <h3 className="text-sm font-semibold">{car.detail.title}</h3>
                <p className="text-sm text-default-500">{car.detail.subtitle}</p>
              </div>
              {/* <div>
                <p className="text-sm text-default-500 transition-all duration-1000">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?</p>
              </div> */}
          </div>

          <div className={`absolute transition-opacity ease-in-out ${isExpanded ? 'opacity-100 duration-500 delay-[500ms]' : 'transition-none opacity-0'}`}
            style={{ 
              top: '64px',
              left: `${(car.displayProperties.width ?? 0) / 7 * 4}px`,
            }}>
              <div>
                <p className="text-sm text-default-500 transition-all duration-1000">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?</p>
              </div>
          </div>

          <div className={`absolute grid grid-rows-[auto_auto] transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'transition-none opacity-0'}`}
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

        <div id="card body" className="grid grid-rows-[auto_auto_auto] transition-all duration-500 ease-in-out">
          <CardBody className="flex-grow p-3 gap-2">
          
          
          { showCriteria && 
            <div className="flex flex-row items-center justify-center gap-2">
              
              {Object.entries(car.detail.criteria).map(([key, value]) => {
                // Map criteria keys to appropriate icons
                const getIconForCriteria = (criteriaKey: string) => {
                  switch(criteriaKey) {
                    case 'Odometer':
                      return '/icons/internetspeedicon.svg';
                    default:
                      return '/icons/dollar.svg'; // Fallback icon
                  }
                };

                return (
                  <CarInfoChip 
                    key={key}
                    icon={getIconForCriteria(key)}
                    description={key}
                    value={value} 
                  />
                );
              })}
            </div>
          }
          
          <div className={`w-full flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${showButton ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Button className="w-[229px]" variant="solid" color="secondary" onPress={() => console.log("Clicked!")}>
              See more details
            </Button>
          </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
}

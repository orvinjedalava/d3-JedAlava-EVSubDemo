'use client';

import { useRef, useEffect, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Image } from "@heroui/image";
import { CarInfoChip } from "./car-info-chip";
import { CardDisplayMode, CarState } from "@/types";
import { Button } from "@heroui/button";
import { CarTitle } from "./car-title";
import { useCarsStore, useCarPanelDimensionsStore } from "@/stores/animations/cards-panel-store";
import { getCardWidth } from '@/utils/scale-helper';
import { BackButton } from "./back-button";

interface CarCardProps {
  car: CarState;
  carGroupName: string;
}

export const CarCard = ({ car, carGroupName }: CarCardProps) => {
  const showCriteria = (car.displayProperties.displayMode & CardDisplayMode.ShowCriteria) !== 0;
  const showButton = (car.displayProperties.displayMode & CardDisplayMode.ShowButton) !== 0;
  const isExpanded = (car.displayProperties.displayMode & CardDisplayMode.Expand) !== 0;
  const isClickExpandable = (car.displayProperties.displayMode & CardDisplayMode.ClickExpandable) !== 0;
  const isClickFlipable = (car.displayProperties.displayMode & CardDisplayMode.ClickFlipable) !== 0;
  const isShowPointer = ( isClickExpandable && !isExpanded ) || isClickFlipable;

  // Create a ref for the image element
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  // State to store the image height
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [isProcessingFlip, setIsProcessingFlip] = useState(false);


  const { 
    setCarStateIsExpanded,
    setCarStateOnTop,
    setCarStateIsFlipped,
  } = useCarsStore();

  const {
    width, 
    height
  } = useCarPanelDimensionsStore();

  const onCloseClicked = () => {
    setCarStateIsExpanded(carGroupName, car.info.title, false, width, height) ; // Set to Clickable
  }

  const onButtonClicked = () => {
    !isExpanded ? onResize() : console.log("Get a quote");
  }

  const onResize = () => {
    setCarStateIsExpanded(carGroupName, car.info.title, true, width, height) ; // Set to Clickable
  }

  // Effect to measure the image height after it loads
  useEffect(() => {
    if (imageRef.current) {
      // Set initial height if already loaded
      // setImageHeight(imageRef.current.clientHeight);
      
      // Add resize observer to track height changes
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setImageHeight(entry.target.clientHeight);
          // console.log('image height:',entry.target.clientHeight);
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
    <Card 
      // isPressable={isCardClickable && !showCriteria && !showButton && !isExpanded} 
      shadow="sm" 
      className="w-full h-full transition-all duration-500 ease-in-out overflow-x-hidden"
      // onPress={() => setCarStateIsExpanded(carGroupName, car.info.title, true, width, height)} 
    >
      <div 
        className={`grid grid-rows-[auto_auto] ${isShowPointer ? 'cursor-pointer' : ''}`}
        {...(isShowPointer ? { 
                onClick: () => {
                  if (isProcessingFlip) return;

                  if (isClickExpandable && !isExpanded){
                    setCarStateIsExpanded(carGroupName, car.info.title, true, width, height)
                  }
                  else if (isClickFlipable){
                    // Set processing flag to prevent additional clicks
                    setIsProcessingFlip(true);

                    setCarStateIsFlipped(carGroupName, car.info.title, true, width, height);

                    // // Then after 500ms, bring it to the top
                    setTimeout(() => {
                      setCarStateOnTop(carGroupName, car.info.title, width, height);
                      
                      // Reset the processing flag after operations complete
                      setIsProcessingFlip(false);
                      // console.log('is flipped');
                    }, 500);
                  }
                }
              } : {})}
      >
        <div id="image container"
          style={{ height: isExpanded ? `300px`  :`220px` }}
          >
          <div 
            ref={imageContainerRef}
            className="relative transition-all duration-500 ease-in-out"
            style={{ height: isExpanded ? `300px`  :`220px` }}
            >
            
            <img
              ref={imageRef}
              alt={car.info.title}
              className={`absolute ${isExpanded ? "top-[20px] left-[20px] rounded-lg" : "top-0 left-0 rounded-b-none"}`}
              style={{
                minWidth: getCardWidth() + 'px',
                // transform: isExpanded ? `scale(0.5)` : `scale(1)`,
                // transformOrigin: 'top left',
                // transition: 'transform 10ms ease-in-out, top 500ms ease-in-out, left 500ms ease-in-out, border-radius 500ms ease-in-out',
                width: `${ isExpanded ? car.displayProperties.boundingBox.width / 4 : getCardWidth()}px`,
                transition: 'width 500ms ease-in-out, top 500ms ease-in-out, left 500ms ease-in-out, border-radius 500ms ease-in-out',
                zIndex: 100
              }}
              // width={`${car.displayProperties.boundingBox.width ?? 0}px`}
              src={car.info.img}
            />
          </div>
          
          <div className={`absolute transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              top: '16px',
              left: `${(car.displayProperties.boundingBox.width ?? 0) / 7 * 4}px`,
            }}>
              <div >
                <CarTitle title={car.info.title} subtitle={car.info.subtitle} />
              </div>
          </div>

          <div className={`absolute transition-opacity ease-in-out ${isExpanded ? 'opacity-100 duration-500 delay-[500ms]' : 'transition-none opacity-0'}`}
            style={{ 
              top: '64px',
              left: `${(car.displayProperties.boundingBox.width ?? 0) / 7 * 4}px`,
            }}>
              <div>
                <p className="text-sm text-default-500 transition-all duration-1000">{car.info.description}</p>
              </div>
          </div>

          {/* <Button
            className={`absolute top-[16px] right-[20px] transition-all duration-500 ease-in-out rounded-full w-6 h-6 min-w-0 flex items-center justify-center ${isExpanded ? 'opacity-100 delay-[500ms]' : 'opacity-0'}`}
            size="sm" 
            variant="ghost" 
            color="secondary"
            onPress={onCloseClicked} 
          >x</Button> */}
          <BackButton isExpanded={isExpanded} top={16} right={20} onClick={onCloseClicked} />

          <div className={`absolute transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'transition-none opacity-0'}`}
            style={{ 
              top: `${imageHeight * 1.05}px`,
              left: '16px',
            }}>
              <div>
                <CarTitle title={car.info.title} subtitle={car.info.subtitle} />
              </div>
          </div>
        </div>

        <div id="card body" className="grid grid-rows-[auto_auto_auto] transition-all duration-500 ease-in-out">
          <CardBody className="flex-grow p-1 gap-2 overflow-x-hidden">

            
            { showCriteria &&  (
              
              <div className="flex flex-row items-center justify-center gap-2 h-[95px]">
                {Object.entries(car.info.criteria).filter((_, index) => !isExpanded ? index < 2 : index < 5).map(([key, value], index) => {
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
                        isOpacityDelayed={index < 2 ? false : true} 
                      />
                    
                  );
                })}
              </div>
            )}

            { showCriteria && isExpanded &&  (
              
              <div className="flex flex-row items-center justify-center gap-2 h-[92px]">
                {Object.entries(car.info.criteria).filter((_, index) => index >= 5 ).map(([key, value]) => {
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
                        isOpacityDelayed={true} 
                      />
                    
                  );
                })}
              </div>
            )}
          
          {/* <div className={`w-full flex justify-center overflow-hidden transition-all duration-500 ease-in-out ${showButton ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Button className="w-[229px]" variant="solid" color="secondary" onPress={onButtonClicked}>
              {isExpanded ? "Get a quote" : "See more details"}
            </Button>
          </div> */}
          </CardBody>
        </div>
      </div>
    </Card>
  );
}

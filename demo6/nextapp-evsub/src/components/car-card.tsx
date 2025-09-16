'use client';

import { useRef, useEffect, useState, useCallback } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
// import { Image } from "@heroui/image";
import { CarInfoChip } from "@/components/car-info-chip";
import { CardDisplayMode, CarState, CarGroupState } from "@/types";
import { Button } from "@heroui/button";
import { CarTitle } from "@/components/car-title";
import { useCarsStore } from "@/stores/animations/cards-panel-store";
import { getCardWidth } from '@/utils/scale-helper';
import { BackButton } from "@/components/back-button";
import { FavoriteButton } from "@/components/favorite-button";

interface CarCardProps {
  carState: CarState;
  carGroupState: CarGroupState;
  isFromCarPark?: boolean;
}

export const CarCard = ({ carState, carGroupState, isFromCarPark = false }: CarCardProps) => {
  const showCriteria = (carState.displayProperties.displayMode & CardDisplayMode.ShowCriteria) !== 0;
  const showButton = (carState.displayProperties.displayMode & CardDisplayMode.ShowButton) !== 0;
  const isExpanded = (carState.displayProperties.displayMode & CardDisplayMode.Expand) !== 0;
  const isClickExpandable = (carState.displayProperties.displayMode & CardDisplayMode.ClickExpandable) !== 0;
  const isClickFlipable = (carState.displayProperties.displayMode & CardDisplayMode.ClickFlipable) !== 0;
  const showFavorite = (carState.displayProperties.displayMode & CardDisplayMode.ShowFavorite) !== 0;
  // const isShowPointer = ( isClickExpandable && !isExpanded ) || isClickFlipable;
  const isShowPointer = true;

  // Create a ref for the image element
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  // State to store the image height
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [isProcessingFlip, setIsProcessingFlip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);


  const { 
    setCarStateIsExpanded,
    setCarStateOnTop,
    setCarStateIsFlipped,
    setCarGroupSelected,
    toggleFavoriteCar,
  } = useCarsStore();

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent) => {
    // Store the car data in the drag event
    e.dataTransfer.setData('application/json', JSON.stringify({
      carGroupId: carGroupState.info.id,
      carId: carState.info.id,
      carState: carState
    }));
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
    
    // Create a drag image if the image ref is available
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(imageRef.current, rect.width / 2, rect.height / 2);
    }
  }, [carGroupState.info.id, carState]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Keyboard accessibility for favoriting
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleFavoriteCar(carState);
      e.preventDefault();
    }
  }, [carState, toggleFavoriteCar]);

  // Effect to measure the image height after it loads
  useEffect(() => {
    if (imageRef.current) {
      
      // Add resize observer to track height changes
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setImageHeight(entry.target.clientHeight);
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
      shadow="sm" 
      className={`w-full h-full transition-all duration-500 ease-in-out overflow-x-hidden ${isDragging ? 'opacity-50' : ''}`}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${carState.info.title} - Press Enter to add to favorites`}
    >
      <div 
        className={`grid grid-rows-[auto_auto] ${isShowPointer ? 'cursor-pointer' : ''}`}
        {...(isShowPointer ? { 
                onClick: () => {
                  if (isProcessingFlip) return;

                  if (isClickExpandable && !isExpanded){
                    setCarStateIsExpanded(carGroupState.info.id, carState.info.id, true)
                  }
                  else if (isClickFlipable){
                    // Set processing flag to prevent additional clicks
                    setIsProcessingFlip(true);

                    setCarStateIsFlipped(carGroupState.info.id, carState.info.id, true);

                    // // Then after 500ms, bring it to the top
                    setTimeout(() => {
                      setCarStateOnTop(carGroupState.info.id, carState.info.id);

                      // Reset the processing flag after operations complete
                      setIsProcessingFlip(false);
                      
                    }, 500);
                  }
                  else {
                    setCarGroupSelected(carGroupState.info.id, true);
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
              alt={carState.info.title}
              className={`absolute ${isExpanded ? "top-[20px] left-[20px] rounded-lg" : "top-0 left-0 rounded-b-none"}`}
              style={{
                minWidth: getCardWidth() + 'px',
                width: `${ isExpanded ? carState.displayProperties.boundingBox.width / 4 : getCardWidth()}px`,
                transition: 'width 500ms ease-in-out, top 500ms ease-in-out, left 500ms ease-in-out, border-radius 500ms ease-in-out',
                zIndex: 100
              }}
              // width={`${car.displayProperties.boundingBox.width ?? 0}px`}
              src={carState.info.img}
            />

            {/* { showFavorite && (<div 
              className={`absolute transition-opacity duration-500 ease-in-out rounded-bl-[20px]  ${isExpanded ? 'opacity-0' : 'opacity-100 delay-[500ms]'} `}
              style={{
                top: isExpanded ? '60px' : '7px',
                left: '217.2px',
                width: '24px',
                height: '24px',
                background: 'radial-gradient(circle, rgba(64, 64, 64, 0.8) 0%, rgba(64, 64, 64, 0.6) 80%, rgba(64, 64, 64, 0) 100%)',
                // background: 'linear-gradient(225deg, rgba(128, 128, 128, 0) 0%, rgba(128, 128, 128, 0.5) 10%, rgba(128, 128, 128, 0.7) 50%, rgba(128, 128, 128, 0.5) 60%,rgba(128, 128, 128, 0) 100%)',
                zIndex: 150,
                pointerEvents: 'none',
              }}
            />)} */}
            
          </div>
          
          <div className={`absolute transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              top: '16px',
              left: `${(carState.displayProperties.boundingBox.width ?? 0) / 7 * 4}px`,
            }}>
              <div >
                <CarTitle title={carState.info.title} subtitle={carState.info.subtitle} />
              </div>
          </div>

          <div className={`absolute transition-opacity ease-in-out ${isExpanded ? 'opacity-100 duration-500 delay-[500ms]' : 'transition-none opacity-0'}`}
            style={{ 
              top: '64px',
              left: `${(carState.displayProperties.boundingBox.width ?? 0) / 7 * 4}px`,
            }}>
              <div>
                <p className="text-sm text-default-500 transition-all duration-1000">{carState.info.description}</p>
              </div>
          </div>

          { showFavorite && (<FavoriteButton isExpanded={isExpanded} top={1} right={1} isFilled={carState.isFavorite} onClick={() => {
            // Toggle favorite state
            toggleFavoriteCar(carState);
          }} />)}
          
          {/* <BackButton isExpanded={isExpanded} top={16} right={20} onClick={onCloseClicked} /> */}

          <div className={`absolute transition-opacity duration-500 ease-in-out ${!isExpanded ? 'opacity-100' : 'transition-none opacity-0'}`}
            style={{ 
              top: `${imageHeight * 1.05}px`,
              left: '16px',
            }}>
              <div>
                <CarTitle title={carState.info.title} subtitle={carState.info.subtitle} />
              </div>
          </div>
        </div>

        <div id="card body" className="grid grid-rows-[auto_auto_auto] transition-all duration-500 ease-in-out">
          <CardBody className="flex-grow p-1 gap-2 overflow-x-hidden">

            
            { showCriteria &&  (
              
              <div className="flex flex-row items-center justify-center gap-2 h-[95px]">
                {Object.entries(carState.info.criteria).filter((_, index) => !isExpanded ? index < 2 : index < 5).map(([key, value], index) => {
                  // Map criteria keys to appropriate icons
                  const getIconForCriteria = (criteriaKey: string) => {
                    switch(criteriaKey) {
                      case 'Odometer':
                        return '/icons/internetspeedicon.svg';
                      case 'Efficiency':
                        return '/icons/efficiency.svg';
                      case 'Range':
                        return '/icons/range.svg';
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
                {Object.entries(carState.info.criteria).filter((_, index) => index >= 5 ).map(([key, value]) => {
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

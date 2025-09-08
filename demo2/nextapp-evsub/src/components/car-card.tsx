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

  return (
    <Card isPressable={false} shadow="sm" className="w-full h-full transition-all duration-500 ease-in-out" >
      <div 
        className="w-full overflow-hidden"
        >
        <Image
          alt={car.detail.title}
          // className="rounded-b-none object-none"
          className="rounded-b-none"
          src={car.detail.img}
          // width={253}
          // height={200}
        />
      </div>

      {/* <Image
          alt={car.title}
          // className="rounded-b-none object-none"
          className=" rounded-b-none "
          src={car.img}
          
        /> */}
      
      
      {/* Content container - takes the other 50% */}
      {/* <div className="flex flex-col">
        <CardBody className="flex-grow p-3 gap-2">
          <div className="">
            <h3 className="text-sm font-semibold">{car.detail.title}</h3>
            <p className="text-sm text-default-500">{car.detail.subtitle}</p>
          </div>
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
          { showButton &&
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showButton ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <Button variant="solid" color="primary" onPress={() => console.log("Clicked!")}>
                See more details
              </Button>
            </div>
          }
        </CardBody>
        
      </div> */}
      <div className="grid grid-rows-[auto_auto_auto] transition-all duration-500 ease-in-out">
        <CardBody className="flex-grow p-3 gap-2">
        <div className="">
          <h3 className="text-sm font-semibold">{car.detail.title}</h3>
          <p className="text-sm text-default-500">{car.detail.subtitle}</p>
        </div>
        
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
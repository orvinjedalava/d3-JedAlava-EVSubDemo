import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Image } from "@heroui/image";
import { CarInfoChip } from "./car-info-chip";
import { WeeklyCostIcon } from "@/components/icons";
import { CardDisplayMode, CarCardState } from "@/types";

interface CarCardProps {
  car: CarCardState;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card isPressable={false} shadow="sm" className="w-full h-full" >
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
      <div className="flex flex-col">
        <CardBody className="flex-grow p-3">
          <div className="mb-2">
            <h3 className="text-sm font-semibold">{car.detail.title}</h3>
            <p className="text-sm text-default-500">{car.detail.subtitle}</p>
          </div>
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
        </CardBody>
        {/* <CardFooter className="text-small justify-between">
          <b>{car.title}</b>
          <p className="text-default-500">{car.price}</p>
        </CardFooter> */}
      </div>
    </Card>
  );
}
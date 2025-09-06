import {Card, CardBody, CardFooter} from "@heroui/card";
import { Image } from "@heroui/image";

type Car = {
  title: string;
  img: string;
  price: string;
}

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <Card isPressable shadow="sm" className="w-full h-full" >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={car.title}
              className="w-full object-cover h-[140px]"
              src={car.img}
              // width={100}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{car.title}</b>
            <p className="text-default-500">{car.price}</p>
          </CardFooter>
        </Card>
  );
}
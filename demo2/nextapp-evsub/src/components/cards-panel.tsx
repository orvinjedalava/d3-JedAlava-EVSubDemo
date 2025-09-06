import { CarCard } from "@/components/car-card";

interface CardsPanelProps {
  width: number;
  height: number;
}

const carData = [
  {
    title: "Car 1",
    img: "/images/Volvo EX30.png",
    price: "$20,000",
  },
  {
    title: "Car 2",
    img: "/images/KIA EV5 Earth 2025.png",
    price: "$25,000",
  },
  {
    title: "Car 3",
    img: "/images/BMW I4 EDrive35 2023.png",
    price: "$30,000",
  },
  {
    title: "Car 4",
    img: "/images/Tesla Model 3 Earth 2025.png",
    price: "$35,000",
  },
];

const cardWidth = 253; // 64 * 4
const cardHeight = 276; // 80 * 4


export const CardsPanel = ({ width, height }: CardsPanelProps) => {
  return (
  <div className="flex-grow flex flex-col justify-center items-center" >
    <div style={{ width: cardWidth, height: cardHeight }}>
      <CarCard car={carData[0]} />
    </div>
  </div>);
}
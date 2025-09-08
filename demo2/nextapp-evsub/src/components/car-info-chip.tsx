import { Image } from "@heroui/image";


interface CarInfoChipProps {
  icon: string;
  description: string;
  value: string;
}

export const CarInfoChip = ({ icon, description, value }: CarInfoChipProps) => {
  return (
    <div className="flex flex-col items-center gap-2 bg-default-100 px-3 py-1 rounded-lg ">
      <Image
        src={icon}
        alt={description}
        width={24}
        height={24}
      />
      <span className="text-sm text-default-500">{description}</span>
      <span className="font-sm">{value}</span>
    </div>
  );
};
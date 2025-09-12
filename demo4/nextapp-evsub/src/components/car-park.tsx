import { PlusIcon } from "@/components/icons";
import { Button } from "@heroui/button";
import {  PlusCircleIcon } from "@heroicons/react/24/outline";

export const CarPark = () => {
  return (
    <div
      // className={`absolute top-[800px] left-[100px] min-w-[${1536 * 0.9}px] max-w-[${1536 * 0.9}px] bg-black/80 dark:bg-white/80 border`}
      className={`absolute top-[910px] left-[120px] min-w-[1300px] max-w-[1300px] min-h-[130px] 
        flex flex-col items-center justify-center
        rounded-tl-lg rounded-tr-lg bg-black/40 dark:bg-white/40`}
    >
      <Button isIconOnly variant="light">
        <PlusCircleIcon className="text-secondary size-8"  />
      </Button>
      <span>Favourited vehicles will appear here OR drag vehicles that interest you</span>
    </div>
  );
};
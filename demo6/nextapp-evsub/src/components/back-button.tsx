import {  ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";

interface BackButtonProps {
  isExpanded: boolean;
  top: number;
  right: number;
  onClick?: () => void;
}

export const BackButton = ({ isExpanded, top, right, onClick }: BackButtonProps) => {
  return (
    <Button 
      className={`absolute 
        transition-all duration-500 ease-in-out rounded-full w-6 h-6 min-w-0 flex items-center justify-center ${isExpanded ? 'opacity-100 delay-[500ms]' : 'opacity-0'}`}
      isIconOnly 
      onPress={() => onClick && onClick()}
      variant="light"
      style={{
        top: `${top}px`,
        right: `${right}px`,
        zIndex: 100,
      }}
    >
      <ArrowUturnLeftIcon className="text-secondary size-8"  />
    </Button>
  )
}
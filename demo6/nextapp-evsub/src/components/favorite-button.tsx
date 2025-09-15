import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";

interface FavoriteButtonProps {
  isExpanded: boolean;
  top: number;
  right: number;
  isFilled: boolean;
  onClick?: () => void;
}

export const FavoriteButton = ({ isExpanded, top, right, isFilled, onClick }: FavoriteButtonProps) => {
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
      }}
    >
      { isFilled ? <HeartIconSolid className="text-secondary size-8" /> : <HeartIconOutline className="text-secondary size-8" /> }
    </Button>
  )
}
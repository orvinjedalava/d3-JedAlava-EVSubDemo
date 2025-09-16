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
    // <div
    //   className={`absolute 
    //       transition-all duration-500 ease-in-out rounded-[8px]`}
    //   // style={{
    //   //     top: `${top}px`,
    //   //     // ...(isExpanded ? { right: `${right}px` } : { left: `${left}px` }),
    //   //     right: `${right}px`,
    //   //     zIndex: 200,
    //   //   }}
    //   style={{
    //     top: `${top}px`,
    //     right: `${right}px`,
    //     zIndex: 200,
    //     // background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
    //     background: !isExpanded ? 'linear-gradient(225deg, rgba(128, 128, 128, 1) 0%, rgba(128, 128, 128, 0.9) 60%, rgba(128, 128, 128, 0.1) 100%)' : undefined
    //   }}
    // >
      <Button 
        className={`absolute 
          transition-all duration-500 ease-in-out rounded-full w-10 h-10 min-w-0 flex items-center justify-center `}
        // className={`rounded-full w-10 h-10 min-w-0 flex items-center justify-center `}
        style={{
          top: `${top}px`,
          // ...(isExpanded ? { right: `${right}px` } : { left: `${left}px` }),
          right: `${right}px`,
          zIndex: 200,
        }}
        isIconOnly 
        onPress={() => onClick && onClick()}
        variant="light"
        
      >
        { isFilled ? <HeartIconSolid className="text-secondary size-8" /> : <HeartIconOutline className="text-secondary size-8" /> }
      </Button>
    // </div>
  )
}
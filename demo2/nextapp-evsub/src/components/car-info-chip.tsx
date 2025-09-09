import { Image } from "@heroui/image";
import { motion } from 'framer-motion';
import { motionOpacity } from '@/utils/coordinates-helpers';
import { appSettings } from '@/config/app';

interface CarInfoChipProps {
  icon: string;
  description: string;
  value: string;
  isOpacityDelayed: boolean
}

export const CarInfoChip = ({ icon, description, value, isOpacityDelayed }: CarInfoChipProps) => {
  return (
    <motion.div className="flex flex-col items-center gap-2 bg-default-100 px-3 py-1 rounded-lg min-w-[110px] max-h-[95px]"
      initial="initial"
            animate={ motionOpacity.animate }
            variants={motionOpacity}
            transition={{ duration: 0.5, delay: isOpacityDelayed ? 0.5 : 0 }}>
      <Image
        src={icon}
        alt={description}
        width={24}
        height={24}
      />
      <span className="text-sm text-default-500">{description}</span>
      <span className="font-sm">{value}</span>
    </motion.div>
  );
};
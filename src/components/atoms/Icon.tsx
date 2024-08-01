import Image from 'next/image';
import { iconData, type IconName } from '@/lib/data/iconData';

export default function Icon({ iconName }: { iconName: IconName }) {
  return (
    <Image
      src={iconData[iconName].src}
      alt={iconData[iconName].text}
      width={iconData[iconName].width}
      height={iconData[iconName].height}
    />
  );
}

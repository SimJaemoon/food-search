import { iconData, type IconName } from '@/lib/UI/dataset/iconData';
import Link from 'next/link';
import Icon from '../../atoms/Icon';

export default function IconButton({
  iconName,
  url,
}: {
  iconName: Exclude<IconName, 'back'>;
  url?: string;
}) {
  return (
    <button className="h-full w-full">
      <Link
        href={url || iconData[iconName].url}
        className="flex h-full w-full items-center justify-center"
      >
        <Icon iconName={iconName} />
      </Link>
    </button>
  );
}

import { iconData, type IconName } from '@/lib/data/iconData';
import Link from 'next/link';
import Icon from '../../atoms/Icon';

export default function IconWithBadgeButton({
  iconName,
  badgeContent,
  badgePosition,
}: {
  iconName: IconName;
  badgeContent: number;
  badgePosition: keyof typeof tailwindCSS.badgePosition;
}) {
  const content = badgeContent > 99 ? 99 : badgeContent;
  return (
    <button className="h-full w-full">
      <Link
        href={iconData[iconName].url}
        className="relative flex h-full w-full items-center justify-center"
      >
        <Icon iconName={iconName} />
        {/* Badge Content */}
        <div
          className={`text-label-sm absolute z-10 ${tailwindCSS.badgePosition[badgePosition].badgeContent}`}
        >
          {content}
        </div>
      </Link>
    </button>
  );
}

const tailwindCSS = {
  badgePosition: {
    center: {
      badgeContent: '-translate-y-[3px] text-primaryEmphasize',
    },
    right: {
      badgeContent:
        '-translate-y-[45%] translate-x-[55%] bg-primaryEmphasize text-onPrimaryEmphasize rounded-[50%] w-5 h-5 leading-[115%]',
    },
  },
};

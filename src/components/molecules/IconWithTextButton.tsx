import Link from 'next/link';
import Icon from '../atoms/Icon';
import { iconData, type IconName } from '@/lib/data/iconData';

export default function IconWithTextButton({
  iconName,
  iconPosition,
}: {
  iconName: IconName;
  iconPosition: keyof typeof tailwindCSS.iconPosition;
}) {
  return (
    <button className="h-full w-full">
      <Link
        href={iconData[iconName].url}
        className={`relative flex h-full w-full items-center justify-center ${tailwindCSS.iconPosition[iconPosition].Link}`}
      >
        <span
          className={`text-label-sm ${tailwindCSS.iconPosition[iconPosition].text}`}
        >
          {iconData[iconName].text}
        </span>
        <Icon iconName={iconName} />
      </Link>
    </button>
  );
}

const tailwindCSS = {
  iconPosition: {
    center: {
      Link: '',
      text: 'absolute z-10 text-onPrimaryEmphasize [text-shadow:_0px_0px_2px_#7E3E22]',
    },
    left: {
      Link: 'flex-row-reverse',
      text: 'pl-1',
    },
    right: {
      Link: '',
      text: 'pr-1',
    },
  },
};

import Link from 'next/link';
import Image from 'next/image';

// Button 구현 대상 : 1. icon, 2. iconWithText[left, center, right]
export default function IconButton({
  linkUrl,
  iconType,
  withText = false,
  iconPosition = 'left',
}: {
  linkUrl: string;
  iconType: keyof typeof buttonSource.iconName;
  withText?: boolean;
  iconPosition?: 'left' | 'center' | 'right';
}) {
  return (
    <button className="h-full w-full">
      <Link
        href={linkUrl}
        className={`relative flex h-full w-full items-center justify-center ${buttonSource.CSS[iconPosition].Link}`}
      >
        <Image
          src={buttonSource.iconName[iconType].src}
          alt={buttonSource.iconName[iconType].text}
          width={buttonSource.iconName[iconType].width}
          height={buttonSource.iconName[iconType].height}
        />
        {withText && (
          <div
            className={`text-label-sm ${buttonSource.CSS[iconPosition].text}`}
          >
            {buttonSource.iconName[iconType].text}
          </div>
        )}
      </Link>
    </button>
  );
}

const buttonSource = {
  CSS: {
    center: {
      Link: '',
      text: 'absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 text-onPrimaryEmphasize [text-shadow:_0px_0px_2px_#7E3E22]',
    },
    left: {
      Link: 'gap-1 flex-row-reverse',
      text: '',
    },
    right: {
      Link: 'gap-1',
      text: '',
    },
  },
  iconName: {
    delivery: {
      text: '배송조회',
      src: '/icon/delivery.png',
      width: 24,
      height: 24,
    },
    home: { text: '입구로 이동', src: '/icon/home.png', width: 40, height: 34 },
    cart: { text: '장바구니', src: '/icon/cart.png', width: 24, height: 24 },
  },
};

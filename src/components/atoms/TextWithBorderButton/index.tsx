import Link from 'next/link';

import { forwardRef } from 'react';

type Prop = {
  textContent: string;
  url: string;
  type: ButtonType;
  status: ButtonStatus;
};

const TextWithBorderButton = forwardRef<HTMLButtonElement, Prop>(
  ({ textContent, url, type, status }, ref) => {
    return (
      <button
        ref={ref}
        className={`shrink-0 rounded-sm px-2 shadow-1 ${tailwindCSS[type].css} ${status === 'selected' ? 'text-label-sm bg-primary text-onPrimary' : 'border-primary bg-background'}`}
      >
        <Link href={url} replace={true} className={`h-full`}>
          {textContent}
        </Link>
      </button>
    );
  },
);

const tailwindCSS = {
  categoryDetailGroup: {
    css: 'h-7 py-1',
  },
  categoryDetailSingle: {
    css: 'h-8 py-[6px]',
  },
};

TextWithBorderButton.displayName = 'TextWithBorderButton';

export type ButtonType = keyof typeof tailwindCSS;
export type ButtonStatus = 'normal' | 'selected';

export default TextWithBorderButton;

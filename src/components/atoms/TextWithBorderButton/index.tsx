import Link from 'next/link';

export default function TextWithBorderButton({
  textContent,
  url,
  type,
  status,
}: {
  textContent: string;
  url: string;
  type: ButtonType;
  status: ButtonStatus;
}) {
  return (
    <button
      className={`rounded-sm px-2 shadow-1 ${tailwindCSS[type].css} ${status === 'selected' ? 'text-label-sm bg-primary text-onPrimary' : 'border-primary bg-background'}`}
    >
      <Link href={url} className={`h-full`}>
        {textContent}
      </Link>
    </button>
  );
}

const tailwindCSS = {
  categoryDetailGroup: {
    css: 'h-7 py-1',
  },
  categoryDetailSingle: {
    css: 'h-8 py-[6px]',
  },
};

export type ButtonType = keyof typeof tailwindCSS;
export type ButtonStatus = 'normal' | 'selected';

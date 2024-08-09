'use client';

import TextButton from '@/components/atoms/TextButton';
import Icon from '@/components/atoms/Icon';

export default function ProductListStandContainer({
  totalItemNumber,
}: {
  totalItemNumber: number;
}) {
  const pageNumber = 4; // TODO: pageNumber 획득 방법 : useState 대신 useSearchParams - url을 사용
  const sortType: 'bestSelling' | 'lowPrice' | null = null; // TODO: 정렬 filter 값 저장/취득 방법 : useRouter, useSearchParams
  const totalPageNumber = Math.floor(totalItemNumber) + (totalItemNumber % 2);
  const pageNumberGroup = Array.from(
    { length: totalPageNumber },
    (_, i) => i + 1,
  );
  // TODO: see more sign, blur effect가 "page number cards" 의 eventHandler - inset property 조작에 따라 표시, 비표시 조건 추가
  return (
    <div className="flex h-full w-full flex-col justify-between px-2 py-2">
      {/* pagination */}
      <div className="flex h-8 w-full justify-center gap-[3%]">
        {/* left Sign - See More */}
        <button className="flex h-full w-8 items-center justify-center [filter:_invert(96%)_sepia(1%)_saturate(3698%)_hue-rotate(226deg)_brightness(115%)_contrast(100%)]">
          <Icon iconName="keyboardArrowLeft" />
        </button>
        <div className="relative h-full w-[70%]">
          {/* blur effect */}
          <div className="absolute left-[0] top-[0] z-20 h-full w-2 -translate-x-1/2 bg-background blur-figma"></div>
          <div className="absolute right-[0] top-[0] z-20 h-full w-2 translate-x-1/2 bg-background blur-figma"></div>
          {/* page numaber cards */}
          <div className="relative z-10 h-full w-full overflow-hidden">
            <div className="flex h-full flex-nowrap justify-between gap-3">
              {pageNumberGroup.map((v) => (
                <button
                  key={v}
                  className={`h-8 w-8 shrink-0 rounded-sm text-center leading-[32px] ${v === pageNumber ? tailwindCSS.selected : tailwindCSS.unselected}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* white band */}
          <div className="absolute top-1/2 z-0 h-4 w-full -translate-y-1/2 bg-background opacity-30"></div>
        </div>
        {/* right Sign - See More */}
        <button className="flex h-full w-8 items-center justify-center [filter:_invert(96%)_sepia(1%)_saturate(3698%)_hue-rotate(226deg)_brightness(115%)_contrast(100%)]">
          <Icon iconName="keyboardArrowRight" />
        </button>
      </div>
      {/* filter btn */}
      <div className="flex h-8 w-full justify-between">
        <div className="text-label-sm h-full w-[30%] pl-[1%] text-left leading-[32px] text-onSecondary">
          {totalItemNumber > 999 ? 999 : totalItemNumber}개 상품
        </div>
        <div
          className={`flex h-full w-[32%] items-center justify-center rounded-sm shadow-1 ${sortType === 'bestSelling' ? tailwindCSS.selected : tailwindCSS.unselected}`}
        >
          <TextButton
            textContent="많이 팔린순"
            url="/usePathname?sortType=bestSelling"
          />
        </div>
        <div
          className={`flex h-full w-[32%] items-center justify-center rounded-sm shadow-1 ${sortType === 'lowPrice' ? tailwindCSS.selected : tailwindCSS.unselected}`}
        >
          <TextButton
            textContent="낮은 가격순"
            url="/usePathname?sortType=lowPrice"
          />
        </div>
      </div>
    </div>
  );
}

const tailwindCSS = {
  selected: 'text-label-sm bg-secondaryEmphasize text-onSecondaryEmphasize',
  unselected: 'border-[1px] border-secondaryEmphasize bg-background',
};

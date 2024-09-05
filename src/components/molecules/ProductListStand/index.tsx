import Icon from '@/components/atoms/Icon';

import { type Dispatch, type SetStateAction, useRef, useEffect } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function ProductListStand({
  totalItemNumber,
  displayedProductCardStartIndex,
  setDisplayedProductCardStartIndex,
  handleLeftSeeMoreButtonClick,
  handleRightSeeMoreButtonClick,
}: {
  totalItemNumber: number;
  displayedProductCardStartIndex: number;
  setDisplayedProductCardStartIndex: Dispatch<SetStateAction<number>>;
  handleLeftSeeMoreButtonClick: () => void;
  handleRightSeeMoreButtonClick: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const singleId = searchParams.get('singleId');
  const sortType = searchParams.get('sortType');

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderContainerRef = useRef<HTMLButtonElement>(null);

  // HOLD: 현재 아래 코드로 인해 10개 이상시 border 개수가 page bullet 이동과 불일치 문제 존재
  // but 10개 이상 border 생성시 너무 빽빽해짐 & page bullet을 white band 를 분할한 각 page 할당 영역의 가운데 정렬이라서, item 개수에 따라 bullet 위치 변화함
  const sliderContainerBorderNumber =
    totalItemNumber - 1 < 10 ? totalItemNumber - 1 : 10;

  useEffect(() => {
    if (sliderContainerRef.current) {
      if (sliderRef.current) {
        const sliderUnitWidth =
          sliderContainerRef.current.offsetWidth / (totalItemNumber - 1);

        sliderRef.current.style.left = `${sliderUnitWidth * (displayedProductCardStartIndex + 0.5)}px`;
      }
    }
  }, [totalItemNumber, displayedProductCardStartIndex]);

  return (
    <>
      {/* 매대 상자 */}
      <div className="relative bottom-11 left-[12px] h-[148px] w-[calc(100%-24px)]">
        {/* 윗면 */}
        <div className="absolute left-[0] top-[0] h-11 w-full bg-background [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]">
          {/* 외곽선 생성 */}
          <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondaryEmphasize [clip-path:polygon(0%_0%,_calc(100%-24px)_0%,_100%_44px,_12px_44px)]"></div>
        </div>
        {/* 정면 */}
        {/* HOLD: 매대 박스 전체에 shadow-3 적용할 수 없어서, clip-path를 사용하지 않은 정면에 shadow-figma[Drop Shadow]를 적용함 */}
        <div className="absolute left-[12px] top-[44px] h-[calc(100%-44px)] w-[calc(100%-12px)] border-[0.5px] border-background bg-secondary shadow-figma">
          <div className="flex h-full w-full flex-col justify-between px-2 py-2">
            {/* pagination */}
            {totalItemNumber > 2 ? (
              <div className="flex h-8 w-full items-center justify-center gap-[3%]">
                {/* left Sign - See More */}
                <button
                  onClick={handleLeftSeeMoreButtonClick}
                  className={`flex h-full w-8 items-center justify-center [filter:_invert(96%)_sepia(1%)_saturate(3698%)_hue-rotate(226deg)_brightness(115%)_contrast(100%)] ${displayedProductCardStartIndex !== 0 ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
                >
                  <Icon iconName="keyboardArrowLeft" />
                </button>
                <button
                  ref={sliderContainerRef}
                  onClick={(e) => {
                    const currentCardIndex = Math.round(
                      // NOTE: (e.clientX - currentTarget.getBoundingClientRect().left) 을 e.nativeEvent.offsetX 로  대체할 시 발생하는 문제
                      // slider container 내 자식 div 요소 click 하면 해당 자식 요소를 기준으로 offset 계산하기에 원하는 값 획득 불가
                      ((e.clientX -
                        e.currentTarget.getBoundingClientRect().left) /
                        e.currentTarget.offsetWidth) *
                        (totalItemNumber - 2),
                    );
                    setDisplayedProductCardStartIndex(currentCardIndex);
                  }}
                  className="h-4 w-[70%]"
                >
                  {/* white band */}
                  <div className="relative h-full w-full rounded-md bg-gradient-to-r from-secondaryEmphasize/40 to-secondaryEmphasize/80 shadow-2">
                    <div className="flex h-full w-full flex-nowrap">
                      {Array.from(
                        {
                          length: sliderContainerBorderNumber,
                        },
                        (_, i) => (
                          <div
                            key={i}
                            className={`w-full ${i === sliderContainerBorderNumber - 1 ? '' : 'border-r-[0.5px] border-r-onSecondaryEmphasize/40'}`}
                          ></div>
                        ),
                      )}
                    </div>
                    <div
                      ref={sliderRef}
                      // NOTE: [코드 삭제됨] CSS 적용 방식(style, className) 간 충돌 회피 : useEffect 내에서는 transform 을 사용하고 className에서는 translate를 사용해 override 회피
                      className="absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-onSecondaryEmphasize shadow-1 transition-all"
                    />
                  </div>
                </button>
                {/* right Sign - See More */}
                <button
                  onClick={handleRightSeeMoreButtonClick}
                  className={`flex h-full w-8 items-center justify-center [filter:_invert(96%)_sepia(1%)_saturate(3698%)_hue-rotate(226deg)_brightness(115%)_contrast(100%)] ${displayedProductCardStartIndex !== totalItemNumber - 2 ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
                >
                  <Icon iconName="keyboardArrowRight" />
                </button>
              </div>
            ) : (
              <div className="h-8 w-full" />
            )}
            {/* filter btn */}
            <div className="flex h-8 w-full justify-between">
              <div className="text-label-sm h-full w-[30%] text-nowrap pl-[1%] text-left leading-[32px] text-onSecondary">
                {totalItemNumber > 999 ? 999 : totalItemNumber}&nbsp;개 상품
              </div>
              <button
                onClick={(e) => {
                  setDisplayedProductCardStartIndex(0);
                  sortType === 'bestSelling'
                    ? router.replace(pathname + `?singleId=${singleId}`)
                    : router.replace(
                        pathname + `?singleId=${singleId}&sortType=bestSelling`,
                      );
                  e.stopPropagation();
                }}
                className={`flex h-full w-[32%] items-center justify-center rounded-sm shadow-1 ${sortType === 'bestSelling' ? tailwindCSS.selected : tailwindCSS.unselected}`}
              >
                많이 팔린순
              </button>
              <button
                onClick={(e) => {
                  setDisplayedProductCardStartIndex(0);
                  sortType === 'lowPrice'
                    ? router.replace(pathname + `?singleId=${singleId}`)
                    : router.replace(
                        pathname + `?singleId=${singleId}&sortType=lowPrice`,
                      );
                  e.stopPropagation();
                }}
                className={`flex h-full w-[32%] items-center justify-center rounded-sm shadow-1 ${sortType === 'lowPrice' ? tailwindCSS.selected : tailwindCSS.unselected}`}
              >
                낮은 가격순
              </button>
            </div>
          </div>
        </div>
        {/* 측면 */}
        <div className="absolute left-[0] top-[0] h-full w-3 bg-background [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]">
          {/* 외곽선 생성 */}
          <div className="absolute left-[0.5px] top-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] bg-secondary [clip-path:polygon(0%_0%,_100%_44px,_100%_100%,_0%_calc(100%-56px))]"></div>
        </div>
      </div>
    </>
  );
}

const tailwindCSS = {
  selected: 'text-label-sm bg-secondaryEmphasize text-onSecondaryEmphasize',
  unselected: 'border-[1px] border-secondaryEmphasize bg-background',
};

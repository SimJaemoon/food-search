import ProductCard from '@/components/atoms/ProductCard';

import { type Product } from '@/lib/data/data';
import {
  type Dispatch,
  type SetStateAction,
  useRef,
  Fragment,
  useEffect,
} from 'react';

import { useSearchParams } from 'next/navigation';

import ProductListStand from '@/components/molecules/ProductListStand';

export default function ProductCardGroup({
  sortedProducts,
  displayedProductCardStartIndex,
  setDisplayedProductCardStartIndex,
  handleCardClickWithParameter,
  handleLeftSeeMoreButtonClick,
  handleRightSeeMoreButtonClick,
}: {
  sortedProducts: Product[];
  displayedProductCardStartIndex: number;
  setDisplayedProductCardStartIndex: Dispatch<SetStateAction<number>>;
  handleCardClickWithParameter: (productId: string) => () => void;
  handleLeftSeeMoreButtonClick: () => void;
  handleRightSeeMoreButtonClick: () => void;
}) {
  const searchParams = useSearchParams();
  const sortType = searchParams?.get('sortType');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sortedProducts.length <= 2) return;

    const ref = scrollRef.current;
    if (ref) {
      const cardScrollUnitWidth = ref.clientWidth * 0.445; // NOTE: 42.5%[카드 크기]-2%[gap]
      ref.scrollLeft = cardScrollUnitWidth * displayedProductCardStartIndex;
    }
  });

  useEffect(() => {
    const ref = scrollRef.current;

    function handleScrollend() {
      if (ref) {
        setDisplayedProductCardStartIndex((prev) => {
          const cardScrollUnitWidth = ref.clientWidth * 0.445;
          const cardScrollPosition = ref.scrollLeft / cardScrollUnitWidth;

          // HOLD: ± 0.1 을 추가한 이유 - 미봉책 : 각 card 에 할당된 scroll 영역이 서로 겹치는 부분에서 currentCardIndex를 정확히 확정하지 못해 오작동하는 문제 해결
          let currentCardIndex =
            prev + 0.1 < cardScrollPosition
              ? Math.ceil(cardScrollPosition)
              : prev - 0.1 > cardScrollPosition
                ? Math.floor(cardScrollPosition)
                : prev;

          // NOTE: scrollend event는 state 가능 범위를 초과할 수 있기에 sortedProducts.length로 제한
          return currentCardIndex < sortedProducts.length - 2
            ? currentCardIndex
            : sortedProducts.length - 2;
        });
      }
    }
    if (ref) {
      ref.addEventListener('scrollend', handleScrollend);
    }
    // NOTE: cleanup 함수 + remove event 누락하지 말기
    return () => {
      if (ref) {
        ref.removeEventListener('scrollend', handleScrollend);
      }
    };
  }, [setDisplayedProductCardStartIndex, sortedProducts]);

  return (
    <>
      <article className="relative z-10 h-full w-full">
        <div className={`relative h-full w-full overflow-hidden py-4`}>
          <div
            ref={scrollRef}
            className={`relative flex h-full flex-nowrap items-center gap-[2%] overflow-x-scroll scroll-smooth`}
          >
            {sortedProducts.map((v, i) => {
              const opaqueCardPosition =
                displayedProductCardStartIndex - 1 === i
                  ? 'left'
                  : displayedProductCardStartIndex + 2 === i
                    ? 'right'
                    : null;
              return (
                // NOTE: sortType button(e.g., 낮은 가격순) 을 double click 시 card 가 튀는 현상 해결 [해결책 : sortType에 따라 key 다르게 설정]
                <Fragment key={v.product_id + sortType}>
                  {i === 0 && (
                    <div className={`h-full w-[4.5%] shrink-0`}></div>
                  )}
                  <article className={`h-full w-[42.5%] shrink-0`}>
                    {
                      <ProductCard
                        {...v}
                        handleCardClick={
                          [
                            displayedProductCardStartIndex,
                            displayedProductCardStartIndex + 1,
                          ].includes(i)
                            ? handleCardClickWithParameter(v.product_id)
                            : undefined
                        }
                        opaqueCardPosition={opaqueCardPosition}
                      />
                    }
                  </article>
                  {sortedProducts.length > 2 &&
                    i === sortedProducts.length - 1 && (
                      <div className={`h-full w-[4.5%] shrink-0`}></div>
                    )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </article>
      <ProductListStand
        totalItemNumber={sortedProducts.length}
        displayedProductCardStartIndex={displayedProductCardStartIndex}
        setDisplayedProductCardStartIndex={setDisplayedProductCardStartIndex}
        handleLeftSeeMoreButtonClick={handleLeftSeeMoreButtonClick}
        handleRightSeeMoreButtonClick={handleRightSeeMoreButtonClick}
      />
    </>
  );
}

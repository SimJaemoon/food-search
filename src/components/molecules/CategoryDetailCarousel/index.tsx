'use client';

import {
  productCategoryDetailData,
  type ProductCategory,
} from '@/lib/data/productCategoryDetailData';

import { useState, useRef, useLayoutEffect, Fragment, useEffect } from 'react';

import TextWithBorderButton, {
  type ButtonType,
} from '../../atoms/TextWithBorderButton';
import SeeMoreButton from '../SeeMoreButton';

// NOTE: Carousel item 을 Click해 선택한 item 변경 & url이 변경될 때마다, 해당 comp를 import한 page는 re-mount 되기에 state, ref를 유지할 수 없음
// 해당 comp를 호출하는 page를 CSR로 만들어 client fetch를 수행하면 state를 유지하겠지만, SSR의 장점과 url을 통한 접근 방식을 CSR로 다시 설계야할 될 것으로 예상됨
// 정리 - page를 server comp로 유지하고 싶어 CSR 방법을 사용 X, 그로 인해 selected item을 변경할 때 이전에 선택된 item scroll 위치를 파악하지 못 해 scroll-behavior: smooth 적용 불가
export default function CategoryDetailCarousel({
  categoryKey,
  categoryGroupIndex,
  categorySingleIndex,
  type,
}: {
  categoryKey: ProductCategory;
  categoryGroupIndex: number;
  categorySingleIndex?: number;
  type: ButtonType;
}) {
  const [overflowDirection, setOverflowDirection] = useState<
    null | 'left' | 'right' | 'both'
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  function handleScroll() {
    const ref = scrollRef.current;
    if (ref) {
      if (ref.scrollWidth > ref.clientWidth) {
        const overflowType =
          ref.scrollLeft === 0
            ? 'right'
            : ref.scrollLeft === ref.scrollWidth - ref.clientWidth
              ? 'left'
              : 'both';
        setOverflowDirection(overflowType);
      }
    }
  }

  function handleSeeMoreButtonClick(direction: 'left' | 'right') {
    return () => {
      const ref = scrollRef.current;
      if (!ref) return;

      if (direction === 'right') {
        const scrollableWidth =
          ref.scrollWidth - ref.clientWidth - ref.scrollLeft;
        ref.scrollLeft +=
          ref.clientWidth < scrollableWidth
            ? ref.clientWidth * 0.8 // HOLD: 각 item의 좌측면을 가시 영역에 좌측면에 정렬해보기 - 문제 : 각 item의 OffsetLeft 값이 필요
            : scrollableWidth;
      }

      if (direction === 'left') {
        const scrollableWidth = ref.scrollLeft;
        ref.scrollLeft -=
          ref.clientWidth < scrollableWidth
            ? ref.clientWidth * 0.8 // HOLD: 각 item의 좌측면을 가시 영역에 좌측면에 정렬해보기 - 문제 : 각 item의 OffsetLeft 값이 필요
            : scrollableWidth;
      }
    };
  }

  useLayoutEffect(() => {
    const selectedItem = selectedItemRef.current;
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      if (selectedItem) {
        if (
          selectedItem.offsetLeft + selectedItem.offsetWidth >
          scrollElement.clientWidth
        ) {
          const scrollableWidth =
            scrollElement.scrollWidth -
            scrollElement.clientWidth -
            scrollElement.scrollLeft;
          if (
            // NOTE: dev 시, 2번 mount되는 현상 회피
            ![scrollElement.scrollLeft, scrollableWidth].includes(
              selectedItem.offsetLeft - 12, // NOTE: scrollItem 요소에 적용된 margin-left 12px 을 고려해, item 좌측 끝이 가시 영역에 보여지도록 반영 - 부모 요소를 기준으로 offsetLeft가 측정됨을 반영
            )
          ) {
            const moveDistance =
              selectedItem.offsetLeft < scrollableWidth
                ? selectedItem.offsetLeft - 12
                : scrollableWidth;
            scrollElement.scrollLeft += moveDistance;
          }
        }
      }
      if (scrollElement.scrollWidth > scrollElement.clientWidth) {
        if (scrollElement.scrollWidth > scrollElement.clientWidth) {
          const overflowType =
            scrollElement.scrollLeft === 0
              ? 'right'
              : scrollElement.scrollLeft ===
                  scrollElement.scrollWidth - scrollElement.clientWidth
                ? 'left'
                : 'both';
          setOverflowDirection(overflowType);
        }
      }
    }
  }, []);

  useEffect(() => {
    // NOTE: item 선택으로 인해 url이 변경될 때마다 page가 re-mount 되기에, smooth를 mount시 적용하면 항상 첫 item부터 선택된 item까지 스크롤이 발생함
    // [문제 : scrollLeft = 0에서 시작해 scroll 됨]
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`mx-3 flex h-full w-[calc(100%-24px)] items-center overflow-x-scroll`}
        // NOTE: px-3으로 할 경우, padding 영역이 scroll시 가시 영역으로 됨 so margin으로 교체
        // HOLD: first, last item의 좌측, 우측면의 그림자가 잘리는 느낌을 받음, 착각?
      >
        <div className="flex flex-nowrap items-center justify-between gap-2">
          {type === 'categoryDetailGroup'
            ? productCategoryDetailData[categoryKey].children.map((v, i) => (
                <TextWithBorderButton
                  key={v.groupName}
                  textContent={v.groupName}
                  url={`/ProductList/${categoryKey}/${i}/0`}
                  type={type}
                  status={categoryGroupIndex === i ? 'selected' : 'normal'}
                  ref={categoryGroupIndex === i ? selectedItemRef : null}
                />
              ))
            : productCategoryDetailData[categoryKey].children[
                categoryGroupIndex
              ].children.map((v, i) => (
                <Fragment key={v}>
                  {/* NOTE: 배열 data의 0 index를 "전체" btn에 할당 */}
                  {i === 0 && (
                    <TextWithBorderButton
                      textContent={'전체'}
                      url={`/ProductList/${categoryKey}/${categoryGroupIndex}/0`}
                      type={type}
                      status={categorySingleIndex === 0 ? 'selected' : 'normal'}
                      ref={categorySingleIndex === 0 ? selectedItemRef : null}
                    />
                  )}
                  <TextWithBorderButton
                    textContent={v}
                    url={`/ProductList/${categoryKey}/${categoryGroupIndex}/${i + 1}`}
                    type={type}
                    status={
                      categorySingleIndex === i + 1 ? 'selected' : 'normal'
                    }
                    ref={categorySingleIndex === i + 1 ? selectedItemRef : null}
                  />
                </Fragment>
              ))}
        </div>
      </div>
      <div
        className={`absolute left-[0] top-[0] z-10 h-full w-[5%] ${overflowDirection === 'left' || overflowDirection === 'both' ? '' : 'hidden'}`}
      >
        <SeeMoreButton
          type="sign"
          direction="left"
          shapeColor="secondaryEmphasize"
          backgroundColor="background"
          handleClick={handleSeeMoreButtonClick('left')}
        />
      </div>
      <div
        className={`absolute right-[0] top-[0] z-10 h-full w-[5%] ${overflowDirection === 'right' || overflowDirection === 'both' ? '' : 'hidden'}`}
      >
        <SeeMoreButton
          type="sign"
          direction="right"
          shapeColor="secondaryEmphasize"
          backgroundColor="background"
          handleClick={handleSeeMoreButtonClick('right')}
        />
      </div>
    </div>
  );
}

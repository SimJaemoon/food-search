'use client';

import {
  type ProductCategoryGroup,
  type ProductCategorySingle,
} from '@/lib/data/data';

import { useSearchParams } from 'next/navigation';
import { useState, useRef, useLayoutEffect, Fragment, useEffect } from 'react';

import TextWithBorderButton, {
  type ButtonType,
} from '../../atoms/TextWithBorderButton';
import SeeMoreButton from '../SeeMoreButton';

// NOTE: Carousel item 을 Click해 선택한 item 변경 & url이 변경될 때마다, 해당 comp를 import한 page는 re-mount 되기에 state, ref를 유지할 수 없음
// 해당 comp를 호출하는 page를 CSR로 만들어 client fetch를 수행하면 state를 유지하겠지만, SSR의 장점과 url을 통한 접근 방식을 CSR로 다시 설계야할 될 것으로 예상됨
// 정리 - page를 server comp로 유지하고 싶어 CSR 방법을 사용 X, 그로 인해 selected item을 변경할 때 이전에 선택된 item scroll 위치를 파악하지 못 해 scroll-behavior: smooth 적용 불가
export default function CategoryDetailCarousel({
  categoryId,
  groupId,
  type,
  groupData,
  singleData,
}: {
  categoryId: string;
  groupId: string;
  type: ButtonType;
  groupData?: ProductCategoryGroup[];
  singleData?: ProductCategorySingle[];
}) {
  const searchParams = useSearchParams();
  const singleId = searchParams.get('singleId');
  const [overflowDirection, setOverflowDirection] = useState<
    null | 'left' | 'right' | 'both'
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);
  const isMountedRef = useRef(false);

  function handleScroll() {
    const ref = scrollRef.current;
    if (ref) {
      if (ref.scrollWidth > ref.clientWidth) {
        const overflowType =
          ref.scrollLeft === 0
            ? 'right'
            : ref.scrollLeft > ref.scrollWidth - ref.clientWidth - 2
              ? // NOTE: -2 을 한 이유는 "ref.scrollLeft === ref.scrollWidth - ref.clientWidth" 가 동작하지 않아서 + mobile 환경에서는 정작 동작하는 것으로 확인 [ref : Landing/modal]
                'left'
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
          ref.clientWidth * 0.8 < scrollableWidth
            ? ref.clientWidth * 0.8 // HOLD: 각 item의 좌측면을 가시 영역에 좌측면에 정렬해보기 - 문제 : 각 item의 OffsetLeft 값이 필요
            : scrollableWidth;
      }

      if (direction === 'left') {
        const scrollableWidth = ref.scrollLeft;
        ref.scrollLeft -=
          ref.clientWidth * 0.8 < scrollableWidth
            ? ref.clientWidth * 0.8 // HOLD: 각 item의 좌측면을 가시 영역에 좌측면에 정렬해보기 - 문제 : 각 item의 OffsetLeft 값이 필요
            : scrollableWidth;
      }
    };
  }

  useEffect(() => {
    const selectedItem = selectedItemRef.current;
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      if (selectedItem) {
        if (
          // NOTE: 선택된 item이 clientWidth를 넘어가면 scroll 해 선택된 item을 좌측면 위치시키는 로직
          // ---- scrollElement와 selectedItem 구분 주의 [scrollElement.offset 사용시 margin 미포함 주의 -- 현재는 offset 미사용]
          selectedItem.offsetLeft + selectedItem.offsetWidth >
          scrollElement.clientWidth
        ) {
          // NOTE: dev 시, 2번 mount되는 현상 회피
          if (!isMountedRef.current) {
            const scrollableWidth =
              scrollElement.scrollWidth -
              scrollElement.clientWidth -
              scrollElement.scrollLeft;

            const moveDistance =
              selectedItem.offsetLeft < scrollableWidth
                ? selectedItem.offsetLeft
                : scrollableWidth;
            scrollElement.scrollLeft += moveDistance;
            isMountedRef.current = true;
          }
        }
      }
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
  }, []);

  useEffect(() => {
    // NOTE: item 선택으로 인해 url이 변경될 때마다 page가 re-mount 되기에, smooth를 mount시 적용하면 항상 첫 item부터 선택된 item까지 스크롤이 발생함
    // [문제 : scrollLeft = 0에서 시작해 scroll 됨]
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth';
  }, []);

  if (!(groupData || singleData)) return <></>; // HOLD: 404 Not Found error로 대체? -- category 데이터 hard-code로 주입시 코드 재작성 필요
  if (groupData && groupData.length === 0) return <></>; // HOLD: 404 Not Found error로 대체? -- category 데이터 hard-code로 주입시 코드 재작성 필요
  if (singleData && singleData.length === 0) return <></>; // HOLD: 404 Not Found error로 대체? -- category 데이터 hard-code로 주입시 코드 재작성 필요

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
          {type === 'categoryDetailGroup' &&
            groupData &&
            groupData.map((v) => (
              <TextWithBorderButton
                key={v.group_id}
                textContent={v.group_name}
                // FIXME: 존재하지 않는 group_id, single_id 접근 case : category 데이터를 hard-coding해 존재하지 않는 url에 접근을 차단하는 편이 좋다고 현재 판단 중
                url={`/ProductList/${categoryId}/${v.group_id}?singleId=whole`}
                type={type}
                status={groupId === v.group_id ? 'selected' : 'normal'}
                ref={groupId === v.group_id ? selectedItemRef : null}
              />
            ))}
          {type === 'categoryDetailSingle' &&
            singleData &&
            singleData.map((v, i) => (
              <Fragment key={v.single_id}>
                {/* NOTE: 배열 data의 0 index를 "전체" btn에 할당 */}
                {i === 0 && (
                  <TextWithBorderButton
                    textContent={'전체'}
                    // FIXME: 존재하지 않는 group_id, single_id 접근 case : category 데이터를 hard-coding해 존재하지 않는 url에 접근을 차단하는 편이 좋다고 현재 판단 중
                    url={`/ProductList/${categoryId}/${groupId}?singleId=whole`}
                    type={type}
                    status={
                      singleId === 'whole' ||
                      !singleData.some((v2) => v2.single_id === singleId)
                        ? 'selected'
                        : 'normal'
                    }
                    ref={singleId === 'whole' ? selectedItemRef : null}
                  />
                )}
                <TextWithBorderButton
                  textContent={v.single_name}
                  url={`/ProductList/${categoryId}/${groupId}?singleId=${v.single_id}`}
                  type={type}
                  status={singleId === v.single_id ? 'selected' : 'normal'}
                  ref={singleId === v.single_id ? selectedItemRef : null}
                />
              </Fragment>
            ))}
        </div>
      </div>
      <div
        className={`absolute left-[0] top-[0] z-10 h-full w-[5%] ${overflowDirection === 'left' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
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
        className={`absolute right-[0] top-[0] z-10 h-full w-[5%] ${overflowDirection === 'right' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
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

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import useSWR, { Fetcher } from 'swr';
import { type ProductCategoryDetailModal } from '@/lib/data/data';
import { useState, useRef, useLayoutEffect } from 'react';

import SeeMoreButton from '@/components/molecules/SeeMoreButton';

const fetcher: Fetcher<ProductCategoryDetailModal[], string> = (...args) =>
  fetch(...args).then((res) => res.json());

// HOLD: 현재 문제 : useSWR을 통한 데이터 통신으로 인해 element 표시 지연이 발생함 -- Loading page 추가해서 지연 숨기기?
// > 해결 방안 : category, categoryGroup 데이터를 데이터 통신이 아닌 hard-code로 삽입하기, 그래도 modal page는 client comp로? 추후 좀 더 생각해보기

// HOLD: Landing/modal을 server comp로 유지하고자 하면, pagination state 관리를 url, sessionStorage 등으로 수행해야 함 (url 변경으로 인한 state 유지가 불가능해짐)
// But, server comp로 작성할 경우, url 변화에 따른 깜박임 현상이 발생할 것으로 예상되서 client component로 작성함
// TODO: 시도 안 해본 것 : page.tsx의 prop으로 searchParams을 받아서 url param에 pagination state를 유지하면서 modal page 진입해보기(Not : dynamic route parameter)
// > 그래도, 깜박임 현상은 발생할 것으로 예상

export default function Modal() {
  const searchedParams = useSearchParams();
  const categoryId = searchedParams.get('categoryId');
  // TODO: api 데이터 비동기 통신 관련 error, loading 대응 코드 추가하기 + useLayoutEffect
  const { data: productCategoryGroups } = useSWR(
    categoryId ? `/api/productCategoryGroups?categoryId=${categoryId}` : null,
    fetcher,
  );

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [overflowDirection, setOverflowDirection] = useState<
    null | 'up' | 'down' | 'both'
  >(null);
  const isMountedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const ref = scrollRef.current;
    if (ref) {
      if (ref.scrollHeight > ref.clientHeight) {
        const overflowType =
          ref.scrollTop === 0
            ? 'down'
            : ref.scrollTop === ref.scrollHeight - ref.clientHeight
              ? 'up'
              : 'both';
        setOverflowDirection(overflowType);
      }
    }
  }

  function handleSeeMoreButtonClick(direction: 'up' | 'down') {
    return () => {
      const ref = scrollRef.current;
      if (!ref) return;

      if (direction === 'down') {
        const scrollableHeight =
          ref.scrollHeight - ref.clientHeight - ref.scrollTop;
        ref.scrollTop +=
          ref.clientHeight < scrollableHeight
            ? ref.clientHeight * (1 - 0.135 * 3)
            : scrollableHeight;
      }

      if (direction === 'up') {
        const scrollableHeight = ref.scrollTop;
        ref.scrollTop -=
          ref.clientHeight < scrollableHeight
            ? ref.clientHeight * (1 - 0.135 * 3)
            : scrollableHeight;
      }
    };
  }

  // NOTE: layout에서 이미 <></}> 로 mount한 상태라서 의존성 배열을 삽입하면 해당 effect는 발생하지 않기에
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (!isMountedRef.current) {
      if (categoryId && productCategoryGroups) {
        isMountedRef.current = true;
        if (scrollRef.current) {
          if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
            setOverflowDirection('down');
          }
        }
      }
    }
  });

  if (!categoryId || !productCategoryGroups) return <></>;

  return (
    <div
      onClick={() => {
        setSelectedItem(null);
        router.back();
      }}
      className="absolute bottom-[16px] z-40 h-[calc(100%-32px)] w-[calc(100%-32px)]"
    >
      {/* TODO: w,h padding 값 제거 [모든 side 16px] */}
      <div className="absolute bottom-12 h-[calc(100%-48px-32px-48px)] w-full bg-onBackground/50"></div>
      <div className="absolute bottom-[10%] left-1/2 flex h-[72.5%] w-[90%] -translate-x-1/2 flex-col items-center overflow-hidden">
        <div
          onClick={(e) => e.stopPropagation()}
          className="text-label-lg h-10 w-full border-b-8 border-secondary text-center text-background shadow-figma"
        >
          {productCategoryGroups[0].category_id.replace(',', ' / ')}
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative h-[calc(100%-40px-48px-16px-32px)] w-[calc(100%-16px)] border-x-[0.5px] border-secondary bg-background/85"
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-scroll [scroll-behavior:_smooth]"
          >
            {productCategoryGroups.map((v) => (
              <button
                key={v.group_id}
                className={`flex h-[13.5%] w-full items-center justify-center border-b-[0.5px] border-secondary text-center ${selectedItem === v.group_id ? '' : 'hover:bg-secondary/50'}`}
                onClick={() => {
                  setSelectedItem(v.group_id);
                }}
              >
                <div
                  className={`flex h-[65%] w-full items-center justify-center ${selectedItem === v.group_id ? 'text-label-md bg-secondaryEmphasize text-onSecondaryEmphasize shadow-3' : ''}`}
                >
                  {v.group_name}
                </div>
              </button>
            ))}
          </div>
          <div
            className={`absolute top-[0] z-50 h-[6%] w-full ${overflowDirection === 'up' || overflowDirection === 'both' ? '' : 'hidden'}`}
          >
            {/* TODO: See More Button 표시 animation 추가 */}
            <SeeMoreButton
              type="bar"
              direction="up"
              shapeColor="background"
              backgroundColor="onBackground"
              handleClick={handleSeeMoreButtonClick('up')}
            />
          </div>
          <div
            className={`absolute bottom-[0] z-50 h-[6%] w-full ${overflowDirection === 'down' || overflowDirection === 'both' ? '' : 'hidden'}`}
          >
            {/* TODO: See More Button 표시 animation 추가 */}
            <SeeMoreButton
              type="bar"
              direction="down"
              shapeColor="background"
              backgroundColor="onBackground"
              handleClick={handleSeeMoreButtonClick('down')}
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            // FIXME: 1. item 미선택시 이동 url 문제 해결(with error.tsx) 2. '선택되지 않았습니다' 알림 추가
            router.push(
              `/ProductList/${categoryId}/${selectedItem ? selectedItem : productCategoryGroups ? productCategoryGroups[0].group_id : ''}/whole`,
            );
            e.stopPropagation(); // NOTE: 부모 node의 router.back() 발생 방지 주의
          }}
          className="text-label-lg h-12 w-full rounded-sm bg-secondaryEmphasize text-center leading-[48px] text-onSecondaryEmphasize shadow-figma"
        >
          구경가기
        </button>
        <div onClick={(e) => e.stopPropagation()} className="h-4 w-full"></div>
        <button
          onClick={() => {
            setSelectedItem(null);
            router.back();
          }}
          className="text-label-sm h-8 w-full rounded-sm bg-secondary text-center text-onSecondary shadow-figma"
        >
          나가기
        </button>
      </div>
    </div>
  );
}

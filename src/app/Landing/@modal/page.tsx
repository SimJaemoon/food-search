'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import useSWR, { Fetcher } from 'swr';
import { type ProductCategoryDetailModal } from '@/lib/data/data';
import { useState, useRef, useEffect } from 'react';

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
  // TODO: [Suspense/Loading page 추가] api 데이터 비동기 통신 관련 error, loading 대응 코드 추가하기
  const { data: productCategoryGroups } = useSWR(
    categoryId ? `/api/productCategoryGroups?categoryId=${categoryId}` : null,
    fetcher,
  );

  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [overflowDirection, setOverflowDirection] = useState<
    null | 'up' | 'down' | 'both'
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const ref = scrollRef.current;
    if (ref) {
      if (ref.scrollHeight > ref.clientHeight) {
        const overflowType =
          ref.scrollTop === 0
            ? 'down'
            : ref.scrollTop > ref.scrollHeight - ref.clientHeight - 2
              ? // NOTE: -2 을 한 이유는 "ref.scrollTop === ref.scrollHeight - ref.clientHeight" 가 동작하지 않아서 + mobile 환경에서는 정작 동작하는 것으로 확인 [ref : CategoryDetailCarousel comp]
                'up'
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

  useEffect(() => {
    if (categoryId && productCategoryGroups) {
      if (scrollRef.current) {
        if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
          setOverflowDirection('down');
        }
      }
    }
  }, [categoryId, productCategoryGroups]);

  if (!categoryId || !productCategoryGroups) return <></>;

  return (
    <div className="absolute bottom-[calc(16px+48px)] z-40 h-[calc(100%-32px-48px-32px-48px)] w-[calc(100%-32px)]">
      {/* TODO: w,h padding 값 제거 [모든 side 16px] */}
      <button
        onClick={() => {
          setSelectedItem(null);
          setOverflowDirection(null);
          router.back();
        }}
        className="absolute h-full w-full bg-onBackground/50"
      ></button>
      <div className="absolute bottom-[3%] left-1/2 flex h-[91%] w-[90%] -translate-x-1/2 flex-col items-center overflow-hidden">
        <div className="text-label-lg h-10 w-full border-b-8 border-secondary text-center text-background shadow-figma">
          {productCategoryGroups[0].category_id.replace(',', ' / ')}
        </div>
        <div className="relative h-[calc(100%-40px-48px-16px-32px)] w-[calc(100%-16px)] border-x-[0.5px] border-secondary bg-background/85">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-scroll scroll-smooth"
          >
            {productCategoryGroups.map((v) => (
              <button
                key={v.group_id}
                className={`flex h-[13.5%] w-full items-center justify-center border-b-[0.5px] border-secondary text-center ${selectedItem === v.group_id ? '' : 'hover:bg-secondary/50'}`}
                onClick={(e) => {
                  setSelectedItem(
                    (prev) => v.group_id,
                    // HOLD: item 클릭시 toggle 방식이 맞지만, mobile 상태에서 toggle(null) 되면 hover 색상이 유지되는 문제 때문에 미적용 (prev === v.group_id ? null : v.group_id)
                  );
                  e.stopPropagation();
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
            className={`absolute top-[0] z-50 h-[6%] w-full ${overflowDirection === 'up' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
          >
            <SeeMoreButton
              type="bar"
              direction="up"
              shapeColor="background"
              backgroundColor="onBackground"
              handleClick={handleSeeMoreButtonClick('up')}
            />
          </div>
          <div
            className={`absolute bottom-[0] z-50 h-[6%] w-full ${overflowDirection === 'down' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
          >
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
            router.push(
              `/ProductList/${categoryId}/${selectedItem ? selectedItem : productCategoryGroups[0].group_id}?singleId=whole`,
            );
            e.stopPropagation(); // NOTE: 부모 node의 router.back() 발생 방지 주의
          }}
          className="text-label-lg h-12 w-full rounded-sm bg-secondaryEmphasize text-center leading-[48px] text-onSecondaryEmphasize shadow-figma"
        >
          구경가기
        </button>
        <div onClick={(e) => e.stopPropagation()} className="h-4 w-full"></div>
        <button
          onClick={(e) => {
            setSelectedItem(null);
            router.back();
            e.stopPropagation(); // NOTE: 부모 node의 router.back() 발생 방지 주의
          }}
          className="text-label-sm h-8 w-full rounded-sm bg-secondary text-center text-onSecondary shadow-figma"
        >
          나가기
        </button>
      </div>
    </div>
  );
}

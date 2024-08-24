'use client';

import {
  productCategoryDetailData,
  type ProductCategory,
} from '@/lib/data/productCategoryDetailData';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useRef, useLayoutEffect } from 'react';

import SeeMoreButton from '@/components/molecules/SeeMoreButton';

export default function ProductCategoryDetailModal() {
  const searchedParams = useSearchParams();
  const category = searchedParams.get('category') as ProductCategory;
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
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
      if (category) {
        isMountedRef.current = true;
        if (scrollRef.current) {
          if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
            setOverflowDirection('down');
          }
        }
      }
    }
  });

  if (!category) return <></>;

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
          {productCategoryDetailData[category].categoryName.join(' / ')}
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
            {productCategoryDetailData[category].children.map((v, i) => (
              <button
                key={v.groupName}
                className={`flex h-[13.5%] w-full items-center justify-center border-b-[0.5px] border-secondary text-center ${selectedItem === i ? '' : 'hover:bg-secondary/50'}`}
                onClick={() => {
                  setSelectedItem(i);
                }}
              >
                <div
                  className={`flex h-[65%] w-full items-center justify-center ${selectedItem === i ? 'text-label-md bg-secondaryEmphasize text-onSecondaryEmphasize shadow-3' : ''}`}
                >
                  {v.groupName}
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
            router.push(`/ProductList/${category}/${selectedItem}/0`);
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

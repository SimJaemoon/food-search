'use client';

import { useState } from 'react';

import { type SearchedProduct } from '@/components/atoms/ProductCard';
import ProductCardGroup from '@/components/molecules/ProductCardGroup';

export default function ProductCardGroupContainer({
  searchedProducts,
}: {
  searchedProducts: SearchedProduct[];
}) {
  const [displayedProductCardStartIndex, setDisplayedProductCardStartIndex] =
    useState(1);

  // TODO: Product page 접근 방식 현재 Link가 아닌 onClick 이벤트로 container에서 modal tag 뭉치를 추가하는 리렌더링으로 생각 중
  function handleCardClick() {}

  function handleLeftSignClick() {}
  function handleRightSignClick() {}

  return (
    <>
      <ProductCardGroup
        searchedProducts={searchedProducts}
        displayedProductCardStartIndex={displayedProductCardStartIndex}
        handleCardClick={handleCardClick}
      />
      {/* left Sign - See More */}
      <button
        onClick={handleLeftSignClick}
        className="absolute left-[0] top-1/2 z-[99] flex -translate-y-1/2 items-center justify-center py-[15%]"
      >
        <div className="h-[0] w-[0] border-y-[14px] border-r-[14px] border-y-transparent border-r-secondaryEmphasize" />
      </button>
      {/* right Sign - See More */}
      <button
        onClick={handleRightSignClick}
        className="absolute right-[0] top-1/2 z-[99] flex -translate-y-1/2 items-center justify-center py-[15%]"
      >
        <div className="h-[0] w-[0] border-y-[14px] border-l-[14px] border-y-transparent border-l-secondaryEmphasize" />
      </button>
      {/* NOTE: product modal 뭉치 위치 예상 */}
    </>
  );
}

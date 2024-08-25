'use client';

import { useState } from 'react';

import { type SearchedProduct } from '@/components/atoms/ProductCard';
import ProductCardGroup from '@/components/molecules/ProductCardGroup';
import SeeMoreButton from '@/components/molecules/SeeMoreButton';

export default function ProductCardGroupContainer({
  searchedProducts,
}: {
  searchedProducts: SearchedProduct[];
}) {
  const [displayedProductCardStartIndex, setDisplayedProductCardStartIndex] =
    useState(1);

  // TODO: Product page 접근 방식 현재 Link가 아닌 onClick 이벤트로 container에서 modal tag 뭉치를 추가하는 리렌더링으로 생각 중
  function handleCardClick() {}

  function handleSeeMoreButtonClick(direction: 'right' | 'left') {
    return () => {
      direction;
      console.log('clicked');
    };
  }

  return (
    <>
      <ProductCardGroup
        searchedProducts={searchedProducts}
        displayedProductCardStartIndex={displayedProductCardStartIndex}
        handleCardClick={handleCardClick}
      />
      <div className="absolute left-[0] top-1/2 z-50 h-[40%] -translate-y-1/2">
        <SeeMoreButton
          type="bar"
          direction="left"
          shapeColor="secondaryEmphasize"
          backgroundColor="transparent"
          handleClick={handleSeeMoreButtonClick('left')}
        />
      </div>
      <div className="absolute right-[0] top-1/2 z-50 h-[40%] -translate-y-1/2">
        <SeeMoreButton
          type="bar"
          direction="right"
          shapeColor="secondaryEmphasize"
          backgroundColor="transparent"
          handleClick={handleSeeMoreButtonClick('right')}
        />
      </div>
      {/* NOTE: product modal 뭉치 위치 예상 */}
    </>
  );
}

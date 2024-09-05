'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { type Product } from '@/lib/data/data';
import ProductCardGroup from '@/components/organisms/ProductCardGroup';
import SeeMoreButton from '@/components/molecules/SeeMoreButton';
import ProductCardModal from '@/components/modals/ProductCardModal';

export default function ProductListContainer({
  searchedProducts,
}: {
  searchedProducts: Product[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const singleId = searchParams.get('singleId');
  const sortType = searchParams.get('sortType');
  const productId = searchParams.get('productId');

  const router = useRouter();
  const currentPath = `${pathname}?singleId=${singleId}&sortType=${sortType}`;

  const filteredProducts =
    singleId === 'whole'
      ? searchedProducts
      : searchedProducts.filter((v) => v.single_id === singleId);

  // HOLD: 판매량 관련 데이터 누락되어서 review 수로 우선 대체해 정렬 시도함
  const sortedProducts =
    sortType === 'bestSelling'
      ? filteredProducts.sort((a, b) => b.review_number - a.review_number)
      : sortType === 'lowPrice'
        ? filteredProducts.sort((a, b) => a.product_price - b.product_price)
        : filteredProducts;

  const displayedProduct =
    productId && sortedProducts.find((v) => v.product_id === productId);

  const [displayedProductCardStartIndex, setDisplayedProductCardStartIndex] =
    useState(0);
  const [addQuantity, setAddQuantity] = useState(1);
  const [showsNotification, setShowsNotification] = useState(false);

  function handleCardClickWithParameter(productId: string) {
    return () => {
      router.push(`${currentPath}&productId=${productId}`);
    };
  }

  const handleLeftSeeMoreButtonClick = useCallback(() => {
    setDisplayedProductCardStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
  }, [setDisplayedProductCardStartIndex]);

  const handleRightSeeMoreButtonClick = useCallback(() => {
    setDisplayedProductCardStartIndex((prev) =>
      prev < sortedProducts.length - 2 ? prev + 1 : prev,
    );
  }, [setDisplayedProductCardStartIndex, sortedProducts]);

  const handleAddQuantityClick = useCallback(
    (type: 'plus' | 'minus') => {
      if (type === 'plus')
        return (e: React.MouseEvent<HTMLButtonElement>) => {
          setAddQuantity((prev) => (prev + 1 > 99 ? 99 : prev + 1));
          e.stopPropagation();
        };
      if (type === 'minus')
        return (e: React.MouseEvent<HTMLButtonElement>) => {
          setAddQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1));
          e.stopPropagation();
        };
      return () => {};
    },
    [setAddQuantity],
  );

  useEffect(() => {
    setDisplayedProductCardStartIndex(0);
  }, [singleId]);
  return (
    <>
      {/* 상품 목록 card carousel */}
      <div className="relative h-[calc(100%-120px)] w-full">
        <ProductCardGroup
          sortedProducts={sortedProducts}
          displayedProductCardStartIndex={displayedProductCardStartIndex}
          setDisplayedProductCardStartIndex={setDisplayedProductCardStartIndex}
          handleCardClickWithParameter={handleCardClickWithParameter}
          handleLeftSeeMoreButtonClick={handleLeftSeeMoreButtonClick}
          handleRightSeeMoreButtonClick={handleRightSeeMoreButtonClick}
        />
        {sortedProducts.length > 2 && (
          <>
            <div
              className={`absolute left-[0] top-1/2 z-30 h-[40%] -translate-y-1/2 ${displayedProductCardStartIndex > 0 ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
            >
              <SeeMoreButton
                type="bar"
                direction="left"
                shapeColor="secondaryEmphasize"
                backgroundColor="transparent"
                handleClick={handleLeftSeeMoreButtonClick}
              />
            </div>
            <div
              className={`absolute right-[0] top-1/2 z-30 h-[40%] -translate-y-1/2 ${displayedProductCardStartIndex < sortedProducts.length - 2 ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
            >
              <SeeMoreButton
                type="bar"
                direction="right"
                shapeColor="secondaryEmphasize"
                backgroundColor="transparent"
                handleClick={handleRightSeeMoreButtonClick}
              />
            </div>
          </>
        )}
      </div>
      {/* Add to Cart Notification */}
      <div
        className={`text-label-md absolute left-1/2 top-1/2 z-40 flex h-[80px] w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-onBackground/80 text-background ${showsNotification ? 'visible opacity-100' : 'invisible opacity-0'} transition-all`}
      >
        장바구니에&nbsp;<span className="text-secondary">{addQuantity}</span>
        개를 담았습니다
      </div>

      {displayedProduct && (
        <ProductCardModal
          productId={productId}
          displayedProduct={displayedProduct}
          addQuantity={addQuantity}
          setAddQuantity={setAddQuantity}
          handleAddQuantityClick={handleAddQuantityClick}
          setShowsNotification={setShowsNotification}
        />
      )}
    </>
  );
}

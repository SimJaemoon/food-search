'use client';

import ProductCategoryGroup from '@/components/molecules/ProductCategoryGroup';
import { useState, useEffect } from 'react';

import IconWithTextButton from '@/components/molecules/IconWithTextButton';
import TextButton from '@/components/atoms/TextButton';
import Link from 'next/link';

import {
  type ProductCategoryBoxPagination,
  productCategoryBoxTotalPageNumber,
} from '@/lib/data/productCategoryBoxData';

export default function ProductCategoryGroupContainer() {
  const [pageNumber, setPageNumber] = useState<ProductCategoryBoxPagination>(1);

  function handleNextButtonClick() {
    setPageNumber(
      (prevPN) =>
        (prevPN < productCategoryBoxTotalPageNumber
          ? prevPN + 1
          : prevPN) as ProductCategoryBoxPagination, // FIXME: type 단언 Type Assertion 제거되도록 수정
    );
  }
  function handleBackButtonClick() {
    setPageNumber(
      (prevPN) =>
        (prevPN > 1 ? prevPN - 1 : prevPN) as ProductCategoryBoxPagination, // FIXME: type 단언 Type Assertion 제거되도록 수정
    );
  }
  // TODO: 데이터 습득 방식에 맞게 각 hard-code 교체 (1. 로그인 상태 2. user 이름 3. 새로운 알림 수신 여부 4. 배송 점포명)
  const isLogin = true;
  const userName = '김홍길동';
  const [isNotifying, setIsNotifying] = useState(false);
  const storeName = '가평잣고을시장점';

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsNotifying((v) => !v);
    }, 7000);
    return () => clearTimeout(timerId);
  }, []);
  // TODO:

  return (
    <>
      <ProductCategoryGroup
        pageNumber={pageNumber}
        handleNextButtonClick={handleNextButtonClick}
        handleBackButtonClick={handleBackButtonClick}
      />
      <div className="absolute left-1/2 top-[calc(58%+4.25%)] z-20 flex w-3/5 -translate-x-1/2 -translate-y-1/2 justify-center">
        {/* FIXME: IconWithTextButton 표시될 경우, walker 이미지에 의해 ProductCategory 조작 영역을 침범함 */}
        {/* user status */}
        {isLogin ? (
          <IconWithTextButton
            iconName="walker"
            iconPosition="top"
            textContent={userName}
          />
        ) : (
          <TextButton textContent="로그인해야 구입할 수 있어요" url="/Login" />
        )}
        {/* TODO: '알림이 도착했습니다' 표시 후 0.x초 뒤 display: none으로 설정 */}
        {/* notification message */}
        {isNotifying && (
          <Link
            href="/Notice"
            className="absolute left-1/2 top-1/2 z-30 flex h-[40px] w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <button className="h-8 w-[160px] rounded-md bg-secondaryEmphasize text-onSecondaryEmphasize opacity-90">
              알림이 도착했습니다
            </button>
          </Link>
        )}
      </div>
      {/* delivery store */}
      <div className="text-label-sm absolute top-full h-10 w-full -translate-y-full bg-onBackground/60 text-center leading-[40px] text-background">
        {storeName || ''}
      </div>
    </>
  );
}

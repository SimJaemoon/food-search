'use client';

import type { ProductCategory } from '@/lib/data/data';
import ProductCategoryGroup from '@/components/molecules/ProductCategoryGroup';
import { useState, useEffect } from 'react';

import IconWithTextButton from '@/components/molecules/IconWithTextButton';
import TextButton from '@/components/atoms/TextButton';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProductCategoryGroupContainer({
  productCategories,
}: {
  productCategories: ProductCategory[];
}) {
  const totalPageNumber = Math.ceil(productCategories.length / 6);

  const searchedParams = useSearchParams();
  const pageQueryString = searchedParams.get('pageNumber');
  const pageNumber =
    pageQueryString === null
      ? 1
      : Number.isNaN(parseInt(pageQueryString))
        ? 1
        : parseInt(pageQueryString);

  const displayedProductCategories = productCategories
    .sort((a, b) => a.display_order - b.display_order)
    .slice((pageNumber - 1) * 6, pageNumber * 6);

  const router = useRouter();

  function handleNextButtonClick() {
    router.replace(
      `/Landing?pageNumber=${pageNumber < totalPageNumber ? pageNumber + 1 : pageNumber}`,
    );
  }
  function handleBackButtonClick() {
    router.replace(
      `/Landing?pageNumber=${pageNumber > 1 ? pageNumber - 1 : pageNumber}`,
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
        displayedProductCategories={displayedProductCategories}
        totalPageNumber={totalPageNumber}
        pageNumber={pageNumber}
        handleNextButtonClick={handleNextButtonClick}
        handleBackButtonClick={handleBackButtonClick}
      />
      <div className="absolute left-1/2 top-[calc(58%+4.25%)] z-20 flex w-3/5 -translate-x-1/2 -translate-y-1/2 justify-center">
        {/* FIXME: 미구현 부분 조작 방지 */}
        <div className="absolute z-50 h-full w-full"></div>
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

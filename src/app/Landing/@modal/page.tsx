'use client';

import {
  productCategoryDetailData,
  type ProductCategory,
} from '@/lib/data/productCategoryDetailData';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductCategoryDetailModal() {
  const searchedParams = useSearchParams();
  const category = searchedParams.get('category') as ProductCategory;
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  if (!category) return <></>;

  return (
    <div
      onClick={() => {
        setSelectedItem(null);
        router.back();
      }}
      className="absolute bottom-[16px] z-50 h-[calc(100%-32px)] w-[calc(100%-32px)]"
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
          className="h-[calc(100%-40px-48px-16px-32px)] w-[calc(100%-16px)] overflow-hidden border-x-[1px] border-secondary bg-background/85"
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

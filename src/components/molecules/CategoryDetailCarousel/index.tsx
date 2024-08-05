'use client';

import { useState } from 'react';

import TextWithBorderButton, {
  type ButtonType,
} from '../../atoms/TextWithBorderButton';
import Icon from '@/components/atoms/Icon';

import { type ProductCategory } from '@/lib/data/productCategoryData';

export default function CategoryDetailCarousel({
  items,
  type,
  selectedItem,
}: {
  items: ProductCategory;
  type: ButtonType;
  selectedItem?: number;
}) {
  const [positionX, setPositionX] = useState(0);
  const [isOverflow, setIsOverflow] = useState({ left: true, right: true });
  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    // TODO: 1. drag 방향, 이동 거리에 따라 css left, right 속성 추가(left 만 사용 고려)
    // TODO: 2. 좌우측 12px 이상 이동시 setIsOverflow 호출 - relative이기에 inset 속성(e.g., left) 기준 위치 = 부모가 아닌 요소 자신 본래 위치
    // setPositionX()
    // setIsOverflow((prevIO) => ({ ...prevIO, right: true }));
  }

  return (
    <>
      {/* carousel */}
      <div
        className="relative flex flex-nowrap items-center justify-between gap-2"
        onDrag={handleDrag}
      >
        {items.map((v, i) => (
          <TextWithBorderButton
            key={v.name}
            textContent={v.name}
            url={v.url}
            type={type}
            status={selectedItem === i ? 'selected' : 'normal'}
          />
        ))}
      </div>
      {/* See More Bar */}
      <div
        className={`absolute left-[0] top-[0] z-10 flex h-full w-full justify-between`}
      >
        <button
          className={`flex h-full w-4 items-center justify-center bg-background/80 ${isOverflow.left ? 'visible' : 'invisible'}`}
        >
          {/* HOLD: 현재 png 이미지 색상을 css filter 속성으로 변형했지만, 필요한 색상의 png file을 변형 없이 사용 고려하기 */}
          <div className="[filter:_invert(35%)_sepia(49%)_saturate(598%)_hue-rotate(334deg)_brightness(94%)_contrast(88%)]">
            <Icon iconName="keyboardArrowLeft" />
          </div>
        </button>
        <button
          className={`flex h-full w-4 items-center justify-center bg-background/80 ${isOverflow.right ? 'visible' : 'invisible'}`}
        >
          {/* HOLD: 현재 png 이미지 색상을 css filter 속성으로 변형했지만, 필요한 색상의 png file을 변형 없이 사용 고려하기 */}
          <div className="[filter:_invert(35%)_sepia(49%)_saturate(598%)_hue-rotate(334deg)_brightness(94%)_contrast(88%)]">
            <Icon iconName="keyboardArrowRight" />
          </div>
        </button>
      </div>
    </>
  );
}

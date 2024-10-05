'use client';

import Icon from '../../atoms/Icon';

export default function SearchBox({
  pageName,
}: {
  pageName: keyof typeof tailwindCSS.pageName;
}) {
  const pageCSSObject = tailwindCSS.pageName[pageName];

  return (
    // seach box frame
    <div
      className={`relative flex h-full w-full justify-center border-primary focus-within:border-primaryEmphasize ${pageCSSObject.bottomBorder} ${pageCSSObject.location}`}
    >
      {/* search box */}
      {/* FIXME: 미구현 부분 조작 방지 -- 부모 div relative도 삭제 */}
      <div
        className={`text-label-md absolute z-50 flex h-full w-full items-center justify-center bg-disabled/80`}
      ></div>
      <div
        className={`group flex h-8 w-[90%] items-center justify-between border-primary bg-background focus-within:border-primaryEmphasize ${pageCSSObject.borderWidth} ${pageCSSObject.corner}`}
      >
        <button className="invisible flex h-full w-8 items-center justify-center group-[:focus-within]:visible">
          <Icon iconName="close" />
        </button>
        <input
          type="text"
          placeholder={pageCSSObject.placeholder}
          className="text-body-sm peer h-full w-[calc(100%-32px-16px-32px-24px)] outline-none"
        />
        {/* NOTE: Typography : Header comp에서 column 2에서 text-label-sm을 적용하고 있기에, body-sm으로 override */}
        <button className="h-full w-4 peer-[:placeholder-shown]:invisible">
          {/* NOTE: placeholder이 표시 유무에 따라 visibility가 결정됨 So, close button과 별개로 동작함 */}
          <Icon iconName="closeCircle" />
        </button>
        <button className="flex h-full w-8 items-center justify-center">
          <Icon iconName="magnifier" />
        </button>
      </div>
    </div>
  );
}

const tailwindCSS = {
  pageName: {
    Landing: {
      bottomBorder: 'border-b-2',
      location: 'items-end',
      borderWidth: 'border-x-2 border-t-2',
      corner: 'rounded-t-md',
      placeholder: '원하시는 상품을 찾아보세요',
    },
    other: {
      bottomBorder: '',
      location: 'items-center',
      borderWidth: 'border-[1px]',
      corner: 'rounded-md',
      placeholder: '상품 찾아보기',
    },
  },
};

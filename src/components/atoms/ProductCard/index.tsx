import Image from 'next/image';

// TODO: d.ts 파일에 type 정의하고 가져오기
export type SearchedProduct = {
  id: number;
  brand: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: {
    unit: 'g' | 'ml';
    value: number;
  };
  review: {
    starRating: number;
    number: number;
  };
};

export default function ProductCard({
  brand,
  imageUrl,
  name,
  price,
  quantity,
  review,
  handleCardClick,
  opaqueCardPosition,
}: SearchedProduct & {
  handleCardClick?: () => void;
  opaqueCardPosition: 'left' | 'right' | null;
}) {
  const opaqueCard =
    opaqueCardPosition === 'left'
      ? 'origin-[100%_50%] scale-75 opacity-50'
      : opaqueCardPosition === 'right'
        ? 'origin-[0%_50%] scale-75 opacity-50'
        : '';
  return (
    <div
      className={`flex h-full w-full flex-wrap rounded-md border-2 border-secondary bg-background text-center ${opaqueCard}`}
      onClick={handleCardClick}
    >
      <div className="flex h-[11.5%] w-full items-center border-b-[0.5px] border-secondary px-1">
        <div className="line-clamp-1 w-full break-all pb-[2px]">
          {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보  */}
          {brand}
        </div>
      </div>
      <div className="relative h-[34%] w-full border-b-[0.5px] border-secondary">
        <Image
          src={imageUrl}
          alt={name}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h1 className="flex h-[23%] w-full items-center border-b-[0.5px] border-secondary p-2">
        <div className="text-label-md line-clamp-2 w-full break-all">
          {name}
        </div>
      </h1>
      <div className="flex h-1/5 w-full flex-wrap content-center border-b-[0.5px] border-secondary px-1">
        <div className="text-label-md line-clamp-1 w-full break-all pb-[2%]">
          {`${price.toLocaleString('ko-KR')}원`}
          {/* NOTE: 상품 가격이 억 단위일 경우, 줄바꿈이 발생할 수 있어, "line-clamp-1 break-all" 속성을 적용해놓음*/}
          {/* {'300,000,000원'} */}
        </div>
        <div className="line-clamp-1 w-full break-all pb-[2px]">
          {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보 */}
          {`100${quantity.unit} 당 ${Math.round(price / quantity.value).toLocaleString('ko-KR')}원`}
          {/* NOTE: 단위 가격이 10만원 이상일 경우, 줄바꿈이 발생할 수 있어, "line-clamp-1 break-all" 속성을 적용해놓음*/}
          {/* {'100g 당 123,321원'} */}
        </div>
      </div>
      <div className="flex h-[11.5%] w-full items-center justify-center gap-[4%]">
        <span>{'★' + review.starRating.toFixed(1)}</span>
        <span>
          {(review.number > 999999 ? 999999 : review.number).toLocaleString(
            'ko-KR',
          )}
        </span>
      </div>
    </div>
  );
}

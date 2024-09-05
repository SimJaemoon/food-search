import Image from 'next/image';

import { type Product } from '@/lib/data/data';

export default function ProductCard({
  brand_name,
  image_url,
  product_name,
  product_price,
  quantity_unit,
  review_average_score,
  review_number,
  handleCardClick,
  opaqueCardPosition,
}: Product & {
  handleCardClick?: () => void;
  opaqueCardPosition: 'left' | 'right' | null;
}) {
  const opaqueCardCSS =
    opaqueCardPosition === 'left'
      ? 'origin-[100%_50%] scale-75 opacity-50'
      : opaqueCardPosition === 'right'
        ? 'origin-[0%_50%] scale-75 opacity-50'
        : '';
  return (
    <button
      className={`flex h-full w-full flex-wrap rounded-md border-2 border-secondary bg-background text-center transition-all ${opaqueCardCSS}`}
      onClick={handleCardClick}
    >
      <div className="flex h-[11.5%] w-full items-center border-b-[0.5px] border-secondary px-1">
        <div className="line-clamp-1 w-full break-all pb-[2px]">
          {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보  */}
          {brand_name}
        </div>
      </div>
      <div className="relative h-[34%] w-full border-b-[0.5px] border-secondary">
        <Image
          src={`/product-card/${image_url}1.png`}
          alt={product_name}
          fill={true}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h1 className="flex h-[23%] w-full items-center border-b-[0.5px] border-secondary p-2">
        <div className="text-label-md line-clamp-2 w-full break-all">
          {product_name}
        </div>
      </h1>
      <div className="flex h-1/5 w-full flex-wrap content-center border-b-[0.5px] border-secondary px-1">
        <div className="text-label-md line-clamp-1 w-full break-all pb-[2%]">
          {`${product_price.toLocaleString('ko-KR')}원`}
          {/* NOTE: 상품 가격이 억 단위일 경우, 줄바꿈이 발생할 수 있어, "line-clamp-1 break-all" 속성을 적용해놓음 */}
          {/* {'300,000,000원'} */}
        </div>
        <div className="line-clamp-1 w-full break-all pb-[2px]">
          {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보 */}
          {/* FIXME: 상품 용량 데이터인 quantity_value를 DB에 재고량으로 착각해 주입한 문제 존재 - 추후 수정 예정 [ref: data.d.ts] */}
          {`100${quantity_unit} 당 ${Math.round((product_price / 1000) * 100).toLocaleString('ko-KR')}원`}
          {/* NOTE: 단위 가격이 10만원 이상일 경우, 줄바꿈이 발생할 수 있어, "line-clamp-1 break-all" 속성을 적용해놓음*/}
          {/* {'100g 당 123,321원'} */}
        </div>
      </div>
      <div className="flex h-[11.5%] w-full items-center justify-center gap-[4%]">
        <span>{`★${review_average_score > 5 ? '5.0' : review_average_score.toFixed(1).toString()}`}</span>
        <span>
          {`(${(review_number > 999999 ? 999999 : review_number).toLocaleString(
            'ko-KR',
          )})`}
        </span>
      </div>
    </button>
  );
}

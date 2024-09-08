import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/lib/data/data';
import {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';

import Image from 'next/image';
import SeeMoreButton from '@/components/molecules/SeeMoreButton';

export default function ProductCardModal({
  productId,
  displayedProduct,
  addQuantity,
  setAddQuantity,
  handleAddQuantityClick,
  setShowsNotification,
}: {
  productId: string;
  displayedProduct: Product;
  addQuantity: number;
  setAddQuantity: Dispatch<SetStateAction<number>>;
  handleAddQuantityClick: (
    type: 'plus' | 'minus',
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowsNotification: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [overflowDirection, setOverflowDirection] = useState<
    null | 'up' | 'down' | 'both'
  >(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const ref = scrollRef.current;
    if (ref) {
      if (ref.scrollHeight > ref.clientHeight) {
        const overflowType =
          ref.scrollTop === 0
            ? 'down'
            : ref.scrollTop > ref.scrollHeight - ref.clientHeight - 2
              ? // NOTE: -2 을 한 이유는 "ref.scrollTop === ref.scrollHeight - ref.clientHeight" 가 동작하지 않아서 + mobile 환경에서는 정작 동작하는 것으로 확인 [ref : CategoryDetailCarousel comp]
                'up'
              : 'both';
        setOverflowDirection(overflowType);
      }
    }
  }

  function handleSeeMoreButtonClick(direction: 'up' | 'down') {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const ref = scrollRef.current;
      if (!ref) return;

      if (direction === 'down') {
        const scrollableHeight =
          ref.scrollHeight - ref.clientHeight - ref.scrollTop;
        ref.scrollTop +=
          ref.clientHeight < scrollableHeight
            ? ref.clientHeight * (1 - 0.135 * 3)
            : scrollableHeight;
      }

      if (direction === 'up') {
        const scrollableHeight = ref.scrollTop;
        ref.scrollTop -=
          ref.clientHeight < scrollableHeight
            ? ref.clientHeight * (1 - 0.135 * 3)
            : scrollableHeight;
      }
      e.stopPropagation();
    };
  }

  useEffect(() => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
        setOverflowDirection('down');
      } else {
        setOverflowDirection(null);
      }
    }
    setAddQuantity(1);
  }, [setAddQuantity]);

  return (
    <div className="absolute top-[0] z-50 h-full w-full">
      <button
        onClick={(e) => {
          router.back();
          e.stopPropagation();
        }}
        className="absolute h-full w-full bg-onBackground/50"
      />
      <div className="absolute left-10 top-4 h-[calc(100%-32px)] w-[calc(100%-80px)] overflow-hidden">
        <div className="flex h-[7.5%] w-full items-center justify-center rounded-sm border-[2px] border-secondary bg-background shadow-1">
          {displayedProduct.brand_name}
        </div>
        <button
          onClick={(e) => {
            router.back();
            e.stopPropagation();
          }}
          className="text-label-sm absolute right-[0] top-[0] z-10 flex aspect-square h-[7.5%] items-center justify-center"
        >
          ×
        </button>
        <div className="relative left-[5%] h-[calc(100%-7.5%-9.25%)] w-[calc(100%-5%-5%)] border-x-[2px] border-secondary bg-background">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full w-full overflow-scroll scroll-smooth"
          >
            <div className="relative h-[41.5%] w-full border-b-[0.5px] border-secondary">
              {/* FIXME: image carousel 구현하기 */}
              <Image
                src={`/product-card/${displayedProduct.image_url}1.png`}
                alt={displayedProduct.product_name}
                fill={true}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h1 className="flex w-full items-center border-b-[0.5px] border-secondary px-[7%] py-[3%]">
              <div className="text-label-md w-full break-all text-center">
                {displayedProduct.product_name}
              </div>
            </h1>
            <div className="flex w-full flex-wrap content-center gap-1 border-b-[0.5px] border-secondary px-[7%] py-[3%]">
              <div className="text-label-md w-full break-all text-center">
                {`${displayedProduct.product_price.toLocaleString('ko-KR')}원`}
              </div>
              <div className="w-full break-all text-center">
                {/* FIXME: 상품 용량 데이터인 quantity_value를 DB에 재고량으로 착각해 주입한 문제 존재 - 추후 수정 예정 [ref: data.d.ts] */}
                {`100${displayedProduct.quantity_unit} 당 ${Math.round((displayedProduct.product_price / 1000) * 100).toLocaleString('ko-KR')}원`}
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-[4%] border-b-[0.5px] border-secondary px-[7%] py-[3%]">
              <span>
                {`★${displayedProduct.review_average_score > 5 ? '5.0' : displayedProduct.review_average_score.toFixed(1).toString()}`}
              </span>
              <span>
                {`(${(displayedProduct.review_number > 999999
                  ? 999999
                  : displayedProduct.review_number
                ).toLocaleString('ko-KR')})`}
              </span>
            </div>
            <div className="flex w-full items-center justify-center gap-[4%] border-b-[0.5px] border-secondary px-[7%] py-[3%]">
              <span className="text-label-sm">{'원산지'}</span>
              <span>{displayedProduct.product_origin}</span>
            </div>
            <div className="flex w-full items-center justify-center gap-[4%] break-all px-[7%] py-[3%]">
              {displayedProduct.product_description}
            </div>
          </div>
          <div
            className={`absolute top-[0] z-10 h-[6%] w-full ${overflowDirection === 'up' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
          >
            <SeeMoreButton
              type="bar"
              direction="up"
              shapeColor="background"
              backgroundColor="onBackground"
              handleClick={handleSeeMoreButtonClick('up')}
            />
          </div>
          <div
            className={`absolute bottom-[0] z-10 h-[6%] w-full ${overflowDirection === 'down' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
          >
            <SeeMoreButton
              type="bar"
              direction="down"
              shapeColor="background"
              backgroundColor="onBackground"
              handleClick={handleSeeMoreButtonClick('down')}
            />
          </div>
        </div>
        <div className="z-30 flex h-[9.25%] w-full overflow-hidden rounded-sm">
          <div className="flex h-full w-[36%] items-center justify-center">
            <button
              onClick={handleAddQuantityClick('minus')}
              className={`z-10 h-full w-1/3 shadow-1 ${addQuantity <= 1 ? 'bg-disabled text-onDisabled' : 'bg-background'} transition-all`}
            >
              {'－'}
            </button>
            <div className="flex h-full w-1/3 items-center justify-center bg-background">
              {addQuantity}
            </div>
            <button
              onClick={handleAddQuantityClick('plus')}
              className={`z-10 h-full w-1/3 shadow-1 ${addQuantity >= 99 ? 'bg-disabled text-onDisabled' : 'bg-background'} transition-all`}
            >
              {'＋'}
            </button>
          </div>
          <button
            // TODO: 장바구니 담기 handleClick - REST API로 대체하기
            // TODO: modal에 표현되는 addQuantity 값과 cart에 담겨있는 동일한 productId의 quantity 값을 + 해서 표시
            onClick={(e) => {
              const item = {
                productId: productId,
                quantity: addQuantity,
              };
              const cart = sessionStorage.getItem('cart');

              if (cart === null) {
                sessionStorage.setItem('cart', JSON.stringify([item]));
              } else {
                const cartArray: (typeof item)[] = JSON.parse(cart);

                const itemIndex = cartArray.findIndex(
                  (v) => v.productId === productId,
                );
                if (itemIndex === -1) {
                  cartArray.push(item);

                  sessionStorage.setItem('cart', JSON.stringify(cartArray));
                } else {
                  cartArray[itemIndex].quantity = addQuantity;

                  sessionStorage.setItem('cart', JSON.stringify(cartArray));
                }
              }
              setShowsNotification(true);
              router.back();

              setTimeout(() => {
                setShowsNotification(false);
              }, 600);

              e.stopPropagation();
            }}
            className="text-label-sm z-20 flex h-full w-[64%] items-center justify-center bg-secondaryEmphasize text-onSecondaryEmphasize"
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}

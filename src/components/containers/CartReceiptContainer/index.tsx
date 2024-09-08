'use client';

import Icon from '@/components/atoms/Icon';
import SeeMoreButton from '@/components/molecules/SeeMoreButton';

import useSWR, { Fetcher } from 'swr';
import { type CartProduct } from '@/lib/data/data';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type CartQuantity = { productId: string; quantity: number }[];

const cartProductsFetcher: Fetcher<CartProduct[], string> = (url: string) =>
  fetch(url).then((res) => res.json());

// TODO: 현재 구현된 비로그인 상태(sessionStorage)와 로그인 상태(user DB)를 모두 포용하는 코드로 수정 필요
// NOTE: 비로그인 계정의 seesionStorage 사용 & cartProducts(=useSWR) 과 cartQuantityData 가 분리되어 있어 불편한 상태 > api에서 SQL시 조작시 quantiy column 추가해서 return 하는 방향 고려
export default function CartReceiptContainer() {
  const router = useRouter();
  const cartSeesionStorage =
    typeof window !== 'undefined' ? sessionStorage.getItem('cart') : null;
  const cartQuantityData: CartQuantity | null =
    cartSeesionStorage && JSON.parse(cartSeesionStorage);

  // TODO: fetch 상태(isLoading, error)에 대응하는 코드 추가
  const { data: cartProducts } = useSWR(
    cartQuantityData === null
      ? null
      : '/api/cartProducts?' +
          cartQuantityData.map((v) => 'productId=' + v.productId).join('&'),
    cartProductsFetcher,
  );

  const [cartQuantities, setCartQuantities] = useState<CartQuantity | null>(
    cartQuantityData ? cartQuantityData : null,
  );

  const cartProductsNumber = cartQuantities ? cartQuantities.length : 0;
  const cartProductsTotalPrice = cartProducts
    ? cartProducts.reduce((acc, cur) => {
        const cartQuantity = cartQuantities?.find(
          (v) => v.productId === cur.product_id,
        );
        return (
          acc + cur.product_price * (cartQuantity ? cartQuantity.quantity : 0)
        );
      }, 0)
    : 0;

  const [overflowDirection, setOverflowDirection] = useState<
    null | 'up' | 'down' | 'both'
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cartQuantitiesRef = useRef<CartQuantity | null>(cartQuantities);

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
    return () => {
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
    };
  }

  useEffect(() => {
    if (cartProducts) {
      if (scrollRef.current) {
        if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
          setOverflowDirection('down');
        }
      }
    }
  }, [cartProducts]);

  cartQuantitiesRef.current = cartQuantities;

  useEffect(() => {
    return () => {
      if (cartQuantitiesRef.current !== null) {
        sessionStorage.setItem(
          'cart',
          JSON.stringify(cartQuantitiesRef.current),
          // NOTE: useEffect 내 state 변수 사용시, 의존성 배열에 state 값이 없는? 업데이트 전 초기 값인 경우 발생하는 문제 [ref: trouble-shooting.txt]
        );
      }
    };
  }, []);

  return (
    <>
      <div className="flex h-10 w-full">
        <div className="flex w-3/4 items-center justify-center border-b-[1px] border-secondary bg-background">
          {/* TODO: cartProducts fetch 전 상태에 대한 placeholder 삽입(e.g, spinner) -- 현재는 '데이터 가져온느 중' */}
          {!cartProducts ? (
            '데이터를 가져오는 중'
          ) : cartProductsTotalPrice >= 40000 ? (
            '무료배송이 가능합니다'
          ) : (
            <>
              <span className="pr-1 text-highlight">{`${(40000 - cartProductsTotalPrice).toLocaleString('ko-KR')}원`}</span>
              {`더 담으면 무료배송`}
            </>
          )}
        </div>
        <button
          // TODO: 현재 data 구조에 품절 관련 데이터가 존재하지 않음
          // TODO: button 이벤트 핸들러 부착/교체하기 - '품절 제거','주문하기'
          className="text-label-sm flex w-1/4 items-center justify-center bg-secondary text-onSecondary"
        >{`품절 제거`}</button>
      </div>
      <div className="flex h-8 w-full items-center border-b-[2px] border-secondary bg-background">
        <div className="w-[46%] text-center">{'상품명'}</div>
        <div className="w-[24%] text-center">{'수량'}</div>
        <div className="w-[20%] text-center">{'가격(원)'}</div>
        <div className="w-[10%]"></div>
      </div>
      <div className="relative h-[calc(100%-40px-32px)] w-full">
        {/* FIXME: overflow-y-hidden으로 교체 & eventHandler로 scroll & See More Bar 표시 조작하기 */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[calc(100%-48px-40px)] w-full overflow-y-scroll scroll-smooth"
        >
          {cartQuantities &&
            (!cartProducts ? (
              <div className="text-body-lg flex h-full w-full items-center justify-center">
                {/* TODO: cartProducts fetch 전 상태에 대한 placeholder 삽입(e.g, spinner) -- 현재는 '데이터 가져온느 중' */}
                데이터를 가져오는 중
              </div>
            ) : (
              cartProducts.map((v) => {
                const cartQuantity = cartQuantities.find(
                  (v2) => v2.productId === v.product_id,
                );
                if (!cartQuantity) return;
                const price = v.product_price * cartQuantity.quantity;
                return (
                  <div
                    key={v.product_id}
                    onClick={(e) => {}}
                    className="flex h-[56px] w-full items-center border-b-[1px] border-secondary bg-background duration-300 ease-in-out [transition-property:_height,_border]"
                  >
                    {/* HOLD: row item row click/touch 시 해당 product modal 등장? */}
                    <div className="line-clamp-2 w-[46%] break-all pb-[2px] pl-3 pr-2">
                      {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보  */}
                      {/* TODO: edge case 점검  */}
                      {`[${v.brand_name}] ${v.product_name}`}
                    </div>
                    <div className="flex w-[24%] items-center justify-center text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCartQuantities((prev) => {
                            if (!prev) return null;
                            return prev.map((v2) => {
                              if (v2.productId === v.product_id) {
                                return {
                                  productId: v2.productId,
                                  quantity:
                                    v2.quantity - 1 > 1 ? v2.quantity - 1 : 1,
                                };
                              } else {
                                return v2;
                              }
                            });
                          });
                        }}
                        className={`h-6 w-6 shadow-1 ${cartQuantity.quantity <= 1 ? 'bg-disabled text-onDisabled' : 'bg-background'} transition-all`}
                      >
                        {'－'}
                      </button>
                      <div className="h-5 w-1/3">
                        {/* TODO: edge case 점검 - 수량 제한 99개 이하 예상 */}
                        {cartQuantity.quantity > 99
                          ? 99
                          : cartQuantity.quantity}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCartQuantities((prev) => {
                            if (!prev) return null;
                            return prev.map((v2) => {
                              if (v2.productId === v.product_id) {
                                return {
                                  productId: v2.productId,
                                  quantity:
                                    v2.quantity + 1 < 100
                                      ? v2.quantity + 1
                                      : 99,
                                };
                              } else {
                                return v2;
                              }
                            });
                          });
                        }}
                        className={`h-6 w-6 shadow-1 ${cartQuantity.quantity >= 99 ? 'bg-disabled text-onDisabled' : 'bg-background'} transition-all`}
                      >
                        {'＋'}
                      </button>
                    </div>
                    <div className="line-clamp-2 w-[20%] break-all text-center">
                      {/* HOLD: 1천억까지 두 줄로 표시 가능 "100,000,000,000" */}
                      {price.toLocaleString('ko-KR')}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const parentElement = e.currentTarget.parentElement;
                        if (parentElement) {
                          // NOTE: "[transition-property:_height,_border]" 를 부모에 삽입해 놓음으로써, css property 변화시 transition 유발
                          // > box-sizing 이 border-box 라서 height만 0으로 만들면 된다고 판단 but border에 할당된 px도 없애줘야 추후 state 업데이트시 Layout 변화 발생 x
                          parentElement.style.opacity = '0';
                          parentElement.style.height = '0';
                          parentElement.style.border = '0';

                          setTimeout(() => {
                            setCartQuantities((prev) => {
                              if (!prev) return null;
                              const cur = prev.filter(
                                (v2) => v2.productId !== v.product_id,
                              );
                              return cur;
                            });
                          }, 400);
                        }
                      }}
                      className="flex h-full w-[10%] items-center justify-center"
                    >
                      <Icon iconName="trashCan" />
                    </button>
                  </div>
                );
              })
            ))}
        </div>
        {/* Up Sign - See More */}
        <div
          className={`absolute left-[0] top-[0] z-30 h-4 w-full ${overflowDirection === 'up' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
        >
          <SeeMoreButton
            type="bar"
            direction="smallUp"
            shapeColor="background"
            backgroundColor="onBackground"
            handleClick={handleSeeMoreButtonClick('up')}
          />
        </div>
        {/* Down Sign - See More */}
        <div
          className={`absolute bottom-[calc(48px+40px)] left-[0] z-30 h-4 w-full ${overflowDirection === 'down' || overflowDirection === 'both' ? 'visible opacity-100' : 'invisible opacity-0'} transition-opacity duration-300`}
        >
          <SeeMoreButton
            type="bar"
            direction="smallDown"
            shapeColor="background"
            backgroundColor="onBackground"
            handleClick={handleSeeMoreButtonClick('down')}
          />
        </div>
        <div className="w-full">
          <div className="h-10 w-full bg-secondary/90 text-center leading-[40px] text-onSecondary">
            {`${cartProductsNumber}개 상품 ${cartProductsTotalPrice.toLocaleString('ko-KR')}원 + 배송비 ${cartProductsTotalPrice >= 40000 ? '0원' : '3,000원'}`}
          </div>
          <button
            // TODO: button 이벤트 핸들러 부착/교체하기 - '품절 제거','주문하기'
            // NOTE: 학습용 POST 접근 event handler 대체하기
            onClick={async () => {
              const response = await fetch('/api/cartProducts', {
                method: 'POST',
                body: JSON.stringify({ state: cartQuantities }),
                cache: 'no-store',
              });
              alert(
                '확인 후 Order page(현재 구현 중) 로 이동합니다.\n\n' +
                  '[학습용] /api/cartProducts 에 POST 한 후 받는 상태 배열\n\n' +
                  JSON.stringify((await response.json()).state),
              );
              router.push('/Order');
            }}
            className="text-label-md h-12 w-full bg-secondaryEmphasize/90 text-center leading-[48px] text-onSecondary"
          >
            {`${cartProductsTotalPrice.toLocaleString('ko-KR')}원 주문하기`}
          </button>
        </div>
      </div>
    </>
  );
}

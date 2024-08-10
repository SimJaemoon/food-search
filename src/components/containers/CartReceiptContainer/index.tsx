import Icon from '@/components/atoms/Icon';

// TODO: prop - {cartItems} : ProductCard type과 연동 & cart 담긴 item & 수량 global state로 유지해서 사용
const cartItems = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: 'item name ' + i,
  quantity: i < 2 ? i + 1 : i * 40,
  unitPrice: 10000 * i,
}));

export default function CartReceiptContainer() {
  const isDisabled = false;
  const canUpScroll = false;
  const canDownScroll = true;
  return (
    <>
      <div className="flex h-10 w-full">
        <div className="flex w-3/4 items-center justify-center border-b-[1px] border-secondary bg-background">
          {/* TODO: 무료배송 문구 : 4만원 - 장바구니 상품들 총 가격 > 0 ? 면 해당 값 표시 : '무료배송이 가능합니다' */}
          <span className="pr-1 text-highlight">{`00,000원`}</span>
          {`더 담으면 무료배송`}
        </div>
        <button
          // TODO: onClick={}
          className="text-label-sm flex w-1/4 items-center justify-center bg-secondary text-onSecondary"
        >{`품절 제거`}</button>
      </div>
      <div className="flex h-8 w-full items-center border-b-[2px] border-secondary bg-background">
        <div className="w-[46%] text-center">{'상품명'}</div>
        <div className="w-[24%] text-center">{'수량'}</div>
        <div className="w-[20%] text-center">{'가격(원)'}</div>
        <div className="w-[10%]"></div>
      </div>
      <div className="relative h-[calc(100%-40px-32px)] w-full overflow-y-scroll">
        {/* FIXME: overflow-y-hidden으로 교체 & eventHandler로 scroll & See More Bar 표시 조작하기 */}
        <div className="w-full">
          {cartItems.map((v) => {
            const price = v.quantity * v.unitPrice;
            return (
              <div
                key={v.id}
                className="flex h-[56px] w-full items-center border-b-[1px] border-secondary bg-background"
              >
                <div className="line-clamp-2 w-[46%] break-all pb-[2px] pl-3 pr-2">
                  {/* NOTE: g 같은 영어는 줄 하단 경계 아래로 내려가서 , pb-[2px]로 공간 확보  */}
                  {/* TODO: edge case 점검 & v.name 변수로 교체 */}
                  {'[풀무원] 새콤달콤 유부초밥 330g(4인분)'}
                </div>
                <div className="flex w-[24%] items-center justify-center text-center">
                  <button
                    // TODO: onClick={}
                    className={`h-6 w-6 shadow-1 ${isDisabled ? 'bg-disabled text-onDisabled' : 'bg-background'}`}
                  >
                    {'+'}
                  </button>
                  <div className="h-5 w-1/3">
                    {/* TODO: edge case 점검 - 수량 제한 99개 이하 예상 */}
                    {v.quantity > 99 ? 99 : v.quantity}
                  </div>
                  <button
                    // TODO: onClick={}
                    className={`h-6 w-6 shadow-1 ${isDisabled ? 'bg-disabled text-onDisabled' : 'bg-background'}`}
                  >
                    {'-'}
                  </button>
                </div>
                <div className="line-clamp-2 w-[20%] break-all text-center">
                  {/* TODO: edge case 점검 */}
                  {price.toLocaleString('ko-KR')}
                </div>
                <button
                  // TODO: onClick={}
                  className="flex h-full w-[10%] items-center justify-center"
                >
                  <Icon iconName="trashCan" />
                </button>
              </div>
            );
          })}
        </div>
        {/* Up Sign - See More */}
        <button
          // TODO: onClick={}
          className={`absolute left-[0] top-[0] z-50 flex h-4 w-full items-center justify-center bg-onBackground/60 ${canUpScroll ? '' : 'invisible'}`}
        >
          <div className="h-[0] w-[0] border-x-[7px] border-b-[7px] border-x-transparent border-b-background" />
        </button>

        <div className="absolute bottom-[0] left-[0] z-10 h-[calc(40px+48px+16px)] w-full">
          {/* Down Sign - See More */}
          <button
            // TODO: onClick={}
            className={`left-[0] top-[0] flex h-4 w-full items-center justify-center bg-onBackground/60 ${canDownScroll ? '' : 'invisible'}`}
          >
            <div className="h-[0] w-[0] border-x-[7px] border-t-[7px] border-x-transparent border-t-background" />
          </button>
          <div className="h-10 w-full bg-secondary/90 text-center leading-[40px] text-onSecondary">
            {'000개 상품 000,000원 + 배송비 0,000원'}
          </div>
          <button
            // TODO: onClick={}
            className="text-label-md h-12 w-full bg-secondaryEmphasize/90 text-center leading-[48px] text-onSecondary"
          >
            {'00,000,000원 주문하기'}
          </button>
        </div>
      </div>
    </>
  );
}

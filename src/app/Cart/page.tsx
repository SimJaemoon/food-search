import Header from '@/components/organisms/Header';
import CartReceiptContainer from '@/components/containers/CartReceiptContainer';

export default function Cart() {
  return (
    <>
      <Header pageName="Cart" />
      <main className="h-[calc(100%-96px)] w-full overflow-hidden">
        {/* delivery information */}
        <div className="relative z-10">
          <div className="flex h-10 w-full border-b-[1px] border-secondary bg-background">
            <div className="flex w-[45%] items-center pl-3">
              <div className="text-label-sm whitespace-nowrap pr-1">
                {'배송지 :'}
              </div>
              <div className="line-clamp-1 break-all pr-2">
                {/* TODO: 데이터 주입 */}
                {'서울경기집가나다라'}
              </div>
            </div>
            <div className="flex w-[55%] items-center pr-3">
              <div className="text-label-sm whitespace-nowrap pr-1">
                {'배송 점포 :'}
              </div>
              <div className="flex">
                <div className="line-clamp-1 break-all">
                  {/* TODO: 데이터 주입 */}
                  {'서울경기집가나다라'}
                </div>
                <div>{'점'}</div>
              </div>
            </div>
          </div>
          <div className="flex h-[56px] w-full bg-background">
            {/* TODO: 데이터 주입 */}
            <div className="flex h-full w-4/5 flex-col justify-center border-b-[1px] border-secondary pl-3 pr-1">
              <div className="line-clamp-1 w-full break-all">
                {'서울특별시 동대문구 000로 123-00000000'}
              </div>
              <div className="line-clamp-1 w-full break-all">
                {'000아파트 000동 000호 가나다라마바사'}
              </div>
            </div>
            <div className="text-label-sm flex h-full w-1/5 items-center justify-center break-keep bg-secondary text-center text-onSecondary shadow-2">
              {/* TODO: 배송지 변경 Link로 수정하기 */}
              {'배송지 변경'}
            </div>
          </div>
          <div className="relative z-10 h-[40px] w-full border-b-[2px] border-secondary bg-background text-center leading-[40px] shadow-1">
            {/* TODO: 데이터 주입 */}
            {'00.00(수) 00시 ~ 00시에 배송 가능 (0일 뒤)'}
          </div>
        </div>
        {/* receipt */}
        <div className="relative h-[calc(100%-40px-56px-40px)] w-full">
          <CartReceiptContainer />
        </div>
      </main>
    </>
  );
}

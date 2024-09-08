import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import Link from 'next/link';

const orderPageNameKO = [
  '배송지',
  '배송 시간',
  '배송 위치',
  '요청 사항',
  '받는 분',
  '결제 방법',
];
const orderPageNameEN = [
  '',
  'DeliveryTime',
  'DeliveryPlace',
  'Requests',
  'Recipient',
  'PaymentMethod',
];

const orderPageInfomation = orderPageNameEN.map((v, i) => ({
  id: i + 1,
  pageName: orderPageNameKO[i],
  url: '/Order/' + v,
  isSelected: i === 1 ? true : false,
  isCompleted: i === 0 ? true : false,
}));

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header pageName="Order" />
      {/* NOTE: order navigation bar = container로 분리 with context api */}
      <nav className="flex h-10 w-full overflow-x-hidden overflow-y-hidden">
        {orderPageInfomation.map((v) => (
          <button
            key={v.id}
            className={`relative h-full w-1/3 shrink-0 border-b-[2px] border-t-[1px] border-primary shadow-3 ${v.isSelected ? 'text-label-sm z-20 border-primaryEmphasize bg-primaryEmphasize text-onPrimaryEmphasize' : v.isCompleted ? 'z-10 bg-primary text-onPrimary' : 'bg-background'}`}
          >
            <Link
              href={v.url}
              className="flex h-full w-full items-center justify-center"
            >
              {v.pageName}
            </Link>
          </button>
        ))}
        {/* TODO: see more bar - both side */}
      </nav>
      {children}
      {/* TODO: '현재 구현 중' 문구 삭제 */}
      <div className="text-label-lg absolute bottom-12 left-1/2 flex h-[10%] w-[70%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-disabled/50 text-highlight">
        현재 구현 중
      </div>
      <Footer />
    </>
  );
}

import IconButton from '../../molecules/IconButton';
import IconButtonBack from '../../molecules/IconButtonBack';
import IconWithBadgeButton from '../../molecules/IconWithBadgeButton';
import TextButton from '../../atoms/TextButton';
import SearchBox from '../../molecules/SearchBox';

export default function Header({
  pageName,
}: {
  pageName: 'Landing' | 'ProductList' | 'Cart' | 'Order';
}) {
  const isLogin: boolean = true; // TODO: 로그인 feat 추가 후 수정
  const badgeContent = 1234; // TODO: badgeContet State 추가하기

  return (
    <header
      className={`relative flex h-12 w-full justify-between border-t-[3px] border-primary ${['Landing', 'ProductList', 'Order'].includes(pageName) ? '' : 'border-b-2'}`}
    >
      {/* FIXME: 미구현 부분 조작 방지 -- 부모 div relative도 삭제 */}
      <div
        className={`text-label-md absolute ${pageName === 'Landing' ? 'left-[108px] w-[calc(100%-108px)]' : 'left-[10%] w-[90%]'} z-50 flex h-full items-center justify-center bg-disabled/80`}
      ></div>
      {/* column 1 */}
      <div
        className={`flex h-full justify-center ${pageName === 'Landing' ? 'text-title-md w-[108px] text-primary' : 'w-[10%] min-w-[48px]'}`}
      >
        {pageName === 'Landing' && (
          <TextButton textContent="XX Mart" url="/Landing" />
        )}
        {pageName !== 'Landing' && <IconButtonBack />}
      </div>
      {/* column 2 */}
      <div className={`text-label-sm flex h-full grow justify-center`}>
        {pageName === 'Landing' && (
          <TextButton
            textContent={
              isLogin ? '수요일 00시 ~ 00시 사이' : '로그인이 필요합니다'
            }
            url={isLogin ? '/DeliveryTime' : '/Login'}
          />
        )}
        {pageName === 'ProductList' && <SearchBox pageName="other" />}
        {pageName === 'Cart' && (
          <TextButton textContent="장바구니" url={'/Cart'} />
        )}
        {pageName === 'Order' && (
          <TextButton textContent="주문하기" url={'/Order'} />
        )}
      </div>
      {/* column 3 */}
      <div className={`h-full w-[10%] min-w-[48px]`}>
        {['Landing', 'Cart'].includes(pageName) &&
          (isLogin ? (
            <IconWithBadgeButton
              iconName="noticeBubble"
              badgeContent={badgeContent}
              badgePosition="center"
            />
          ) : (
            <IconButton iconName="person" url="/Login" />
          ))}
        {pageName === 'ProductList' && (
          <IconWithBadgeButton
            iconName="cart"
            badgeContent={badgeContent}
            badgePosition="right"
          />
        )}
        {pageName === 'Order' && (
          <IconWithBadgeButton
            iconName="noticeBubble"
            badgeContent={badgeContent}
            badgePosition="center"
          />
        )}
      </div>
    </header>
  );
}

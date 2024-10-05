import IconWithTextButton from '../../molecules/IconWithTextButton';

export default function Footer() {
  return (
    <footer className="flex h-12 w-full border-b-[3px] border-t-2 border-primary">
      <div className="relative h-full basis-[33.5%]">
        {/* FIXME: 미구현 부분 조작 방지 -- 부모 div relative도 삭제 */}
        <div
          className={`text-label-md absolute z-50 flex h-full w-full items-center justify-center bg-disabled/80`}
        ></div>
        <IconWithTextButton iconName="delivery" iconPosition="left" />
      </div>
      <div className="h-full basis-[33%]">
        <IconWithTextButton iconName="home" iconPosition="center" />
      </div>
      <div className="h-full basis-[33.5%]">
        <IconWithTextButton iconName="cart" iconPosition="right" />
      </div>
    </footer>
  );
}

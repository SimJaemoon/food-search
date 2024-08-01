import IconWithTextButton from '../molecules/IconWithTextButton';

export default function Footer() {
  return (
    <footer className="flex h-12 w-full border-b-[3px] border-t-2 border-primary">
      <div className="h-full basis-[33.5%]">
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

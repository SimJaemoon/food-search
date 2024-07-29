import IconButton from './IconButton';

export default function Footer() {
  return (
    <footer className="flex h-12 w-full border-b-[3px] border-t-2 border-primary">
      <div className="h-full basis-[33.5%]">
        <IconButton
          linkUrl="/Delivery"
          iconType="delivery"
          withText={true}
          iconPosition="left"
        />
      </div>
      <div className="h-full basis-[33%]">
        <IconButton
          linkUrl="/Landing"
          iconType="home"
          withText={true}
          iconPosition="center"
        />
      </div>
      <div className="h-full basis-[33.5%]">
        <IconButton
          linkUrl="/Cart"
          iconType="cart"
          withText={true}
          iconPosition="right"
        />
      </div>
    </footer>
  );
}

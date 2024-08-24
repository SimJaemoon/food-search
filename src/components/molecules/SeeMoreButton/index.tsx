import Icon from '../../atoms/Icon';

export default function SeeMoreButton({
  type,
  direction,
  shapeColor,
  backgroundColor,
  handleClick,
}: {
  type: Type;
  direction: Direction;
  shapeColor: Color;
  backgroundColor: BackgroundColor;
  handleClick: () => void;
}) {
  return (
    <button
      onClick={handleClick}
      className={`flex h-full w-full items-center justify-center ${tailwindCSS.backgroundColor[backgroundColor]}`}
    >
      {type === 'bar' && (
        <div
          className={`h-[0] w-[0] ${tailwindCSS.shapeColor.bar[shapeColor]} ${tailwindCSS.type.bar.direction[direction]}`}
        ></div>
      )}
      {type === 'sign' && (
        <div className={`${tailwindCSS.shapeColor.sign[shapeColor]}`}>
          <Icon
            iconName={
              direction === 'left' ? 'keyboardArrowLeft' : 'keyboardArrowRight'
            }
          />
        </div>
      )}
    </button>
  );
}

type Type = keyof typeof tailwindCSS.type;
type Direction = keyof typeof tailwindCSS.type.bar.direction;
type Color = keyof typeof tailwindCSS.shapeColor.bar;
type BackgroundColor = keyof typeof tailwindCSS.backgroundColor;

const tailwindCSS = {
  type: {
    bar: {
      direction: {
        left: 'border-y-[14px] border-r-[14px] border-y-transparent',
        right: 'border-y-[14px] border-l-[14px] border-y-transparent',
        down: 'border-x-[10px] border-t-[10px] border-x-transparent',
        up: 'border-x-[10px] border-b-[10px] border-x-transparent',
      },
    },
    sign: {},
  },
  shapeColor: {
    bar: {
      secondaryEmphasize: 'border-secondaryEmphasize',
      background: 'border-background',
    },
    sign: {
      secondaryEmphasize:
        // HOLD: 현재 png 이미지 색상을 css filter 속성으로 변형했지만, 필요한 색상의 png file을 변형 없이 사용 고려하기
        '[filter:_invert(35%)_sepia(49%)_saturate(598%)_hue-rotate(334deg)_brightness(94%)_contrast(88%)]',
      background: '',
    },
  },
  backgroundColor: {
    transparent: '',
    onBackground: 'bg-onBackground/60',
    background: 'bg-background/80',
  },
};

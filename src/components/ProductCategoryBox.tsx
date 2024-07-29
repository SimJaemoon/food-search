import Image from 'next/image';

export default function ProductCategroyBox({
  rowOrder,
  direction,
}: {
  rowOrder: 'first' | 'second' | 'third';
  direction: 'left' | 'right';
}) {
  const rowCSSObject = tailwindCSSCode[rowOrder];
  const reversal =
    direction === 'left' ? '' : direction === 'right' ? '-scale-x-100' : '';
  const textAlignment = rowOrder === 'third' ? 'left-1/3' : 'left-1/2';

  return (
    <button
      className={`absolute h-full ${rowCSSObject.li.position[direction]} top-[0] ${rowCSSObject.li.css} ${reversal}`}
    >
      {/* 상품 카테고리 이름 */}
      <div
        className={`text-label-md absolute z-50 -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-background ${rowCSSObject.li.categoryName.css} ${reversal} ${textAlignment}`}
      >
        {rowCSSObject.li.categoryName.text[direction]}
      </div>
      <Image
        src={rowCSSObject.li.image.url[direction]}
        alt={rowCSSObject.li.image.alt[direction]}
        fill={true}
        className={`absolute -left-[57px] top-[67px] ${reversal}`}
      />
      {/* 외곽선 */}
      <div>
        {/* 윗면 */}
        <div
          className={`absolute left-[0] top-[0] z-20 w-full ${rowCSSObject.li.outline.top.css}`}
        >
          {/* frame */}
          <div
            className={`absolute left-[0] top-[0] h-full w-full bg-background ${rowCSSObject.li.outline.top.frameCSS}`}
          ></div>
          {/* frame content */}
          <div
            className={`absolute left-[0] top-[0] h-full w-full bg-onBackground opacity-70 ${rowCSSObject.li.outline.top.frameContentCSS}`}
          ></div>
        </div>
        {/* 정면 */}
        <div
          className={`absolute left-[0] ${rowCSSObject.li.outline.front.css}`}
        >
          {/* frame */}
          <div
            className={'h-full w-full border-[0.5px] border-background'}
          ></div>
        </div>
        {/* FIXME: todo.txt 참고  */}
        {/* 측면 */}
        {/* <div
            className={`absolute top-[0] z-20 h-full ${rowCSSObject.li.outline.side.css}`}
          > */}
        {/* frame */}
        {/* <div
              className={`h-full w-full bg-background ${rowCSSObject.li.outline.side.frameCSS}`}
            ></div>
          </div> */}
      </div>
    </button>
  );
}

const tailwindCSSCode = {
  first: {
    li: {
      position: {
        left: 'left-[5%]',
        right: 'left-[55%]',
      },
      css: 'w-2/5 [clip-path:polygon(25%_0%,_100%_0%,_100%_65.517242%,_85%_100%,_0%_100%,_0%_22.988506%)]',
      categoryName: {
        css: 'top-[calc(22.988506%/2)]',
        text: {
          left: '정육\n계란',
          right: '수산물',
        },
      },
      image: {
        url: {
          left: '/product-category/meat-egg.png',
          right: '/product-category/seafood.png',
        },
        alt: {
          left: '정육 계란',
          right: '수산물',
        },
      },
      outline: {
        top: {
          css: 'h-[22.988506%]',
          frameCSS:
            '[clip-path:polygon(25%_0%,_calc(25%+0.390388px)_0%,_calc(25%+0.390388px)_calc(0%+0.500000px),_calc(0%+0.640388px)_calc(100%-0.500000px),_calc(85.000000%-0.430594px)_calc(100%-0.500000px),_calc(100%-0.580594px)_calc(0%+0.500000px),_calc(25%+0.390388px)_calc(0%+0.500000px),_calc(25%+0.390388px)_0%,_100%_0%,_85%_100%,_0%_100%)]',
          frameContentCSS:
            '[clip-path:polygon(calc(0%+0.640388px)_calc(100%-0.500000px),_calc(85.000000%-0.430594px)_calc(100%-0.500000px),_calc(100%-0.580594px)_calc(0%+0.500000px),_calc(25%+0.390388px)_calc(0%+0.500000px))]',
        },
        front: {
          css: 'top-[22.988506%] z-20 h-[calc(100%-22.988506%)] w-[85%]',
        },
        side: {
          css: 'left-[85%] w-[15%]',
          frameCSS:
            '[clip-path:polygon(0%_22.988506%,_calc(0%+0.500000px)_22.988506%,_calc(0%+0.500000px)_calc(22.988506%+0.398099px),_calc(0%+0.500000px)_calc(100%-0.701306px),_calc(100%-0.500000px)_calc(65.517241%-0.356478px),_calc(100%-0.500000px)_calc(0%+0.627984px),_calc(0%+0.500000px)_calc(22.988506%+0.398099px),_calc(0%+0.500000px)_22.988506%,_100%_0%,_100%_65.517241%,_0%_100%)]',
        },
      },
    },
  },
  second: {
    li: {
      position: {
        left: 'left-[0]',
        right: 'left-[61%]',
      },
      css: 'w-[39%] [clip-path:polygon(12.820513%_0%,_100%_0%,_100%_48.214286%,_calc(100%-14.102564%)_100%,_0%_100%,_0%_23.214286%)]',
      categoryName: {
        css: 'top-[calc(23.214286%/2)]',
        text: {
          left: '과일',
          right: '채소',
        },
      },
      image: {
        url: {
          left: '/product-category/fruit.png',
          right: '/product-category/vegetable.png',
        },
        alt: {
          left: '과일',
          right: '채소',
        },
      },
      outline: {
        top: {
          css: 'h-[23.214286%]',
          frameCSS:
            '[clip-path:polygon(12.820513%_0%,_calc(12.820513%+0.439990px)_0%,_calc(12.820513%+0.439990px)_calc(0%+0.500000px),_calc(0%+0.568195px)_calc(100%-0.500000px),_calc(85.897436%-0.434435px)_calc(100%-0.500000px),_calc(100%-0.575460px)_calc(0%+0.500000px),_calc(12.820513%+0.439990px)_calc(0%+0.500000px),_calc(12.820513%+0.439990px)_0%,_100%_0%,_85.897436%_100%,_0%_100%)]',
          frameContentCSS:
            '[clip-path:polygon(calc(0%+0.568195px)_calc(100%-0.500000px),_calc(85.897436%-0.434435px)_calc(100%-0.500000px),_calc(100%-0.575460px)_calc(0%+0.500000px),_calc(12.820513%+0.439990px)_calc(0%+0.500000px))]',
        },
        front: {
          css: 'top-[23.214286%] z-20 h-[calc(100%-23.214286%)] w-[85.897436%]',
        },
        side: {
          css: 'left-[85.897436%] w-[14.102564%]',
          frameCSS:
            '[clip-path:polygon(0%_23.214286%,_calc(0%+0.500000px)_23.214286%,_calc(0%+0.500000px)_calc(23.214286%+0.397224px),_calc(0%+0.500000px)_calc(100%-0.821995px),_calc(100%-0.500000px)_calc(48.214286%-0.304138px),_calc(100%-0.500000px)_calc(0%+0.629367px),_calc(0%+0.500000px)_calc(23.214286%+0.397224px),_calc(0%+0.500000px)_23.214286%,_100%_0%,_100%_48.214286%,_0%_100%)]',
        },
      },
    },
  },
  third: {
    li: {
      position: {
        left: 'left-[0]',
        right: 'left-[66.5%]',
      },
      css: 'w-[33.5%] [clip-path:polygon(0%_0%,_100%_0%,_100%_64.179104%,_64.179104%_100%,_0%_100%)]',
      categoryName: {
        css: 'top-[calc(29.850746%/2)]',
        text: {
          left: '곡물\n견과',
          right: '우유\n유제품',
        },
      },
      image: {
        url: {
          left: '/product-category/grain.png',
          right: '/product-category/dairy.png',
        },
        alt: {
          left: '곡물 견과',
          right: '우유 유제품',
        },
      },
      outline: {
        top: {
          css: 'h-[29.850746%]',
          frameCSS:
            '[clip-path:polygon(0%_0%,_calc(0%+0.500000px)_0%,_calc(0%+0.500000px)_calc(0%+0.500000px),_calc(0%+0.500000px)_calc(100%-0.500000px),_calc(64.179104%-0.352006px)_calc(100%-0.500000px),_calc(100.000000%-0.710215px)_calc(0%+0.500000px),_calc(0%+0.500000px)_calc(0%+0.500000px),_calc(0%+0.500000px)_0%,_100%_0%,_64.179104%_100%,_0%_100%)]',
          frameContentCSS:
            '[clip-path:polygon(calc(0%+0.500000px)_calc(100%-0.500000px),_calc(64.179104%-0.352006px)_calc(100%-0.500000px),_calc(100.000000%-0.710215px)_calc(0%+0.500000px),_calc(0%+0.500000px)_calc(0%+0.500000px))]',
        },
        front: {
          css: 'top-[29.850746%] z-20 h-[calc(100%-29.850746%)] w-[64.179104%]',
        },
        side: {
          css: 'left-[64.179104%] w-[calc(100%-64.179104%)]',
          frameCSS:
            '[clip-path:polygon(0%_29.850746%,_calc(0%+0.500000px)_29.850746%,_calc(0%+0.500000px)_calc(29.850746%+0.372548px),_calc(0%+0.500000px)_calc(100%-0.710215px),_calc(100%-0.500000px)_calc(64.179104%-0.352006px),_calc(100%-0.500000px)_calc(0%+0.671055px),_calc(0%+0.500000px)_calc(29.850746%+0.372548px),_calc(0%+0.500000px)_29.850746%,_100%_0%,_100%_64.179104%,_0%_100%)]',
        },
      },
    },
  },
};

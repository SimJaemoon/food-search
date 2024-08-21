import { productCategoryDetailData } from './productCategoryDetailData';

export type ProductCategoryBoxRowOrder = keyof typeof productCategoryBoxData;
export type ProductCategoryBoxDirection =
  keyof typeof productCategoryBoxData.firstRow;

export type ProductCategoryBoxPagination =
  keyof typeof productCategoryBoxData.firstRow.left;

export const productCategoryBoxData = {
  firstRow: {
    left: {
      1: {
        id: 'meatEgg',
        text: productCategoryDetailData['meatEgg'].categoryName.join('\n'),
        image: {
          url: 'meat-egg.png',
          alt: productCategoryDetailData['meatEgg'].categoryName.join(' '),
        },
      },
      2: {
        id: 'noodlesCan',
        text: productCategoryDetailData['noodlesCan'].categoryName.join('\n'),
        image: {
          url: 'noodles-can.png',
          alt: productCategoryDetailData['noodlesCan'].categoryName.join(' '),
        },
      },
      3: {
        id: 'coffee',
        text: productCategoryDetailData['coffee'].categoryName.join('/'),
        image: {
          url: 'coffee.webp',
          alt: productCategoryDetailData['coffee'].categoryName.join(' '),
        },
      },
    },
    right: {
      1: {
        id: 'seafood',
        text: productCategoryDetailData['seafood'].categoryName.join(),
        image: {
          url: 'seafood.png',
          alt: productCategoryDetailData['seafood'].categoryName.join(),
        },
      },
      2: {
        id: 'seasoning',
        text: productCategoryDetailData['seasoning'].categoryName.join('\n'),
        image: {
          url: 'seasoning.png',
          alt: productCategoryDetailData['seasoning'].categoryName.join(' '),
        },
      },
      3: {
        id: 'bakery',
        text: productCategoryDetailData['bakery'].categoryName.join(),
        image: {
          url: 'bakery.jpg',
          alt: productCategoryDetailData['bakery'].categoryName.join(),
        },
      },
    },
  },
  secondRow: {
    left: {
      1: {
        id: 'fruit',
        text: productCategoryDetailData['seafood'].categoryName.join(),
        image: {
          url: 'fruit.png',
          alt: productCategoryDetailData['seafood'].categoryName.join(),
        },
      },
      2: {
        id: 'drink',
        text: productCategoryDetailData['drink'].categoryName.join('/'),
        image: {
          url: 'drink.png',
          alt: productCategoryDetailData['drink'].categoryName.join(' '),
        },
      },
      3: {
        id: 'organic',
        text: productCategoryDetailData['organic'].categoryName.join(),
        image: {
          url: 'organic.jfif',
          alt: productCategoryDetailData['organic'].categoryName.join(),
        },
      },
    },
    right: {
      1: {
        id: 'vegetable',
        text: productCategoryDetailData['vegetable'].categoryName.join(),
        image: {
          url: 'vegetable.png',
          alt: productCategoryDetailData['vegetable'].categoryName.join(),
        },
      },
      2: {
        id: 'convenienceFood',
        text: productCategoryDetailData['convenienceFood'].categoryName.join(),
        image: {
          url: 'convenience-food.png',
          alt: productCategoryDetailData['convenienceFood'].categoryName.join(),
        },
      },
      3: {
        id: '',
        text: '',
        image: {
          url: '',
          alt: '',
        },
      },
    },
  },
  thirdRow: {
    left: {
      1: {
        id: 'grain',
        text: productCategoryDetailData['grain'].categoryName.join('\n'),
        image: {
          url: 'grain.png',
          alt: productCategoryDetailData['grain'].categoryName.join(' '),
        },
      },
      2: {
        id: 'kimchi',
        text: productCategoryDetailData['kimchi'].categoryName.join('\n'),
        image: {
          url: 'kimchi.png',
          alt: productCategoryDetailData['kimchi'].categoryName.join(' '),
        },
      },
      3: {
        id: '',
        text: '',
        image: {
          url: '',
          alt: '',
        },
      },
    },
    right: {
      1: {
        id: 'dairy',
        text: productCategoryDetailData['dairy'].categoryName.join('\n'),
        image: {
          url: 'dairy.png',
          alt: productCategoryDetailData['dairy'].categoryName.join(' '),
        },
      },
      2: {
        id: 'snack',
        text: productCategoryDetailData['snack'].categoryName.join('\n'),
        image: {
          url: 'snack.png',
          alt: productCategoryDetailData['snack'].categoryName.join(' '),
        },
      },
      3: {
        id: '',
        text: '',
        image: {
          url: '',
          alt: '',
        },
      },
    },
  },
};

export const productCategoryBoxTotalPageNumber = Object.keys(
  productCategoryBoxData.firstRow.left,
).length;

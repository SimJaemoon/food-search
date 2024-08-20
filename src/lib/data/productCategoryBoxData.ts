export type ProductCategoryBoxRowOrder = keyof typeof productCategoryBoxData;
export type ProductCategoryBoxDirection =
  keyof typeof productCategoryBoxData.firstRow;

export type ProductCategoryBoxPagination =
  keyof typeof productCategoryBoxData.firstRow.left;

export const productCategoryBoxData = {
  firstRow: {
    left: {
      1: {
        text: '정육\n계란',
        image: {
          url: 'meat-egg.png',
          alt: '정육 계란',
        },
      },
      2: {
        text: '면류\n통조림',
        image: {
          url: 'noodles-can.png',
          alt: '면류 통조림',
        },
      },
      3: {
        text: '커피/차',
        image: {
          url: 'coffee.webp',
          alt: '커피 차',
        },
      },
    },
    right: {
      1: {
        text: '수산물',
        image: {
          url: 'seafood.png',
          alt: '수산물',
        },
      },
      2: {
        text: '양념\n오일',
        image: {
          url: 'seasoning.png',
          alt: '양념 오일',
        },
      },
      3: {
        text: '베이커리',
        image: {
          url: 'bakery.jpg',
          alt: '베이커리',
        },
      },
    },
  },
  secondRow: {
    left: {
      1: {
        text: '과일',
        image: {
          url: 'fruit.png',
          alt: '과일',
        },
      },
      2: {
        text: '생수/음료',
        image: {
          url: 'drink.png',
          alt: '생수 음료',
        },
      },
      3: {
        text: '유기농',
        image: {
          url: 'organic.jfif',
          alt: '유기농',
        },
      },
    },
    right: {
      1: {
        text: '채소',
        image: {
          url: 'vegetable.png',
          alt: '채소',
        },
      },
      2: {
        text: '간편식',
        image: {
          url: 'convenience-food.png',
          alt: '간편식',
        },
      },
      3: {
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
        text: '곡물\n견과',
        image: {
          url: 'grain.png',
          alt: '곡물 견과',
        },
      },
      2: {
        text: '김치\n반찬',
        image: {
          url: 'kimchi.png',
          alt: '김치 반찬',
        },
      },
      3: {
        text: '',
        image: {
          url: '',
          alt: '',
        },
      },
    },
    right: {
      1: {
        text: '우유\n유제품',
        image: {
          url: 'dairy.png',
          alt: '우유 유제품',
        },
      },
      2: {
        text: '과자\n간식',
        image: {
          url: 'snack.png',
          alt: '과자 간식',
        },
      },
      3: {
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

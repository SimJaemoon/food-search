export type ProductCategoryData = keyof typeof productCategoryData;

// HOLD: product data 추가 후 productId 속성을 mockProductCategoryData.ts 참고해 추가하기
export const productCategoryData = {
  meatEgg: {
    displayOrder: 0,
    categoryName: ['정육', '계란'],
    children: [],
  },
  noodlesCan: {
    displayOrder: 6,
    categoryName: ['면류', '통조림'],
    children: [],
  },
  coffee: {
    displayOrder: 12,
    categoryName: ['커피', '차'],
    children: [],
  },
  seafood: {
    displayOrder: 1,
    categoryName: ['수산물'],
    children: [],
  },
  seasoning: {
    displayOrder: 7,
    categoryName: ['양념', '오일'],
    children: [],
  },
  bakery: {
    displayOrder: 13,
    categoryName: ['베이커리'],
    children: [],
  },
  fruit: {
    displayOrder: 2,
    categoryName: ['과일'],
    children: [],
  },
  drink: {
    displayOrder: 8,
    categoryName: ['생수', '음료'],
    children: [],
  },
  organic: {
    displayOrder: 14,
    categoryName: ['유기농'],
    children: [],
  },
  vegetable: {
    displayOrder: 3,
    categoryName: ['채소'],
    children: [
      {
        groupName: '두부/콩나물/숙주나물',
        children: ['두부', '콩나물', '숙주나물'],
      },
      { groupName: '고구마/감자', children: ['고구마', '감자'] },
      {
        groupName: '양파/마늘/파/생강',
        children: ['양파', '마늘', '파', '생강'],
      },
      {
        groupName: '오이/가지/호박/옥수수',
        children: ['오이', '가지', '호박', '옥수수'],
      },
      {
        groupName: '상추/깻잎/쌈채소',
        children: ['상추', '깻잎', '청경채', '케일/모둠쌈채소'],
      },
      {
        groupName: '고추/피망/파프리카',
        children: ['고추', '피망', '파프리카', '건고추/고춧가루'],
      },
      {
        groupName: '시금치/부추/나물',
        children: [
          '시금치',
          '부추',
          '미나리',
          '쑥갓',
          '달래',
          '고사리',
          '시래기',
          '건나물/기타나물',
        ],
      },
      {
        groupName: '양배추/양상추/브로콜리',
        children: [
          '양배추',
          '양상추',
          '브로콜리/콜리플라워',
          '비트/콜라비',
          '기타 양채소',
        ],
      },
      {
        groupName: '샐러드/어린잎채소',
        children: ['샐러드믹스채소', '어린잎/새싹/무순', '루꼴라/샐러리/기타'],
      },
      {
        groupName: '당근/우엉/연근/마',
        children: ['당근', '우엉', '연근', '마/야콘', '기타 뿌리채소'],
      },
      {
        groupName: '버섯',
        children: [
          '느타리버섯',
          '양송이버섯',
          '새송이버섯',
          '표고버섯',
          '팽이버섯',
          '기타/모둠버섯',
        ],
      },
      {
        groupName: '배추/무/김장채소',
        children: ['배추', '무', '열무/얼갈이', '기타 김장채소'],
      },
      {
        groupName: '아스파라거스/허브류',
        children: ['아스파라커스', '바질/허브잎', '기타 채소'],
      },
      {
        groupName: '인삼/더덕/약선재료',
        children: ['인삼', '더덕', '도라지', '한차/약선재료'],
      },
      { groupName: '간편채소', children: [] },
      {
        groupName: '채소세트',
        children: ['버섯세트', '수삼/인삼세트', '더덕세트', '한차/기타세트'],
      },
    ],
  },
  convenienceFood: {
    displayOrder: 9,
    categoryName: ['간편식'],
    children: [],
  },
  grain: {
    displayOrder: 4,
    categoryName: ['곡물', '견과'],
    children: [],
  },
  kimchi: {
    displayOrder: 10,
    categoryName: ['김치', '반찬'],
    children: [],
  },
  dairy: {
    displayOrder: 5,
    categoryName: ['우유', '유제품'],
    children: [],
  },
  snack: {
    displayOrder: 11,
    categoryName: ['과자', '간식'],
    children: [],
  },
};

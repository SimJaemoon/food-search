export const productCategoryData = [
  {
    name: '과일',
    children: [
      {
        name: '사과 / 배',
        children: ['사과', '배'],
      },
    ],
  },
];

export const mockProductCategoryData = Array.from({ length: 10 }, (_, i1) => ({
  name: 'item ' + i1,
  url: '/item ' + i1,
  children: Array.from({ length: 10 }, (_, i2) => ({
    name: 'childItem' + i2,
    url: '/childItem ' + i2,
    children: Array.from({ length: 10 }, (_, i3) => ({
      name: 'grandChildItem' + i3,
      url: '/grandChildItem ' + i3,
    })),
  })),
}));

export type ProductCategoryGroup = {
  name: string;
  url: string;
  children: { name: string; url: string }[];
}[];

export type ProductCategorySingle = { name: string; url: string }[];

export type ProductCategory = ProductCategoryGroup | ProductCategorySingle;

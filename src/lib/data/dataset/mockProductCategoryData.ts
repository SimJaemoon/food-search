import {
  productCategoryData as data,
  type ProductCategoryData as Data,
} from './productCategoryData';

type ProductCategory = {
  displayOrder: number;
  categoryId: string;
  categoryName: string;
  children: {
    groupId: string;
    groupName: string;
    children: { singleId: string; singleName: string; productId: string[] }[];
  }[];
};

// HOLD: 1.  현재는 외부키 FK = productId 중복 X but 서로 다른 row에 중복 할당하는 case 허용 예상   2. product table의 PK인 productId 와 reference 관계임을 sql로 명시하기
export const mockProductCategoryData: ProductCategory[] = Object.keys(data).map(
  (v, i) => ({
    displayOrder: data[v as Data].displayOrder,
    categoryId: v,
    categoryName: data[v as Data].categoryName.join(','),
    children:
      data[v as Data].children.length === 0
        ? Array.from({ length: 10 }, (_, i2) => ({
            groupId: v + 'G' + i2,
            groupName: 'groupName' + i2,
            children: Array.from({ length: 4 }, (_, i3) => ({
              singleId: v + 'G' + i2 + 'S' + i3,
              singleName: 'item' + i3,
              productId: Array.from(
                { length: i3 + 1 },
                (_, i4) => i + 'p' + i2 + 'p' + i3 + 'p' + i4,
              ),
            })),
          }))
        : data[v as Data].children.map((v2, i2) => ({
            groupId: v + 'G' + i2,
            groupName: v2.groupName,
            children: v2.children.map((v3, i3) => ({
              singleId: v + 'G' + i2 + 'S' + i3,
              singleName: v3,
              productId: Array.from(
                { length: 11 },
                (_, i4) => i + 'p' + i2 + 'p' + i3 + 'p' + i4,
              ),
            })),
          })),
  }),
);

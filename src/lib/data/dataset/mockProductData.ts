import { type ProductWithoutSingleId } from '../data';
import { mockProductCategoryData } from './mockProductCategoryData';

const dummyText = 'Lorem ipsum';

export const mockProductData: ProductWithoutSingleId[] = [];

mockProductCategoryData.forEach((v, i) => {
  v.children.map((v2, i2) => {
    v2.children.map((v3, i3) => {
      v3.productId.map((v4, i4) => {
        mockProductData.push({
          product_id: v4,
          brand_id: 'BI' + i3 + i4,
          brand_name: 'BN' + i3 + i4,
          image_url: 'mockProductImage',
          product_name: 'PN' + v4.repeat((i4 + 1) * 2 - 1),
          product_price: 1000 * (i + 1) * (i2 + 1) * (i3 + 1) * (i4 + 1),
          quantity_unit: i4 % 2 ? 'g' : 'ml',
          quantity_value: (i + 1) * (i2 + 1) * (i3 + 1) * (i4 + 1),
          review_average_score: i4 + 1 + ((i4 + 1) * 2) / 10,
          review_number: (i + 1) * (i2 + 1) * (i3 + 1) * (i4 + 1) * 6,
          product_origin: 'SI' + i4 + i3 + i2,
          product_description: dummyText.repeat(
            (i2 + 1) * (i3 + 1) * (6 * i4 + 1),
          ),
          seller_id: 'SI' + i2 + i3 + i4,
          seller_name: 'SN' + i2 + i3 + i4,
        });
      });
    });
  });
});

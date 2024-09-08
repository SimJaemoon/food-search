export type ProductCategory = {
  display_order: number;
  category_id: string;
  category_name: string;
};

export type ProductCategoryGroup = {
  group_id: string;
  group_name: string;
};

export type ProductCategoryDetailModal = Omit<
  ProductCategoryGroup & ProductCategory,
  'display_order'
>;

export type ProductCategorySingle = {
  single_id: string;
  single_name: string;
};

// HOLD: vegetable 용 실제 product data 만들기[데이터 삽입 가로채기]
export type Product = {
  single_id: string;
  product_id: string; // DB product_category table에 column으로 존재
  brand_id: string;
  brand_name: string; // HOLD: DB 상 다른 table에 존재해야 하지만 현재는 병합시킴
  image_url: string; // HOLD: vegetable을 제외한 나머지는 mockup image를 삽입 예정
  product_name: string;
  product_price: number;
  quantity_unit: 'g' | 'ml';
  quantity_value: number; // FIXME: quantity_value를 상품의 용량 value(e.g., 3500g)이 아닌'상품 재고량'으로 작각해 DB에 seeding함 but 현재는 해당 속성을 사용하지 않아 문제 없음 -- 추후 재작성 필요 [ref: ProductCard]
  review_average_score: number; // HOLD: DB 상 다른 table에 존재해야 하지만 현재는 병합시킴 [평균값을 저장해서 가지고 있을 필요 없음]
  review_number: number; // HOLD: DB 상 다른 table에 존재해야 하지만 현재는 병합시킴 [총 수를 저장해서 가지고 있을 필요 없음]
  product_origin: string;
  product_description: string; // HOLD: 현재 상품 설명 문자열만 고려, 추후 image 파일 반영하기 + blurDataUrl
  seller_id: string;
  seller_name: string; // HOLD: DB 상 다른 table에 존재해야 하지만 현재는 병합시킴
  // TODO: 판매량 관련 데이터 누락 e.g., 최근 인기순, 전체 판매량순 [ref: ProductListContainer]
  // TODO: 현재 data 구조에 품절 관련 데이터가 존재하지 않음
};

export type ProductWithoutSingleId = Omit<Product, 'single_id'>;
export type CartProduct = Pick<
  Product,
  'product_id' | 'brand_name' | 'product_name' | 'product_price'
>;

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
  product_id: string;
};

export type Product = {
  product_id: number;
  brand: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: {
    unit: 'g' | 'ml';
    value: number;
  };
  review: {
    starRating: number;
    number: number;
  };
  sellerId: string;
  description: string; // TODO: image 파일 반영하기 + blurDataUrl
  categoryDetail: string[];
};

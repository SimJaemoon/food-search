import { sql } from '@vercel/postgres';

import {
  type ProductCategory,
  type ProductCategoryGroup,
  type ProductCategorySingle,
  type Product,
} from './data';

export async function fetchProductCategories() {
  try {
    const data =
      await sql<ProductCategory>`SELECT DISTINCT ON (category_id) category_id, category_name, display_order FROM product_category`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product category data.');
  }
}

// TODO: fetchProductCategorySingles 와 묶어서 commit 하는지 확인하기
// HOLD: api/productCategoryGroups/route.ts 와 부분 중복
export async function fetchProductCategoryGroups(categoryId: string) {
  try {
    const data =
      await sql<ProductCategoryGroup>`SELECT DISTINCT ON (group_id) group_id, group_name FROM product_category WHERE category_id=${categoryId}`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product category group data.');
  }
}

export async function fetchProductCategorySingles(groupId: string) {
  try {
    const data =
      await sql<ProductCategorySingle>`SELECT DISTINCT ON (single_id) single_id, single_name FROM product_category WHERE group_id=${groupId}`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product category group data.');
  }
}

export async function fetchProduct(groupId: string) {
  try {
    const data =
      await sql<Product>`SELECT product_category.single_id, product.* FROM product_category JOIN product ON (product_category.group_id = ${groupId} AND product_category.product_id = product.product_id)`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data.');
  }
}

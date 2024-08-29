import { sql } from '@vercel/postgres';

import { type ProductCategory } from './data';

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

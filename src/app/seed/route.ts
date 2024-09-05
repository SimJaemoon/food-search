import { mockProductCategoryData } from '@/lib/data/dataset/mockProductCategoryData';
import { mockProductData } from '@/lib/data/dataset/mockProductData';

import { db } from '@vercel/postgres';

const client = await db.connect();

async function seedProductCategory() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS product_category (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      display_order INT NOT NULL,
      category_id VARCHAR(255) NOT NULL,
      category_name VARCHAR(255) NOT NULL,
      group_id VARCHAR(255) NOT NULL,
      group_name VARCHAR(255) NOT NULL,
      single_id VARCHAR(255) NOT NULL,
      single_name VARCHAR(255) NOT NULL,
      product_id VARCHAR(255) NOT NULL
    );
  `;

  const insertedProductCategory = await Promise.all(
    mockProductCategoryData.map((v) => {
      const [display_order, category_id, category_name] = [
        v.displayOrder,
        v.categoryId,
        v.categoryName,
      ];
      v.children.map((v2) => {
        const [group_id, group_name] = [v2.groupId, v2.groupName];
        v2.children.map((v3) => {
          const [single_id, single_name] = [v3.singleId, v3.singleName];
          v3.productId.map((v4) => {
            const product_id = v4;
            return client.sql`
              INSERT INTO product_category (display_order, category_id, category_name, group_id, group_name, single_id, single_name, product_id)
              VALUES (${display_order}, ${category_id}, ${category_name}, ${group_id}, ${group_name}, ${single_id}, ${single_name}, ${product_id})
              ON CONFLICT (id) DO NOTHING;
            `;
          });
        });
      });
    }),
  );
  return insertedProductCategory;
}

async function seedProduct() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS product (
      product_id VARCHAR(255) PRIMARY KEY,
      brand_id VARCHAR(255) NOT NULL,
      brand_name VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      product_price INT NOT NULL,
      quantity_unit VARCHAR(255) NOT NULL,
      quantity_value INT NOT NULL,
      review_average_score REAL NOT NULL,
      review_number INT NOT NULL,
      product_origin VARCHAR(255) NOT NULL,
      product_description TEXT NOT NULL,
      seller_id VARCHAR(255) NOT NULL,
      seller_name VARCHAR(255) NOT NULL
    );
  `;

  const insertedProduct = await Promise.all(
    mockProductData.map((v) => {
      return client.sql`
              INSERT INTO product (product_id, brand_id, brand_name, image_url, product_name, product_price, quantity_unit, quantity_value, review_average_score, review_number, product_origin, product_description, seller_id, seller_name)
              VALUES (${v.product_id}, ${v.brand_id}, ${v.brand_name}, ${v.image_url}, ${v.product_name}, ${v.product_price}, ${v.quantity_unit}, ${v.quantity_value}, ${v.review_average_score}, ${v.review_number}, ${v.product_origin}, ${v.product_description}, ${v.seller_id}, ${v.seller_name})
              ON CONFLICT (product_id) DO NOTHING;
            `;
    }),
  );

  return insertedProduct;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedProductCategory();
    // await seedProduct();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}

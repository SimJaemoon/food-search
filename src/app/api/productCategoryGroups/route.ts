import { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';

import type { ProductCategoryDetailModal } from '@/lib/data/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams.get('categoryId');

  try {
    const data =
      await sql<ProductCategoryDetailModal>`SELECT DISTINCT ON (group_id) group_id, group_name, category_id, category_name FROM product_category WHERE category_id=${categoryId}`;

    return new Response(JSON.stringify(data.rows), {
      status: 200,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}

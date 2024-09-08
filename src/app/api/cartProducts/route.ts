import { NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';

import { type CartProduct } from '@/lib/data/data';

async function fetchCartProducts(productIds: string[]) {
  const data = await Promise.all(
    productIds.map((v) => {
      return sql<CartProduct>`SELECT product_id, brand_name, product_name, product_price FROM product WHERE product_id IN (${v});`;
    }),
  );
  return data.map((v) => v.rows.pop());
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const singleIds = searchParams.getAll('productId');

  try {
    const data = await fetchCartProducts(singleIds);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json({ error }, { status: 500 });
  }
}

// HOLD: [추측] template literal tag 방식으로 parameter를 주입하기에 map을 통해 하나의 string을 삽입하는 방식은 동작하지 않아서 생긴 문제
// > SELECT * FROM product WHERE product_id IN (${singleIds.map((v) => "'" + v + "'").join(', ')})

// NOTE: POST 방식 학습을 위한 함수
export async function POST(request: NextRequest) {
  const res = await request.json();

  return new Response(JSON.stringify(res), {
    status: 200,
  });
}

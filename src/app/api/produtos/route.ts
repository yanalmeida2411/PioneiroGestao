import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const [products] = await pool.query<any>(
    `SELECT * FROM pioneiro_gestao_db.product;`
  );
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const { product_name, product_value, product_type, product_origin } =
    await req.json();

  const [result] = await pool.query<any>(
    `INSERT INTO pioneiro_gestao_db.product (product_name, product_value, product_type, product_origin )
       VALUES (?, ?, ?, ?)`,
    [product_name, product_value, product_type, product_origin]
  );

  const [product] = await pool.query<any>(
    `SELECT * FROM pioneiro_gestao_db.product WHERE product_id = ?`,
    [result.insertId]
  );

  return NextResponse.json(product[0], { status: 201 });
}



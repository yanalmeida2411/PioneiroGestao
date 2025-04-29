import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = Number(params.id);

  await pool.query(
    "DELETE FROM pioneiro_gestao_db.product WHERE product_id = ?",
    [id]
  );

  return NextResponse.json(
    { message: "Produto deletado com sucesso!" },
    { status: 200 }
  );
}

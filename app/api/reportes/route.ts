import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM reportes ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    const rows = await sql`
      INSERT INTO reportes (lat, lng, descripcion, categoria)
      VALUES (${d.lat}, ${d.lng}, ${d.descripcion}, ${d.categoria})
      RETURNING *
    `;
    return NextResponse.json(rows[0]);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

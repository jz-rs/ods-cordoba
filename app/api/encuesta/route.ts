import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const rows = await sql`
      SELECT
        -- ODS 4: promedio satisfacción educación (1-10)
        ROUND(AVG(ods4_satisfaccion)::numeric, 1)                                    AS ods4_educacion,
        ROUND(AVG(ods6_satisfaccion)::numeric, 1)                                    AS ods6_agua,

        -- ODS 7: promedio satisfacción energía (1-10)
        ROUND(AVG(ods7_satisfaccion)::numeric, 1)                                    AS ods7_energia,

        -- ODS 11: promedio estado espacios públicos (1-10)
        ROUND(AVG(ods11_estado)::numeric, 1)                                         AS ods11_ciudades,

        -- ODS 12: % que recicla algo (vs no recicla nada) → convertido a /10
        ROUND(
          (COUNT(*) FILTER (WHERE NOT (ods12_reciclaje @> ARRAY['No separo ni reciclo']
            AND array_length(ods12_reciclaje,1) = 1))::numeric
          / NULLIF(COUNT(*),0) * 10), 1)                                             AS ods12_consumo,

        -- ODS 13: % que considera acción comunitaria importante → convertido a /10
        ROUND(
          (COUNT(*) FILTER (WHERE ods13_importancia IN (
            'Clave para enfrentar el cambio climático',
            'Es necesaria, aunque no la única solución'
          ))::numeric / NULLIF(COUNT(*),0) * 10), 1)                                 AS ods13_clima,

        -- ODS 15: % que participa o apoya conservación → convertido a /10
        ROUND(
          (COUNT(*) FILTER (WHERE ods15_compromiso IN (
            'Participo o apoyo siempre que puedo',
            'Participo o apoyo de vez en cuando'
          ))::numeric / NULLIF(COUNT(*),0) * 10), 1)                                 AS ods15_ecosistemas,

        COUNT(*)::int                                                                 AS total
      FROM encuestas
    `;
    return NextResponse.json(rows[0]);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const d = await req.json();
    await sql`
      INSERT INTO encuestas (
        ods4_tecnologia, ods4_satisfaccion, ods4_oportunidades, ods4_razon_no, ods4_interes,
        ods6_satisfaccion, ods6_apta,
        ods7_renovable, ods7_consciencia, ods7_desafios, ods7_satisfaccion,
        ods11_espacios, ods11_estado, ods11_riesgos, ods11_contenedores,
        ods12_reciclaje, ods12_plasticos, ods12_comercios, ods12_ecoamigable, ods12_razon_no,
        ods13_cambios, ods13_importancia, ods13_participacion, ods13_razon_no,
        ods15_areas_verdes, ods15_flora_fauna, ods15_compromiso
      ) VALUES (
        ${d.ods4_tecnologia}, ${d.ods4_satisfaccion}, ${d.ods4_oportunidades}, ${d.ods4_razon_no}, ${d.ods4_interes},
        ${d.ods6_satisfaccion}, ${d.ods6_apta},
        ${d.ods7_renovable}, ${d.ods7_consciencia}, ${d.ods7_desafios}, ${d.ods7_satisfaccion},
        ${d.ods11_espacios}, ${d.ods11_estado}, ${d.ods11_riesgos}, ${d.ods11_contenedores},
        ${d.ods12_reciclaje}, ${d.ods12_plasticos}, ${d.ods12_comercios}, ${d.ods12_ecoamigable}, ${d.ods12_razon_no},
        ${d.ods13_cambios}, ${d.ods13_importancia}, ${d.ods13_participacion}, ${d.ods13_razon_no},
        ${d.ods15_areas_verdes}, ${d.ods15_flora_fauna}, ${d.ods15_compromiso}
      )
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

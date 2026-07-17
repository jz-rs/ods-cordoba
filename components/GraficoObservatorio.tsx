"use client";
import { useEffect, useState } from "react";

type Datos = {
  ods4_educacion:    number | null;
  ods6_agua:         number | null;
  ods7_energia:      number | null;
  ods11_ciudades:    number | null;
  ods12_consumo:     number | null;
  ods13_clima:       number | null;
  ods15_ecosistemas: number | null;
  total:             number;
};

const BARRAS = [
  { key: "ods4_educacion",    label: "ODS 4\nEducación",    color: "#c5192d" },
  { key: "ods6_agua",         label: "ODS 6\nAgua",         color: "#26bde2" },
  { key: "ods7_energia",      label: "ODS 7\nEnergía",      color: "#fcc30b" },
  { key: "ods11_ciudades",    label: "ODS 11\nCiudades",    color: "#fd9d24" },
  { key: "ods12_consumo",     label: "ODS 12\nConsumo",     color: "#bf8b2e" },
  { key: "ods13_clima",       label: "ODS 13\nClima",       color: "#3f7e44" },
  { key: "ods15_ecosistemas", label: "ODS 15\nEcosistemas", color: "#56c02b" },
];

const ZONAS = [
  { zona: "Zona Norte",    ods4: 98, ods6: 95, ods7: 28, ods11: 72, ods12: 64, ods13: 58, ods15: 62 },
  { zona: "Zona Sur",      ods4: 98, ods6: 91, ods7: 26, ods11: 72, ods12: 62, ods13: 53, ods15: 47 },
  { zona: "Zona Oeste",    ods4: 98, ods6: 96, ods7: 33, ods11: 72, ods12: 67, ods13: 80, ods15: 78 },
  { zona: "Zona Este",     ods4: 98, ods6: 94, ods7: 29, ods11: 72, ods12: 64, ods13: 60, ods15: 51 },
  { zona: "Zona Céntrica", ods4: 98, ods6: 94, ods7: 29, ods11: 72, ods12: 63, ods13: 63, ods15: 64 },
];

const ODS_COLS = [
  { num: 4,  color: "#c5192d", label: "Educación"   },
  { num: 6,  color: "#26bde2", label: "Agua Limpia" },
  { num: 7,  color: "#fcc30b", label: "Energía"     },
  { num: 11, color: "#fd9d24", label: "Ciudades"    },
  { num: 12, color: "#bf8b2e", label: "Consumo"     },
  { num: 13, color: "#3f7e44", label: "Clima"       },
  { num: 15, color: "#56c02b", label: "Ecosistemas" },
];

function colorPct(pct: number) {
  if (pct >= 80) return "#22c55e";
  if (pct >= 60) return "#f59e0b";
  return "#ef4444";
}

export default function GraficoObservatorio() {
  const [datos,   setDatos]   = useState<Datos | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/encuesta")
      .then(r => r.json())
      .then(d => { setDatos(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── Gráfico ── */}
      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 24px", fontStyle: "italic" }}>
          Indicadores de satisfacción basados en respuestas de vecinos · Escala 0–10
        </p>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "13px" }}>
            Cargando datos...
          </div>
        ) : !datos || datos.total === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "13px", fontStyle: "italic" }}>
            Aún no hay respuestas. ¡Sé el primero en completar la encuesta!
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "200px", marginBottom: "12px" }}>
              {BARRAS.map(b => {
                const val = Number(datos[b.key as keyof Datos] ?? 0);
                const pct = (val / 10) * 100;
                return (
                  <div key={b.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: b.color, marginBottom: "4px" }}>
                      {val.toFixed(1)}
                    </span>
                    <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                      <div style={{
                        width: "100%", height: `${Math.max(pct, 2)}%`,
                        background: b.color, borderRadius: "4px 4px 0 0",
                        transition: "height .8s ease",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: "8px", borderTop: "2px solid #e2e8f0", paddingTop: "8px" }}>
              {BARRAS.map(b => (
                <div key={b.key} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontSize: "9px", color: "#64748b", fontWeight: 600,
                    display: "block", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", marginTop: "12px" }}>
              Basado en {datos.total} respuesta{datos.total !== 1 ? "s" : ""} de vecinos de Córdoba
            </p>
          </>
        )}
      </div>

      {/* ── Tabla de zonas ── */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#3b82f6",
          letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>
          Monitoreo por zona
        </p>
        <h3 style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontWeight: 800,
          color: "#0f172a", margin: "0 0 20px" }}>
          Cumplimiento de ODS por área geográfica
        </h3>

        {/* Desktop: tabla normal */}
        <div style={{ display: "none" }} className="tabla-desktop">
          <TableDesktop />
        </div>

        {/* Mobile y desktop: usamos el mismo componente con scroll horizontal */}
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "520px" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700,
                  color: "#64748b", borderBottom: "2px solid #e2e8f0", minWidth: "90px" }}>
                  Zona
                </th>
                {ODS_COLS.map(o => (
                  <th key={o.num} style={{ padding: "6px 4px", textAlign: "center",
                    borderBottom: "2px solid #e2e8f0", minWidth: "56px" }}>
                    <div style={{
                      background: o.color, color: "white", borderRadius: "6px",
                      padding: "4px 2px", fontSize: "9px", fontWeight: 800, lineHeight: 1.3,
                    }}>
                      ODS {o.num}<br />
                      <span style={{ fontSize: "8px", fontWeight: 400, opacity: .9 }}>{o.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZONAS.map((z, i) => (
                <tr key={z.zona} style={{ background: i % 2 === 0 ? "white" : "#f8fafc" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#334155",
                    borderBottom: "1px solid #f1f5f9", fontSize: "12px" }}>
                    {z.zona}
                  </td>
                  {[z.ods4, z.ods6, z.ods7, z.ods11, z.ods12, z.ods13, z.ods15].map((pct, j) => (
                    <td key={j} style={{ padding: "10px 4px", textAlign: "center",
                      borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ fontWeight: 700, fontSize: "12px", color: colorPct(pct) }}>
                        {pct}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "8px" }}>
          Deslizá para ver todos los ODS · Fuente: Proyecto de investigación UBP · ULA
        </p>
      </div>
    </div>
  );
}

// Placeholder — no se usa, solo para evitar error de compilación
function TableDesktop() { return null; }

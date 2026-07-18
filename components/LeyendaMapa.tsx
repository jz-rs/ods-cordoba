"use client";
import { useState, useEffect, useCallback } from "react";

const CATEGORIAS = [
  { label: "Gestión de Residuos y Economía Circular",        color: "#f97316", emoji: "🗑️" },
  { label: "Biodiversidad y Arbolado Urbano",                color: "#22c55e", emoji: "🌳" },
  { label: "Huertas Agroecológicas y Soberanía Alimentaria", color: "#84cc16", emoji: "🥬" },
  { label: "Energía Limpia y Eficiencia Energética",         color: "#eab308", emoji: "⚡" },
  { label: "Gestión Responsable del Agua",                   color: "#3b82f6", emoji: "💧" },
  { label: "Movilidad Sustentable y Espacio Público",        color: "#a855f7", emoji: "🚲" },
];

export default function LeyendaMapa() {
  const [filtro, setFiltro] = useState<string | null>(null);

  const aplicar = useCallback((label: string | null) => {
    // Emitir evento custom que CordobaMap escucha
    window.dispatchEvent(new CustomEvent("filtro-mapa", { detail: label }));
    setFiltro(label);
  }, []);

  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "8px",
      marginTop: "20px", justifyContent: "center", alignItems: "center",
    }}>
      {/* chip "Todos" */}
      <button
        onClick={() => aplicar(null)}
        style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: filtro === null ? "#1e40af" : "white",
          color: filtro === null ? "white" : "#64748b",
          border: `1.5px solid ${filtro === null ? "#1e40af" : "#e2e8f0"}`,
          borderRadius: "999px", padding: "5px 14px",
          fontSize: "12px", fontWeight: filtro === null ? 700 : 400,
          cursor: "pointer", transition: "all .15s",
          boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        }}>
        Todos
      </button>

      {CATEGORIAS.map(c => {
        const activo = filtro === c.label;
        return (
          <button key={c.label} onClick={() => aplicar(activo ? null : c.label)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: activo ? `${c.color}18` : "white",
              border: `1.5px solid ${activo ? c.color : c.color + "40"}`,
              borderRadius: "999px", padding: "5px 12px",
              fontSize: "12px", color: activo ? c.color : "#334155",
              fontWeight: activo ? 700 : 400,
              cursor: "pointer", transition: "all .15s",
              boxShadow: activo ? `0 2px 8px ${c.color}40` : "0 1px 4px rgba(0,0,0,.06)",
            }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50% 50% 50% 0",
              background: c.color, transform: "rotate(-45deg)", flexShrink: 0,
              border: "1.5px solid white", boxShadow: `0 1px 4px ${c.color}80`,
            }} />
            {c.emoji} {c.label}
          </button>
        );
      })}
    </div>
  );
}

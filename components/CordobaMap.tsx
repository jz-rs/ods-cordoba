"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase, type Reporte } from "@/lib/supabase";

const CORDOBA_CENTER: [number, number] = [-31.4201, -64.1888];

// Límites aproximados de la provincia de Córdoba
const CORDOBA_BOUNDS = {
  minLat: -35.0, maxLat: -29.0,
  minLng: -65.8, maxLng: -61.5,
};

const CATEGORIAS = [
  { label: "Basura / Residuos",            color: "#f97316", emoji: "🗑️" },
  { label: "Agua contaminada",             color: "#3b82f6", emoji: "💧" },
  { label: "Tala de árboles",              color: "#22c55e", emoji: "🌳" },
  { label: "Ruido / Contaminación sonora", color: "#a855f7", emoji: "🔊" },
  { label: "Aire / Humo",                  color: "#6b7280", emoji: "💨" },
  { label: "Otro",                         color: "#ef4444", emoji: "⚠️" },
];

type PendingPin = { lat: number; lng: number } | null;

export default function CordobaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<LeafletMap | null>(null);
  const markersRef   = useRef<Map<string, Marker>>(new Map());

  const [pending,    setPending]    = useState<PendingPin>(null);
  const [desc,       setDesc]       = useState("");
  const [cat,        setCat]        = useState(CATEGORIAS[0].label);
  const [saving,     setSaving]     = useState(false);
  const [reportes,   setReportes]   = useState<Reporte[]>([]);
  const [error,      setError]      = useState<string | null>(null);
  const [mapReady,   setMapReady]   = useState(false);
  const [filtro,     setFiltro]     = useState<string | null>(null); // null = todos
  const [fueraZona,  setFueraZona]  = useState(false);

  // ── ícono de pin coloreado ──────────────────────────────────────────────────
  const makeIcon = useCallback(async (color: string) => {
    const L = (await import("leaflet")).default;
    return L.divIcon({
      className: "",
      html: `<div style="
        width:28px;height:28px;border-radius:50% 50% 50% 0;
        background:${color};border:2px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,.4);
        transform:rotate(-45deg)"></div>`,
      iconSize:    [28, 28],
      iconAnchor:  [14, 28],
      popupAnchor: [0, -30],
    });
  }, []);

  // ── pinta un marcador en el mapa ────────────────────────────────────────────
  const addMarker = useCallback(async (r: Reporte) => {
    if (!mapRef.current || markersRef.current.has(r.id)) return;
    const L    = (await import("leaflet")).default;
    const info = CATEGORIAS.find(c => c.label === r.categoria) ?? CATEGORIAS[5];
    const icon = await makeIcon(info.color);
    const fecha = new Date(r.created_at).toLocaleDateString("es-AR", {
      day: "numeric", month: "short", year: "numeric",
    });
    const marker = L.marker([r.lat, r.lng], { icon })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="min-width:180px;font-family:inherit">
          <div style="font-size:11px;font-weight:700;color:#64748b;
            text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">
            ${info.emoji} ${r.categoria}
          </div>
          <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#1e293b">
            ${r.descripcion}
          </p>
          <div style="font-size:11px;color:#94a3b8">${fecha}</div>
        </div>
      `);
    markersRef.current.set(r.id, marker);
  }, [makeIcon]);

  // ── mostrar/ocultar markers según filtro ────────────────────────────────────
  const aplicarFiltro = useCallback((nuevoFiltro: string | null) => {
    reportes.forEach(r => {
      const marker = markersRef.current.get(r.id);
      if (!marker) return;
      const visible = nuevoFiltro === null || r.categoria === nuevoFiltro;
      if (visible) {
        marker.getElement()?.style.setProperty("display", "block");
      } else {
        marker.getElement()?.style.setProperty("display", "none");
      }
    });
  }, [reportes]);

  // ── inicializar mapa ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: CORDOBA_CENTER,
        zoom: 13,
        scrollWheelZoom: true,
        dragging: true,
        // Limitar el mapa a la provincia de Córdoba
        maxBounds: [
          [CORDOBA_BOUNDS.minLat, CORDOBA_BOUNDS.minLng],
          [CORDOBA_BOUNDS.maxLat, CORDOBA_BOUNDS.maxLng],
        ],
        maxBoundsViscosity: 1.0, // rebota al llegar al borde
        minZoom: 8,
      });
      mapRef.current = map;

      if ("ontouchstart" in window) {
        map.scrollWheelZoom.disable();
      }

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        // Validar que el click esté dentro de la provincia
        if (
          lat < CORDOBA_BOUNDS.minLat || lat > CORDOBA_BOUNDS.maxLat ||
          lng < CORDOBA_BOUNDS.minLng || lng > CORDOBA_BOUNDS.maxLng
        ) {
          setFueraZona(true);
          setTimeout(() => setFueraZona(false), 3000);
          return;
        }
        setPending({ lat, lng });
        setDesc("");
        setCat(CATEGORIAS[0].label);
        setFueraZona(false);
      });

      setMapReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // ── cargar reportes existentes ──────────────────────────────────────────────
  useEffect(() => {
    supabase
      .from("reportes")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) { setError("No se pudieron cargar los reportes."); return; }
        setReportes(data ?? []);
      });
  }, []);

  // ── pintar reportes cuando el mapa esté listo ───────────────────────────────
  useEffect(() => {
    if (!mapReady) return;
    reportes.forEach(r => addMarker(r));
  }, [reportes, mapReady, addMarker]);

  // ── escuchar evento de filtro desde LeyendaMapa ────────────────────────────
  useEffect(() => {
    const handler = (e: Event) => {
      const label = (e as CustomEvent<string | null>).detail;
      setFiltro(label);
      aplicarFiltro(label);
    };
    window.addEventListener("filtro-mapa", handler);
    return () => window.removeEventListener("filtro-mapa", handler);
  }, [aplicarFiltro]);

  // ── aplicar filtro cuando cambia ────────────────────────────────────────────
  useEffect(() => {
    aplicarFiltro(filtro);
  }, [filtro, aplicarFiltro]);

  // ── tiempo real ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("reportes-realtime")
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "reportes" },
        ({ new: row }) => {
          const r = row as Reporte;
          setReportes(prev =>
            prev.find(x => x.id === r.id) ? prev : [r, ...prev]
          );
          addMarker(r);
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [addMarker]);

  // ── guardar reporte ─────────────────────────────────────────────────────────
  const handleGuardar = async () => {
    if (!pending || !desc.trim()) return;
    setSaving(true);
    setError(null);

    const { data, error } = await supabase
      .from("reportes")
      .insert({ lat: pending.lat, lng: pending.lng, descripcion: desc.trim(), categoria: cat })
      .select()
      .single();

    setSaving(false);
    if (error || !data) { setError("Error al guardar. Intentá de nuevo."); return; }

    addMarker(data as Reporte);
    setReportes(prev => [data as Reporte, ...prev]);
    setPending(null);
  };

  const catActual = CATEGORIAS.find(c => c.label === cat) ?? CATEGORIAS[0];
  const isMobile  = typeof window !== "undefined" && window.innerWidth < 640;

  // cantidad visible según filtro
  const reportesVisibles = filtro
    ? reportes.filter(r => r.categoria === filtro).length
    : reportes.length;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>

      {/* mapa */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* hint inferior */}
      {!pending && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "rgba(15,23,42,.82)", color: "white", backdropFilter: "blur(8px)",
          padding: "8px 16px", borderRadius: "999px", fontSize: "12px",
          pointerEvents: "none", zIndex: 1000, whiteSpace: "nowrap",
          boxShadow: "0 2px 12px rgba(0,0,0,.2)",
        }}>
          📍 {isMobile ? "Tocá el mapa para reportar" : "Hacé clic en el mapa para reportar una problemática"}
        </div>
      )}

      {/* aviso fuera de zona */}
      {fueraZona && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "#ef4444", color: "white", backdropFilter: "blur(8px)",
          padding: "8px 16px", borderRadius: "999px", fontSize: "12px",
          pointerEvents: "none", zIndex: 1000, whiteSpace: "nowrap",
          boxShadow: "0 2px 12px rgba(0,0,0,.2)",
        }}>
          ⚠️ Solo podés reportar dentro de la provincia de Córdoba
        </div>
      )}

      {/* contador */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "white", borderRadius: "10px", padding: "8px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,.12)", fontSize: "12px", color: "#334155",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#1e40af" }}>
          {reportesVisibles}
        </span>
        {filtro ? `de ${reportes.length} reportes` : `reporte${reportes.length !== 1 ? "s" : ""}`}
      </div>

      {/* formulario */}
      {pending && (
        <>
          <div onClick={() => setPending(null)} style={{
            position: "absolute", inset: 0, zIndex: 1999,
            background: "rgba(0,0,0,.35)", backdropFilter: "blur(2px)",
          }} />
          <div style={{
            position: "absolute", zIndex: 2000,
            ...(isMobile
              ? { bottom: 0, left: 0, right: 0, borderRadius: "20px 20px 0 0", padding: "20px 16px 32px" }
              : { top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "16px", padding: "24px", width: "360px" }
            ),
            background: "white", boxShadow: "0 8px 48px rgba(0,0,0,.28)",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            {isMobile && (
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e2e8f0", margin: "0 auto 16px" }} />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                📍 Nueva problemática
              </h3>
              <button onClick={() => setPending(null)} aria-label="Cerrar"
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}>
                ×
              </button>
            </div>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em" }}>
              Categoría
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "8px 0 16px" }}>
              {CATEGORIAS.map(c => (
                <button key={c.label} onClick={() => setCat(c.label)} style={{
                  fontSize: "11px", padding: "6px 10px", borderRadius: "999px",
                  border: cat === c.label ? `2px solid ${c.color}` : "2px solid #e2e8f0",
                  background: cat === c.label ? `${c.color}18` : "white",
                  color: cat === c.label ? c.color : "#475569",
                  fontWeight: cat === c.label ? 700 : 400,
                  cursor: "pointer", transition: "all .15s",
                }}>
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em" }}>
              Descripción
            </label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Contanos qué está pasando en este lugar..."
              rows={3} style={{
                width: "100%", marginTop: "8px", padding: "10px 12px",
                borderRadius: "8px", border: "1.5px solid #e2e8f0",
                fontSize: "14px", lineHeight: 1.6, resize: "vertical",
                fontFamily: "inherit", color: "#1e293b", outline: "none",
                boxSizing: "border-box",
              }}
            />
            {error && <p style={{ fontSize: "12px", color: "#ef4444", margin: "8px 0 0" }}>{error}</p>}
            <button onClick={handleGuardar} disabled={!desc.trim() || saving} style={{
              marginTop: "16px", width: "100%", padding: "14px",
              borderRadius: "10px", border: "none",
              cursor: desc.trim() && !saving ? "pointer" : "not-allowed",
              background: desc.trim() && !saving ? catActual.color : "#e2e8f0",
              color: desc.trim() && !saving ? "white" : "#94a3b8",
              fontWeight: 700, fontSize: "15px", transition: "all .15s",
            }}>
              {saving ? "Guardando..." : "Publicar reporte"}
            </button>
          </div>
        </>
      )}
      {/* leyenda interactiva — fuera del mapa, debajo */}
      <style>{`
        .leyenda-chip { transition: all .15s; cursor: pointer; user-select: none; }
        .leyenda-chip:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,.12); }
      `}</style>
    </div>
  );
}

export function LeyendaMapa() {
  return null; // placeholder — la leyenda vive dentro del componente
}

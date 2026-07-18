"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { Map as LeafletMap, Marker, LayerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";

const CORDOBA_CENTER: [number, number] = [-31.4201, -64.1888];
const CORDOBA_BOUNDS = {
  minLat: -35.0, maxLat: -29.0,
  minLng: -65.8, maxLng: -61.5,
};

const CATEGORIAS = [
  { label: "Gestión de Residuos y Economía Circular",        color: "#f97316", emoji: "🗑️" },
  { label: "Biodiversidad y Arbolado Urbano",                color: "#22c55e", emoji: "🌳" },
  { label: "Huertas Agroecológicas y Soberanía Alimentaria", color: "#84cc16", emoji: "🥬" },
  { label: "Energía Limpia y Eficiencia Energética",         color: "#eab308", emoji: "⚡" },
  { label: "Gestión Responsable del Agua",                   color: "#3b82f6", emoji: "💧" },
  { label: "Movilidad Sustentable y Espacio Público",        color: "#a855f7", emoji: "🚲" },
];

// Capas de infraestructura via Overpass API
const CAPAS = [
  { id: "escuelas",   label: "Escuelas",   emoji: "🏫", color: "#0ea5e9",
    query: `[out:json][timeout:25];(node["amenity"="school"](around:15000,-31.4201,-64.1888);way["amenity"="school"](around:15000,-31.4201,-64.1888););out center;` },
  { id: "salud",      label: "Salud",      emoji: "🏥", color: "#ef4444",
    query: `[out:json][timeout:25];(node["amenity"~"hospital|clinic|health_centre"](around:15000,-31.4201,-64.1888);way["amenity"~"hospital|clinic|health_centre"](around:15000,-31.4201,-64.1888););out center;` },
  { id: "transporte", label: "Transporte", emoji: "🚌", color: "#8b5cf6",
    query: `[out:json][timeout:25];(node["highway"="bus_stop"](around:15000,-31.4201,-64.1888););out;` },
];

type Reporte = { id: string; lat: number; lng: number; descripcion: string; categoria: string; created_at: string; };
type PendingPin = { lat: number; lng: number } | null;

export default function CordobaMap() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const mapRef        = useRef<LeafletMap | null>(null);
  const markersRef    = useRef<Map<string, Marker>>(new Map());
  const layerGroupsRef= useRef<Map<string, LayerGroup>>(new Map());
  const pollRef       = useRef<ReturnType<typeof setInterval> | null>(null);

  const [pending,    setPending]    = useState<PendingPin>(null);
  const [desc,       setDesc]       = useState("");
  const [cat,        setCat]        = useState(CATEGORIAS[0].label);
  const [saving,     setSaving]     = useState(false);
  const [reportes,   setReportes]   = useState<Reporte[]>([]);
  const [error,      setError]      = useState<string | null>(null);
  const [mapReady,   setMapReady]   = useState(false);
  const [filtro,     setFiltro]     = useState<string | null>(null);
  const [fueraZona,  setFueraZona]  = useState(false);
  const [capasOn,    setCapasOn]    = useState<Record<string, boolean>>({});
  const [loadingCapa,setLoadingCapa]= useState<string | null>(null);

  const makeIcon = useCallback(async (color: string, html?: string) => {
    const L = (await import("leaflet")).default;
    return L.divIcon({
      className: "",
      html: html ?? `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:${color};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,.4);transform:rotate(-45deg)"></div>`,
      iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -30],
    });
  }, []);

  const addMarker = useCallback(async (r: Reporte) => {
    if (!mapRef.current || markersRef.current.has(r.id)) return;
    const L    = (await import("leaflet")).default;
    const info = CATEGORIAS.find(c => c.label === r.categoria) ?? CATEGORIAS[0];
    const icon = await makeIcon(info.color);
    const fecha = new Date(r.created_at).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
    const marker = L.marker([r.lat, r.lng], { icon })
      .addTo(mapRef.current)
      .bindPopup(`<div style="min-width:180px;font-family:inherit">
        <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">${info.emoji} ${r.categoria}</div>
        <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:#1e293b">${r.descripcion}</p>
        <div style="font-size:11px;color:#94a3b8">${fecha}</div>
      </div>`);
    markersRef.current.set(r.id, marker);
  }, [makeIcon]);

  const aplicarFiltro = useCallback((f: string | null) => {
    reportes.forEach(r => {
      const marker = markersRef.current.get(r.id);
      if (!marker) return;
      marker.getElement()?.style.setProperty("display", f === null || r.categoria === f ? "block" : "none");
    });
  }, [reportes]);

  // Toggle capa de infraestructura
  const toggleCapa = useCallback(async (capa: typeof CAPAS[0]) => {
    if (!mapRef.current) return;
    const L = (await import("leaflet")).default;

    if (capasOn[capa.id]) {
      // Apagar
      layerGroupsRef.current.get(capa.id)?.removeFrom(mapRef.current);
      setCapasOn(prev => ({ ...prev, [capa.id]: false }));
      return;
    }

    // Si ya cargamos los datos, solo mostrar
    if (layerGroupsRef.current.has(capa.id)) {
      layerGroupsRef.current.get(capa.id)?.addTo(mapRef.current);
      setCapasOn(prev => ({ ...prev, [capa.id]: true }));
      return;
    }

    // Cargar desde Overpass
    setLoadingCapa(capa.id);
    try {
      const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(capa.query)}`);
      const data = await res.json();
      const group = L.layerGroup();

      data.elements.forEach((el: { type: string; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> }) => {
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        if (!lat || !lon) return;
        const name = el.tags?.name ?? capa.label;
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:${capa.color};border:2px solid white;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 8px rgba(0,0,0,.3)">${capa.emoji}</div>`,
          iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -16],
        });
        L.marker([lat, lon], { icon })
          .bindPopup(`<div style="font-family:inherit;font-size:13px;font-weight:600;color:#1e293b">${capa.emoji} ${name}</div>`)
          .addTo(group);
      });

      group.addTo(mapRef.current);
      layerGroupsRef.current.set(capa.id, group);
      setCapasOn(prev => ({ ...prev, [capa.id]: true }));
    } catch {
      setError("No se pudo cargar la capa. Intentá de nuevo.");
      setTimeout(() => setError(null), 3000);
    }
    setLoadingCapa(null);
  }, [capasOn]);

  // Inicializar mapa
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, {
        center: CORDOBA_CENTER, zoom: 13, scrollWheelZoom: true, dragging: true,
        maxBounds: [[CORDOBA_BOUNDS.minLat, CORDOBA_BOUNDS.minLng], [CORDOBA_BOUNDS.maxLat, CORDOBA_BOUNDS.maxLng]],
        maxBoundsViscosity: 1.0, minZoom: 8,
      });
      mapRef.current = map;
      if ("ontouchstart" in window) map.scrollWheelZoom.disable();
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        if (lat < CORDOBA_BOUNDS.minLat || lat > CORDOBA_BOUNDS.maxLat ||
            lng < CORDOBA_BOUNDS.minLng || lng > CORDOBA_BOUNDS.maxLng) {
          setFueraZona(true); setTimeout(() => setFueraZona(false), 3000); return;
        }
        setPending({ lat, lng }); setDesc(""); setCat(CATEGORIAS[0].label); setFueraZona(false);
      });
      setMapReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  const cargarReportes = useCallback(async () => {
    try {
      const res = await fetch("/api/reportes");
      const data: Reporte[] = await res.json();
      setReportes(data);
    } catch { /* silencioso */ }
  }, []);

  useEffect(() => { cargarReportes(); }, [cargarReportes]);
  useEffect(() => {
    pollRef.current = setInterval(cargarReportes, 10000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [cargarReportes]);
  useEffect(() => { if (!mapReady) return; reportes.forEach(r => addMarker(r)); }, [reportes, mapReady, addMarker]);
  useEffect(() => {
    const handler = (e: Event) => {
      const label = (e as CustomEvent<string | null>).detail;
      setFiltro(label); aplicarFiltro(label);
    };
    window.addEventListener("filtro-mapa", handler);
    return () => window.removeEventListener("filtro-mapa", handler);
  }, [aplicarFiltro]);
  useEffect(() => { aplicarFiltro(filtro); }, [filtro, aplicarFiltro]);

  const handleGuardar = async () => {
    if (!pending || !desc.trim()) return;
    setSaving(true); setError(null);
    try {
      const res = await fetch("/api/reportes", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: pending.lat, lng: pending.lng, descripcion: desc.trim(), categoria: cat }),
      });
      if (!res.ok) throw new Error();
      const data: Reporte = await res.json();
      addMarker(data); setReportes(prev => [data, ...prev]); setPending(null);
    } catch { setError("Error al guardar. Intentá de nuevo."); }
    setSaving(false);
  };

  const catActual = CATEGORIAS.find(c => c.label === cat) ?? CATEGORIAS[0];
  const reportesVisibles = filtro ? reportes.filter(r => r.categoria === filtro).length : reportes.length;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Botones de capas — arriba a la izquierda */}
      <div style={{
        position: "absolute", top: 12, left: 12, zIndex: 1000,
        display: "flex", flexDirection: "column", gap: "6px",
      }}>
        {CAPAS.map(c => (
          <button key={c.id} onClick={() => toggleCapa(c)}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: capasOn[c.id] ? c.color : "white",
              color: capasOn[c.id] ? "white" : "#334155",
              border: `2px solid ${c.color}`,
              borderRadius: "8px", padding: "6px 10px",
              fontSize: "11px", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,.12)", transition: "all .15s",
              opacity: loadingCapa === c.id ? 0.6 : 1,
            }}>
            {loadingCapa === c.id ? "⏳" : c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Hint inferior */}
      {!pending && !fueraZona && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "rgba(15,23,42,.82)", color: "white", backdropFilter: "blur(8px)",
          padding: "8px 16px", borderRadius: "999px", fontSize: "12px",
          pointerEvents: "none", zIndex: 1000, whiteSpace: "nowrap",
        }}>
          📍 Tocá el mapa para reportar una problemática
        </div>
      )}

      {fueraZona && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "#ef4444", color: "white", padding: "8px 16px",
          borderRadius: "999px", fontSize: "12px", pointerEvents: "none", zIndex: 1000, whiteSpace: "nowrap",
        }}>
          ⚠️ Solo podés reportar dentro de la provincia de Córdoba
        </div>
      )}

      {/* Contador */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "white", borderRadius: "10px", padding: "8px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,.12)", fontSize: "12px", color: "#334155",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span style={{ fontWeight: 700, fontSize: "16px", color: "#1e40af" }}>{reportesVisibles}</span>
        {filtro ? `de ${reportes.length} reportes` : `reporte${reportes.length !== 1 ? "s" : ""}`}
      </div>

      {/* Formulario — responsive */}
      {pending && (
        <>
          <div onClick={() => setPending(null)} style={{
            position: "absolute", inset: 0, zIndex: 1999,
            background: "rgba(0,0,0,.4)", backdropFilter: "blur(2px)",
          }} />
          <div style={{
            position: "absolute", zIndex: 2000,
            bottom: 0, left: 0, right: 0,
            borderRadius: "20px 20px 0 0",
            background: "white", boxShadow: "0 -8px 48px rgba(0,0,0,.2)",
            maxHeight: "85vh", overflowY: "auto", padding: "0 16px 32px",
          }}>
            {/* Drag handle */}
            <div style={{ padding: "12px 0 8px", display: "flex", justifyContent: "center" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e2e8f0" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>📍 Nueva problemática</h3>
              <button onClick={() => setPending(null)} aria-label="Cerrar"
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#94a3b8" }}>×</button>
            </div>

            <label style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".08em" }}>
              Categoría
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", margin: "8px 0 16px" }}>
              {CATEGORIAS.map(c => (
                <button key={c.label} onClick={() => setCat(c.label)} style={{
                  fontSize: "11px", padding: "8px 10px", borderRadius: "10px",
                  textAlign: "left", lineHeight: 1.3,
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
              placeholder="Contanos qué está pasando en este lugar..." rows={3}
              style={{
                width: "100%", marginTop: "8px", padding: "10px 12px", borderRadius: "8px",
                border: "1.5px solid #e2e8f0", fontSize: "14px", lineHeight: 1.6,
                resize: "none", fontFamily: "inherit", color: "#1e293b",
                outline: "none", boxSizing: "border-box",
              }} />

            {error && <p style={{ fontSize: "12px", color: "#ef4444", margin: "8px 0 0" }}>{error}</p>}

            <button onClick={handleGuardar} disabled={!desc.trim() || saving} style={{
              marginTop: "16px", width: "100%", padding: "14px", borderRadius: "10px", border: "none",
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
    </div>
  );
}

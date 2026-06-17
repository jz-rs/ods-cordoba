import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CordobaMap from "@/components/CordobaMap";
import LeyendaMapa from "@/components/LeyendaMapa";

export const metadata: Metadata = {
  title: "Mapa Interactivo · ODS Córdoba",
  description:
    "Mapa interactivo de la ciudad de Córdoba para explorar acciones vinculadas a los Objetivos de Desarrollo Sostenible.",
};

export default function MapaPage() {
  return (
    <>
      <Navbar />

      {/* HEADER */}
      <section
        style={{
          background: "linear-gradient(160deg,#0f172a 0%,#1e3a8a 70%)",
          padding: "56px 0 44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            Explorá la ciudad
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem,4.5vw,2.6rem)",
              fontWeight: 900,
              color: "white",
              margin: "0 0 12px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Mapa interactivo de Córdoba
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,.55)",
              maxWidth: "560px",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            ¿Ves una problemática ambiental en tu barrio? Tocá cualquier punto del mapa,
            elegí la categoría, describí qué está pasando y publicá tu reporte.
            Aparece al instante para que toda la comunidad pueda verlo.
          </p>
        </div>
      </section>

      {/* MAPA */}
      <section style={{ background: "#f8fafc", padding: "40px 0 72px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow:
                "0 1px 3px rgba(0,0,0,.06), 0 8px 32px rgba(0,0,0,.08)",
              border: "1px solid #e2e8f0",
              height: "70vh",
              minHeight: "420px",
            }}
          >
            <CordobaMap />
          </div>
          <LeyendaMapa />

          <p
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              marginTop: "14px",
              textAlign: "center",
            }}
          >
            Datos del mapa © OpenStreetMap · Usá la rueda del mouse o los
            controles para hacer zoom.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

import Link from "next/link";
import { ODS } from "@/lib/ods-data";

export default function ODSCard({ ods }: { ods: ODS }) {
  return (
    <div className="ods-card" style={{
      background: "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* colored header */}
      <div style={{
        background: ods.color,
        padding: "20px 20px 16px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(0,0,0,.07) 1px, transparent 1px)",
          backgroundSize: "18px 18px", pointerEvents: "none",
        }} />
        <span style={{
          position: "absolute", right: "16px", top: "12px",
          fontSize: "3.5rem", fontWeight: 900,
          color: "rgba(255,255,255,.15)", lineHeight: 1, letterSpacing: "-0.04em",
          pointerEvents: "none",
        }}>
          {ods.number}
        </span>
        <p style={{
          fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,.55)",
          letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px",
        }}>
          ODS {ods.number}
        </p>
        <h3 style={{
          fontSize: "1.05rem", fontWeight: 800, color: "white",
          margin: 0, letterSpacing: "-0.015em", lineHeight: 1.25,
          maxWidth: "70%",
        }}>
          {ods.title}
        </h3>
      </div>

      {/* body */}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <p style={{
          fontSize: "13px", color: "#64748b", lineHeight: 1.7,
          margin: "0 0 16px", fontWeight: 400,
        }}>
          {ods.description}
        </p>

        {/* acciones pill list */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
          {ods.actions.map((a, i) => (
            <span key={i} style={{
              fontSize: "11px", fontWeight: 600, color: ods.color,
              background: ods.color + "14",
              padding: "3px 10px", borderRadius: "999px",
              letterSpacing: "0.01em",
            }}>
              {a.title}
            </span>
          ))}
        </div>

        <Link href={`/ods/${ods.number}`} style={{
          background: ods.color,
          color: "white",
          padding: "8px 16px",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: 700,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          letterSpacing: "0.01em",
          alignSelf: "flex-start",
        }}>
          Ver más
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}

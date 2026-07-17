import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EncuestaForm from "@/components/EncuestaForm";

export const metadata: Metadata = {
  title: "Encuesta ODS · ODS Córdoba",
  description: "Participá en la encuesta de Objetivos de Desarrollo Sostenible en Córdoba.",
};

export default function EncuestaPage() {
  return (
    <>
      <Navbar />
      <section style={{
        background: "linear-gradient(160deg,#0f172a 0%,#1e3a8a 70%)",
        padding: "56px 0 44px", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, color: "#3b82f6",
            letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px" }}>
            Proyecto UBP · ULA
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem,4.5vw,2.6rem)", fontWeight: 900, color: "white",
            margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Encuesta ODS Córdoba
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,.55)", lineHeight: 1.8, margin: 0 }}>
            Estudiantes de UBP y ULA realizamos esta encuesta para conocer la realidad de los vecinos
            de Córdoba en relación a los Objetivos de Desarrollo Sostenible. Tus respuestas son anónimas
            y ayudan a construir un diagnóstico colectivo de nuestra ciudad.
          </p>
        </div>
      </section>
      <section style={{ background: "#f8fafc", padding: "48px 0 72px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <EncuestaForm />
        </div>
      </section>
      <Footer />
    </>
  );
}

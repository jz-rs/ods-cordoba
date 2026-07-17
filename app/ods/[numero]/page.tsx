import { notFound } from "next/navigation";
import Link from "next/link";
import { ODS_CORDOBA } from "@/lib/ods-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return ODS_CORDOBA.map((o) => ({ numero: String(o.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  const ods = ODS_CORDOBA.find((o) => o.number === Number(numero));
  if (!ods) return {};
  return { title: `ODS ${ods.number}: ${ods.title} · Córdoba 2030` };
}

export default async function ODSDetailPage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  const ods = ODS_CORDOBA.find((o) => o.number === Number(numero));
  if (!ods) notFound();

  const idx = ODS_CORDOBA.indexOf(ods);
  const prev = ODS_CORDOBA[idx - 1] ?? null;
  const next = ODS_CORDOBA[idx + 1] ?? null;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: ods.color,
          padding: "72px 0 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(0,0,0,.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
          }}
        >
          {/* breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <Link
              href="/#ods-cordoba"
              style={{
                color: "rgba(255,255,255,.6)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Inicio
            </Link>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: "13px" }}>
              ›
            </span>
            <Link
              href="/#ods-cordoba"
              style={{
                color: "rgba(255,255,255,.6)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              ODS en Córdoba
            </Link>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: "13px" }}>
              ›
            </span>
            <span
              style={{ color: "white", fontSize: "13px", fontWeight: 600 }}
            >
              ODS {ods.number}
            </span>
          </div>

          {/* number + title */}
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}
          >
            <span
              style={{
                fontSize: "clamp(4rem,10vw,7rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,.18)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                flexShrink: 0,
              }}
            >
              {ods.number}
            </span>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,.55)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                }}
              >
                Objetivo de Desarrollo Sostenible
              </p>
              <h1
                style={{
                  fontSize: "clamp(1.8rem,5vw,3rem)",
                  fontWeight: 900,
                  color: "white",
                  margin: 0,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {ods.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "64px 24px 96px",
        }}
      >
        {/* description card */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "32px 36px",
            marginBottom: "32px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04)",
            borderLeft: `4px solid ${ods.color}`,
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: ods.color,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 10px",
            }}
          >
            Descripción
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#374151",
              lineHeight: 1.85,
              margin: "0 0 16px",
              fontWeight: 400,
            }}
          >
            {ods.description}
          </p>
          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.85,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {ods.longDescription}
          </p>
        </div>

        {/* actions */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            Acciones en Córdoba
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {ods.actions.map((action, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "20px 20px 20px 16px",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,.05),0 2px 8px rgba(0,0,0,.03)",
                  borderTop: `3px solid ${ods.color}`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: ods.color + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1px",
                  }}
                >
                  <span
                    style={{ color: ods.color, fontWeight: 800, fontSize: "11px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {action.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.75,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* prev / next */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {prev ? (
            <Link
              href={`/ods/${prev.number}`}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "18px 20px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                borderLeft: `3px solid ${prev.color}`,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ← Anterior
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "-0.01em",
                }}
              >
                ODS {prev.number}: {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/ods/${next.number}`}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "18px 20px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                alignItems: "flex-end",
                textAlign: "right",
                boxShadow: "0 1px 3px rgba(0,0,0,.06)",
                borderRight: `3px solid ${next.color}`,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#94a3b8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Siguiente →
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "-0.01em",
                }}
              >
                ODS {next.number}: {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ODSCard from "@/components/ODSCard";
import SDGGrid from "@/components/SDGGrid";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ODS_CORDOBA } from "@/lib/ods-data";

const stats: [string, string][] = [
  ["17",   "Objetivos globales"],
  ["7",    "ODS en Córdoba"   ],
  ["2030", "Meta Agenda"      ],
];

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Botón flotante para ir arriba */}
      <ScrollToTopButton />

      {/* ─── HERO ─── */}
      <section style={{
        background:"linear-gradient(160deg,#0f172a 0%,#1e3a8a 58%,#1d4ed8 100%)",
        padding:"112px 0 96px",position:"relative",overflow:"hidden"
      }}>
        {/* Dot-grid overlay */}
        <div style={{position:"absolute",inset:0,
          backgroundImage:"radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize:"36px 36px",pointerEvents:"none"}} />
        {/* Glow */}
        <div style={{position:"absolute",top:"-120px",right:"-80px",width:"560px",height:"560px",
          borderRadius:"50%",background:"rgba(99,102,241,.14)",filter:"blur(90px)",pointerEvents:"none"}} />

        <div style={{maxWidth:"820px",margin:"0 auto",padding:"0 24px",
          textAlign:"center",position:"relative"}}>

          {/* Badge */}
          <div className="au" style={{display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",
            padding:"5px 16px 5px 6px",borderRadius:"999px",marginBottom:"30px"}}>
            <span style={{background:"#3b82f6",padding:"2px 10px",borderRadius:"999px",
              fontSize:"10px",fontWeight:700,color:"white",letterSpacing:"0.1em",
              textTransform:"uppercase"}}>
              2030
            </span>
            <span style={{color:"rgba(255,255,255,.55)",fontSize:"12px",fontWeight:500,letterSpacing:"0.02em"}}>
              Agenda para el Desarrollo Sostenible · Córdoba
            </span>
          </div>

          {/* Title */}
          <h1 className="au1" style={{fontSize:"clamp(2.8rem,7vw,4.8rem)",fontWeight:900,
            color:"white",lineHeight:1.06,letterSpacing:"-0.03em",margin:"0 0 22px"}}>
            ODS en{" "}
            <span style={{background:"linear-gradient(90deg,#60a5fa,#c084fc)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              Córdoba
            </span>
          </h1>

          {/* Subtitle */}
          <p className="au2" style={{fontSize:"1.05rem",color:"rgba(255,255,255,.5)",
            maxWidth:"500px",margin:"0 auto 40px",lineHeight:1.85,fontWeight:400}}>
            Acciones concretas para alcanzar los Objetivos de Desarrollo Sostenible en nuestra ciudad.
          </p>

          {/* CTAs */}
          <div className="au3" style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#ods-cordoba" className="cta-btn" style={{
              display:"inline-flex",alignItems:"center",gap:"6px",
              background:"white",color:"#1e40af",fontWeight:700,padding:"13px 26px",
              borderRadius:"10px",textDecoration:"none",fontSize:"14px",
              letterSpacing:"0.01em",boxShadow:"0 4px 20px rgba(0,0,0,.28)"}}>
              Ver ODS en Córdoba
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#aprende" className="ghost-btn" style={{
              display:"inline-flex",alignItems:"center",gap:"6px",
              background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.14)",
              color:"rgba(255,255,255,.8)",fontWeight:600,padding:"13px 26px",
              borderRadius:"10px",textDecoration:"none",fontSize:"14px",letterSpacing:"0.01em"}}>
              Los 17 ODS
            </a>
          </div>

          {/* Stats */}
          <div className="resp-hero-stats" style={{display:"flex",justifyContent:"center",marginTop:"72px"}}>
            {stats.map(([val, lbl], i) => (
              <div key={lbl} style={{textAlign:"center",padding:"0 36px",
                borderRight:i < 2 ? "1px solid rgba(255,255,255,.08)" : undefined}}>
                <div style={{fontSize:"2.1rem",fontWeight:900,color:"white",
                  letterSpacing:"-0.03em",lineHeight:1}}>{val}</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,.35)",marginTop:"7px",
                  fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase"}}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OBSERVATORIO ─── */}
      <section id="observatorio" style={{background:"white",padding:"88px 0",borderBottom:"1px solid #f1f5f9"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px"}}>
          <div style={{marginBottom:"52px"}}>
            <p style={{fontSize:"11px",fontWeight:700,color:"#3b82f6",
              letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 10px"}}>
              El observatorio
            </p>
            <h2 style={{fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,color:"#0f172a",
              margin:"0 0 0",letterSpacing:"-0.025em",lineHeight:1.15}}>
              Observatorio Municipal ODS
            </h2>
            <div style={{width:"40px",height:"3px",background:"#3b82f6",
              borderRadius:"999px",marginTop:"16px"}} />
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"16px"}}>
            {[
              {
                icon: "📊",
                title: "Análisis y diagnóstico",
                text: "El Observatorio Municipal es un instrumento de análisis, diagnóstico, evaluación y seguimiento de los ODS-2030 sobre la seguridad humana.",
              },
              {
                icon: "📁",
                title: "Información estadística",
                text: "Organiza información estadística a nivel local, monitorea la implementación de los ODS y visibiliza el avance en el cumplimiento de la Agenda 2030.",
              },
              {
                icon: "🤝",
                title: "Participación ciudadana",
                text: "Fomenta la participación de ciudadanos, organizaciones, académicos y el sector empresarial en acciones basadas en los ODS.",
              },
              {
                icon: "🏛️",
                title: "Gobierno informado",
                text: "Queremos una sociedad y un gobierno municipal educados y preparados para actuar frente a los desafíos del desarrollo sostenible.",
              },
            ].map((item) => (
              <div key={item.title} style={{
                background:"#f8fafc",borderRadius:"14px",padding:"24px",
                borderTop:"3px solid #3b82f6",
              }}>
                <p style={{fontSize:"11px",fontWeight:700,color:"#0f172a",margin:"0 0 8px",letterSpacing:"-0.01em"}}>
                  {item.title}
                </p>
                <p style={{fontSize:"13px",color:"#64748b",lineHeight:1.75,margin:0,fontWeight:400}}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOBRE LAS ODS ─── */}
      <section id="ods-cordoba-info" style={{background:"#0f172a",padding:"96px 0",position:"relative",overflow:"hidden"}}>
        {/* bg decoration */}
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(255,255,255,.025) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"-160px",left:"-100px",width:"480px",height:"480px",borderRadius:"50%",background:"rgba(59,130,246,.07)",filter:"blur(80px)",pointerEvents:"none"}}/>

        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px",position:"relative"}}>

          {/* header */}
          <div style={{marginBottom:"64px",maxWidth:"640px"}}>
            <p style={{fontSize:"11px",fontWeight:700,color:"#3b82f6",letterSpacing:"0.14em",textTransform:"uppercase",margin:"0 0 12px"}}>
              Agenda 2030
            </p>
            <h2 style={{fontSize:"clamp(2rem,4.5vw,2.8rem)",fontWeight:900,color:"white",margin:"0 0 18px",letterSpacing:"-0.03em",lineHeight:1.1}}>
              ¿Qué son los ODS?
            </h2>
            <p style={{fontSize:"15px",color:"#94a3b8",lineHeight:1.85,margin:0,fontWeight:400}}>
              17 Objetivos y 169 Metas aprobados en la Cumbre Mundial de Nueva York en 2015, para lograr el Desarrollo Sostenible integrando las dimensiones económica, ambiental y social.
            </p>
          </div>

          {/* stat band */}
          <div className="resp-stat-band" style={{display:"flex",gap:"0",marginBottom:"64px",background:"rgba(255,255,255,.04)",borderRadius:"16px",overflow:"hidden",border:"1px solid rgba(255,255,255,.06)"}}>
            {[
              {val:"17",  label:"Objetivos",  sub:"clasificados por temáticas"},
              {val:"169", label:"Metas",       sub:"específicas y medibles"},
              {val:"2015",label:"Adoptados",   sub:"Cumbre Mundial — Nueva York"},
              {val:"2030",label:"Horizonte",   sub:"plazo para cumplirlos"},
            ].map((s,i,arr) => (
              <div key={s.val} style={{flex:1,padding:"28px 24px",borderRight:i<arr.length-1?"1px solid rgba(255,255,255,.06)":undefined,textAlign:"center"}}>
                <div style={{fontSize:"2rem",fontWeight:900,color:"white",letterSpacing:"-0.04em",lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:"12px",fontWeight:700,color:"#3b82f6",margin:"6px 0 3px",textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.label}</div>
                <div style={{fontSize:"11px",color:"#475569",lineHeight:1.5}}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* content grid */}
          <div className="resp-2col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            {[
              {
                tag:"Origen",
                title:"Una iniciativa histórica",
                text:"Es la primera gran iniciativa global que surge de lecciones de los Objetivos del Milenio (2000). Los ODS abordan los desafíos actuales integrando lo económico, ambiental y social, basándose en derechos universales con una visión de cinco componentes cruciales: personas, prosperidad, paz, alianzas y planeta.",
              },
              {
                tag:"Impacto",
                title:"Reconocer para resolver",
                text:"Los ODS permitieron a la sociedad global reconocer los problemas endémicos a nivel mundial — investigar, diagnosticar y diseñar programas para paliar su impacto. Buscan generar conciencia sobre la responsabilidad del ser humano para erradicar la pobreza, proteger el hábitat y asegurar la prosperidad para todos.",
              },
              {
                tag:"Conexión",
                title:"Un enfoque holístico",
                text:"Los 17 ODS representan un enfoque holístico: están clasificados por temáticas y apuntan al cuidado del ambiente, fin de la pobreza y eliminación de desigualdades. Al estar interconectados, las intervenciones en uno afectan el éxito de otros — hallar estas interdependencias ayuda a abordar las causas raíz.",
              },
              {
                tag:"Sostenibilidad",
                title:"Tres dimensiones clave",
                text:"La sostenibilidad en nuestro hábitat se logra cuando las acciones se fundamentan en tres factores: económico, social y ambiental para un crecimiento integral. Se vinculan en una dinámica colaboración para la inclusión social, el crecimiento económico sostenido y la protección del ambiente.",
              },
            ].map((item) => (
              <div key={item.title} style={{background:"rgba(255,255,255,.04)",borderRadius:"14px",padding:"28px 28px",border:"1px solid rgba(255,255,255,.07)"}}>
                <span style={{display:"inline-block",fontSize:"10px",fontWeight:700,color:"#3b82f6",background:"rgba(59,130,246,.12)",padding:"3px 10px",borderRadius:"999px",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"14px"}}>
                  {item.tag}
                </span>
                <h3 style={{fontSize:"16px",fontWeight:800,color:"white",margin:"0 0 10px",letterSpacing:"-0.01em",lineHeight:1.25}}>
                  {item.title}
                </h3>
                <p style={{fontSize:"13px",color:"#94a3b8",lineHeight:1.85,margin:0,fontWeight:400}}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ODS EN CÓRDOBA ─── */}
      <section id="ods-cordoba" style={{background:"#f8fafc",padding:"88px 0"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px"}}>
          <div style={{marginBottom:"52px"}}>
            <p style={{fontSize:"11px",fontWeight:700,color:"#3b82f6",
              letterSpacing:"0.12em",textTransform:"uppercase",margin:"0 0 10px"}}>
              Agenda local
            </p>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",
              flexWrap:"wrap",gap:"16px"}}>
              <h2 style={{fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,color:"#0f172a",
                margin:0,letterSpacing:"-0.025em",lineHeight:1.15}}>
                ODS en Córdoba
              </h2>
              <p style={{color:"#94a3b8",maxWidth:"360px",fontSize:"14px",
                lineHeight:1.75,margin:0,fontWeight:400}}>
                Acciones que podemos hacer en nuestra ciudad para contribuir a cada objetivo.
              </p>
            </div>
            <div style={{width:"40px",height:"3px",background:"#3b82f6",
              borderRadius:"999px",marginTop:"16px"}} />
          </div>

          <div style={{display:"grid",
            gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"16px"}}>
            {ODS_CORDOBA.map((ods) => (
              <ODSCard key={ods.number} ods={ods} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SDG GRID ─── */}
      <div id="sdg-grid">
        <SDGGrid />
      </div>

      {/* ─── CTA ─── */}
      <section id="participar" style={{background:"#f8fafc",padding:"96px 0",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(#e2e8f0 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div style={{maxWidth:"700px",margin:"0 auto",padding:"0 24px",textAlign:"center",position:"relative"}}>

          <p style={{fontSize:"11px",fontWeight:700,color:"#3b82f6",
            letterSpacing:"0.14em",textTransform:"uppercase",margin:"0 0 20px"}}>
            Sumáte
          </p>

          <h2 style={{fontSize:"clamp(2rem,5vw,3rem)",fontWeight:900,color:"#0f172a",
            margin:"0 0 20px",letterSpacing:"-0.03em",lineHeight:1.1}}>
            Participá por los ODS
          </h2>

          <p style={{color:"#475569",fontSize:"16px",lineHeight:1.9,marginBottom:"16px",fontWeight:400}}>
            Nos apasiona encontrar formas innovadoras de abordar los desafíos monumentales que enfrentamos. Creemos que todos podemos contribuir a hacer del mundo un lugar mejor para las generaciones presentes y futuras.
          </p>

          <p style={{color:"#64748b",fontSize:"15px",lineHeight:1.9,marginBottom:"16px",fontWeight:400,fontStyle:"italic"}}>
            ¿Tenés una idea sobre cómo podemos alcanzar los ODS? ¡Nos encantaría escucharla!
          </p>

          <p style={{color:"#64748b",fontSize:"15px",lineHeight:1.9,marginBottom:"40px",fontWeight:400}}>
            No importa cuán grande o pequeña sea tu idea — creemos que cada pequeña acción puede marcar una gran diferencia.
          </p>

          <a
            href="mailto:cordoba.ods@gmail.com?subject=Tengo%20una%20idea"
            className="cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#1e40af",
              color: "white",
              fontWeight: 700,
              padding: "15px 36px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "15px",
              boxShadow: "0 8px 32px rgba(30,64,175,.25)",
              letterSpacing: "0.01em"
            }}
          >
            Contáctanos por email
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

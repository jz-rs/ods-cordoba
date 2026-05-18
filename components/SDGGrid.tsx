import Link from "next/link";
import { ALL_ODS } from "@/lib/ods-data";

export default function SDGGrid() {
  return (
    <section id="aprende" style={{background:"white",padding:"88px 0",borderTop:"1px solid #f1f5f9"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px"}}>

        <div style={{marginBottom:"52px"}}>
          <p style={{fontSize:"11px",fontWeight:700,color:"#3b82f6",letterSpacing:"0.12em",
                     textTransform:"uppercase",margin:"0 0 10px"}}>
            Los 17 objetivos
          </p>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",
                       flexWrap:"wrap",gap:"16px"}}>
            <h2 style={{fontSize:"clamp(1.8rem,4vw,2.4rem)",fontWeight:800,color:"#0f172a",
                        margin:0,letterSpacing:"-0.025em",lineHeight:1.15}}>
              Los 17 Objetivos
            </h2>
            <p style={{color:"#94a3b8",maxWidth:"360px",fontSize:"14px",lineHeight:1.75,
                       margin:0,fontWeight:400}}>
              La Agenda 2030 define metas globales para construir un mundo más justo y sostenible.
            </p>
          </div>
          <div style={{width:"40px",height:"3px",background:"#3b82f6",
                       borderRadius:"999px",marginTop:"16px"}} />
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(120px, 1fr))",gap:"8px"}}>
          {ALL_ODS.map((sdg) => {
            const isLocal = sdg.unUrl.startsWith("/");
            const imgNum = String(sdg.number).padStart(2, "0");
            const sharedStyle = {
              borderRadius:"12px",textDecoration:"none",display:"block",
              overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,.12)",
            };
            const inner = (
              <img
                src={`/sdg/sdg-${imgNum}.png`}
                alt={`ODS ${sdg.number}: ${sdg.title}`}
                style={{width:"100%",height:"auto",display:"block"}}
              />
            );
            return isLocal ? (
              <Link key={sdg.number} href={sdg.unUrl} className="sdg-tile" style={sharedStyle}>
                {inner}
              </Link>
            ) : (
              <a key={sdg.number} href={sdg.unUrl} target="_blank" rel="noopener noreferrer"
                 className="sdg-tile" style={sharedStyle}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

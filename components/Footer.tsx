export default function Footer() {
  return (
    <footer style={{background:"#020617",color:"#fff"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"52px 24px 28px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"48px",marginBottom:"44px"}}>
          <div>
            <img
              src="/logos/agenda2030.png"
              alt="Logo Agenda 2030 Córdoba, Observatorio de Desarrollo Sostenible, UBP, ULA, BIOCBA"
              style={{maxWidth:"200px",height:"auto",display:"block"}}
            />
          </div>
          <div>
            <img
              src="/logos/instituciones.png"
              alt="Logos de instituciones: UNESCO, Cátedra UNESCO en Seguridad Humana y Desarrollo Regional, Universidad Blas Pascal"
              style={{width:"100%",maxWidth:"600px",height:"auto",filter:"brightness(0) invert(1)",opacity:1}}
            />
          </div>
        </div>

        <div style={{borderTop:"1px solid #0f172a",paddingTop:"24px",
                     display:"flex",justifyContent:"space-between",alignItems:"center",
                     flexWrap:"wrap",gap:"12px"}}>
          <span style={{fontSize:"12px",color:"#fff"}}>© 2026 ODS Córdoba · Agenda 2030</span>
          <span style={{fontSize:"12px",color:"#fff"}}>Developed by Jezabel Rosso</span>
          <a href="https://www.un.org/sustainabledevelopment/es/" target="_blank" rel="noopener noreferrer"
             aria-label="Ir al sitio oficial de Naciones Unidas para el Desarrollo Sostenible (se abre en nueva pestaña)"
             style={{fontSize:"12px",color:"#fff",textDecoration:"none",fontWeight:500}}>
            Naciones Unidas →
          </a>
        </div>
      </div>
    </footer>
  );
}

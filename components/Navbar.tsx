"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { anchor: "observatorio", label: "Observatorio", section: "observatorio" },
  { anchor: "ods-cordoba-info",  label: "Sobre las ODS", section: "ods-cordoba-info" },
  { anchor: "ods-cordoba", label: "Córdoba", section: "ods-cordoba" },
  { anchor: "sdg-grid",     label: "Los 17 objetivos", section: "sdg-grid" },
  { label: "Aprende", external: "https://juegosods.com/" },
  { anchor: "participar",   label: "Sumate", section: "participar", highlight: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Mapeo de secciones a IDs reales en el DOM
  const sectionIdMap: Record<string, string> = {
    observatorio: "observatorio",
    "ods-cordoba-info": "ods-cordoba-info",
    "ods-cordoba": "ods-cordoba",
    "sdg-grid": "sdg-grid",
    participar: "participar"
  };
  const anchorHref = (section?: string) => section ? (isHome ? `#${sectionIdMap[section]}` : `/#${sectionIdMap[section]}`) : undefined;
  const close = () => setOpen(false);

  return (
    <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid #e2e8f0"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:"60px"}}>

        <Link href="/"
          onClick={() => window.scrollTo({top:0, behavior:"smooth"})}
          style={{display:"flex",alignItems:"center",textDecoration:"none"}}
          aria-label="Ir al inicio de Agenda 2030 ODS Córdoba">
          <img src="/logos/agenda2030.png" alt="Logo Agenda 2030 ODS Córdoba"
            style={{height:"40px",width:"auto",display:"block",filter:"brightness(0)"}} />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{display:"flex",alignItems:"center",gap:"2px"}}>
          {links.map((l) => {
            if (l.external) {
              return (
                <a key={l.label} href={l.external} target="_blank" rel="noopener noreferrer"
                   className="nav-link"
                   aria-label={`Abrir ${l.label} en una nueva pestaña`}
                   style={{color:"#475569",fontSize:"13px",fontWeight:600,padding:"7px 14px",borderRadius:"8px",textDecoration:"none",letterSpacing:"0.01em"}}>
                  {l.label}
                </a>
              );
            }
            if (l.highlight) {
              return (
                <a key={l.label} href={anchorHref(l.section)}
                   aria-label={`Ir a la sección ${l.label}`}
                   style={{color:"white",fontSize:"13px",fontWeight:700,padding:"7px 16px",borderRadius:"8px",textDecoration:"none",letterSpacing:"0.01em",background:"#1e40af"}}>
                  {l.label}
                </a>
              );
            }
            return (
              <a key={l.label} href={anchorHref(l.section)} className="nav-link"
                 aria-label={`Ir a la sección ${l.label}`}
                 style={{color:"#475569",fontSize:"13px",fontWeight:600,padding:"7px 14px",borderRadius:"8px",textDecoration:"none",letterSpacing:"0.01em"}}>
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* Hamburger button */}
        <button className="nav-hamburger" onClick={() => setOpen(!open)}
          style={{background:"none",border:"none",cursor:"pointer",padding:"8px",borderRadius:"8px",
                  flexDirection:"column",gap:"5px",alignItems:"center",justifyContent:"center"}}>
          <span style={{display:"block",width:"20px",height:"2px",background:"#0f172a",borderRadius:"2px",
                        transition:"all .2s",transform: open ? "translateY(7px) rotate(45deg)" : "none"}}/>
          <span style={{display:"block",width:"20px",height:"2px",background:"#0f172a",borderRadius:"2px",
                        transition:"all .2s",opacity: open ? 0 : 1}}/>
          <span style={{display:"block",width:"20px",height:"2px",background:"#0f172a",borderRadius:"2px",
                        transition:"all .2s",transform: open ? "translateY(-7px) rotate(-45deg)" : "none"}}/>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{borderTop:"1px solid #f1f5f9",background:"rgba(255,255,255,0.98)",padding:"12px 24px 20px",display:"flex",flexDirection:"column",gap:"4px"}}>
          {links.map((l) => {
            if (l.external) {
              return (
                <a key={l.label} href={l.external} target="_blank" rel="noopener noreferrer"
                   onClick={close}
                   style={{color:"#475569",fontSize:"14px",fontWeight:600,padding:"10px 12px",borderRadius:"8px",textDecoration:"none"}}>
                  {l.label}
                </a>
              );
            }
            if (l.highlight) {
              return (
                <a key={l.label} href={anchorHref(l.anchor!)} onClick={close}
                   style={{color:"white",fontSize:"14px",fontWeight:700,padding:"10px 16px",borderRadius:"8px",textDecoration:"none",background:"#1e40af",textAlign:"center",marginTop:"8px"}}>
                  {l.label}
                </a>
              );
            }
            return (
              <a key={l.label} href={anchorHref(l.anchor!)} onClick={close}
                 style={{color:"#475569",fontSize:"14px",fontWeight:600,padding:"10px 12px",borderRadius:"8px",textDecoration:"none"}}>
                {l.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

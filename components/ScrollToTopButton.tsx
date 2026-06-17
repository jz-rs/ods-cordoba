"use client";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Ir arriba"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        right: 24,
        bottom: 32,
        zIndex: 100,
        background: "#1e40af",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        display: visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(30,64,175,.18)",
        cursor: "pointer",
        fontSize: 28,
        transition: "opacity 0.2s"
      }}
    >
      ↑
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`loader-overlay ${hidden ? "hidden" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="loader-logo">AZAD STUDIO</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <div className="loader-bar-track">
          <div className="loader-bar" />
        </div>
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(207,207,207,0.4)",
            textTransform: "uppercase",
          }}
        >
          Loading Experience...
        </p>
      </div>
    </div>
  );
}

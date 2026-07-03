"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    // Determine active section
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (const section of [...sections].reverse()) {
      const el = document.getElementById(section);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActiveLink(section);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 8000,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? "rgba(5,5,5,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(212,175,55,0.12)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="container-custom" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              padding: 0,
            }}
            aria-label="AZAD STUDIO home"
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#D4AF37",
                textTransform: "uppercase",
              }}
            >
              Azad
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
              }}
            >
              Studio
            </span>
          </button>

          {/* Desktop Nav */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "36px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeLink === id;
              return (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.06em",
                      color: isActive ? "#D4AF37" : "rgba(255,255,255,0.75)",
                      textTransform: "uppercase",
                      padding: "4px 0",
                      position: "relative",
                      transition: "color 0.3s ease",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: isActive ? "100%" : "0%",
                        height: "1px",
                        background: "#D4AF37",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <a
            href="https://wa.me/918958902932"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary desktop-cta"
            style={{
              fontSize: "12px",
              padding: "10px 22px",
              textDecoration: "none",
            }}
            aria-label="Contact us on WhatsApp"
          >
            <span>Get Started</span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "#D4AF37",
                  borderRadius: "1px",
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                  transformOrigin: "center",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "translateY(7px) rotate(45deg)"
                        : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "scaleX(0)"
                      : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {navLinks.map((link, idx) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.85)",
              textTransform: "uppercase",
              padding: "16px 0",
              transition: "color 0.3s ease",
              animationDelay: `${idx * 0.05}s`,
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.color = "#D4AF37"; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)"; }}
          >
            {link.label}
          </button>
        ))}
        <a
          href="https://wa.me/918958902932"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: "24px", textDecoration: "none" }}
          onClick={() => setMenuOpen(false)}
        >
          <span>Get Started</span>
        </a>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

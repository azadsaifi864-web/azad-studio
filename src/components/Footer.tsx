"use client";

import { useState, useEffect } from "react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "CNC Grayscale Height Maps",
  "ArtCAM Design",
  "3D Relief Design",
  "Event Decoration",
  "Laser Cutting",
  "Custom Design",
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(212,175,55,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Top gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
        }}
      />

      <div className="container-custom" style={{ paddingTop: "80px", paddingBottom: "40px" }}>
        {/* Top Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Azad
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.4em",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                Studio
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "14px",
                color: "rgba(207,207,207,0.55)",
                lineHeight: 1.8,
                marginBottom: "28px",
                maxWidth: "260px",
              }}
            >
              Where CNC meets creativity. Premium design studio specializing in precision craftsmanship and digital artistry.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="https://www.instagram.com/mr_azad_saif"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Follow AZAD STUDIO on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/918958902932"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,211,102,0.5)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#25D366";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                }}
                aria-label="Contact on WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#D4AF37",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "14px",
                      color: "rgba(207,207,207,0.55)",
                      padding: 0,
                      transition: "color 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(207,207,207,0.55)"; }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(212,175,55,0.5)",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#D4AF37",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("#services")}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "14px",
                      color: "rgba(207,207,207,0.55)",
                      padding: 0,
                      transition: "color 0.2s ease",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(207,207,207,0.55)"; }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(212,175,55,0.5)",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#D4AF37",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Stay Updated
            </h4>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "14px",
                color: "rgba(207,207,207,0.55)",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              Subscribe to receive updates on new designs and promotions.
            </p>

            {subscribed ? (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "14px",
                  color: "#D4AF37",
                }}
                role="status"
              >
                ✓ Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} aria-label="Newsletter subscription">
                <div style={{ display: "flex", gap: "0" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="form-input"
                    style={{ borderRadius: "8px 0 0 8px", borderRight: "none" }}
                    aria-label="Email for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "14px 18px",
                      background: "linear-gradient(135deg, #D4AF37, #FFD86B)",
                      border: "none",
                      borderRadius: "0 8px 8px 0",
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                    aria-label="Subscribe to newsletter"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(212,175,55,0.1)",
            marginBottom: "32px",
          }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "13px",
              color: "rgba(207,207,207,0.35)",
            }}
          >
            © {currentYear} AZAD STUDIO. All rights reserved. Crafted with precision by Azad.
          </p>
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <a
              href="mailto:azadsaifi864@gmail.com"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "13px",
                color: "rgba(207,207,207,0.35)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4AF37"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(207,207,207,0.35)"; }}
            >
              azadsaifi864@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4AF37, #FFD86B)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 7000,
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showTop ? "auto" : "none",
          boxShadow: "0 8px 24px rgba(212,175,55,0.35)",
        }}
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" aria-hidden="true">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </footer>
  );
}

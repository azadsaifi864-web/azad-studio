"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const portfolioItems = [
  {
    id: 1,
    title: "3D Wood Relief Portrait",
    category: "3D Relief",
    image: "/images/portfolio-1.jpg",
    description: "Intricate 3D carved wood relief with ornate floral patterns",
  },
  {
    id: 2,
    title: "Laser Cut Mandala Panel",
    category: "Laser Cutting",
    image: "/images/portfolio-2.jpg",
    description: "Ultra-precise laser cut decorative panel with mandala design",
  },
  {
    id: 3,
    title: "CNC Portrait Carving",
    category: "CNC Grayscale",
    image: "/images/portfolio-3.jpg",
    description: "Highly detailed CNC carved portrait with grayscale heightmap",
  },
  {
    id: 4,
    title: "Luxury Event Backdrop",
    category: "Event Decoration",
    image: "/images/portfolio-4.jpg",
    description: "Premium wedding event decoration with laser cut golden panels",
  },
  {
    id: 5,
    title: "ArtCAM Ornament Design",
    category: "ArtCAM",
    image: "/images/portfolio-5.jpg",
    description: "Detailed ArtCAM 3D ornament design with intricate scrollwork",
  },
  {
    id: 6,
    title: "Custom Heightmap Art",
    category: "Custom Design",
    image: "/images/portfolio-6.jpg",
    description: "Custom grayscale heightmap converted to stunning 3D relief",
  },
];

const categories = ["All", "3D Relief", "Laser Cutting", "CNC Grayscale", "Event Decoration", "ArtCAM", "Custom Design"];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof portfolioItems[0] | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "#050505" }}
      aria-label="Portfolio"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>
            Our Work
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Featured <span className="gold-gradient">Portfolio</span>
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "16px",
              color: "rgba(207,207,207,0.65)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            A glimpse into the craftsmanship and creativity we pour into every project.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "48px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
          role="group"
          aria-label="Portfolio filter"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: `1px solid ${activeCategory === cat ? "#D4AF37" : "rgba(212,175,55,0.2)"}`,
                background: activeCategory === cat ? "rgba(212,175,55,0.12)" : "transparent",
                color: activeCategory === cat ? "#D4AF37" : "rgba(207,207,207,0.6)",
                fontFamily: "'Manrope', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
          role="list"
          aria-label="Portfolio items"
        >
          {filtered.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={i}
              visible={visible}
              onClick={() => setLightbox(item)}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: "64px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <a
            href="https://www.instagram.com/mr_azad_saif"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
            aria-label="View more on Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            View More on Instagram
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            animation: "scaleIn 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "800px",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#101010",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            <div style={{ position: "relative", aspectRatio: "16/9" }}>
              <Image
                src={lightbox.image}
                alt={lightbox.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="800px"
              />
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "#D4AF37", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                    {lightbox.category}
                  </p>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                    {lightbox.title}
                  </h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "14px", color: "rgba(207,207,207,0.7)" }}>
                    {lightbox.description}
                  </p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: "4px" }}
                  aria-label="Close lightbox"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function PortfolioCard({
  item,
  index,
  visible,
  onClick,
}: {
  item: typeof portfolioItems[0];
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="listitem"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View ${item.title}`}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          display: "block",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden" }}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Overlay */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.88) 100%)"
                : "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)",
              transition: "background 0.4s ease",
            }}
          />

          {/* Info */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 20px",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "11px",
                color: "#D4AF37",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {item.category}
            </p>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {item.title}
            </h3>
          </div>

          {/* Zoom icon */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(212,175,55,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

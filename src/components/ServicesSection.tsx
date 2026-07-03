"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const services = [
  {
    id: "cnc-grayscale",
    icon: "◈",
    title: "CNC Grayscale Height Maps",
    description:
      "Convert your images into precision-depth grayscale maps optimized for CNC routing. We transform photographs, artwork, and custom designs into perfect height data for 3D carving.",
    features: ["Photo to heightmap", "Precision depth control", "Custom resolution", "Multiple formats"],
    color: "#D4AF37",
  },
  {
    id: "artcam",
    icon: "⬡",
    title: "ArtCAM Design",
    description:
      "Professional ArtCAM-based relief design and toolpath generation. Our expert designers create intricate patterns, ornaments, and custom artwork ready for CNC production.",
    features: ["Relief modeling", "Toolpath generation", "Ornament design", "Custom artwork"],
    color: "#FFD86B",
  },
  {
    id: "3d-relief",
    icon: "◉",
    title: "3D Relief Design",
    description:
      "Stunning three-dimensional relief artwork crafted with exceptional detail. From portraits to landscapes, floral patterns to geometric art — we bring flat surfaces to life.",
    features: ["Portrait relief", "Landscape art", "Floral patterns", "Geometric design"],
    color: "#D4AF37",
  },
  {
    id: "event-decoration",
    icon: "✦",
    title: "Event Decoration",
    description:
      "Transform your events into unforgettable experiences with our custom CNC-cut decorative panels, wedding backdrops, stage designs, and bespoke decorative elements.",
    features: ["Wedding backdrops", "Stage design", "Custom panels", "Themed décor"],
    color: "#FFD86B",
  },
  {
    id: "laser-cutting",
    icon: "◬",
    title: "Laser Cutting Design",
    description:
      "Ultra-precise laser cutting designs for decorative panels, screens, signage, and intricate art. We create vector files optimized for clean, accurate laser processing.",
    features: ["Decorative panels", "Screen designs", "Custom signage", "Intricate art"],
    color: "#D4AF37",
  },
  {
    id: "custom-design",
    icon: "◎",
    title: "Custom Design",
    description:
      "Have a unique vision? We bring it to life. Our custom design service handles any creative brief — from concept to production-ready files tailored exactly to your needs.",
    features: ["Concept to file", "Any material", "Bespoke solution", "Quick turnaround"],
    color: "#FFD86B",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      role="article"
      aria-label={service.title}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateY(-8px)" : "translateY(0)"}`,
        transition: hovered ? "transform 0.1s linear" : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.12)"}`,
        borderRadius: "16px",
        padding: "36px 32px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 24px 60px rgba(212,175,55,0.12)"
          : "none",
        transitionProperty: "background, border-color, box-shadow",
        transitionDuration: "0.3s",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Background glow on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          fontSize: "32px",
          color: service.color,
          marginBottom: "20px",
          display: "inline-block",
          transform: hovered ? "scale(1.15) rotate(10deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          textShadow: hovered ? `0 0 20px ${service.color}80` : "none",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "14px",
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "14px",
          color: "rgba(207,207,207,0.7)",
          lineHeight: 1.75,
          marginBottom: "24px",
        }}
      >
        {service.description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
        {service.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "13px",
              color: "rgba(207,207,207,0.75)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: service.color,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="https://wa.me/918958902932"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "28px",
          fontFamily: "'Manrope', sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: service.color,
          textDecoration: "none",
          letterSpacing: "0.05em",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.3s ease",
        }}
        aria-label={`Inquire about ${service.title}`}
      >
        Inquire Now
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "#050505" }}
      aria-label="Our Services"
    >
      <div className="container-custom">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "72px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="section-label" style={{ justifyContent: "center" }}>
            What We Offer
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
            Premium <span className="gold-gradient">Services</span>
          </h2>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "16px",
              color: "rgba(207,207,207,0.65)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            From digital design to physical craftsmanship — we offer a complete 
            suite of precision CNC and creative services.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
              }}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: "64px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "16px",
              color: "rgba(207,207,207,0.6)",
              marginBottom: "24px",
            }}
          >
            Don&apos;t see exactly what you need?
          </p>
          <a
            href="https://wa.me/918958902932"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: "none" }}
            aria-label="Contact us for custom requirements"
          >
            <span>Discuss Custom Requirements</span>
          </a>
        </div>
      </div>
    </section>
  );
}

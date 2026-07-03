"use client";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Fast Delivery",
    description:
      "We understand that time is precious. Our streamlined workflow ensures your projects are delivered on schedule without compromising quality.",
    stat: "48h",
    statLabel: "Avg. Turnaround",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Premium Quality",
    description:
      "Every design is crafted with meticulous attention to detail. We use industry-leading tools and techniques to ensure superior results.",
    stat: "100%",
    statLabel: "Quality Guaranteed",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 10-16 0" />
      </svg>
    ),
    title: "Experienced Team",
    description:
      "Our team brings years of specialized expertise in CNC technology, ArtCAM software, and 3D design — delivering precision every time.",
    stat: "5+",
    statLabel: "Years Expertise",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
    title: "Creative Solutions",
    description:
      "We don't just execute — we innovate. Our creative approach transforms your vision into unique, impactful designs that stand out.",
    stat: "500+",
    statLabel: "Unique Designs",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our mission. We work closely with every client to ensure the final product exceeds expectations.",
    stat: "200+",
    statLabel: "Happy Clients",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Technical Precision",
    description:
      "Advanced CNC and laser cutting technology combined with expert software knowledge ensures micron-level accuracy in every project.",
    stat: "±0.1mm",
    statLabel: "Precision Level",
  },
];

export default function WhyUsSection() {
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
      id="why-us"
      ref={sectionRef}
      className="section-padding"
      style={{
        background: "linear-gradient(180deg, #101010 0%, #050505 100%)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Why Choose AZAD STUDIO"
    >
      {/* Background decor */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-custom" style={{ position: "relative" }}>
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
            Our Advantage
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
            Why Choose <span className="gold-gradient">AZAD STUDIO</span>
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
            We combine expertise, technology, and passion to deliver results that 
            consistently exceed expectations.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {reasons.map((reason, i) => (
            <WhyCard key={reason.title} reason={reason} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({
  reason,
  index,
  visible,
}: {
  reason: typeof reasons[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      <div
        role="article"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "36px 28px",
          borderRadius: "16px",
          background: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(212,175,55,0.35)" : "rgba(212,175,55,0.1)"}`,
          height: "100%",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 50px rgba(212,175,55,0.1)" : "none",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top glow line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Icon */}
        <div
          style={{
            color: "#D4AF37",
            marginBottom: "20px",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
          aria-hidden="true"
        >
          {reason.icon}
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          {reason.title}
        </h3>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "14px",
            color: "rgba(207,207,207,0.65)",
            lineHeight: 1.75,
            marginBottom: "24px",
          }}
        >
          {reason.description}
        </p>

        {/* Stat */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#D4AF37",
            }}
          >
            {reason.stat}
          </span>
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "12px",
              color: "rgba(207,207,207,0.5)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {reason.statLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

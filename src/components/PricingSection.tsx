"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Basic",
    price: "₹500",
    period: "per design",
    description: "Perfect for simple CNC design needs with fast delivery.",
    features: [
      "1 Design File",
      "CNC Grayscale Heightmap",
      "Basic Detailing",
      "Standard Resolution",
      "PNG / BMP Format",
      "48-hour Delivery",
      "1 Revision",
      "Email Support",
    ],
    notIncluded: ["3D Relief Design", "ArtCAM Toolpaths", "Priority Support"],
    cta: "Get Started",
    popular: false,
    color: "rgba(255,255,255,0.03)",
    borderColor: "rgba(212,175,55,0.12)",
  },
  {
    name: "Standard",
    price: "₹1,500",
    period: "per design",
    description: "Best for professional CNC projects requiring premium quality.",
    features: [
      "3 Design Files",
      "CNC Heightmap + ArtCAM",
      "High Detail Relief",
      "Premium Resolution",
      "Multiple Formats",
      "24-hour Delivery",
      "3 Revisions",
      "WhatsApp Support",
      "3D Preview",
      "Toolpath Guidance",
    ],
    notIncluded: ["Event Decoration", "Bulk Discount"],
    cta: "Most Popular",
    popular: true,
    color: "rgba(212,175,55,0.05)",
    borderColor: "rgba(212,175,55,0.5)",
  },
  {
    name: "Premium",
    price: "Custom",
    period: "project-based",
    description: "Full-service solution for complex and large-scale projects.",
    features: [
      "Unlimited Designs",
      "All Services Included",
      "Ultra-High Detail",
      "4K Resolution",
      "All Formats",
      "Priority Delivery",
      "Unlimited Revisions",
      "Dedicated Support",
      "3D Visualization",
      "Complete Toolpaths",
      "Event Decoration Design",
      "Custom Consultation",
    ],
    notIncluded: [],
    cta: "Contact Us",
    popular: false,
    color: "rgba(255,255,255,0.03)",
    borderColor: "rgba(212,175,55,0.15)",
  },
];

export default function PricingSection() {
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
      id="pricing"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #050505 0%, #101010 100%)" }}
      aria-label="Pricing Plans"
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
            Transparent Pricing
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
            Choose Your <span className="gold-gradient">Plan</span>
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
            Flexible pricing for every project scale. Contact us for custom enterprise quotes.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? plan.popular ? "translateY(-8px)" : "translateY(0)"
                  : "translateY(40px)",
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              }}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "14px",
              color: "rgba(207,207,207,0.5)",
            }}
          >
            All prices are indicative. Final pricing depends on project complexity.{" "}
            <a
              href="https://wa.me/918958902932"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#D4AF37", textDecoration: "none" }}
            >
              Contact us
            </a>{" "}
            for a custom quote.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const [hovered, setHovered] = useState(false);

  const handleCta = () => {
    if (plan.name === "Premium" || plan.cta === "Contact Us") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open("https://wa.me/918958902932", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="article"
      aria-label={`${plan.name} pricing plan`}
      style={{
        height: "100%",
        padding: "40px 32px",
        borderRadius: "16px",
        background: hovered
          ? plan.popular
            ? "rgba(212,175,55,0.08)"
            : "rgba(255,255,255,0.05)"
          : plan.color,
        border: `1px solid ${hovered ? "#D4AF37" : plan.borderColor}`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: hovered
          ? plan.popular
            ? "0 24px 60px rgba(212,175,55,0.2)"
            : "0 20px 50px rgba(212,175,55,0.08)"
          : plan.popular
          ? "0 12px 40px rgba(212,175,55,0.12)"
          : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          style={{
            position: "absolute",
            top: "-14px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #D4AF37, #FFD86B)",
            color: "#000",
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "5px 18px",
            borderRadius: "100px",
            whiteSpace: "nowrap",
          }}
          aria-label="Most popular plan"
        >
          ★ Most Popular
        </div>
      )}

      {/* Plan name */}
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: plan.popular ? "#D4AF37" : "rgba(207,207,207,0.5)",
          marginBottom: "16px",
        }}
      >
        {plan.name}
      </p>

      {/* Price */}
      <div style={{ marginBottom: "8px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "44px",
            fontWeight: 700,
            color: plan.popular ? "#D4AF37" : "#fff",
            lineHeight: 1,
          }}
        >
          {plan.price}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "13px",
          color: "rgba(207,207,207,0.45)",
          marginBottom: "16px",
          letterSpacing: "0.05em",
        }}
      >
        {plan.period}
      </p>

      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "14px",
          color: "rgba(207,207,207,0.65)",
          lineHeight: 1.7,
          marginBottom: "28px",
        }}
      >
        {plan.description}
      </p>

      <div
        style={{
          height: "1px",
          background: "rgba(212,175,55,0.12)",
          marginBottom: "24px",
        }}
      />

      {/* Features list */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", flex: 1, marginBottom: "32px" }}>
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "14px",
              color: "rgba(207,207,207,0.8)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="rgba(212,175,55,0.2)" />
              <path d="M8 12l3 3 5-5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {f}
          </li>
        ))}
        {plan.notIncluded.map((f) => (
          <li
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Manrope', sans-serif",
              fontSize: "14px",
              color: "rgba(207,207,207,0.3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="rgba(100,100,100,0.1)" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="rgba(100,100,100,0.5)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCta}
        className={plan.popular ? "btn-primary" : "btn-outline"}
        style={{ width: "100%", justifyContent: "center" }}
        aria-label={`${plan.cta} - ${plan.name} plan`}
      >
        <span>{plan.cta}</span>
      </button>
    </div>
  );
}

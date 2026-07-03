"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Interior Designer",
    location: "Delhi",
    rating: 5,
    text: "AZAD STUDIO transformed my vision into reality. The 3D relief design quality is absolutely stunning — I've never seen such precision and detail. My clients were blown away!",
    avatar: "RS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Event Planner",
    location: "Mumbai",
    rating: 5,
    text: "We hired AZAD STUDIO for our client's wedding decoration. The laser-cut panels were breathtaking. Fast delivery, exceptional quality, and superb communication throughout!",
    avatar: "PP",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Furniture Manufacturer",
    location: "Jaipur",
    rating: 5,
    text: "The CNC grayscale heightmaps from AZAD STUDIO are top-tier. The files were ready in under 24 hours and the carving results were flawless. Will definitely work with them again.",
    avatar: "VS",
  },
  {
    id: 4,
    name: "Kavya Nair",
    role: "Boutique Owner",
    location: "Bangalore",
    rating: 5,
    text: "I ordered a custom laser cutting design for my store's facade. AZAD STUDIO delivered beyond expectations — creative, precise, and professionally done. Highly recommend!",
    avatar: "KN",
  },
  {
    id: 5,
    name: "Arjun Mehta",
    role: "Architect",
    location: "Pune",
    rating: 5,
    text: "Outstanding ArtCAM designs that perfectly matched my architectural specifications. Azad's team is incredibly professional and their technical knowledge is impressive.",
    avatar: "AM",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#D4AF37" : "none"}
          stroke="#D4AF37"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "#101010", position: "relative", overflow: "hidden" }}
      aria-label="Client Testimonials"
    >
      {/* Background quote icon */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "240px",
          fontWeight: 700,
          color: "rgba(212,175,55,0.025)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        ❝
      </div>

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
            Client Stories
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
            What Our Clients <span className="gold-gradient">Say</span>
          </h2>
        </div>

        {/* Main testimonial display */}
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {/* Featured testimonial */}
          <div
            key={activeIndex}
            className="glass-card"
            style={{
              padding: "clamp(32px, 5vw, 56px)",
              borderRadius: "20px",
              marginBottom: "40px",
              animation: "scaleIn 0.5s ease",
              position: "relative",
              minHeight: "250px",
            }}
            role="article"
            aria-label={`Testimonial from ${testimonials[activeIndex].name}`}
          >
            {/* Quote mark */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "24px",
                left: "32px",
                fontFamily: "serif",
                fontSize: "60px",
                color: "rgba(212,175,55,0.25)",
                lineHeight: 1,
              }}
            >
              ❝
            </div>

            <div style={{ paddingTop: "20px" }}>
              <StarRating rating={testimonials[activeIndex].rating} />

              <blockquote
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  color: "rgba(207,207,207,0.88)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  margin: "20px 0 28px",
                }}
              >
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </blockquote>

              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AF37, #FFD86B)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#000",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#fff",
                    }}
                  >
                    {testimonials[activeIndex].name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "13px",
                      color: "rgba(207,207,207,0.55)",
                    }}
                  >
                    {testimonials[activeIndex].role} · {testimonials[activeIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: activeIndex === i ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activeIndex === i ? "#D4AF37" : "rgba(212,175,55,0.3)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>

        {/* Mini testimonial grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "64px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => goTo(i)}
              style={{
                background: activeIndex === i ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeIndex === i ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.1)"}`,
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.3s ease",
              }}
              aria-label={`View testimonial from ${t.name}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AF37, #FFD86B)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#000",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", color: "#fff" }}>
                    {t.name}
                  </p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "11px", color: "rgba(207,207,207,0.4)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
              <StarRating rating={t.rating} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

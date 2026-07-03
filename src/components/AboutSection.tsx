"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const counters = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Happy Clients" },
  { value: 6, suffix: "", label: "Core Services" },
];

const timeline = [
  { year: "2019", title: "Foundation", desc: "AZAD STUDIO was established with a vision to blend technology and artistry." },
  { year: "2020", title: "Growth", desc: "Expanded services to include ArtCAM design and 3D relief modeling." },
  { year: "2022", title: "Innovation", desc: "Introduced laser cutting design and event decoration solutions." },
  { year: "2024", title: "Excellence", desc: "Reached 500+ successful projects with 100% client satisfaction." },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function Counter({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "24px",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(212,175,55,0.12)",
        flex: "1",
        minWidth: "120px",
      }}
    >
      <div className="counter-value">
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "12px",
          letterSpacing: "0.1em",
          color: "rgba(207,207,207,0.6)",
          textTransform: "uppercase",
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setCountersStarted(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "linear-gradient(180deg, #050505 0%, #101010 50%, #050505 100%)" }}
      aria-label="About AZAD STUDIO"
    >
      <div className="container-custom">
        {/* Top grid: image + content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
            marginBottom: "100px",
          }}
        >
          {/* Image */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                aspectRatio: "4/5",
                maxWidth: "480px",
              }}
            >
              <Image
                src="/images/about-img.jpg"
                alt="CNC craftsmanship at AZAD STUDIO"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Gold overlay gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              {/* Corner accent */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "60px",
                  height: "60px",
                  borderTop: "2px solid rgba(212,175,55,0.7)",
                  borderLeft: "2px solid rgba(212,175,55,0.7)",
                  borderRadius: "4px 0 0 0",
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "60px",
                  height: "60px",
                  borderBottom: "2px solid rgba(212,175,55,0.7)",
                  borderRight: "2px solid rgba(212,175,55,0.7)",
                  borderRadius: "0 0 4px 0",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <div
              className="glass-card"
              style={{
                position: "absolute",
                bottom: "32px",
                left: "-24px",
                padding: "16px 24px",
                borderRadius: "12px",
                minWidth: "180px",
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#D4AF37" }}>
                5+
              </div>
              <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(207,207,207,0.7)", letterSpacing: "0.08em" }}>
                Years of Excellence
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}
          >
            <p className="section-label">About Us</p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "24px",
                letterSpacing: "-0.02em",
              }}
            >
              Crafting Digital{" "}
              <span className="gold-gradient">Masterpieces</span>
            </h2>
            <div className="gold-line" />
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "16px",
                color: "rgba(207,207,207,0.8)",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              AZAD STUDIO is a premium design studio specializing in CNC technology, 
              3D relief design, and creative digital solutions. Founded by Azad, we 
              combine technical precision with artistic vision to deliver extraordinary results.
            </p>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "16px",
                color: "rgba(207,207,207,0.65)",
                lineHeight: 1.8,
                marginBottom: "36px",
              }}
            >
              Every project is treated as a unique masterpiece — from grayscale height 
              maps and ArtCAM designs to event decoration and custom laser cutting. 
              We deliver excellence on every deadline.
            </p>

            {/* Values */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "36px",
              }}
            >
              {[
                { icon: "⚡", title: "Precision", desc: "Micron-level accuracy" },
                { icon: "🎨", title: "Creativity", desc: "Unique artistry" },
                { icon: "🏆", title: "Quality", desc: "Premium materials" },
                { icon: "⏱️", title: "Fast", desc: "On-time delivery" },
              ].map((v) => (
                <div
                  key={v.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "10px",
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.35)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.1)"; }}
                >
                  <span style={{ fontSize: "20px" }} aria-hidden="true">{v.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff" }}>{v.title}</div>
                    <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(207,207,207,0.55)" }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/918958902932"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: "none" }}
              >
                <span>Work With Us</span>
              </a>
              <button
                className="btn-outline"
                onClick={() =>
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Counters */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "100px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
          }}
        >
          {counters.map((c) => (
            <Counter key={c.label} {...c} start={countersStarted} />
          ))}
        </div>

        {/* Timeline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p className="section-label" style={{ justifyContent: "center" }}>Our Journey</p>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Growth Over The Years
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              position: "relative",
            }}
          >
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="glass-card"
                style={{
                  padding: "32px 24px",
                  position: "relative",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "42px",
                    fontWeight: 700,
                    color: "rgba(212,175,55,0.15)",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#D4AF37",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "14px",
                    color: "rgba(207,207,207,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

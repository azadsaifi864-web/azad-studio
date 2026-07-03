"use client";

import { useEffect, useRef, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<FormState>;

const services = [
  "CNC Grayscale Height Maps",
  "ArtCAM Design",
  "3D Relief Design",
  "Event Decoration",
  "Laser Cutting Design",
  "Custom Design",
  "Multiple Services",
];

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (data.phone && !/^[\d\s+\-()]{7,15}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  if (data.message.trim().length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
      style={{ background: "#050505" }}
      aria-label="Contact AZAD STUDIO"
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
            Get In Touch
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
            Start Your <span className="gold-gradient">Project</span>
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
            Ready to create something extraordinary? Reach out to us and let&apos;s bring your vision to life.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "32px",
              }}
            >
              Contact Information
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {/* WhatsApp */}
              <a
                href="https://wa.me/918958902932"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(37,211,102,0.06)",
                  border: "1px solid rgba(37,211,102,0.2)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,211,102,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,211,102,0.2)";
                }}
                aria-label="Contact on WhatsApp: +91 8958902932"
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(37,211,102,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(37,211,102,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                    WhatsApp
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", color: "#fff" }}>
                    +91 89589 02932
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918449818083"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.15)";
                }}
                aria-label="Call +91 8449818083"
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(212,175,55,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.1 6.1l1.27-.52a2 2 0 012.11.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(212,175,55,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Phone
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", color: "#fff" }}>
                    +91 84498 18083
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:azadsaifi864@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,175,55,0.04)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,175,55,0.15)";
                }}
                aria-label="Email azadsaifi864@gmail.com"
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(212,175,55,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(212,175,55,0.6)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Email
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", color: "#fff" }}>
                    azadsaifi864@gmail.com
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mr_azad_saif"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(225,48,108,0.05)",
                  border: "1px solid rgba(225,48,108,0.15)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(225,48,108,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(225,48,108,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(225,48,108,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(225,48,108,0.15)";
                }}
                aria-label="Follow on Instagram: @mr_azad_saif"
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(225,48,108,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E1306C" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "rgba(225,48,108,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Instagram
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "16px", color: "#fff" }}>
                    @mr_azad_saif
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <div
              className="glass-card"
              style={{ padding: "clamp(28px, 4vw, 44px)", borderRadius: "20px" }}
            >
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "28px",
                }}
              >
                Send a Message
              </h3>

              {status === "success" ? (
                <div
                  role="alert"
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    animation: "scaleIn 0.5s ease",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }} aria-hidden="true">✅</div>
                  <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "#D4AF37", marginBottom: "12px" }}>
                    Message Sent!
                  </h4>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "15px", color: "rgba(207,207,207,0.7)", lineHeight: 1.7 }}>
                    {statusMessage} We&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-outline"
                    style={{ marginTop: "24px" }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    {/* Name */}
                    <div style={{ gridColumn: "span 1" }}>
                      <label
                        htmlFor="contact-name"
                        style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(207,207,207,0.7)", marginBottom: "8px", fontWeight: 500 }}
                      >
                        Full Name <span aria-hidden="true" style={{ color: "#D4AF37" }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`form-input ${errors.name ? "error" : ""}`}
                        required
                        aria-required="true"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" role="alert" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(207,207,207,0.7)", marginBottom: "8px", fontWeight: 500 }}
                      >
                        Email <span aria-hidden="true" style={{ color: "#D4AF37" }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`form-input ${errors.email ? "error" : ""}`}
                        required
                        aria-required="true"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(207,207,207,0.7)", marginBottom: "8px", fontWeight: 500 }}
                      >
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={`form-input ${errors.phone ? "error" : ""}`}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(207,207,207,0.7)", marginBottom: "8px", fontWeight: 500 }}
                      >
                        Service Needed
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="form-input"
                        style={{ appearance: "none", cursor: "pointer" }}
                      >
                        <option value="" style={{ background: "#101010" }}>Select service</option>
                        {services.map((s) => (
                          <option key={s} value={s} style={{ background: "#101010" }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      htmlFor="contact-message"
                      style={{ display: "block", fontFamily: "'Manrope', sans-serif", fontSize: "13px", color: "rgba(207,207,207,0.7)", marginBottom: "8px", fontWeight: 500 }}
                    >
                      Message <span aria-hidden="true" style={{ color: "#D4AF37" }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={5}
                      className={`form-input ${errors.message ? "error" : ""}`}
                      style={{ resize: "vertical", minHeight: "120px" }}
                      required
                      aria-required="true"
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" style={{ fontFamily: "'Manrope', sans-serif", fontSize: "12px", color: "#ef4444", marginTop: "6px" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      style={{
                        padding: "12px 16px",
                        borderRadius: "8px",
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "14px",
                        color: "#ef4444",
                        marginBottom: "20px",
                      }}
                    >
                      {statusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}
                    aria-label="Send message"
                  >
                    {status === "loading" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ animation: "spin-slow 1s linear infinite" }}
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.2" />
                          <path d="M12 3a9 9 0 019 9" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    let destroyed = false;

    const initThree = async () => {
      const T = await import("three");
      if (destroyed || !canvas) return;

      const scene = new T.Scene();
      sceneRef.current = scene;

      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;

      const camera = new T.PerspectiveCamera(60, w / h, 0.1, 100);
      camera.position.set(0, 0, 6);

      renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      // Lights
      scene.add(new T.AmbientLight(0xffffff, 0.2));

      const goldLight = new T.PointLight(0xd4af37, 3, 20);
      goldLight.position.set(3, 3, 3);
      scene.add(goldLight);

      const goldLight2 = new T.PointLight(0xffd86b, 2, 20);
      goldLight2.position.set(-3, -2, 2);
      scene.add(goldLight2);

      const dirLight = new T.DirectionalLight(0xffffff, 0.5);
      dirLight.position.set(0, 5, 5);
      scene.add(dirLight);

      // Materials
      const goldMat = new T.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x3a2f00,
        emissiveIntensity: 0.2,
      });
      const darkMat = new T.MeshStandardMaterial({
        color: 0x8b7536,
        metalness: 0.95,
        roughness: 0.05,
        emissive: 0x1a1000,
        emissiveIntensity: 0.1,
      });
      const wireMat = new T.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });

      // Central torus knot
      const torusKnot = new T.Mesh(new T.TorusKnotGeometry(1.2, 0.35, 128, 16), goldMat);
      scene.add(torusKnot);

      // Wire shell
      const wireKnot = new T.Mesh(new T.TorusKnotGeometry(1.65, 0.02, 128, 8), wireMat);
      scene.add(wireKnot);

      // Floating small objects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const floaters: any[] = [];
      const floatPositions = [
        [-3.5, 1.5, -1], [3.5, -1.0, -1], [-2.0, -2.2, 0.5],
        [3.0, 2.0, -0.5], [-3.0, 0.0, 1.0], [2.5, -2.5, -1.5],
        [0.0, 3.0, -2.0], [-1.5, -3.0, 0.0], [4.0, 0.5, -0.5],
        [-4.0, -0.5, 0.5],
      ];
      floatPositions.forEach((pos, i) => {
        const s = 0.1 + (i % 3) * 0.08;
        const geo =
          i % 3 === 0
            ? new T.OctahedronGeometry(s)
            : i % 3 === 1
            ? new T.TetrahedronGeometry(s)
            : new T.IcosahedronGeometry(s, 0);
        const mesh = new T.Mesh(geo, i % 2 === 0 ? goldMat : darkMat);
        mesh.position.set(pos[0], pos[1], pos[2]);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        scene.add(mesh);
        floaters.push(mesh);
      });

      // Particles
      const pCount = 250;
      const pPositions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 14;
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      const pGeo = new T.BufferGeometry();
      pGeo.setAttribute("position", new T.BufferAttribute(pPositions, 3));
      const pMat = new T.PointsMaterial({
        color: 0xd4af37,
        size: 0.025,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      const particles = new T.Points(pGeo, pMat);
      scene.add(particles);

      // Mouse
      const onMouseMove = (e: MouseEvent) => {
        mouseRef.current = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: -(e.clientY / window.innerHeight - 0.5) * 2,
        };
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const onResize = () => {
        if (!canvas) return;
        const rw = canvas.clientWidth || window.innerWidth;
        const rh = canvas.clientHeight || window.innerHeight;
        camera.aspect = rw / rh;
        camera.updateProjectionMatrix();
        renderer.setSize(rw, rh);
      };
      window.addEventListener("resize", onResize, { passive: true });

      let t = 0;
      const animate = () => {
        if (destroyed) return;
        animFrameRef.current = requestAnimationFrame(animate);
        t += 0.005;

        torusKnot.rotation.x = t * 0.3;
        torusKnot.rotation.y = t * 0.5;
        wireKnot.rotation.x = t * 0.25;
        wireKnot.rotation.y = t * 0.42;

        floaters.forEach((m, i) => {
          m.rotation.x += 0.005 + i * 0.001;
          m.rotation.y += 0.007 + i * 0.0012;
          m.position.y += Math.sin(t * 0.8 + i) * 0.003;
        });

        particles.rotation.y = t * 0.05;
        particles.rotation.x = t * 0.02;

        camera.position.x += (mouseRef.current.x * 0.8 - camera.position.x) * 0.03;
        camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);

        goldLight.position.x = Math.sin(t) * 4;
        goldLight.position.y = Math.cos(t * 0.7) * 3;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        destroyed = true;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animFrameRef.current);
        renderer.dispose();
      };
    };

    const cleanupPromise = initThree();
    return () => {
      destroyed = true;
      cleanupPromise.then((fn) => fn && fn());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 50%, #0d0900 0%, #050505 70%)",
      }}
      aria-label="Hero section"
    >
      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.75) 100%)",
          zIndex: 2,
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "920px",
        }}
      >
        <p
          className="section-label"
          style={{ justifyContent: "center", animation: "fadeInUp 1s ease 0.2s both" }}
        >
          Where CNC Meets Creativity
        </p>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(48px, 9vw, 96px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            animation: "fadeInUp 1s ease 0.4s both",
          }}
        >
          <span style={{ color: "#fff" }}>AZAD</span>{" "}
          <span className="shimmer-text">STUDIO</span>
        </h1>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 400,
            color: "rgba(207,207,207,0.85)",
            lineHeight: 1.8,
            maxWidth: "600px",
            margin: "0 auto 40px",
            animation: "fadeInUp 1s ease 0.6s both",
          }}
        >
          Premium CNC design, ArtCAM expertise, 3D relief craftsmanship, and
          laser cutting — where technology meets artistry to create extraordinary
          pieces.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeInUp 1s ease 0.8s both",
          }}
        >
          <button
            className="btn-primary"
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Explore our services"
          >
            <span>Explore Services</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="btn-outline"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Get a quote"
          >
            Get Quote
          </button>
        </div>

        {/* Mini stats */}
        <div
          style={{
            display: "flex",
            gap: "clamp(20px, 5vw, 60px)",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "64px",
            animation: "fadeInUp 1s ease 1s both",
          }}
        >
          {[
            { value: "500+", label: "Projects" },
            { value: "5+", label: "Years" },
            { value: "100%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(22px, 4vw, 30px)",
                  fontWeight: 700,
                  color: "#D4AF37",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: "rgba(207,207,207,0.55)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
        aria-label="Scroll down indicator"
      >
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(212,175,55,0.55)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from "react";

const COLORS = {
  // TODO: Verificar colores exactos del brand en try.hallow.com
  navyDeep: "#1a1a2e",
  navy: "#16213e",
  navyMid: "#0f3460",
  gold: "#c9a84c",
  goldLight: "#e8c97a",
  goldLighter: "#f5e4a8",
  cream: "#faf6ef",
  creamDark: "#f0e8d8",
  white: "#ffffff",
  textDark: "#1a1a2e",
  textMid: "#4a4a6a",
  textLight: "#7a7a9a",
  accent: "#8b5cf6",
  accentLight: "#a78bfa",
  success: "#22c55e",
  overlay: "rgba(26,26,46,0.85)",
};

const CATEGORIES = [
  { id: 1, icon: "🙏", label: "Oración", color: "#c9a84c" },
  { id: 2, icon: "🧘", label: "Meditación", color: "#8b5cf6" },
  { id: 3, icon: "😴", label: "Sueño", color: "#1a6eb5" },
  { id: 4, icon: "📖", label: "Escritura", color: "#22c55e" },
  { id: 5, icon: "🎵", label: "Música", color: "#e85c5c" },
  { id: 6, icon: "✝️", label: "Rosario", color: "#e8a84c" },
];

const FEATURED_SESSIONS = [
  {
    id: 1,
    title: "Calma de Mañana",
    subtitle: "Empieza tu día con paz",
    duration: "10 min",
    category: "Meditación",
    instructor: "Padre Mike Schmitz",
    // TODO: Reemplazar con imagen real de sesión
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "Oración del Rosario",
    subtitle: "Misterios Gozosos",
    duration: "20 min",
    category: "Rosario",
    instructor: "Padre Mike Schmitz",
    // TODO: Reemplazar con imagen real de sesión
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80",
    color: "#c9a84c",
  },
  {
    id: 3,
    title: "Sueño Profundo",
    subtitle: "Descansa en la gracia",
    duration: "30 min",
    category: "Sueño",
    instructor: "Jonathan Roumie",
    // TODO: Reemplazar con imagen real de sesión
    image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=400&q=80",
    color: "#1a6eb5",
  },
  {
    id: 4,
    title: "Lectio Divina",
    subtitle: "Meditación con las Escrituras",
    duration: "15 min",
    category: "Escritura",
    instructor: "Sister Miriam James",
    // TODO: Reemplazar con imagen real de sesión
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    color: "#22c55e",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "María García",
    role: "Madre y profesora",
    text: "Hallow ha transformado completamente mi vida espiritual. Encuentro paz cada mañana antes de que empiecen las locuras del día.",
    stars: 5,
    // TODO: Reemplazar con foto real de usuario
    avatar: "https://i.pravatar.cc/60?img=47",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Estudiante universitario",
    text: "Como católico joven, esta app me ha ayudado a mantener mi fe viva. Las meditaciones guiadas son increíbles.",
    stars: 5,
    avatar: "https://i.pravatar.cc/60?img=33",
  },
  {
    id: 3,
    name: "Ana López",
    role: "Empresaria",
    text: "En medio de mi vida agitada, Hallow me da ese momento de quietud con Dios que necesito cada día.",
    stars: 5,
    avatar: "https://i.pravatar.cc/60?img=48",
  },
  {
    id: 4,
    name: "Pedro Martínez",
    role: "Padre de familia",
    text: "Rezamos en familia con la app. Los niños aman las historias bíblicas y yo disfruto los exámenes de conciencia.",
    stars: 5,
    avatar: "https://i.pravatar.cc/60?img=12",
  },
];

const PLANS = [
  {
    id: "monthly",
    name: "Mensual",
    price: "12.99",
    period: "mes",
    // TODO: Confirmar precios reales en sitio oficial
    description: "Acceso completo mensual",
    popular: false,
  },
  {
    id: "annual",
    name: "Anual",
    price: "8.99",
    period: "mes",
    total: "107.99/año",
    description: "¡Ahorra un 30%!",
    popular: true,
  },
  {
    id: "lifetime",
    name: "De por vida",
    price: "149.99",
    period: "pago único",
    description: "Acceso permanente",
    popular: false,
  },
];

const STATS = [
  { value: "+10M", label: "Usuarios" },
  { value: "+500K", label: "Reseñas 5★" },
  { value: "+10K", label: "Meditaciones" },
  { value: "#1", label: "App Católica" },
];

function StarRating({ count = 5 }) {
  return (
    <span style={{ color: COLORS.gold, fontSize: "14px", letterSpacing: "2px" }}>
      {"★".repeat(count)}
    </span>
  );
}

function useScrollAnimation() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, style = {} }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Nav({ currentSection, setCurrentSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "explorar", label: "Explorar" },
    { id: "planes", label: "Planes" },
    { id: "testimonios", label: "Testimonios" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(26,26,46,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        onClick={() => setCurrentSection("inicio")}
      >
        {/* TODO: Reemplazar con logo SVG oficial de Hallow */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          ✝
        </div>
        <span
          style={{
            color: COLORS.white,
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "1px",
            fontFamily: "Georgia, serif",
          }}
        >
          Hallow
        </span>
      </div>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "center",
          "@media(max-width:768px)": { display: "none" },
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setCurrentSection(link.id)}
            style={{
              background: "none",
              border: "none",
              color: currentSection === link.id ? COLORS.goldLight : "rgba(255,255,255,0.8)",
              fontSize: "15px",
              fontWeight: currentSection === link.id ? "600" : "400",
              cursor: "pointer",
              padding: "4px 0",
              borderBottom: currentSection === link.id ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              transition: "all 0.2s ease",
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => setCurrentSection("planes")}
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            color: COLORS.navyDeep,
            border: "none",
            borderRadius: "24px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            boxShadow: "0 4px 15px rgba(201,168,76,0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(201,168,76,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(201,168,76,0.4)";
          }}
        >
          Comenzar gratis
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: COLORS.white,
          fontSize: "24px",
          cursor: "pointer",
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            background: "rgba(26,26,46,0.98)",
            backdropFilter: "blur(16px)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            borderBottom: `1px solid rgba(201,168,76,0.2)`,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setCurrentSection(link.id); setMenuOpen(false); }}
              style={{
                background: "none",
                border: "none",
                color: COLORS.white,
                fontSize: "18px",
                textAlign: "left",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setCurrentSection("planes"); setMenuOpen(false); }}
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
              color: COLORS.navyDeep,
              border: "none",
              borderRadius: "24px",
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Comenzar gratis
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroSection({ setCurrentSection }) {
  const [currentBg, setCurrentBg] = useState(0);
  // TODO: Reemplazar con imágenes de fondo reales del sitio
  const backgrounds = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80",
    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=1600&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background images with crossfade */}
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === currentBg ? 1 : 0,
            transition: "opacity 1.5s ease",
            zIndex: 0,
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.85) 60%, rgba(26,26,46,1) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Stars effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          zIndex: 1,
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "120px 24px 80px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(201,168,76,0.15)",
            border: `1px solid rgba(201,168,76,0.4)`,
            borderRadius: "24px",
            padding: "8px 18px",
            marginBottom: "32px",
          }}
        >
          <span style={{ color: COLORS.gold, fontSize: "13px", fontWeight: "600" }}>
            ⭐ App #1 de meditación católica
          </span>
        </div>

        <h1
          style={{
            color: COLORS.white,
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: "800",
            lineHeight: "1.15",
            marginBottom: "24px",
            fontFamily: "Georgia, serif",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          Ora. Medita.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Descansa en Dios.
          </span>
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: "1.7",
            marginBottom: "40px",
            maxWidth: "580px",
            margin: "0 auto 40px",
          }}
        >
          Únete a más de 10 millones de personas que profundizan su fe con
          meditaciones guiadas, oraciones y música cristiana. Gratis por 30 días.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          <button
            onClick={() => setCurrentSection("planes")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
              color: COLORS.navyDeep,
              border: "none",
              borderRadius: "32px",
              padding: "16px 36px",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(201,168,76,0.5)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-3px) scale(1.02)";
              e.target.style.boxShadow = "0 16px 40px rgba(201,168,76,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 8px 30px rgba(201,168,76,0.5)";
            }}
          >
            Comenzar gratis 30 días
          </button>
          <button
            onClick={() => setCurrentSection("explorar")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: COLORS.white,
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "32px",
              padding: "16px 36px",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Ver contenido →
          </button>
        </div>

        {/* Store badges */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          {/* TODO: Reemplazar con badges reales de App Store y Google Play */}
          {["App Store", "Google Play"].map((store) => (
            <div
              key={store}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "10px 20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <span style={{ fontSize: "22px" }}>{store === "App Store" ? "🍎" : "📱"}</span>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px" }}>
                  Disponible en
                </div>
                <div style={{ color: COLORS.white, fontSize: "14px", fontWeight: "600" }}>
                  {store}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "clamp(16px, 4vw, 48px)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  color: COLORS.goldLight,
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: "800",
                  fontFamily: "Georgia, serif",
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          animation: "bounce 2s infinite",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "24px" }}>↓</div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section
      style={{
        background: COLORS.cream,
        padding: "80px 24px",
      }}
    >
      <AnimatedSection>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: COLORS.gold,
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Contenido espiritual
            </span>
            <h2
              style={{
                color: COLORS.navyDeep,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "800",
                fontFamily: "Georgia, serif",
                marginTop: "12px",
                marginBottom: "16px",
              }}
            >
              Todo lo que necesitas para tu fe
            </h2>
            <p
              style={{
                color: COLORS.textMid,
                fontSize: "17px",
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Más de 10,000 sesiones de audio guiadas por sacerdotes, religiosas
              y líderes espirituales de todo el mundo.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "20px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: COLORS.white,
                  borderRadius: "20px",
                  padding: "32px 24px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.12)`;
                  e.currentTarget.style.borderColor = cat.color + "44";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: cat.color + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    margin: "0 auto 16px",
                  }}
                >
                  {cat.icon}
                </div>
                <div
                  style={{
                    color: COLORS.navyDeep,
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                >
                  {cat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function FeaturedSection({ setCurrentSection }) {
  const [playing, setPlaying] = useState(null);

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, ${COLORS.navy} 100%)`,
        padding: "80px 24px",
      }}
    >
      <AnimatedSection>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: COLORS.gold,
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Sesiones destacadas
            </span>
            <h2
              style={{
                color: COLORS.white,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "800",
                fontFamily: "Georgia, serif",
                marginTop: "12px",
              }}
            >
              Comienza tu viaje espiritual
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {FEATURED_SESSIONS.map((session) => (
              <div
                key={session.id}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => setPlaying(session.id === playing ? null : session.id)}
              >
                {/* Image */}
                <div
                  style={{
                    height: "160px",
                    backgroundImage: `url(${session.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to top, rgba(26,26,46,0.9), rgba(26,26,46,0.2))`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: session.color,
                      color: COLORS.white,
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "4px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {session.category}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: playing === session.id
                        ? "rgba(201,168,76,0.9)"
                        : "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {playing === session.id ? "⏸" : "▶"}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      color: COLORS.white,
                      fontSize: "16px",
                      fontWeight: "700",
                      marginBottom: "6px",
                    }}
                  >
                    {session.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "13px",
                      marginBottom: "12px",
                    }}
                  >
                    {session.subtitle}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: COLORS.gold, fontSize: "12px" }}>
                      {session.instructor}
                    </span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        background: "rgba(255,255,255,0.08)",
                        padding: "4px 10px",
                        borderRadius: "12px",
                      }}
                    >
                      ⏱ {session.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={() => setCurrentSection("explorar")}
              style={{
                background: "transparent",
                color: COLORS.goldLight,
                border: `1px solid ${COLORS.gold}`,
                borderRadius: "32px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = COLORS.gold;
                e.target.style.color = COLORS.navyDeep;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = COLORS.goldLight;
              }}
            >
              Ver todo el contenido →
            </button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        background: COLORS.creamDark,
        padding: "80px 24px",
      }}
    >
      <AnimatedSection>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: COLORS.gold,
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Comunidad
            </span>
            <h2
              style={{
                color: COLORS.navyDeep,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "800",
                fontFamily: "Georgia, serif",
                marginTop: "12px",
              }}
            >
              Lo que dicen nuestros usuarios
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "4px",
                marginTop: "12px",
              }}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: COLORS.gold, fontSize: "20px" }}>
                  ★
                </span>
              ))}
              <span
                style={{
                  color: COLORS.textMid,
                  marginLeft: "8px",
                  fontSize: "15px",
                  alignSelf: "center",
                }}
              >
                4.9 de 5 (más de 500K reseñas)
              </span>
            </div>
          </div>

          {/* Featured testimonial */}
          <div
            style={{
              background: COLORS.white,
              borderRadius: "24px",
              padding: "40px",
              marginBottom: "32px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
              border: `1px solid rgba(201,168,76,0.15)`,
              transition: "all 0.5s ease",
              minHeight: "180px",
            }}
          >
            <StarRating count={TESTIMONIALS[active].stars} />
            <p
              style={{
                color: COLORS.textDark,
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: "1.7",
                fontStyle: "italic",
                margin: "16px 0 24px",
                fontFamily: "Georgia, serif",
              }}
            >
              "{TESTIMONIALS[active].text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].name}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <div
                  style={{
                    color: COLORS.navyDeep,
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {TESTIMONIALS[active].name}
                </div>
                <div style={{ color: COLORS.textLight, fontSize: "13px" }}>
                  {TESTIMONIALS[active].role}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background: i === active ? COLORS.gold : "rgba(0,0,0,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function PlansSection() {
  const [selected, setSelected] = useState("annual");
  const [hovered, setHovered] = useState(null);

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${COLORS.navyDeep} 0%, #0d1b35 100%)`,
        padding: "80px 24px",
      }}
    >
      <AnimatedSection>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                color: COLORS.gold,
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Precios
            </span>
            <h2
              style={{
                color: COLORS.white,
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: "800",
                fontFamily: "Georgia, serif",
                marginTop: "12px",
                marginBottom: "16px",
              }}
            >
              Elige tu plan
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "17px",
              }}
            >
              Prueba gratis durante 30 días. Cancela cuando quieras.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  padding: plan.popular ? "32px 28px 28px" : "28px",
                  cursor: "pointer",
                  border: selected === plan.id
                    ? `2px solid ${COLORS.gold}`
                    : "2px solid rgba(255,255,255,0.1)",
                  background: selected === plan.id
                    ? "rgba(201,168,76,0.1)"
                    : hovered === plan.id
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(255,255,255,0.04)",
                  transition: "all 0.3s ease",
                  transform: hovered === plan.id ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                      color: COLORS.navyDeep,
                      fontSize: "12px",
                      fontWeight: "800",
                      padding: "4px 16px",
                      borderRadius: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ⭐ MÁS POPULAR
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: COLORS.white,
                        fontSize: "18px",
                        fontWeight: "700",
                        marginBottom: "4px",
                      }}
                    >
                      {plan.name}
                    </div>
                    <div
                      style={{
                        color: COLORS.gold,
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {plan.description}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: selected === plan.id
                        ? `2px solid ${COLORS.gold}`
                        : "2px solid rgba(255,255,255,0.3)",
                      background: selected === plan.id ? COLORS.gold : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {selected === plan.id && (
                      <span style={{ color: COLORS.navyDeep, fontSize: "12px", fontWeight: "700" }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      color: COLORS.white,
                      fontSize: "42px",
                      fontWeight: "800",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    ${plan.price}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                    /{plan.period}
                  </span>
                </div>

                {plan.total && (
                  <div style={{ color: COLORS.goldLight, fontSize: "13px" }}>
                    {plan.total}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Features list */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px",
              padding: "28px",
              marginBottom: "32px",
            }}
          >
            <div style={{ color: COLORS.white, fontWeight: "700", marginBottom: "16px", fontSize: "16px" }}>
              Incluye todo:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
              }}
            >
              {[
                "✓  +10,000 sesiones de audio",
                "✓  Meditaciones guiadas",
                "✓  Oraciones diarias",
                "✓  Historias para dormir",
                "✓  Música cristiana",
                "✓  Examen de conciencia",
                "✓  Novenas y rosarios",
                "✓  Modo offline",
                "✓  Sin anuncios",
                // TODO: Actualizar con features reales del plan
              ].map((feature) => (
                <div
                  key={feature}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                color: COLORS.navyDeep,
                border: "none",
                borderRadius: "32px",
                padding: "18px 48px",
                fontSize: "18px",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: "0 8px 30px rgba(201,168,76,0.5)",
                transition: "all 0.3s ease",
                width: "100%",
                maxWidth: "360px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 16px 40px rgba(201,168,76,0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 30px rgba(201,168,76,0.5)";
              }}
              // TODO: Conectar con sistema de pagos real (Stripe / RevenueCat)
            >
              Comenzar 30 días gratis
            </button>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "12px" }}>
              Sin necesidad de tarjeta de crédito para comenzar
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

function ExploreSection() {
  const [filter, setFilter] = useState("Todos");
  const filters = ["Todos", ...CATEGORIES.map((c) => c.label)];
  const allSessions = [
    ...FEATURED_SESSIONS,
    {
      id: 5,
      title: "Examen de Conciencia",
      subtitle: "Reflexión nocturna",
      duration: "12 min",
      category: "Oración",
      instructor: "Padre Mike Schmitz",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80",
      color: "#c9a84c",
    },
    {
      id: 6,
      title: "Salmo 23",
      subtitle: "El Señor es mi pastor",
      duration: "8 min",
      category: "Escritura",
      instructor: "Bishop Robert Barron",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&q=80",
      color: "#22c55e",
    },
    {
      id: 7,
      title: "Novena a la Divina Misericordia",
      subtitle: "9 días de gracia",
      duration: "15 min",
      category: "Oración",
      instructor: "Padre Mike Schmitz",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80",
      color: "#c9a84c",
    },
    {
      id: 8,
      title: "Música de Adoración",
      subtitle: "Para tu oración personal",
      duration: "45 min",
      category: "Música",
      instructor: "Hallow Music",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80",
      color: "#e85c5c",
    },
  ];

  const filtered =
    filter === "Todos"
      ? allSessions
      : allSessions.filter((s) => s.category === filter);

  return (
    <section
      style={{
        background: COLORS.cream,
        padding: "80px 24px",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              color: COLORS.gold,
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Biblioteca
          </span>
          <h2
            style={{
              color: COLORS.navyDeep,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: "800",
              fontFamily: "Georgia, serif",
              marginTop: "12px",
            }}
          >
            Explora todo el contenido
          </h2>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "36px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f
                  ? `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`
                  : "rgba(26,26,46,0.06)",
                color: filter === f ? COLORS.navyDeep : COLORS.textMid,
                border: "none",
                borderRadius: "24px",
                padding: "8px 18px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((session) => (
            <div
              key={session.id}
              style={{
                background: COLORS.white,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  height: "160px",
                  backgroundImage: `url(${session.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: session.color,
                    color: COLORS.white,
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "12px",
                  }}
                >
                  {session.category}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "rgba(255,255,255,0.9)",
                    color: COLORS.navyDeep,
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "12px",
                  }}
                >
                  ⏱ {session.duration}
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    color: COLORS.navyDeep,
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "6px",
                  }}
                >
                  {session.title}
                </div>
                <div style={{ color: COLORS.textLight, fontSize: "13px", marginBottom: "12px" }}>
                  {session.subtitle}
                </div>
                <div style={{ color: COLORS.gold, fontSize: "12px", fontWeight: "600" }}>
                  🎙 {session.instructor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ setCurrentSection }) {
  return (
    <footer
      style={{
        background: COLORS.navyDeep,
        borderTop: `1px solid rgba(201,168,76,0.15)`,
        padding: "60px 24px 40px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                ✝
              </div>
              <span
                style={{
                  color: COLORS.white,
                  fontSize: "22px",
                  fontWeight: "700",
                  fontFamily: "Georgia, serif",
                }}
              >
                Hallow
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.6" }}>
              La app #1 de oración y meditación católica. Crecer en fe juntos.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Producto",
              links: ["Características", "Precios", "Para empresas", "Para parroquias"],
            },
            {
              title: "Recursos",
              links: ["Blog", "Retiros", "Podcast", "Testimonios"],
            },
            {
              title: "Empresa",
              links: ["Sobre nosotros", "Equipo", "Prensa", "Contacto"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  color: COLORS.gold,
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </div>
              {col.links.map((link) => (
                <div
                  key={link}
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "14px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.color = COLORS.goldLight; }}
                  onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.55)"; }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>
            © 2024 Hallow, Inc. Todos los derechos reservados.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacidad", "Términos", "Accesibilidad"].map((item) => (
              <span
                key={item}
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.target.style.color = COLORS.goldLight; }}
                onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.35)"; }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentSection, setCurrentSection] = useState("inicio");

  const scrollToSection = (section) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", margin: 0, padding: 0 }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; border-radius: 3px; }
      `}</style>

      <Nav currentSection={currentSection} setCurrentSection={scrollToSection} />

      {currentSection === "inicio" && (
        <>
          <HeroSection setCurrentSection={scrollToSection} />
          <CategoriesSection />
          <FeaturedSection setCurrentSection={scrollToSection} />
          <TestimonialsSection />
          <PlansSection />
        </>
      )}

      {currentSection === "explorar" && (
        <>
          <div style={{ paddingTop: "68px" }}>
            <ExploreSection />
          </div>
        </>
      )}

      {currentSection === "planes" && (
        <div style={{ paddingTop: "68px", background: COLORS.navyDeep, minHeight: "100vh" }}>
          <PlansSection />
        </div>
      )}

      {currentSection === "testimonios" && (
        <div style={{ paddingTop: "68px" }}>
          <TestimonialsSection />
        </div>
      )}

      <Footer setCurrentSection={scrollToSection} />
    </div>
  );
}
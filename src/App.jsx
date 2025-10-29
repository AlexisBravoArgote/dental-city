﻿import React, { useEffect,useMemo,useRef,useState,useCallback,useId,} from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

// Assets (ajusta si tus nombres cambian)
import alineadores from "./assets/alineadores.avif";
import transparentes from "./assets/transparentes2.jpg";
import seguimiento2 from "./assets/seguimiento2.jpg";
import ubicacion from "./assets/ubicacion.webp";
import unidades from "./assets/unidades.png";
import recepcion from "./assets/recepcion.webp";
import fotos from "./assets/fotos.webp";
import primera from "./assets/primera.webp";
import segunda from "./assets/segunda.webp";
import tercera from "./assets/tercera.webp";
import cuarta from "./assets/cuarta.webp";
import arquitectura from "./assets/arquitectura.png";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
// Rutas estáticas
import Privacidad from "./pages/Privacidad.jsx";
import Terminos from "./pages/Terminos.jsx";
import Bolsa from "./pages/bolsa.jsx"
import Doctores from "./pages/doctores.jsx"
import Blog from "./pages/blog.jsx"
import BlogPost10 from "./pages/blog/10.jsx";
import BlogPost11 from "./pages/blog/11.jsx";
import BlogPost5 from "./pages/blog/5.jsx";
import BlogPost2 from "./pages/blog/2.jsx"
import BlogPost1 from "./pages/blog/1.jsx"
import BlogPost3 from "./pages/blog/3.jsx"
import BlogPost4 from "./pages/blog/4.jsx"
import BlogPost6 from "./pages/blog/6.jsx"
import BlogPost7 from "./pages/blog/7.jsx"
import BlogPost8 from "./pages/blog/8.jsx"
import BlogPost9 from "./pages/blog/9.jsx"
import Edu from "./pages/edu.jsx"
// =========================
// Config rápida
// =========================
const WHATSAPP_NUMBER = "523333087833"; // 52 + 10 dígitos (sin “1”)
const WA_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
       "Hola 👋 me gustaría agendar una cita en Dental City."
)}`;
// WhatsApp de ICTY Kids (no uses el '+', ni espacios)
// WhatsApp ICTY Kids
const WA_KIDS = "https://wa.me/523319699222"; // +52 33 1969 9222

// Helper CORREGIDO para armar el enlace con el mensaje
const getWaUrl = (key, title) => {
    const base = (key === "ortopedia" || key === "limpieza-ninos") ? WA_KIDS : WA_URL;

    const msg = `Hola 👋 me gustaría agendar una cita en Dental City para ${title}.`;

    // Si el base YA trae "?" (por ejemplo, api.whatsapp.com/send?phone=...),
    // concatenamos con "&text="; de lo contrario, con "?text="
    const sep = base.includes("?") ? "&" : "?";

    return `${base}${sep}text=${encodeURIComponent(msg)}`;
};


// útil para componentes que lo leen de window
if (typeof window !== "undefined") window.WA_URL = WA_URL;

// Navega a #ubicacion y activa pestaña
function navigateToLocation(tabKey) {
    try {
        sessionStorage.setItem("initialTab", tabKey);
    } catch (err) {
        void err;
    }
    const el = document.querySelector("#ubicacion");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.hash !== "#ubicacion") location.hash = "#ubicacion";
    setTimeout(() => {
        window.dispatchEvent(
            new CustomEvent("select-location-tab", { detail: tabKey })
        );
    }, 0);
}

// =========================
// Helpers / Layout
// =========================
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// =========================
// Páginas (Rutas)
// =========================
function Home() { 
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <div className="min-h-screen w-full bg-[#0b1b2b] text-white">
      <TopBar bgOpacity={bgOpacity} />

      {/* Secciones */}
      <Hero />
      <About />
      <Services />
      <GalleryCarousel />
      <InvisalignInteractive />
      <LocationsTabs />
      <FAQ />

      <Footer />
      <FloatingCta />
      <FloatingBackToTop />
      <DevTests />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terminos" element={<Terminos />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/bolsa" element={<Bolsa />} />
          <Route path="/doctores" element={<Doctores />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/10" element={<BlogPost10 />} />
          <Route path="/blog/11" element={<BlogPost11 />} />
          <Route path="/blog/5" element={<BlogPost5 />} />
          <Route path="/blog/1" element={<BlogPost1 />} />
          <Route path="/blog/2" element={<BlogPost2 />} />
          <Route path="/blog/3" element={<BlogPost3 />} />
          <Route path="/blog/4" element={<BlogPost4 />} />
          <Route path="/blog/6" element={<BlogPost6 />} />
          <Route path="/blog/7" element={<BlogPost7 />} />
          <Route path="/blog/8" element={<BlogPost8 />} />
          <Route path="/blog/9" element={<BlogPost9 />} />
          <Route path="/edu" element={<Edu />} />
    </Routes>
  );
}


// =========================
// Secciones y componentes
// =========================

function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const [openHeroCta, setOpenHeroCta] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenHeroCta(false);
            }
        };
        if (openHeroCta) document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [openHeroCta]);

    return (
        <section ref={ref} className="relative isolate overflow-hidden">
            {/* Fondo */}
            <div
                className="absolute inset-0 -z-10 bg-cover bg-center transition-all duration-[2500ms] ease-out"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1588771930290-0ef1e631679f?q=80&w=1920&auto=format&fit=crop')",
                    filter: "brightness(0.45)",
                    transform: "scale(1.05)",
                }}
            />
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1b2b]/70 via-[#0b1b2b]/30 to-transparent opacity-60"
            />
            <motion.div
                style={{ y }}
                className="pointer-events-none absolute inset-0 -z-10 opacity-25"
            >
                <Noise />
            </motion.div>

            {/* Backdrop menú */}
            <AnimatePresence>
                {openHeroCta && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 0.4, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="fixed inset-0 z-10 bg-black/60"
                    />
                )}
            </AnimatePresence>

            <Container className="flex min-h-[78vh] flex-col items-center justify-center py-20 text-center relative z-20">
                <motion.h1
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-[42px] md:text-6xl font-light tracking-wide leading-[1.15] md:leading-[1.1] pb-[2px]"
                >
                    <span className="golden-sweep">Elegancia que se nota al sonreír</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 18, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85"
                >
                    Odontología digital de vanguardia, donde la precisión se une al
                    confort y la atención personalizada.
                </motion.p>

                {/* Botones */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <div className="relative" ref={menuRef}>
                        <motion.button
                            onClick={() => setOpenHeroCta((v) => !v)}
                            className={`flex items-center gap-2 rounded-full px-7 py-3 font-medium shadow-lg transition active:scale-[0.97] ${openHeroCta
                                ? "bg-gradient-to-r from-[#e8c3a2] to-[#d8a07b] text-[#0b1b2b]"
                                : "bg-[#d8a07b] text-[#0b1b2b] hover:brightness-105"
                                }`}
                            aria-haspopup="menu"
                            aria-expanded={openHeroCta}
                            animate={{
                                filter: openHeroCta
                                    ? "drop-shadow(0 0 14px rgba(228,184,146,0.7))"
                                    : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            Agendar cita
                            <motion.svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                                animate={{ rotate: openHeroCta ? 180 : 0, y: openHeroCta ? 2 : 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            >
                                <path d="M6 9l6 6 6-6" />
                            </motion.svg>
                        </motion.button>

                        <AnimatePresence>
                            {openHeroCta && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute left-1/2 top-[110%] w-[280px] -translate-x-1/2 rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-lg z-20"
                                    role="menu"
                                >
                                    <button
                                        onClick={() => {
                                            navigateToLocation("Dental City");
                                            setOpenHeroCta(false);
                                        }}
                                        className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                                        role="menuitem"
                                    >
                                        <span>Dental City</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigateToLocation("Dental City Kids & Family");
                                            setOpenHeroCta(false);
                                        }}
                                        className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                                        role="menuitem"
                                    >
                                        <span>Dental City Kids & Family</span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <a
                        href="#servicios"
                        className="rounded-full border border-white/25 bg-white/5 px-7 py-3 text-white/90 backdrop-blur-md transition hover:bg-white/15"
                    >
                        Ver tratamientos
                    </a>
                </div>
            </Container>

            <style>{`
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 25%,#f4d3b3 50%,#e4b892 75%,#c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: goldSweep 3.5s ease-in-out infinite;
        }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </section>
    );
}

function Noise() {
    return (
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="2"
                    stitchTiles="stitch"
                />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity=".15" />
        </svg>
    );
}

function SectionHeading({ overline, title, subtitle }) {
    return (
        <div className="text-center">
            {overline && (
                <div className="text-xs tracking-[0.35em] text-white/50">{overline}</div>
            )}
            <h2 className="mt-3 text-3xl font-semibold text-[#d8a07b] md:text-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mx-auto mt-3 max-w-2xl text-white/75">{subtitle}</p>
            )}
        </div>
    );
}

function Chip({ children }) {
    const id = useId();
    return (
        <span className="relative inline-flex h-11 w-full items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 44" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                    <linearGradient id={`grad-${id}-bg`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#c89b7b" />
                        <stop offset="50%" stopColor="#e4b892" />
                        <stop offset="100%" stopColor="#c89b7b" />
                    </linearGradient>
                </defs>
                <rect
                    x="1" y="1"
                    width="calc(100% - 2px)" height="calc(100% - 2px)"
                    rx="12" ry="12"
                    fill="none" stroke={`url(#grad-${id}-bg)`} strokeWidth="2"
                    vectorEffect="non-scaling-stroke" pathLength="520" strokeDasharray="85 435"
                    className="chipStroke"
                />
            </svg>

            <span className="relative z-10 inline-flex h-11 w-full items-center justify-center rounded-[12px] bg-white/8 px-5 text-[14px] text-white/85 ring-1 ring-white/10 backdrop-blur">
                {children}
            </span>

            <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{ clipPath: "inset(calc(100% - 4px) 0 0 0)", WebkitClipPath: "inset(calc(100% - 4px) 0 0 0)" }}
            >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 220 44" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id={`grad-${id}-fg`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#c89b7b" />
                            <stop offset="50%" stopColor="#e4b892" />
                            <stop offset="100%" stopColor="#c89b7b" />
                        </linearGradient>
                    </defs>
                    <rect
                        x="1" y="1"
                        width="calc(100% - 2px)" height="calc(100% - 2px)"
                        rx="12" ry="12"
                        fill="none" stroke={`url(#grad-${id}-fg)`} strokeWidth="2"
                        vectorEffect="non-scaling-stroke" pathLength="520" strokeDasharray="85 435"
                        className="chipStroke"
                    />
                </svg>
            </div>

            <style>{`
        .chipStroke { animation: chipDash 6s linear infinite; }
        @keyframes chipDash { 0% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -520; } }
      `}</style>
        </span>
    );
}

function ImageCard({ src, alt, label }) {
    return (
        <figure className="group relative aspect-square overflow-hidden rounded-2xl">
            <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
            {label && (
                <figcaption className="pointer-events-none absolute left-2 top-2 rounded-full bg-black/40 px-2 py-1 text-xs text-white/90 backdrop-blur-sm">
                    {label}
                </figcaption>
            )}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-70"
                style={{ boxShadow: "inset 0 0 60px rgba(228,184,146,.12)" }}
            />
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-y-2 -left-1/3 h-[140%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[#e4b89266] to-transparent animate-[sweep_1.6s_ease-out_infinite]" />
            </div>
            <style>{`
        @keyframes sweep { 0% { transform: translateX(-120%); opacity: .0; } 45% { opacity: .55; } 100% { transform: translateX(220%); opacity: 0; } }
      `}</style>
        </figure>
    );
}

function About() {
    const IMAGES = [
        { src: primera, alt: "Todas las especialidades" },
        { src: segunda, alt: "Ortodoncia" },
        { src: tercera, alt: "Odontología estética" },
        { src: cuarta, alt: "Escaneo digital" },
    ];

    return (
        <section id="about" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">NOSOTROS</div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">Cuidado dental con diseño</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white/75">
                        Desde 1999, unimos tecnología y calidad para que tu sonrisa se vea y se sienta mejor.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                        <div className="pointer-events-none absolute -inset-px rounded-3xl bg-[radial-gradient(120%_120%_at_10%_0%,rgba(228,184,146,.18),transparent)]" />
                        <p className="text-[15px] leading-7 text-white/85 text-justify">
                            Clínica integral con <span className="text-white font-semibold">todas las especialidades dentales</span>. Somos clínica diamante <span className="text-white font-semibold">Invisalign</span> con laboratorio propio para crear <span className="text-white font-semibold">diseños digitales de sonrisa</span> precisos, naturales y personalizados.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Chip>Diagnóstico 3D</Chip>
                            <Chip>Laboratorio propio</Chip>
                            <Chip>Ortodoncia invisible</Chip>
                            <Chip>Odontología estética</Chip>
                        </div>
                        <div className="my-6 h-[2px] w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full w-full animate-[shine_3.6s_linear_infinite] bg-gradient-to-r from-transparent via-[#e4b892] to-transparent" />
                        </div>
                        <div className="relative mt-4">
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg" />
                            <img
                                src={arquitectura}
                                alt="Arquitectura de Dental City"
                                className="relative mx-auto block h-40 w-full max-w-[720px] object-contain md:h-48"
                                loading="lazy"
                            />
                            <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                        <div className="grid grid-cols-2 gap-4 md:gap-5">
                            {IMAGES.map((img, i) => (
                                <ImageCard key={i} src={img.src} alt={img.alt} label={img.alt} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @keyframes shine { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}



function Services() {
    const all = useMemo(
        () => [
            { key: "implantes", title: "Implantes", desc: "Reposición fija y estética de piezas ausentes." },
            { key: "limpieza", title: "Limpieza dental", desc: "Profilaxis profesional para mantener encías y dientes sanos." },
            { key: "coronas", title: "Coronas dentales", desc: "Rehabilitación resistente y natural de dientes dañados." },
            { key: "resinas", title: "Resinas dentales", desc: "Restauraciones estéticas y conservadoras del color del diente." },
            { key: "maxilofacial", title: "Cirugía Maxilofacial", desc: "Procedimientos quirúrgicos especializados de alta precisión." },
            { key: "endodoncia", title: "Endodoncia", desc: "Tratamiento de conductos para conservar piezas naturales." },
            { key: "periodoncia", title: "Periodoncia", desc: "Cuidado integral de encías y soporte óseo." },
            { key: "guarda-oclusal", title: "Guarda oclusal", desc: "Protección contra bruxismo y alivio de sobrecarga." },
            { key: "puentes", title: "Rehabilitacion oral", desc: "Soluciones fijas para reemplazo de uno o más dientes." },
            { key: "alineadores", title: "Alineadores", desc: "Ortodoncia removible y discreta para alinear tu sonrisa." },
            { key: "invisalign", title: "Invisalign", desc: "Alineadores invisibles con planeación digital." },
            { key: "brackets", title: "Brackets", desc: "Ortodoncia fija para corrección de mordida y alineación." },
            { key: "blanqueamientos", title: "Blanqueamientos", desc: "Aclarado seguro y efectivo del tono dental." },
            { key: "carillas", title: "Carillas", desc: "Láminas estéticas para forma y color perfectos." },
            { key: "limpieza-ninos", title: "Limpieza dental para niños", desc: "Profilaxis infantil amable y educativa." },
            { key: "selladores", title: "Selladores", desc: "Protección de fosas y fisuras contra caries." },
            { key: "extracciones", title: "Extracciones", desc: "Extracciones simples y de cordales con enfoque mínimamente invasivo." },
            { key: "ortopedia", title: "Ortopedia", desc: "Guía del crecimiento maxilar y mandibular en pacientes jóvenes." },
            { key: "armonizacion-facial", title: "Armonización facial", desc: "Procedimiento estético de botox para realzar y equilibrar los rasgos faciales." },
            { key: "diseno-sonrisa", title: "Diseño de sonrisa", desc: "Plan estético integral para lograr una sonrisa armónica y personalizada." },
        ],
        []
    );

    const [query, setQuery] = useState("");
    const filtered = all.filter((s) =>
        s.title.toLowerCase().includes(query.toLowerCase().trim())
    );

    useEffect(() => {
        console.assert(all.some((s) => s.key === "invisalign"), "Test: existe servicio Invisalign");
    }, [all]);

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const openInfo = (service) => { setActive(service); setOpen(true); };
    const closeInfo = () => setOpen(false);

    // --- Solo móvil (SIN CAMBIOS): paginar de 3 en 3 ---
    const PAGE_SIZE_MOBILE = 3;
    const [mPage, setMPage] = useState(0);
    const totalPagesMobile = Math.ceil(filtered.length / PAGE_SIZE_MOBILE);
    const pageItemsMobile = filtered.slice(mPage * PAGE_SIZE_MOBILE, mPage * PAGE_SIZE_MOBILE + PAGE_SIZE_MOBILE);
    const nextPageMobile = () => setMPage((p) => Math.min(p + 1, totalPagesMobile - 1));
    const prevPageMobile = () => setMPage((p) => Math.max(p - 1, 0));

    // --- Desktop/Tablet NUEVO: máximo 8 por página ---
    const PAGE_SIZE_DESKTOP = 8;
    const [dPage, setDPage] = useState(0);
    const totalPagesDesktop = Math.ceil(filtered.length / PAGE_SIZE_DESKTOP);
    const pageItemsDesktop = filtered.slice(dPage * PAGE_SIZE_DESKTOP, dPage * PAGE_SIZE_DESKTOP + PAGE_SIZE_DESKTOP);
    const nextPageDesktop = () => setDPage((p) => Math.min(p + 1, totalPagesDesktop - 1));
    const prevPageDesktop = () => setDPage((p) => Math.max(p - 1, 0));

    return (
        <section id="servicios" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">SERVICIOS</div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">Tratamientos</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white/75">
                        Tratamientos de ortodoncia, rehabilitacion, endodoncia, odontopediatria, prostodoncia, periodoncia.
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                // Reiniciar páginas al buscar, para que se vea desde la primera página en ambos layouts
                                setMPage(0);
                                setDPage(0);
                            }}
                            placeholder="Buscar servicio…"
                            className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 pl-10 text-sm outline-none placeholder:text-white/50 focus:border-[#e4b89266] focus:ring-2 focus:ring-[#e4b89233]"
                        />
                        <svg
                            viewBox="0 0 24 24"
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                            fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="M21 21l-3.6-3.6" />
                        </svg>
                        <div className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-40 [mask-image:radial-gradient(60%_60%_at_30%_40%,black,transparent)]">
                            <div className="h-full w-full animate-[shimmer_6s_linear_infinite] rounded-full bg-gradient-to-r from-transparent via-[#e4b89233] to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Desktop/Tablet: grid con tarjetas del mismo alto y paginación (8 por página) */}
                <div className="mt-8 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                    {pageItemsDesktop.map((s, i) => (
                        <ServiceCard
                            key={s.key}
                            index={i}
                            title={s.title}
                            desc={s.desc}
                            waUrl={getWaUrl(s.key, s.title)}   // ← usa Kids o Principal
                            onInfo={() => openInfo(s)}
                        />
                    ))}
                </div>

                {/* Paginador Desktop/Tablet */}
                {totalPagesDesktop > 1 && (
                    <div className="mt-4 hidden sm:flex items-center justify-between">
                        <button
                            onClick={prevPageDesktop}
                            disabled={dPage === 0}
                            className="rounded-full border border-[#e4b89255] bg-white/5 px-4 py-2 text-sm text-white/85 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-white/10"
                        >
                            ← Anterior
                        </button>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89255] bg:white/5 bg-white/5 px-3 py-1">
                            <span className="text-xs text-[#e4b892]">Página</span>
                            <span className="text-sm text:white/90 text-white/90">{dPage + 1}</span>
                            <span className="text-white/60 text-sm">/</span>
                            <span className="text-sm text-white/80">{totalPagesDesktop}</span>
                        </div>
                        <button
                            onClick={nextPageDesktop}
                            disabled={dPage >= totalPagesDesktop - 1}
                            className="rounded-full border border-[#e4b89255] bg-[#d8a07b] px-4 py-2 text-sm font-semibold text-[#0b1b2b] disabled:opacity-40 disabled:cursor-not-allowed transition hover:brightness-110"
                        >
                            Siguiente →
                        </button>
                    </div>
                )}

                {/* Móvil: 3 por página (sin cambios) */}
                <div className="mt-8 grid gap-6 sm:hidden">
                    {pageItemsMobile.map((s, i) => (
                        <ServiceCard
                            key={s.key}
                            index={i}
                            title={s.title}
                            desc={s.desc}
                            waUrl={getWaUrl(s.key, s.title)}   // ← usa Kids o Principal
                            onInfo={() => openInfo(s)}
                        />
                    ))}

                    {totalPagesMobile > 1 && (
                        <div className="mt-2 flex items-center justify-between">
                            <button
                                onClick={prevPageMobile}
                                disabled={mPage === 0}
                                className="rounded-full border border-[#e4b89255] bg-white/5 px-4 py-2 text-sm text-white/85 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-white/10"
                            >
                                ← Anterior
                            </button>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89255] bg-white/5 px-3 py-1">
                                <span className="text-xs text-[#e4b892]">Página</span>
                                <span className="text-sm text-white/90">{mPage + 1}</span>
                                <span className="text-white/60 text-sm">/</span>
                                <span className="text-sm text-white/80">{totalPagesMobile}</span>
                            </div>
                            <button
                                onClick={nextPageMobile}
                                disabled={mPage >= totalPagesMobile - 1}
                                className="rounded-full border border-[#e4b89255] bg-[#d8a07b] px-4 py-2 text-sm font-semibold text-[#0b1b2b] disabled:opacity-40 disabled:cursor-not-allowed transition hover:brightness-110"
                            >
                                Siguiente →
                            </button>
                        </div>
                    )}
                </div>
            </Container>

            {/* Pasa el servicio activo al modal; dentro elegiremos el WhatsApp correcto */}
            <InfoModal open={open} onClose={closeInfo} service={active} />

            <style>{`
        @keyframes shimmer { 0% { transform: translateX(-40%);} 50% { transform: translateX(40%);} 100% { transform: translateX(120%);} }
        @keyframes sweep   { 0% { transform: translateX(-120%) rotate(12deg);} 100% { transform: translateX(220%) rotate(12deg);} }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}

function ServiceCard({ title, desc, index, onInfo, waUrl }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="group relative h-full"
        >
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#c89b7b40] via-[#e4b89233] to-transparent p-[1px] transition duration-300 group-hover:from-[#c89b7b66] group-hover:via-[#e4b89255]">
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_26px_rgba(0,0,0,.35)] flex flex-col">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 60px rgba(228,184,146,.06)" }} />
                    <span className="pointer-events-none absolute right-3 top-3 h-[10px] w-[10px] rounded-full bg-[#e4b89280] blur-[1px]" />
                    <h3 className="text-[17px] font-semibold text-white tracking-wide">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/75">{desc}</p>

                    {/* Empuja el footer al fondo para igualar alturas */}
                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <a
                            href={waUrl}  // ← usa el enlace calculado para cada servicio
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-1 rounded-full bg-[#d8a07b] px-3.5 py-1.5 text-xs font-semibold text-[#0b1b2b] transition hover:brightness-110"
                        >
                            Agendar
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                                <span className="absolute -inset-y-2 -left-1/3 h-[200%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70 animate-[sweep_1.6s_ease-out_infinite]" />
                            </span>
                        </a>

                        <button
                            onClick={onInfo}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75 transition hover:border-[#e4b89255] hover:bg:white/10 hover:bg-white/10"
                        >
                            Más info
                        </button>
                    </div>

                    <span className="pointer-events-none absolute bottom-0 left-4 right-4 h-[2px] translate-y-1 rounded bg-gradient-to-r from-transparent via-[#e4b89280] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
            </div>
        </motion.div>
    );
}

function InfoModal({ open, onClose, service }) {
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !service) return null;

    const waForThisService = getWaUrl(service.key, service.title);

    // Copys por servicio (incluye tiempo y precio estimado)
    const getServiceCopy = (key, fallbackDesc) => {
        switch (key) {
            case "implantes":
                return {
                    subtitle: "Reposición fija con implante y corona de aspecto natural.",
                    bullets: [
                        "Colocación guiada para mayor precisión y confort.",
                        "Tiempo estimado: cirugía 60–90 min; integración 3–6 meses.",
                        "Precio estimado: $18,000–$35,000 MXN por implante (según caso).",
                    ],
                };
            case "limpieza":
                return {
                    subtitle: "Profilaxis profesional para mantener encías y dientes sanos.",
                    bullets: [
                        "Remoción de placa, sarro y pulido.",
                        "Tiempo estimado: 30–45 min.",
                        "Precio estimado: $600–$1,200 MXN.",
                    ],
                };
            case "coronas":
                return {
                    subtitle: "Rehabilitación resistente y estética de dientes dañados.",
                    bullets: [
                        "Material cerámico/zirconia con ajuste digital.",
                        "Tiempo estimado: 2 citas de 60–90 min.",
                        "Precio estimado: $6,000–$12,000 MXN por pieza.",
                    ],
                };
            case "resinas":
                return {
                    subtitle: "Restauraciones conservadoras del color del diente.",
                    bullets: [
                        "Adhesión avanzada y pulido de alto brillo.",
                        "Tiempo estimado: 40–60 min por pieza.",
                        "Precio estimado: $1,000–$2,500 MXN por pieza.",
                    ],
                };
            case "maxilofacial":
                return {
                    subtitle: "Procedimientos quirúrgicos especializados de alta precisión.",
                    bullets: [
                        "Plan quirúrgico personalizado y control del dolor.",
                        "Tiempo estimado: 45–120 min (según procedimiento).",
                        "Precio estimado: $5,000–$25,000+ MXN (según complejidad).",
                    ],
                };
            case "endodoncia":
                return {
                    subtitle: "Tratamiento de conductos para conservar piezas naturales.",
                    bullets: [
                        "Desinfección, conformación y sellado del conducto.",
                        "Tiempo estimado: 60–120 min (1–2 citas).",
                        "Precio estimado: $3,500–$6,500 MXN (molares pueden ser más).",
                    ],
                };
            case "periodoncia":
                return {
                    subtitle: "Cuidado integral de encías y soporte óseo.",
                    bullets: [
                        "Terapia periodontal no quirúrgica y mantenimiento.",
                        "Tiempo estimado: 60–90 min por cuadrante.",
                        "Precio estimado: $1,500–$3,000 MXN (mantenimiento).",
                    ],
                };
            case "guarda-oclusal":
                return {
                    subtitle: "Protección contra bruxismo y alivio de sobrecarga.",
                    bullets: [
                        "Toma de impresión/escaneo y ajuste personalizado.",
                        "Tiempo estimado: 2 citas de 20–30 min; entrega en 5–7 días.",
                        "Precio estimado: $2,000–$4,000 MXN.",
                    ],
                };
            case "puentes":
                return {
                    subtitle: "Soluciones fijas para reemplazo de uno o más dientes.",
                    bullets: [
                        "Diseño y ajuste de oclusión para estabilidad.",
                        "Tiempo estimado: 2–3 citas de 60–90 min.",
                        "Precio estimado: $12,000–$24,000 MXN (puente de 3 unidades).",
                    ],
                };
            case "alineadores":
                return {
                    subtitle: "Ortodoncia removible y discreta para alinear tu sonrisa.",
                    bullets: [
                        "Escaneo 3D y plan de movimientos progresivos.",
                        "Tiempo estimado: 6–18 meses, revisiones cada 6–8 semanas.",
                        "Precio estimado: $25,000–$60,000 MXN (según complejidad).",
                    ],
                };
            case "invisalign":
                return {
                    subtitle: "Alineadores invisibles con planeación digital.",
                    bullets: [
                        "Comodidad y control preciso del tratamiento.",
                        "Tiempo estimado: 6–18 meses, citas de control periódicas.",
                        "Precio estimado: $35,000–$80,000 MXN.",
                    ],
                };
            case "brackets":
                return {
                    subtitle: "Ortodoncia fija para corrección de mordida y alineación.",
                    bullets: [
                        "Opciones metálicos o estéticos (según caso).",
                        "Tiempo estimado: 18–24 meses; citas mensuales.",
                        "Precio estimado: $20,000–$40,000 MXN el tratamiento.",
                    ],
                };
            case "blanqueamientos":
                return {
                    subtitle: "Aclarado seguro y efectivo del tono dental.",
                    bullets: [
                        "En clínica y/o domiciliario supervisado.",
                        "Tiempo estimado: 45–60 min por sesión.",
                        "Precio estimado: $2,500–$4,500 MXN (clínica) / $1,800–$3,000 MXN (kit).",
                    ],
                };
            case "carillas":
                return {
                    subtitle: "Láminas estéticas para forma y color perfectos.",
                    bullets: [
                        "Cerámica o compuesto con mínima preparación (según caso).",
                        "Tiempo estimado: 2–3 citas; laboratorio 7–14 días.",
                        "Precio estimado: $6,000–$12,000 MXN por pieza.",
                    ],
                };
            case "limpieza-ninos":
                return {
                    subtitle: "Profilaxis infantil amable y educativa.",
                    bullets: [
                        "Limpieza suave, barniz de flúor y consejos de higiene.",
                        "Tiempo estimado: 20–30 min.",
                        "Precio estimado: $450–$900 MXN.",
                    ],
                };
            case "selladores":
                return {
                    subtitle: "Protección de fosas y fisuras contra caries.",
                    bullets: [
                        "Aplicación sin dolor sobre molares sanos.",
                        "Tiempo estimado: 15–20 min por diente.",
                        "Precio estimado: $400–$800 MXN por diente.",
                    ],
                };
            case "extracciones":
                return {
                    subtitle: "Extracciones simples y de cordales con enfoque mínimamente invasivo.",
                    bullets: [
                        "Anestesia local y manejo postoperatorio.",
                        "Tiempo estimado: 20–60 min (según complejidad).",
                        "Precio estimado: $800–$1,800 MXN (simple) / $2,500–$6,500 MXN (cordal).",
                    ],
                };
            case "ortopedia":
                return {
                    subtitle: "Guía del crecimiento maxilar y mandibular en pacientes jóvenes.",
                    bullets: [
                        "Aparatología funcional personalizada y controles periódicos.",
                        "Tiempo estimado: 6–18 meses; revisiones bimestrales.",
                        "Precio estimado: $8,000–$18,000 MXN (según aparatología).",
                    ],
                };
            case "armonizacion-facial":
                return {
                    subtitle: "Toxina botulínica y rellenos dérmicos para equilibrio facial natural.",
                    bullets: [
                        "Atenuación de líneas y realce de volumen sutil.",
                        "Tiempo estimado: 20–40 min; resultados 4–12 meses.",
                        "Precio estimado: $2,500–$4,500 MXN por zona (toxina) / $4,500–$7,500 MXN por 1 ml (relleno).",
                    ],
                };
            case "diseno-sonrisa":
                return {
                    subtitle: "Plan estético integral con mock-up digital y ejecución guiada.",
                    bullets: [
                        "Fotografía clínica, análisis de proporciones y pruebas previas.",
                        "Tiempo estimado: 1–3 citas para diagnóstico y mock-up.",
                        "Precio estimado: Estudio $1,500–$3,000 MXN; tratamiento final según plan ($10,000–$60,000 MXN).",
                    ],
                };
            default:
                return {
                    subtitle: fallbackDesc || "Atención personalizada según tu diagnóstico.",
                    bullets: [
                        "Evaluación clínica y plan a medida.",
                        "Tiempo estimado: variable.",
                        "Precio estimado: a cotizar tras valoración.",
                    ],
                };
        }
    };

    const { subtitle, bullets } = getServiceCopy(service.key, service.desc);

    return (
        <AnimatePresence>
            <motion.button
                type="button"
                aria-label="Cerrar modal"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4"
            >
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    initial={{ y: 16, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 10, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="relative w-full max-w-2xl overflow-hidden rounded-[22px] border border-[#e4b89233] bg-[#0f2237] text-white shadow-2xl"
                >
                    {/* líneas doradas superior e inferior */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {/* botón cerrar circular */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:bg-white/10"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>

                    {/* cabecera centrada como en la imagen */}
                    <div className="px-6 pt-8 text-center sm:px-10">
                        <div className="text-[11px] tracking-[.35em] text-[#e4b892cc]">SERVICIO</div>
                        <h3 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{service.title}</h3>
                        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                            {subtitle}
                        </p>
                    </div>

                    {/* bullets alineados a la izquierda */}
                    <div className="px-6 pt-5 sm:px-10">
                        <ul className="grid gap-3 text-[15px] sm:text-[16px] text-white/90">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#e4b892]" />
                                    <span className="leading-relaxed">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* botones grandes tipo “píldora” como en la imagen */}
                    <div className="px-6 pb-8 pt-7 sm:px-10">
                        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                            <a
                                href={waForThisService}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 min-w-[260px] items-center justify-center gap-2 rounded-full bg-[#d8a07b] px-7 text-[15px] font-semibold text-[#0b1b2b] shadow-[0_8px_24px_rgba(216,160,123,.25)] transition hover:brightness-110"
                            >
                                Agendar por WhatsApp
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M13 5l7 7-7 7" />
                                </svg>
                            </a>

                            <a
                                href="#ubicacion"
                                onClick={onClose}
                                className="inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-[15px] text-white/90 transition hover:bg-white/10"
                            >
                                Ver clínicas
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.button>
        </AnimatePresence>
    );
}



function GalleryCarousel() {
    const IMAGES = [
        { src: ubicacion, title: "Ubicación", subtitle: "Jardín Real · Zapopan" },
        { src: unidades, title: "Unidades", subtitle: "Tecnología & confort" },
        { src: recepcion, title: "Recepción", subtitle: "Hospitalidad y calidez" },
        { src: fotos, title: "Detalles", subtitle: "Diseño que inspira" },
    ];

    const [i, setI] = useState(0);
    const [hover, setHover] = useState(false);
    const timerRef = useRef(null);
    const touchRef = useRef({ x: 0, y: 0, t: 0 });

    const next = useCallback(() => setI((p) => (p + 1) % IMAGES.length), [IMAGES.length]);
    const prev = useCallback(() => setI((p) => (p - 1 + IMAGES.length) % IMAGES.length), [IMAGES.length]);

    useEffect(() => {
        if (hover) return;
        timerRef.current = setInterval(() => next(), 5200);
        return () => clearInterval(timerRef.current);
    }, [hover, next]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, prev]);

    const onTouchStart = (e) => {
        const t = e.touches[0];
        touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
    };
    const onTouchEnd = (e) => {
        const dx = (e.changedTouches[0].clientX - touchRef.current.x) || 0;
        const dt = Date.now() - touchRef.current.t;
        if (dt < 600 && Math.abs(dx) > 40) (dx < 0 ? next() : prev());
    };

    const active = IMAGES[i];

    return (
        <section id="galeria" className="bg-[#0b1b2b] py-16">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">GALERÍA</div>
                    <h2 className="mt-5 md:-mt-1 inline-block text-3xl font-semibold md:text-4xl relative">

                        <span className="golden-sweep">Nuestras instalaciones</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                <div
                    className="relative mt-8 overflow-hidden rounded-3xl border border-[#e4b89233] bg_white/5 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />

                    <div className="relative aspect-[16/9] w-full select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                        <AnimatePresence initial={false} mode="wait">
                            <motion.img
                                key={i}
                                src={active.src}
                                alt={active.title}
                                className="absolute inset-0 h-full w-full object-cover"
                                initial={{ opacity: 0, scale: 1.03, x: 8 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 1.01, x: -8 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                            />
                        </AnimatePresence>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1b2b]/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,27,43,.18),transparent_60%)]" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-xs tracking-[.35em] text_white/60">DENTAL CITY</div>
                                    <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-white/95">{active.title}</h3>
                                    <p className="text-white/75 text-sm md:text-[15px]">{active.subtitle}</p>
                                </div>
                                <div className="ml-4 hidden sm:flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-white/80 backdrop-blur">
                                    <span className="text-[#e4b892]">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="opacity-50">/</span>
                                    <span className="opacity-80">{String(IMAGES.length).padStart(2, "0")}</span>
                                </div>
                            </div>

                            <div className="mt-3 h-[3px] w-full rounded bg-white/15 overflow-hidden">
                                <motion.div
                                    key={i + (hover ? "-paused" : "")}
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: hover ? "0%" : "100%" }}
                                    transition={{ duration: 5.2, ease: "linear" }}
                                />
                            </div>
                        </div>

                        <button
                            aria-label="Anterior"
                            onClick={prev}
                            className="group absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur border border-white/15 hover:bg-black/40 transition"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[#e4b89266] opacity-0 group-hover:opacity-100 transition" />
                        </button>
                        <button
                            aria-label="Siguiente"
                            onClick={next}
                            className="group absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur border border-white/15 hover:bg-black/40 transition"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[#e4b89266] opacity-0 group-hover:opacity-100 transition" />
                        </button>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    {IMAGES.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setI(idx)}
                            className={`thumb chic relative overflow-hidden rounded-xl border ${idx === i ? "border-[#e4b89299]" : "border-white/15"} bg-white/5 hover:bg-white/10 transition`}
                            title={img.title}
                        >
                            <img src={img.src} alt={img.title} className="h-14 w-20 object-cover md:h-[68px] md:w-[96px]" loading="lazy" />
                            {idx === i && <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-[#e4b892]/70" />}
                            <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2.5 py-1 text-xs text-white/90 opacity-0 transition pointer-events-none">
                                {img.title}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex justify-center gap-2">
                    {IMAGES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setI(idx)}
                            className={`h-1.5 w-6 rounded-full transition ${idx === i ? "bg-[#e4b892]" : "bg-white/30 hover:bg-white/50"}`}
                            aria-label={`Ir a foto ${idx + 1}`}
                        />
                    ))}
                </div>
            </Container>

            <style>{`
        .thumb:hover .tooltip { opacity: 1; transform: translate(-50%, -2px); }
        .thumb::after {
          content: ""; position: absolute; left: 10%; right: 10%; bottom: -2px; height: 2px;
          background: linear-gradient(90deg, #c89b7b, #e4b892, #c89b7b);
          transform: scaleX(0); transform-origin: left; transition: transform .35s ease;
        }
        .thumb:hover::after { transform: scaleX(1); animation: shine 1.4s linear infinite; }
        @keyframes shine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}

function InvisalignInteractive() {
    const slides = useMemo(
        () => [
            {
                overline: "INVISALIGN",
                title: "Ortodoncia sin brackets",
                subLeft: "La nueva ortodoncia sin brackets.",
                strongRight: "El alineador número 1",
                textRight:
                    "del mundo en tratamientos de ortodoncia sin brackets a partir de los 8 años.",
                img: alineadores,
            },
            {
                overline: "PLAN DIGITAL",
                title: "Tratamiento guiado en 3D",
                subLeft: "Visualiza el resultado antes de empezar.",
                strongRight: "Control preciso por etapas",
                textRight:
                    "con seguimiento digital y ajustes personalizados para tu sonrisa.",
                img: seguimiento2,
            },
            {
                overline: "CONFORT Y ESTÉTICA",
                title: "Alineadores transparentes",
                subLeft: "Cómodos, removibles e higiénicos.",
                strongRight: "Vive tu día a día",
                textRight:
                    "sin cambios drásticos en hábitos de higiene ni alimentación.",
                img: transparentes,
            },
        ],
        []
    );

    const [idx, setIdx] = useState(0);
    const [open, setOpen] = useState(false);

    const s = slides[idx];
    const next = () => setIdx((i) => (i + 1) % slides.length);
    const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length);

    const waHref =
        typeof window !== "undefined" && window.WA_URL ? window.WA_URL : "#";

    useEffect(() => {
        const onKey = (e) => {
            if (open && e.key === "Escape") return setOpen(false);
            if (!open && (e.key === "ArrowRight" || e.key === "Right")) next();
            if (!open && (e.key === "ArrowLeft" || e.key === "Left")) prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <section className="relative bg-[#dfeaf5] py-4 text-[#0b1b2b] sm:py-6">
            <div className="mx-auto max-w-6xl px-3 sm:px-4">
                {/* Slide container (positioning context for the bottom card) */}
                <div className="relative isolate overflow-hidden rounded-2xl min-h-[440px] sm:min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={idx}
                            src={s.img}
                            alt={s.title}
                            initial={{ scale: 1.03, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.02, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
                        />
                    </AnimatePresence>

                    {/* overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1b2b]/75 via-[#0b1b2b]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0b1b2b]/50 to-transparent" />

                    {/* main content */}
                    <div className="relative z-10 grid h-full grid-rows-[1fr]">
                        <div className="grid h-full items-center gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_1fr]">
                            {/* left column (unchanged) */}
                            <div className="max-w-xl text-white">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] tracking-[.35em] text-[#f1caa6] backdrop-blur-md">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#f1caa6]" />
                                    {s.overline}
                                </div>

                                <h2 className="mt-3 inline-block text-[28px] sm:text-[34px] md:text-5xl font-semibold leading-tight relative whitespace-nowrap">
                                    <span className="golden-sweep">{s.title}</span>
                                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                </h2>

                                <p className="mt-2 text-[15px] leading-7 text-white/90">
                                    {s.subLeft}
                                </p>

                                {/* buttons */}
                                <div className="mt-4 w-[430px] max-w-[calc(100vw-2rem)] mx-auto sm:mx-0">
                                    <div className="flex items-center justify-between">
                                        <a
                                            href={waHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-[210px] rounded-full bg-white px-6 py-2.5 text-center text-sm font-semibold text-[#0b1b2b] shadow-sm transition hover:brightness-95"
                                        >
                                            Agendar por WhatsApp
                                        </a>
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="w-[210px] rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                                        >
                                            Ver demostración
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-sm justify-self-end text-white" />
                        </div>
                    </div>

                    {/* ✅ bottom card, pinned to the true bottom of the slide container */}
                    <div className="pointer-events-auto absolute z-20 left-4 sm:left-6 bottom-4 sm:bottom-5">
                        <div className="w-[430px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/40 bg-white/30 px-4 py-3 text-center text-[14px] font-medium text-[#0b1b2b] backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,.08)]">
                            <span className="font-semibold italic underline decoration-[#0b1b2b]/25 underline-offset-[6px]">
                                {s.strongRight}
                            </span>{" "}
                            {s.textRight}
                        </div>
                    </div>
                    {/* If you want it absolutely flush: change bottom-4 sm:bottom-5 -> bottom-0 */}
                </div>

                {/* controls */}
                <div className="mt-1.5 flex items-center justify-center gap-4">
                    <button
                        aria-label="Anterior"
                        onClick={prev}
                        className="rounded-full p-1.5 outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#edb791]"
                    >
                        <Arrow />
                    </button>

                    <div className="flex items-center justify-center gap-3">
                        {slides.map((_, i) => {
                            const active = i === idx;
                            return (
                                <button
                                    key={i}
                                    aria-label={`Ir al slide ${i + 1}`}
                                    onClick={() => setIdx(i)}
                                    className={[
                                        "relative inline-flex items-center justify-center rounded-full transition",
                                        active
                                            ? "h-2.5 w-8 bg-[#edb791]"
                                            : "h-2.5 w-5 bg-[#cfd9e6] hover:bg-[#e0e7f0]",
                                    ].join(" ")}
                                >
                                    {active && (
                                        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#edb791]/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        aria-label="Siguiente"
                        onClick={next}
                        className="rotate-180 rounded-full p-1.5 outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#edb791]"
                    >
                        <Arrow />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.button
                        type="button"
                        aria-label="Cerrar"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ y: 14, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            className="w-full max-w-3xl overflow-hidden rounded-xl bg-white text-[#0b1b2b] shadow-2xl"
                        >
                            <div className="aspect-video bg-[#0b1b2b]/5">
                                <iframe
                                    className="h-full w-full"
                                    src="https://www.youtube.com/embed/p_q0G4GhMnI?rel=0"
                                    title="Demostración Invisalign"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                            <div className="flex items-center justify-between p-3">
                                <div>
                                    <h4 className="text-base font-semibold">
                                        Simulación de tratamiento
                                    </h4>
                                    <p className="text-sm text-[#0b1b2b]/70">
                                        Visualiza los avances por etapa.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-full border border-[#0b1b2b]/20 px-3 py-1 text-sm hover:bg-[#0b1b2b]/5"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            <style>{`
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}


function Arrow() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#edb791] drop-shadow" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 19l-7-7 7-7" />
        </svg>
    );
}

// ==== Locations / Tabs ====
// ==== Locations / Tabs ====
// ==== Locations / Tabs ====
function LocationsTabs() {
    const MAP_HEIGHT = 330;

    const tabs = useMemo(
        () => ({
            "Dental City": {
                query: "Dental City By Dra. Linda Argote, Zapopan, Jalisco",
                address:
                    "Avenida Santa Margarita 4410, Jardín Real, 45136 Zapopan, Jal.",
                phones: ["33 3832 3296", "33 3832 3175"],
                whatsapp: "33 3308 7833",
                socials: [
                    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/DentalCityOficial/", icon: FacebookIcon },
                    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/dentalcity_oficial/", icon: InstagramIcon },
                    { key: "whatsapp", label: "WhatsApp", href: WA_URL, icon: WhatsAppIcon },
                ],
                schedule: [
                    { day: "Lunes - Viernes", time: "9:00 - 20:00" },
                    { day: "Sábado", time: "9:00 - 15:00" },
                    { day: "Domingo", time: "Cerrado", closed: true },
                ],
                holidays: [
                    { day: "24 de diciembre", closed: true },
                    { day: "25 de diciembre", closed: true },
                    { day: "1 de enero", closed: true },
                ],
            },
            "Dental City Kids & Family": {
                query: "Dental City Kids & Family, Zapopan, Jalisco",
                address:
                    "Av. General Ramón Corona 2401, San Juan de Ocotán, 45019 Zapopan, Jal.",
                phones: ["33 3805 3232", "33 3624 3236"],
                whatsapp: "33 1969 9222",
                socials: [
                    { key: "doctoralia", label: "Doctoralia", href: "https://www.doctoralia.com.mx/clinicas/dental-city-kids-family-square-center", icon: DoctoraliaIcon },
                    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/dentalcity_kids/", icon: InstagramIcon },
                    { key: "whatsapp", label: "WhatsApp", href: WA_URL, icon: WhatsAppIcon },
                ],
                schedule: [
                    { day: "Lunes - Viernes", time: "9:00 - 20:00" },
                    { day: "Sábado", time: "9:00 - 15:00" },
                    { day: "Domingo", time: "Cerrado", closed: true },
                ],
                holidays: [
                    { day: "24 de diciembre", closed: true },
                    { day: "25 de diciembre", closed: true },
                    { day: "1 de enero", closed: true },
                ],
            },
        }),
        []
    );

    const [tab, setTab] = useState("Dental City");
    const [copied, setCopied] = useState(false);

    const mapEmbedSrc = (q) => `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    const mapOpenLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

    const telHref = useMemo(() => {
        const first = (tabs[tab]?.phones?.[0] || "").replace(/\D/g, "");
        const withCountry = first.startsWith("52") ? first : `52${first}`;
        return `tel:+${withCountry}`;
    }, [tab, tabs]);

    // Helpers WhatsApp
    const normalizeMx = useCallback((rawNumber) => {
        const digits = String(rawNumber || "").replace(/\D/g, "");
        if (digits.startsWith("521")) return digits;
        if (digits.startsWith("52")) return "521" + digits.slice(2);
        if (digits.length === 10) return "521" + digits;
        return "521" + digits;
    }, []);

    // Con mensaje (para el botón "Agendar por WhatsApp")
    const buildWaLink = useCallback((rawNumber, msg) => {
        const intl = normalizeMx(rawNumber);
        const text = encodeURIComponent(msg || "");
        return `https://api.whatsapp.com/send?phone=${intl}&text=${text}`;
    }, [normalizeMx]);

    // Sin mensaje (para el ícono de "Síguenos")
    const buildWaLinkNoText = useCallback((rawNumber) => {
        const intl = normalizeMx(rawNumber);
        return `https://api.whatsapp.com/send?phone=${intl}`;
    }, [normalizeMx]);

    // Link con mensaje por tab (botón principal)
    const waHref = useMemo(() => {
        const msg = tab === "Dental City"
            ? "Hola quiero agendar una cita en Dental City."
            : "Hola quiero agendar una cita en Dental City Kids.";
        return buildWaLink(tabs[tab]?.whatsapp, msg);
    }, [tab, tabs, buildWaLink]);

    // Link sin mensaje por tab (ícono de Síguenos)
    const waHrefNoText = useMemo(() => {
        return buildWaLinkNoText(tabs[tab]?.whatsapp);
    }, [tab, tabs, buildWaLinkNoText]);

    const copy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try {
                document.execCommand && document.execCommand("copy");
            } finally {
                document.body.removeChild(ta);
            }
            setCopied(true);
        } finally {
            setTimeout(() => setCopied(false), 1200);
        }
    };

    const active = tabs[tab];

    const rightCardRef = useRef(null);
    const [rightHeight, setRightHeight] = useState(0);
    const [isMdUp, setIsMdUp] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(min-width: 768px)").matches
            : true
    );

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("initialTab");
            if (saved && tabs[saved]) {
                setTab(saved);
                sessionStorage.removeItem("initialTab");
            }
        } catch { }
        const onSelect = (e) => {
            const k = e.detail;
            if (k && tabs[k]) setTab(k);
        };
        window.addEventListener("select-location-tab", onSelect);
        return () => window.removeEventListener("select-location-tab", onSelect);
    }, [tabs]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const onMQ = (e) => setIsMdUp(e.matches);
        mq.addEventListener?.("change", onMQ);
        setIsMdUp(mq.matches);
        return () => mq.removeEventListener?.("change", onMQ);
    }, []);

    useEffect(() => {
        if (!rightCardRef.current) return;
        const measure = () => {
            const rect = rightCardRef.current.getBoundingClientRect();
            setRightHeight(Math.max(0, Math.round(rect.height)));
        };
        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        ro.observe(rightCardRef.current);
        window.addEventListener("resize", measure);
        measure();
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [tab]);

    const leftTopRef = useRef(null);
    const [mapHeight, setMapHeight] = useState(MAP_HEIGHT);
    useEffect(() => {
        const el = leftTopRef.current;
        if (!el) return;
        const measure = () => {
            const rect = el.getBoundingClientRect();
            setMapHeight(Math.max(MAP_HEIGHT, Math.round(rect.height)));
        };
        const ro = new ResizeObserver(() => requestAnimationFrame(measure));
        ro.observe(el);
        window.addEventListener("resize", measure);
        measure();
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [tab]);

    return (
        <section id="ubicacion" className="bg-[#0f2237] py-20">
            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">SUCURSALES</div>
                    <h2 className="mt-3 inline-block text-3xl font-semibold md:text-4xl relative">
                        <span className="golden-sweep">Nuestras Clínicas</span>
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,.25)] backdrop-blur">
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(tabs).map((k) => {
                            const isActive = k === tab;
                            return (
                                <button
                                    key={k}
                                    onClick={() => setTab(k)}
                                    className={[
                                        "relative rounded-full px-5 py-2 text-sm transition border",
                                        isActive
                                            ? "border-white/30 bg-white text-[#0b1b2b] shadow-sm"
                                            : "border-white/10 bg-white/5 text-white hover:bg-white/10",
                                    ].join(" ")}
                                >
                                    {k}
                                    {isActive && (
                                        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#d8a07b]/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h4 className="text-2xl font-semibold tracking-wide">{tab}</h4>
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1.5 text-xs text-white/90">
                                <span className="text-[#e4b892]">WhatsApp:</span>
                                <span className="opacity-90">{active.whatsapp}</span>
                            </div>
                        </div>

                        <p className="mt-2 text-[15px]">
                            <span className="text-[#e4b892] font-semibold">Teléfonos:</span>{" "}
                            <span className="text-white/85">{active.phones.join(" · ")}</span>
                        </p>

                        <div className="mt-3 h-[2px] w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full w-full animate-[shine_3.6s_linear_infinite] bg-gradient-to-r from-transparent via-[#e4b892] to-transparent" />
                        </div>
                    </div>

                    <div className="mt-7 grid items-stretch gap-8 md:grid-cols-2">
                        <div
                            ref={leftTopRef}
                            className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                            style={{ minHeight: MAP_HEIGHT }}
                        >
                            <span className="pointer-events-none absolute left-3 top-3 h-[10px] w-[2px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute left-3 top-3 h-[2px] w-[10px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-3 bottom-3 h-[10px] w-[2px] rounded bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-3 bottom-3 h-[2px] w-[10px] rounded bg-[#e4b89266]" />

                            <div className="mb-3 flex items-center gap-2">
                                <ClockIcon />
                                <h5 className="text-base font-semibold">Horarios</h5>
                            </div>

                            <ul className="relative ml-2 mt-2 pr-1 flex-1">
                                <span className="absolute left-2 top-0 h-full w-[2px] rounded bg-white/10" />
                                {active.schedule.map((s, i) => (
                                    <li key={i} className="relative mb-3 pl-8">
                                        <span className="absolute left-0 top-2 block h-3 w-3 rounded-full bg-[#d8a07b] shadow-[0_0_0_2px_rgba(216,160,123,.25)]" />
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                                            <span className="text-[15px] text-white/90">{s.day}</span>
                                            {s.closed ? (
                                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300">
                                                    Cerrado
                                                </span>
                                            ) : (
                                                <span className="relative rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-300">
                                                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-green-300/25" />
                                                    {s.time}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="order-1 sm:order-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#0b1b2b] transition hover:brightness-110"
                                >
                                    <WhatsAppIcon />
                                    Agendar por WhatsApp
                                </a>

                                <a
                                    href={telHref}
                                    className="order-2 sm:order-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.15a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92Z" />
                                    </svg>
                                    Agendar por llamada
                                </a>
                            </div>
                        </div>

                        <div
                            className="overflow-hidden rounded-2xl border border-white/10 bg-black/10 shadow-[0_10px_25px_rgba(0,0,0,.25)]"
                            style={{ height: mapHeight }}
                        >
                            <iframe
                                title={`Mapa ${tab}`}
                                src={mapEmbedSrc(active.query)}
                                className="h-full w-full"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <div
                            className="relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5"
                            style={isMdUp && rightHeight ? { height: `${rightHeight}px` } : undefined}
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <HolidayIcon />
                                <h5 className="text-base font-semibold">Días feriados</h5>
                            </div>

                            <ul className="relative ml-2 mt-2 flex-1 overflow-visible pr-1">
                                <span className="absolute left-2 top-0 h-full w-[2px] rounded bg-white/10" />
                                {active.holidays.map((h, i) => (
                                    <li key={i} className="relative mb-3 pl-8">
                                        <span className="absolute left-0 top-2 block h-3 w-3 rounded-full bg-[#edb791] shadow-[0_0_0_2px_rgba(237,183,145,.25)]" />
                                        <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                                            <span className="text-[15px] text-white/90">{h.day}</span>
                                            {h.closed ? (
                                                <span className="rounded-full bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-300">Cerrado</span>
                                            ) : (
                                                <span className="rounded-full bg-[#d8a07b]/15 px-3 py-1.5 text-xs font-semibold text-[#edb791] shadow-[inset_0_0_0_1px_rgba(216,160,123,.25)]">
                                                    {h.note || "Horario especial"}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            ref={rightCardRef}
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                            <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-6 rounded-r bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute left-0 top-0 h-6 w-[2px] rounded-b bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-0 bottom-0 h-[2px] w-6 rounded-l bg-[#e4b89266]" />
                            <span className="pointer-events-none absolute right-0 bottom-0 h-6 w-[2px] rounded-t bg-[#e4b89266]" />

                            <div className="text-xs uppercase tracking-[.2em] text-white/50">Dirección</div>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/90">{active.address}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                    onClick={() => copy(active.address)}
                                    className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                    title="Copiar dirección"
                                >
                                    {copied ? "Copiado ✓" : "Copiar"}
                                </button>
                                <a
                                    href={mapOpenLink(active.query)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                >
                                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                                        <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Ver en Maps
                                </a>
                            </div>

                            <div className="mt-6 text-xs uppercase tracking-[.2em] text-white/50">Síguenos</div>
                            <p className="mt-2 text-[15px] leading-relaxed text-white/90">
                                {tab === "Dental City"
                                    ? "Contacta a Dental City en redes sociales."
                                    : "Contacta a Dental City Kids & Family en  redes sociales."}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {active.socials.map(({ key, label, href, icon: Icon }) => {
                                    const finalHref = key === "whatsapp" ? waHrefNoText : href;
                                    return (
                                        <a
                                            key={key}
                                            href={finalHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:border-[#e4b89266] hover:bg-white/10"
                                        >
                                            <span className="text-[#e4b892cc] group-hover:drop-shadow-[0_0_6px_rgba(228,184,146,.4)]">
                                                {React.createElement(Icon)}
                                            </span>
                                            <span className="hidden sm:inline">{label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @keyframes shine { 0% { transform: translateX(-100%);} 100% { transform: translateX(100%);} }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text; -webkit-background-clip: text;
          position: relative; display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }
        @media (prefers-reduced-motion: reduce){ .golden-sweep{ animation: none; background-size: 100% 100%; } }
        @keyframes goldSweep {
          0% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45% { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}


/* Iconos */
function ClockIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d8a07b]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    );
}
function HolidayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d8a07b]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            <path d="M12 14l1.2 2.5 2.8.4-2 2 0.5 2.8-2.5-1.3-2.5 1.3 0.5-2.8-2-2 2.8-.4L12 14z" fill="#d8a07b" stroke="none" transform="translate(0, -1.2)" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.4v-2.9h2.04V9.41c0-2.02 1.2-3.14 3.04-3.14.88 0 1.8.16 1.8.16v1.98h-1.01c-.99 0-1.29.62-1.29 1.25v1.5h2.2l-.35 2.9h-1.86V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
        </svg>
    );
}
function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
    );
}
function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M.5 12C.5 5.9 5.4 1 11.5 1S22.5 5.9 22.5 12 17.6 23 11.5 23c-1.9 0-3.8-.5-5.4-1.5L2 22l.5-4.1A10.4 10.4 0 0 1 .5 12Zm5.8 6.6c1.5.9 3.2 1.4 5.2 1.4 5.7 0 8.9-3.8 8.9-8.9 0-5-3.9-8.9-8.9-8.9-5.1 0-8.9 3.9-8.9 8.9 0 2 .5 3.7 1.4 5.1l-.9 3.3 3.2-.9Zm10-5.1c-.1-.1-.4-.2-.9-.5s-.8-.4-.9.1c-.3.5-.5.6-1 .5-1-.2-1.9-.9-2.6-1.7-.3-.4-.6-.8-.7-1.2-.1-.3 0-.5.2-.7l.3-.4c.2-.2.3-.3.2-.6l-.5-1.2c-.1-.3-.3-.6-.6-.5h-.5c-.2 0-.5.1-.7.4-.7.8-1 1.8-.9 2.9.1 1 .6 2 1.4 2.9 1 .9 2.1 1.6 3.4 1.9 1 .3 2 .2 2.8-.4.2-.2.5-.5.5-.8 0-.3 0-.4-.2-.5Z" />
        </svg>
    );
}
function DoctoraliaIcon() {
    // Marca neutra estilo “estrella/cruz”
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M10.5 2h3v6.5H20v3h-6.5V20h-3v-8.5H4v-3h6.5V2Z" />
        </svg>
    );
}




function FAQ() {
    const data = [
        { q: "¿Atienden a niños?", a: "Sí, contamos con odontopediatría y un enfoque amable para niñas y niños en Dental City Kids & Family." },
        { q: "¿Aceptan tarjeta?", a: "Sí, además de planes de pago en tratamientos seleccionados." },
        { q: "¿Qué incluye la primera cita?", a: "Valoración clínica, estudios necesarios y un plan a medida." },
    ];
    const [open, setOpen] = useState(0);

    return (
        <section className="relative bg-[#0b1b2b] py-20">
            {/* filete superior sutil */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-[faqShimmer_6s_linear_infinite] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

            <Container>
                <div className="text-center">
                    <div className="text-xs tracking-[0.35em] text-white/50">FAQ</div>

                    {/* Título con luz dorada que barre las letras */}
                    <h2 className="relative mt-3 inline-block text-3xl md:text-4xl font-semibold">
                        <span className="golden-sweep">
                            Preguntas frecuentes
                        </span>
                        {/* línea dorada debajo */}
                        <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    </h2>
                </div>

                {/* Caja del FAQ (tu mismo contenido anterior) */}
                <div className="mx-auto mt-10 max-w-3xl overflow-visible rounded-2xl border border-white/10 bg-white/5 p-1 shadow-[0_18px_50px_rgba(0,0,0,.35)] ring-1 ring-white/10">
                    <div className="rounded-2xl bg-gradient-to-br from-[#c89b7b33] via-transparent to-[#e4b89222] p-[1px]">
                        <div className="rounded-2xl bg-[#0f2136]/50 backdrop-blur">
                            {data.map((item, idx) => {
                                const isOpen = open === idx;
                                return (
                                    <motion.div key={idx} initial={false} className="relative overflow-visible">
                                        {idx !== 0 && (
                                            <div className="mx-5 my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        )}

                                        <button
                                            onClick={() => setOpen(isOpen ? -1 : idx)}
                                            aria-expanded={isOpen}
                                            className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 text-left outline-none transition"
                                        >
                                            <span className="relative grid h-5 w-5 place-items-center">
                                                <span className="absolute inset-0 rounded-full bg-[#e4b892]/30 blur-[6px] opacity-60 group-hover:opacity-90 transition-opacity" />
                                                <span className="relative h-2.5 w-2.5 rounded-full bg-[#e4b892] shadow-[0_0_0_2px_rgba(228,184,146,.35)]" />
                                            </span>

                                            <span className="text-[17px] font-medium text-white/90 transition group-hover:text-white">
                                                {item.q}
                                            </span>

                                            <motion.span
                                                aria-hidden
                                                className="ml-2 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80"
                                                initial={false}
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M6 9l6 6 6-6" />
                                                </svg>
                                            </motion.span>

                                            <span
                                                aria-hidden
                                                className={[
                                                    "pointer-events-none absolute left-5 right-5 bottom-1 h-[2px] origin-left rounded",
                                                    "bg-gradient-to-r from-transparent via-[#e4b892] to-transparent",
                                                    isOpen ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0",
                                                    "transition-all duration-300",
                                                ].join(" ")}
                                            />
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    key="content"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                                    className="overflow-hidden px-5"
                                                >
                                                    <motion.div
                                                        initial={{ y: -4 }}
                                                        animate={{ y: 0 }}
                                                        exit={{ y: -4 }}
                                                        className="relative mb-4 mr-1 rounded-xl border border-white/10 bg-white/5 p-4 text-[15px] leading-relaxed text-white/80"
                                                    >
                                                        <span className="pointer-events-none absolute left-3 right-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#e4b89288] to-transparent" />
                                                        {item.a}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>

            {/* keyframes locales */}
            <style>{`
        @keyframes faqShimmer {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.25); }
          100% { filter: brightness(1); }
        }

        /* --- Luz dorada que barre las letras del título --- */
        .golden-sweep{
          /* base dorada elegante */
          color: transparent;
          background-image:
            linear-gradient(90deg, #c89b7b 0%, #e4b892 20%, #f4d3b3 35%, #e4b892 60%, #c89b7b 100%);
          background-size: 250% 100%;
          background-clip: text;
          -webkit-background-clip: text;

          /* brillo móvil superpuesto */
          position: relative;
          display: inline-block;
          animation: goldSweep 3.2s linear infinite;
        }

        /* respetar accesibilidad: si el usuario prefiere menos animación, pausamos */
        @media (prefers-reduced-motion: reduce){
          .golden-sweep{ animation: none; background-size: 100% 100%; }
        }

        @keyframes goldSweep {
          0%   { background-position: 0% 50%;   filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
          45%  { filter: drop-shadow(0 0 4px rgba(228,184,146,.35)); }
          100% { background-position: 200% 50%; filter: drop-shadow(0 0 0 rgba(228,184,146,0)); }
        }
      `}</style>
        </section>
    );
}



function FloatingCta() {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // Cerrar al hacer clic fuera o con ESC
    useEffect(() => {
        if (!open) return;

        const onDown = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const go = (tabKey) => {
        try {
            sessionStorage.setItem("initialTab", tabKey);
        } catch (err) {
            void err;
        }
        const el = document.querySelector("#ubicacion");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (location.hash !== "#ubicacion") location.hash = "#ubicacion";
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));
        }, 0);
        setOpen(false);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50" ref={wrapRef}>
            {/* Botón principal */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                className="relative rounded-full bg-[#d8a07b] px-6 py-3 text-sm font-semibold text-[#0b1b2b] shadow-xl ring-4 ring-[#d8a07b]/25 transition hover:brightness-105 active:scale-[0.97]"
                aria-haspopup="menu"
                aria-expanded={open}
                animate={{
                    filter: open
                        ? "drop-shadow(0 0 14px rgba(216,160,123,0.7))"
                        : "drop-shadow(0 0 0 rgba(0,0,0,0))",
                }}
                transition={{ duration: 0.35 }}
            >
                Agendar cita
                <motion.span
                    className="inline-block ml-1"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    ▾
                </motion.span>
            </motion.button>

            {/* Backdrop clickeable para cerrar */}
            <AnimatePresence>
                {open && (
                    <motion.button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[-1] cursor-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Popover */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.22 }}
                        className="absolute bottom-[110%] right-0 w-[260px] rounded-2xl border border-[#d8a07b]/25 bg-[#11243a]/95 p-2 text-white/90 shadow-2xl backdrop-blur"
                        role="menu"
                    >
                        {/* Caret dorado */}
                        <span className="pointer-events-none absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-[4px] bg-[#11243a]/95 border-l border-b border-[#d8a07b]/25" />

                        <button
                            onClick={() => go("Dental City")}
                            className="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City</span>
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => go("Dental City Kids & Family")}
                            className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City Kids & Family</span>
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FloatingBackToTop() {
    const [visible, setVisible] = React.useState(false);
    const tickingRef = React.useRef(false);

    React.useEffect(() => {
        const onScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(() => {
                    const y = window.scrollY || document.documentElement.scrollTop || 0;
                    setVisible(y > 360); // muestra tras bajar ~360px
                    tickingRef.current = false;
                });
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // estado inicial
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTop = () => {
        try {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            // fallback muy básico
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="backtotop"
                    onClick={scrollTop}
                    aria-label="Volver arriba"
                    title="Volver arriba"
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-full 
                     bg-[#d8a07b] text-[#0b1b2b] shadow-xl ring-4 ring-[#d8a07b]/25 
                     hover:brightness-110 active:scale-95"
                >
                    {/* Flecha elegante hacia arriba */}
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5" />
                        <path d="M5 12l7-7 7 7" />
                    </svg>

                    {/* Halo dorado suave (igual lenguaje visual que el resto) */}
                    <span className="pointer-events-none absolute inset-0 rounded-full 
                           bg-[radial-gradient(ellipse_at_center,rgba(228,184,146,0.20),transparent_60%)]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}


/* =========================
   Dev tests (ligeros)
   ========================= */
function DevTests() {
    useEffect(() => {
        console.assert(typeof document !== "undefined", "Test: document disponible");
    }, []);
    return null;
}


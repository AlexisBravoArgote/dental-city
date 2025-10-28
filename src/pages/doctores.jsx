// src/pages/Doctores.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import TopBar from "../components/TopBar.jsx";
import Footer from "../components/Footer.jsx";


import dc3 from "../assets/DCdoctor3.jpg";
import dc4 from "../assets/DCdoctor4.jpg";
import dc5 from "../assets/DCdoctor5.jpg";
import dc6 from "../assets/DCdoctor6.jpg";
import dc7 from "../assets/DCdoctor7.jpg";
import dc8 from "../assets/DCdoctor8.jpg";
import dc9 from "../assets/DCdoctor9.jpg";
import dc10 from "../assets/DCdoctor10.jpg";
import dc11 from "../assets/DCdoctor11.jpg";
import dc12 from "../assets/DCdoctor12.jpg";
import dc13 from "../assets/DCdoctor13.jpg";
import dc14 from "../assets/DCdoctor14.jpg";
import dc15 from "../assets/DCdoctor15.jpg";
import dc16 from "../assets/DCdoctor16.jpg";
import dc17 from "../assets/DCdoctor17.jpg";
import dc18 from "../assets/DCdoctor18.jpg";
import dc19 from "../assets/DCdoctor19.jpg";
import kids0 from "../assets/kids0.jpg"
import kids1 from "../assets/kids1.jpg"
import kids2 from "../assets/kids2.jpg"
import kids3 from "../assets/kids3.jpg"
import kids4 from "../assets/kids4.jpg"
import kids5 from "../assets/kids5.jpg"
import kids6 from "../assets/kids6.jpg"
import kids7 from "../assets/kids7.jpg"
import kids8 from "../assets/kids8.jpg"
import kids9 from "../assets/kids9.jpg"
import kids10 from "../assets/kids10.jpg"
import kids11 from "../assets/kids11.jpg"
import kids12 from "../assets/kids12.jpg"
import kids13 from "../assets/kids13.jpg"
import kids14 from "../assets/kids14.jpg"
import kids15 from "../assets/kids15.jpg"
import kids16 from "../assets/kids16.jpg"
import kids17 from "../assets/kids17.jpg"
import kids18 from "../assets/kids18.jpg"
import kids19 from "../assets/kids19.jpg"
import kids20 from "../assets/kids20.jpg"
import kids21 from "../assets/kids21.jpg"
import kids22 from "../assets/kids22.jpg"


const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

/* Helpers */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}
function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-[11px] tracking-[.35em] text-[#e4b892]">
            {children}
        </span>
    );
}
function SectionTitle({ eyebrow, title, center = true, className = "" }) {
    return (
        <div className={`${center ? "text-center" : ""} ${className}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                <span className="relative inline-block">
                    {title}
                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                </span>
            </h2>
        </div>
    );
}

/* Componente carrusel (cuadrado) */
/* Componente carrusel (cuadrado) */
function Carousel({
    images = [],
    ariaLabel = "galería",
    autoPlay = true,
    duration = 5000, // ms por foto
}) {
    const [i, setI] = useState(0);
    const n = images.length || 1;

    // progreso visual (0–100)
    const [progress, setProgress] = useState(0);
    const [hovering, setHovering] = useState(false);

    // Timer absoluto (anti doble-salto)
    const tickIdRef = React.useRef(null);
    const startRef = React.useRef(Date.now());
    const pausedUntilRef = React.useRef(0);

    // Rail de miniaturas (solo desplaza horizontal, no mueve la página)
    const railRef = React.useRef(null);

    const clearTick = () => {
        if (tickIdRef.current) {
            clearInterval(tickIdRef.current);
            tickIdRef.current = null;
        }
    };

    const resetCycle = () => {
        const now = Date.now();
        startRef.current = now;
        setProgress(0);
    };

    const pauseAutoplay = (ms = Math.max(1200, Math.floor(duration * 0.75))) => {
        pausedUntilRef.current = Date.now() + ms;
    };

    // Avanza exactamente 1
    const go = (dir) => {
        setI((prev) => (prev + dir + n) % n);
        pauseAutoplay();
        resetCycle();
    };

    const set = (idx) => {
        setI(idx);
        pauseAutoplay();
        resetCycle();
    };

    // Autoplay por tiempo absoluto (sin carreras con clics)
    useEffect(() => {
        clearTick();
        if (!autoPlay || n <= 1) {
            setProgress(0);
            return;
        }

        startRef.current = Date.now();
        setProgress(0);

        tickIdRef.current = setInterval(() => {
            const now = Date.now();
            if (hovering || now < pausedUntilRef.current) return;

            const elapsed = now - startRef.current;
            if (elapsed >= duration) {
                setI((prev) => (prev + 1) % n);
                startRef.current = now;
                setProgress(0);
            } else {
                setProgress((elapsed / duration) * 100);
            }
        }, 100);

        return clearTick;
    }, [autoPlay, duration, n, hovering]);

    // Centrar miniatura activa SOLO dentro del rail (sin tocar el scroll de la página)
    useEffect(() => {
        const rail = railRef.current;
        if (!rail) return;
        const item = rail.querySelector(`#thumb-${i}`);
        if (!item) return;

        const railRect = rail.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        const fullyVisible =
            itemRect.left >= railRect.left && itemRect.right <= railRect.right;
        if (fullyVisible) return;

        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const target = itemCenter - rail.clientWidth / 2;
        rail.scrollTo({ left: target, behavior: "smooth" });
    }, [i]);

    return (
        <>
            <div
                className="group"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                    setHovering(false);
                    resetCycle();
                }}
                aria-label={ariaLabel}
            >
                {/* === Carrusel principal === */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.04] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${i * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="relative min-w-full">
                                {/* Imagen completa sin recorte (fondo AZUL) */}
                                <div className="relative w-full max-h-[80vh] bg-[#0f2237] flex items-center justify-center">
                                    {img.src ? (
                                        <img
                                            src={img.src}
                                            alt={img.alt || "Imagen"}
                                            className="max-h-[80vh] w-auto object-contain"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                                    )}
                                </div>

                                {/* línea superior dorada */}
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                                {/* contador 01 / n */}
                                {n > 1 && (
                                    <div className="absolute bottom-3 right-3 rounded-full bg-[#0d2034]/70 border border-white/20 px-3 py-1 text-[12px] text-white/90 backdrop-blur">
                                        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Flechas */}
                    {n > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label="Anterior"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[#0d2034]/70 p-2 backdrop-blur hover:bg-[#0d2034]/90"
                                aria-label="Siguiente"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Barra de progreso dorada */}
                    {autoPlay && n > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 h-[6px]">
                            <div className="mx-6 mb-3 h-[6px] rounded-full bg-white/15 backdrop-blur-sm">
                                <div
                                    className="h-[6px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] transition-[width] duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* === Miniaturas (sin snap, sin focus, sin scrollbars visibles) === */}
                {n > 1 && (
                    <div className="mt-4 flex items-center justify-center">
                        <div
                            ref={railRef}
                            className="thumb-rail flex gap-2 overflow-x-auto px-4 py-1"
                        >
                            {images.map((img, idx) => {
                                const selected = i === idx;
                                return (
                                    <button
                                        key={idx}
                                        id={`thumb-${idx}`}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()} // evita foco que empuja la página
                                        tabIndex={-1}
                                        onClick={() => set(idx)}
                                        className={`relative shrink-0 transition-all duration-300 ${selected ? "scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"
                                            }`}
                                    >
                                        <div
                                            className={`rounded-2xl p-[2px] ${selected
                                                    ? "bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                                    : "bg-white/20"
                                                }`}
                                        >
                                            <div className="rounded-[14px] overflow-hidden bg-[#0f2237]/90">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt || `Miniatura ${idx + 1}`}
                                                    className="h-16 w-24 md:h-20 md:w-28 object-cover"
                                                />
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Ocultar scrollbar de la rail de miniaturas */}
            <style>{`
        .thumb-rail {
          -ms-overflow-style: none;      /* IE/Edge */
          scrollbar-width: none;         /* Firefox */
          overscroll-behavior-x: contain;/* evita rebotes */
        }
        .thumb-rail::-webkit-scrollbar { display: none; } /* Chrome/Safari */
      `}</style>
        </>
    );
}






/* ============================ Página ============================ */
export default function Doctores() {
    useEffect(() => {
        document.title = "Nuestros doctores | Dental City";
    }, []);

    const imagesDC = useMemo(
        () => [
            
            
            { src: dc3, alt: "Tecnología digital" },
            { src: dc4, alt: "Tecnología digital" },
            { src: dc5, alt: "Tecnología digital" },
            { src: dc6, alt: "Tecnología digital" },
            { src: dc7, alt: "Tecnología digital" },
            { src: dc8, alt: "Tecnología digital" },
            { src: dc9, alt: "Tecnología digital" },
            { src: dc10, alt: "Tecnología digital" },
            { src: dc11, alt: "Tecnología digital" },
            { src: dc12, alt: "Tecnología digital" },
            { src: dc13, alt: "Tecnología digital" },
            { src: dc14, alt: "Tecnología digital" },
            { src: dc15, alt: "Tecnología digital" },
            { src: dc16, alt: "Tecnología digital" },
            { src: dc17, alt: "Tecnología digital" },
            { src: dc18, alt: "Tecnología digital" },
            { src: dc19, alt: "Tecnología digital" },
            
        ],
        []
    );
    const imagesKids = useMemo(
        () => [
            { src: kids0, alt: "Dental City Kids" },
            { src: kids1, alt: "Ambiente pediátrico" },
            { src: kids2, alt: "Atención a niños" },
            { src: kids3, alt: "Atención a niños" },
            { src: kids4, alt: "Atención a niños" },
            { src: kids5, alt: "Atención a niños" },
            { src: kids6, alt: "Atención a niños" },
            { src: kids22, alt: "Atención a niños" },
            { src: kids21, alt: "Atención a niños" },
            { src: kids20, alt: "Atención a niños" },
            { src: kids19, alt: "Atención a niños" },
            { src: kids18, alt: "Atención a niños" },
            { src: kids17, alt: "Atención a niños" },
            { src: kids16, alt: "Atención a niños" },
            { src: kids15, alt: "Atención a niños" },
            { src: kids14, alt: "Atención a niños" },
            { src: kids13, alt: "Atención a niños" },
            { src: kids12, alt: "Atención a niños" },
            { src: kids11, alt: "Atención a niños" },
            { src: kids10, alt: "Atención a niños" },
            { src: kids9, alt: "Atención a niños" },
            { src: kids8, alt: "Atención a niños" },
            { src: kids7, alt: "Atención a niños" },
            
            
        ],
        []
    );

    const stats = [
        ["Ortodoncistas", "5"],
        ["Odontólogos generales", "9"],
        ["Rehabilitadores", "5"],
        ["Periodoncistas", "2"],
        ["Endodoncistas", "2"],
        ["Cirujano maxilofacial", "1"],
        ["Cirujanos orales", "2"],
        ["Odontopediatra", "1"],
        ["Implantólogo", "1"],
    ];

    return (
        <>
            <TopBar />
            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-12 md:py-14">
                        <div className="text-center">
                            <div className="text-xs tracking-[0.35em] text-white/50">
                                EQUIPO
                            </div>
                            <h1 className="mt-3 inline-block text-3xl md:text-5xl font-semibold relative">
                                <span className="golden-sweep">Nuestros doctores</span>
                                <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </h1>
                            <p className="mx-auto mt-8 max-w-3xl text-white/85 leading-relaxed">
                                <strong>Dental City</strong> es la clínica dental más grande del área metropolitana de Guadalajara.
                                Con más de <strong>25 años</strong> de trayectoria, atendemos a la comunidad de la Zona Real de Zapopan,
                                pacientes de otros estados y visitantes del extranjero. Contamos con <strong>todas las especialidades</strong> y
                                <strong> dos sucursales</strong>, incluyendo <strong>Dental City Kids</strong>, enfocada en odontopediatría y ortodoncia.
                            </p>
                            <p className="mx-auto mt-4 max-w-3xl text-white/80 leading-relaxed">
                                Innovamos constantemente en <em>odontología digital</em> para tratamientos más precisos y eficientes, siempre con nuestro
                                sello de calidad que nos distingue.
                            </p>
                        </div>
                    </Container>
                </section>

                {/* Estadísticas */}
                <section className="pt-6 md:pt-8">
                    <Container>
                        <div className="relative mx-auto mt-2 w-full max-w-sm">
                            <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)] golden-hover always-golden">
                                <div className="relative rounded-[26px] bg-[#0f2237]/80 px-6 py-8 text-center">
                                    <div className="text-6xl font-semibold leading-none tracking-tight text-[#e4b892]">
                                        28
                                    </div>
                                    <div className="mt-3 text-sm uppercase tracking-[.2em] text-white/85">
                                        Dentistas
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Grid de especialidades */}
                <section className="pt-10 md:pt-12 pb-12 md:pb-14 mt-10 md:mt-14">
                    <Container>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-3">
                            {stats.map(([label, value], idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="rounded-2xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_10px_30px_rgba(0,0,0,.25)] golden-hover"
                                >
                                    <div className="rounded-2xl bg-[#0f2237]/90 px-3 py-4 md:px-4 md:py-5 backdrop-blur-sm text-center">
                                        <div className="text-2xl md:text-3xl font-semibold text-[#e4b892] leading-none">
                                            {value}
                                        </div>
                                        <div className="mt-1 text-[11px] md:text-sm text-white/80 leading-snug">
                                            {label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City */}
                <section className="pb-10">
                    <Container>
                        <SectionTitle
                            eyebrow="• CLÍNICA PRINCIPAL •"
                            title={<span className="golden-sweep">Dental City</span>}
                        />
                        <div className="mt-6">
                            <Carousel images={imagesDC} ariaLabel="Doctores Dental City" />
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City Kids */}
                <section className="pb-16">
                    <Container>
                        <SectionTitle
                            eyebrow="• ODONTOPEDIATRÍA Y ORTODONCIA •"
                            title={<span className="golden-sweep">Dental City Kids & Family</span>}
                        />
                        <div className="mt-6">
                            <Carousel images={imagesKids} ariaLabel="Doctores Dental City Kids" />
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Estilos extra */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
        .golden-hover {
          transition: box-shadow .3s ease, transform .3s ease, filter .3s ease;
        }
        .golden-hover:hover {
          box-shadow: 0 14px 40px rgba(232,200,146,.35), 0 0 0 1px rgba(232,200,146,.35) inset;
          transform: translateY(-2px);
          filter: saturate(1.05);
        }
        .always-golden {
          box-shadow: 0 14px 40px rgba(232,200,146,.35), 0 0 0 1px rgba(232,200,146,.25) inset;
        }
      `}</style>
        </>
    );
}

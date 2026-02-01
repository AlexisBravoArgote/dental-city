// src/pages/Doctores.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";
import Footer from "../components/Footer.jsx";
import SEO from "../components/SEO.jsx";
import StructuredData from "../components/StructuredData.jsx";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

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
import dc20 from "../assets/DCdoctor20.jpg";
import dc21 from "../assets/DCdoctor21.jpg";
import dc22 from "../assets/DCdoctor22.jpg";
import dc23 from "../assets/DCdoctor23.jpg";

import dc25 from "../assets/DCdoctor25.jpg";
import dc26 from "../assets/DCdoctor26.jpg";
import dc27 from "../assets/DCdoctor27.jpg";
import dc28 from "../assets/DCdoctor28.jpg";
import dc29 from "../assets/DCdoctor29.jpg";
import kids0 from "../assets/kids0.jpg";
import kids2 from "../assets/kids2.jpg";
import kids3 from "../assets/kids3.jpg";
import kids4 from "../assets/kids4.jpg";
import kids5 from "../assets/kids5.jpg";
import kids6 from "../assets/kids6.jpg";
import kids7 from "../assets/kids7.jpg";
import kids8 from "../assets/kids8.jpg";
import kids9 from "../assets/kids9.jpg";
import kids10 from "../assets/kids10.jpg";
import kids11 from "../assets/kids11.jpg";
import kids12 from "../assets/kids12.jpg";
import kids13 from "../assets/kids13.jpg";
import kids14 from "../assets/kids14.jpg";
import kids15 from "../assets/kids15.jpg";
import kids16 from "../assets/kids16.jpg";
import kids17 from "../assets/kids17.jpg";
import kids18 from "../assets/kids18.jpg";
import kids19 from "../assets/kids19.jpg";
import kids20 from "../assets/kids20.jpg";
import kids21 from "../assets/kids21.jpg";
import kids22 from "../assets/kids22.jpg";

/* ----------------------------- Helpers UI ----------------------------- */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}
function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e4b89233] bg-white/5 px-2 py-1 md:px-3 text-[10px] md:text-[11px] tracking-[.15em] md:tracking-[.35em] text-[#e4b892] whitespace-nowrap">
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

/* ----------------------------- Carousel ----------------------------- */
function Carousel({
    images = [],
    ariaLabel = "gallery",
    autoPlay = true,
    duration = 7000,
    prevLabel = "Previous",
    nextLabel = "Next",
}) {
    const [i, setI] = useState(0);
    const n = images.length || 1;
    const [progress, setProgress] = useState(0);
    const [hovering, setHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const tickIdRef = useRef(null);
    const startRef = useRef(Date.now());
    const pausedUntilRef = useRef(0);

    const railRef = useRef(null);
    const carouselRef = useRef(null);

    const clearTick = () => {
        if (tickIdRef.current) {
            clearInterval(tickIdRef.current);
            tickIdRef.current = null;
        }
    };

    const resetCycle = () => {
        startRef.current = Date.now();
        setProgress(0);
    };

    const pauseAutoplay = (ms = Math.max(1200, Math.floor(duration * 0.75))) => {
        pausedUntilRef.current = Date.now() + ms;
    };

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

    // IntersectionObserver para detectar cuando el carrusel está visible
    useEffect(() => {
        if (!carouselRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0.3, // Se considera visible cuando al menos 30% está en viewport
            }
        );

        observer.observe(carouselRef.current);

        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    useEffect(() => {
        clearTick();
        // Solo iniciar autoplay si está visible, autoPlay está activo y hay más de 1 imagen
        if (!autoPlay || n <= 1 || !isVisible) {
            // Si no está visible, reiniciar el progreso
            if (!isVisible) {
                setProgress(0);
            }
            return;
        }

        // Reiniciar cuando se vuelve visible
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
    }, [autoPlay, duration, n, hovering, isVisible]);

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
                ref={carouselRef}
                className="group"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => {
                    setHovering(false);
                    resetCycle();
                }}
                aria-label={ariaLabel}
            >
                {/* Principal */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.08] via-white/[.04] to-white/[.02] shadow-[0_20px_60px_rgba(0,0,0,.4)] backdrop-blur-xl group/carousel w-full">
                    {/* Borde decorativo superior */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e4b892]/60 to-transparent z-10" />
                    
                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e4b892]/5 via-transparent to-transparent pointer-events-none z-10" />
                    
                    <div
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] w-full"
                        style={{ transform: `translateX(-${i * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <div key={idx} className="relative min-w-full flex-shrink-0 w-full">
                                <div className="relative w-full h-[60vh] md:h-auto md:max-h-[80vh] bg-gradient-to-br from-[#0f2237] to-[#0b1b2b] flex items-center justify-center overflow-hidden">
                                    {img.src ? (
                                        <img
                                            src={img.src}
                                            alt={img.alt || "Imagen"}
                                            className="w-full h-full object-cover md:w-auto md:h-auto md:max-h-[80vh] md:object-contain transition-transform duration-700 group-hover/carousel:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.08),transparent_60%)]" />
                                    )}
                                    
                                    {/* Overlay sutil en los bordes */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2237]/40 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#0f2237]/40 via-transparent to-transparent pointer-events-none" />
                                </div>

                                {n > 1 && (
                                    <div className="absolute bottom-4 right-4 rounded-full bg-gradient-to-br from-[#0d2034]/90 to-[#0b1b2b]/90 border border-[#e4b892]/30 px-4 py-2 text-sm font-semibold text-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,.4)] ring-1 ring-white/10">
                                        <span className="text-[#e4b892]">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="text-white/50 mx-1.5">/</span>
                                        <span className="text-white/80">{String(n).padStart(2, "0")}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Flechas modernas */}
                    {n > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => go(-1)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-gradient-to-br from-[#0d2034]/90 to-[#0b1b2b]/90 p-3 backdrop-blur-md hover:bg-gradient-to-br hover:from-[#e4b892]/20 hover:to-[#c89b7b]/20 hover:border-[#e4b892]/40 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,.4)] hover:shadow-[0_6px_20px_rgba(228,184,146,.3)] hover:scale-110 active:scale-95 group/btn"
                                aria-label={prevLabel}
                                title={prevLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90 group-hover/btn:text-[#e4b892] transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => go(1)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-gradient-to-br from-[#0d2034]/90 to-[#0b1b2b]/90 p-3 backdrop-blur-md hover:bg-gradient-to-br hover:from-[#e4b892]/20 hover:to-[#c89b7b]/20 hover:border-[#e4b892]/40 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,.4)] hover:shadow-[0_6px_20px_rgba(228,184,146,.3)] hover:scale-110 active:scale-95 group/btn"
                                aria-label={nextLabel}
                                title={nextLabel}
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/90 group-hover/btn:text-[#e4b892] transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Barra de progreso moderna */}
                    {autoPlay && n > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 z-20">
                            <div className="mx-6 mb-4 h-[4px] rounded-full bg-white/10 backdrop-blur-sm overflow-hidden border border-white/5">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] transition-[width] duration-100 ease-linear relative overflow-hidden"
                                    style={{ width: `${progress}%` }}
                                >
                                    {/* Efecto de brillo animado */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Miniaturas modernas */}
                {n > 1 && (
                    <div className="mt-6 flex items-center justify-center overflow-x-hidden w-full">
                        <div ref={railRef} className="thumb-rail flex gap-3 overflow-x-auto px-4 py-2 overscroll-x-contain max-w-full">
                            {images.map((img, idx) => {
                                const selected = i === idx;
                                return (
                                    <button
                                        key={idx}
                                        id={`thumb-${idx}`}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        tabIndex={-1}
                                        onClick={() => set(idx)}
                                        className={`relative shrink-0 transition-all duration-300 group/thumb ${
                                            selected 
                                                ? "scale-110 z-10" 
                                                : "opacity-70 hover:opacity-100 hover:scale-105"
                                        }`}
                                        aria-label={(img.alt || "Imagen") + ` ${idx + 1}`}
                                        title={(img.alt || "Imagen") + ` ${idx + 1}`}
                                    >
                                        <div
                                            className={`rounded-xl overflow-hidden transition-all duration-300 ${
                                                selected
                                                    ? "p-[3px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] shadow-[0_4px_16px_rgba(228,184,146,.4)] ring-2 ring-[#e4b892]/50"
                                                    : "p-[2px] bg-white/20 hover:bg-white/30 border border-white/10"
                                            }`}
                                        >
                                            <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#0f2237] to-[#0b1b2b] relative">
                                                <img
                                                    src={img.src}
                                                    alt={img.alt || `Miniatura ${idx + 1}`}
                                                    className={`h-20 w-28 md:h-24 md:w-36 object-cover transition-transform duration-300 ${
                                                        selected ? "brightness-110" : "brightness-90 group-hover/thumb:brightness-100"
                                                    }`}
                                                />
                                                {/* Overlay sutil cuando está seleccionado */}
                                                {selected && (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#e4b892]/20 via-transparent to-transparent pointer-events-none" />
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Indicador de selección */}
                                        {selected && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-gradient-to-r from-[#c89b7b] to-[#e4b892]" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Ocultar scrollbar y prevenir overflow */}
            <style>{`
        .thumb-rail { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          overscroll-behavior-x: contain; 
          -webkit-overflow-scrolling: touch;
        }
        .thumb-rail::-webkit-scrollbar { display: none; }
      `}</style>
        </>
    );
}

/* ============================ Página ============================ */
export default function Doctores() {
    const { t, i18n } = useTranslation();

    // Title
    useEffect(() => {
        const title = t("metaTitle", { defaultValue: "Nuestros doctores | Dental City" });
        document.title = title;
    }, [t]);

    // Structured Data para Medical Organization
    const medicalOrgData = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Dental City",
        "description": "Clínica dental con más de 25 años de experiencia. Contamos con 29 dentistas especializados en todas las áreas de odontología.",
        "url": "https://dentalcity.mx/doctores",
        "medicalSpecialty": [
            "Orthodontics",
            "General Dentistry",
            "Pediatric Dentistry",
            "Periodontics",
            "Endodontics",
            "Oral Surgery",
            "Cosmetic Dentistry",
            "Dental Implants"
        ],
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "29"
        }
    };

    // ---------- Selector de idioma (🌐) ----------
    const [openLang, setOpenLang] = useState(false);
    const langWrapRef = useRef(null);
    useEffect(() => {
        const onDocClick = (e) => {
            if (langWrapRef.current && !langWrapRef.current.contains(e.target)) setOpenLang(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpenLang(false);
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const languages = [
        { code: "es", flag: "🇪🇸", label: "Español" },
        { code: "en", flag: "🇬🇧", label: "English" },
        { code: "fr", flag: "🇫🇷", label: "Français" },
        { code: "zh", flag: "🇨🇳", label: "中文" },
        { code: "ja", flag: "🇯🇵", label: "日本語" },
        { code: "ko", flag: "🇰🇷", label: "한국어" },
        { code: "it", flag: "🇮🇹", label: "Italiano" },
        { code: "de", flag: "🇩🇪", label: "Deutsch" },
    ];

    const changeLang = async (code) => {
        await i18n.changeLanguage(code);
        localStorage.setItem("lang", code);
        setOpenLang(false);
    };

    // Botón + menú de idioma (TOP-RIGHT; móvil mitad de tamaño)
    // dentro del componente Doctores()
    const LanguageBoutique = () => (
        <div
            ref={langWrapRef}
            // Móvil un poquito más a la derecha; desktop como antes
            className="fixed top-2 right-1 md:top-4 md:right-4 z-[90]"
        >
            <button
                type="button"
                onClick={() => setOpenLang((v) => !v)}
                className="
        // --- Estilos MÓVIL (solo el emoji, sin círculo) ---
        p-0 border-0 bg-transparent shadow-none
        // --- Estilos DESKTOP (lo mismo que tenías) ---
        md:p-3 md:inline-flex md:items-center md:justify-center md:rounded-full md:border
        md:border-[#e4b89240] md:bg-[#0b1b2b99] md:backdrop-blur-md md:text-white
        md:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        md:hover:brightness-110 md:active:scale-[0.98] md:transition-all
      "
                aria-haspopup="menu"
                aria-expanded={openLang}
                aria-label={t('languageLabel', { defaultValue: 'Language' })}
                title={t('languageLabel', { defaultValue: 'Language' })}
            >
                {/* Emoji globo: móvil más pequeño; desktop como antes */}
                <span
                    aria-hidden="true"
                    className="select-none leading-none translate-y-[1px] text-[18px] md:text-[20px]"
                >
                    🌐
                </span>
            </button>

            {openLang && (
                <div
                    role="menu"
                    className="
          mt-2 w-[220px] md:w-[300px]
          rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 text-white/90
          backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.55)] p-2
        "
                >
                    <div className="grid grid-cols-2 gap-2">
                        {languages.map((it) => {
                            const active = i18n.language?.startsWith(it.code);
                            return (
                                <button
                                    key={it.code}
                                    type="button"
                                    onClick={() => changeLang(it.code)}
                                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left
                  hover:bg-white/10 transition
                  ${active ? "bg-white/10 ring-1 ring-[#e4b89266]" : ""}`}
                                    role="menuitem"
                                    aria-label={it.label}
                                    title={it.label}
                                >
                                    <span className="text-sm md:text-lg">{it.flag}</span>
                                    <span className="text-[12px] md:text-sm opacity-90">{it.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );


    // ---------- Imágenes con alts descriptivos para SEO ----------
    const imagesDC = useMemo(
        () => [
            { src: dc3, alt: "Equipo de dentistas especialistas en Dental City Zapopan - Tecnología dental avanzada" },
            { src: dc4, alt: "Doctores dentistas profesionales en clínica dental Zapopan, Jalisco" },
            { src: dc5, alt: "Especialistas en odontología trabajando con tecnología digital en Dental City" },
            { src: dc6, alt: "Equipo médico dental multidisciplinario en Zapopan, Guadalajara" },
            { src: dc7, alt: "Dentistas especializados utilizando equipos de última generación" },
            { src: dc23, alt: "Profesionales de la salud dental en consulta con pacientes" },
            { src: dc8, alt: "Ortodoncistas y especialistas dentales en Dental City" },
            { src: dc9, alt: "Equipo de odontólogos expertos en tratamientos dentales avanzados" },
            { src: dc22, alt: "Doctores dentistas realizando procedimientos con tecnología moderna" },
            { src: dc10, alt: "Especialistas en implantes dentales y prostodoncia en Zapopan" },
            { src: dc11, alt: "Periodoncistas y endodoncistas en clínica dental Dental City" },
            { src: dc12, alt: "Cirujanos maxilofaciales y orales trabajando en equipo" },
            { src: dc13, alt: "Dentistas generales y especialistas en atención dental integral" },
            { src: dc14, alt: "Equipo profesional de odontología con más de 25 años de experiencia" },
            { src: dc15, alt: "Doctores dentistas comprometidos con la excelencia clínica" },
            { src: dc16, alt: "Especialistas en estética dental y rehabilitación oral" },
            { src: dc17, alt: "Profesionales de la odontología en consultorio moderno" },
            { src: dc18, alt: "Equipo multidisciplinario de dentistas en Dental City Zapopan" },
            { src: dc19, alt: "Doctores especializados en todas las áreas de la odontología" },
            { src: dc20, alt: "Dentistas profesionales utilizando escáneres digitales 3D" },
            { src: dc21, alt: "Equipo de 29 dentistas especializados en Zapopan, Jalisco" },
            { src: dc22, alt: "Profesionales de la salud dental con formación continua" },
            
            { src: dc25, alt: "Especialistas en ortodoncia y odontopediatría en Dental City" },
            { src: dc26, alt: "Doctores dentistas trabajando con tecnología de vanguardia" },
            { src: dc27, alt: "Equipo médico dental comprometido con la calidad y seguridad" },
            { src: dc28, alt: "Profesionales de la odontología en clínica dental moderna" },
            { src: dc29, alt: "Dentistas especializados brindando atención de excelencia" },
        ],
        [t]
    );
    const imagesKids = useMemo(
        () => [
            { src: kids0, alt: "Odontopediatras y ortodoncistas infantiles en Dental City Kids & Family Zapopan" },
            { src: kids2, alt: "Especialistas en atención dental para niños y adolescentes" },
            { src: kids3, alt: "Odontopediatras trabajando con tecnología amigable para niños" },
            { src: kids4, alt: "Equipo de Dental City Kids especializado en ortodoncia infantil" },
            { src: kids5, alt: "Doctores dentistas pediátricos brindando atención dental a niños" },
            { src: kids6, alt: "Especialistas en odontopediatría y prevención dental infantil" },
            { src: kids22, alt: "Ortodoncistas infantiles utilizando técnicas modernas y amigables" },
            { src: kids21, alt: "Equipo de Dental City Kids & Family en consulta pediátrica" },
            { src: kids20, alt: "Odontopediatras expertos en atención dental para toda la familia" },
            { src: kids19, alt: "Especialistas en salud dental infantil en Zapopan, Jalisco" },
            { src: kids18, alt: "Doctores dentistas pediátricos con enfoque en prevención" },
            { src: kids17, alt: "Equipo multidisciplinario de odontopediatría y ortodoncia" },
            { src: kids16, alt: "Profesionales especializados en tratamientos dentales para niños" },
            { src: kids15, alt: "Odontopediatras utilizando técnicas no invasivas y amigables" },
            { src: kids14, alt: "Especialistas en ortodoncia interceptiva y preventiva infantil" },
            { src: kids13, alt: "Equipo de Dental City Kids comprometido con la salud bucal infantil" },
            { src: kids12, alt: "Doctores dentistas pediátricos en ambiente amigable y seguro" },
            { src: kids11, alt: "Odontopediatras y ortodoncistas trabajando con niños y adolescentes" },
            { src: kids10, alt: "Especialistas en atención dental familiar en Dental City Kids" },
            { src: kids9, alt: "Equipo profesional de odontopediatría en Zapopan, Jalisco" },
            { src: kids8, alt: "Doctores dentistas especializados en salud dental infantil" },
            { src: kids7, alt: "Odontopediatras y ortodoncistas infantiles con tecnología avanzada" },
        ],
        [t]
    );

    const stats = [
        [t("stat_ortho"), "5"],
        [t("stat_gd"), "9"],
        [t("stat_pros"), "5"],
        [t("stat_perio"), "2"],
        [t("stat_endo"), "2"],
        [t("stat_mfs"), "2"],
        [t("stat_oral"), "2"],
        [t("stat_pedo"), "1"],
        [t("stat_implant"), "1"],
    ];

    return (
        <>
            <SEO 
                title="Nuestros Doctores - 29 Dentistas Especializados | Dental City Zapopan"
                description="Conoce a nuestro equipo de 29 dentistas especializados en todas las áreas de odontología en Dental City. Ortodoncistas, implantólogos, odontopediatras, periodoncistas y más. Más de 25 años de experiencia en Zapopan, Jalisco. Clínica dental con tecnología de vanguardia."
                keywords="dentistas Zapopan, odontólogos Guadalajara, especialistas dentales, equipo dental, clínica dental, ortodoncistas Zapopan, implantólogos Guadalajara, odontopediatras, periodoncistas, endodoncistas, cirujanos maxilofaciales, protesistas dentales"
            />
            <StructuredData data={medicalOrgData} />
            <TopBar />
            <LanguageBoutique />

            <main className="min-h-dvh bg-[#0f2237] overflow-x-hidden">
                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2237] via-[#0b1b2b] to-[#0f2237]">
                    {/* Efectos de fondo decorativos */}
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-[#e4b892]/10 blur-3xl" />
                        <div className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-[#c89b7b]/10 blur-3xl" />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-16 md:py-20 relative z-10">
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-xs tracking-[0.35em] text-[#e4b892]/80 uppercase mb-4"
                            >
                                {t("eyebrowTeam")}
                            </motion.div>
                            <h1 className="mt-3 inline-block text-4xl md:text-6xl font-bold relative">
                                <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">{t("pageTitle")}</span>
                                <span className="absolute left-0 right-0 -bottom-3 h-[3px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mx-auto mt-10 max-w-3xl text-white/90 leading-relaxed text-lg"
                            >
                                {t("heroP1", {
                                    years: t("heroP1_years"),
                                    allSpecs: t("heroP1_allSpecs"),
                                    twoBranches: t("heroP1_twoBranches"),
                                    kids: t("heroP1_kids"),
                                })}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mx-auto mt-5 max-w-3xl text-white/75 leading-relaxed"
                            >
                                {t("heroP2")}
                            </motion.p>
                            
                            {/* Contenido adicional para SEO */}
                            <div className="mx-auto mt-8 max-w-3xl text-white/80 leading-relaxed text-base">
                                <p className="mb-4">
                                    Nuestro equipo multidisciplinario está formado por <strong>29 profesionales de la odontología</strong> altamente capacitados, incluyendo <strong>5 ortodoncistas</strong>, <strong>9 dentistas generales</strong>, <strong>5 protesistas</strong>, <strong>2 periodoncistas</strong>, <strong>2 endodoncistas</strong>, <strong>2 cirujanos maxilofaciales</strong>, <strong>2 cirujanos orales</strong>, <strong>1 odontopediatra</strong> y <strong>1 implantólogo</strong>. Cada especialista aporta años de experiencia y formación continua para brindar la mejor atención dental en Zapopan, Jalisco.
                                </p>
                                <p>
                                    Trabajamos con tecnología digital de última generación y seguimos los más altos estándares de calidad y seguridad. Nuestros doctores están comprometidos con la educación continua y la innovación en tratamientos dentales para ofrecer resultados excepcionales a nuestros pacientes.
                                </p>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Estadísticas Principal */}
                <section className="pt-8 md:pt-12" aria-labelledby="estadisticas-titulo">
                    <Container>
                        <h2 id="estadisticas-titulo" className="sr-only">Estadísticas de nuestro equipo dental</h2>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative mx-auto mt-2 w-full max-w-md"
                        >
                            <div className="relative">
                                {/* Círculo decorativo de fondo */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e4b892]/20 via-[#c89b7b]/10 to-transparent blur-2xl scale-150" />
                                
                                <div className="relative rounded-full bg-gradient-to-br from-[#e4b892]/30 via-[#c89b7b]/20 to-[#e4b892]/30 p-[3px] shadow-[0_20px_60px_rgba(228,184,146,.4)]">
                                    <div className="relative rounded-full bg-gradient-to-br from-[#0f2237] to-[#0b1b2b] px-10 py-12 text-center backdrop-blur-sm">
                                        <div className="text-7xl md:text-8xl font-bold leading-none tracking-tight bg-gradient-to-br from-[#e4b892] via-[#f4d3b3] to-[#e4b892] bg-clip-text text-transparent">
                                            29
                                        </div>
                                        <div className="mt-4 text-sm uppercase tracking-[.3em] text-[#e4b892]/90 font-medium">
                                            {t("dentistsCount")}
                                        </div>
                                        {/* Puntos decorativos */}
                                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#e4b892]/60 animate-pulse" />
                                        <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-[#c89b7b]/60 animate-pulse delay-300" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Container>
                </section>

                {/* Grid de especialidades - Círculos pequeños */}
                <section className="pt-10 md:pt-12 pb-12 md:pb-16 mt-8 md:mt-10" aria-labelledby="especialidades-titulo">
                    <Container>
                        <h2 id="especialidades-titulo" className="text-center text-2xl md:text-3xl font-semibold mb-8 text-white/90">
                            <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">Especialidades de Nuestro Equipo</span>
                        </h2>
                        <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
                            {stats.map(([label, value], idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        delay: idx * 0.05,
                                        duration: 0.4
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className="group relative flex justify-center"
                                >
                                    <div className="relative w-full max-w-[140px] mx-auto">
                                        {/* Círculo decorativo de fondo */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e4b892]/15 via-[#c89b7b]/10 to-transparent blur-xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="relative rounded-full bg-gradient-to-br from-[#e4b892]/30 via-[#c89b7b]/20 to-[#e4b892]/30 p-[2px] shadow-[0_8px_24px_rgba(228,184,146,.3)] group-hover:shadow-[0_12px_32px_rgba(228,184,146,.4)] transition-shadow">
                                            <div className="relative rounded-full bg-gradient-to-br from-[#0f2237] to-[#0b1b2b] p-5 md:p-6 text-center backdrop-blur-sm aspect-square flex flex-col justify-center items-center">
                                                <div className="text-3xl md:text-4xl font-bold leading-none tracking-tight bg-gradient-to-br from-[#e4b892] via-[#f4d3b3] to-[#e4b892] bg-clip-text text-transparent mb-2">
                                                    {value}
                                                </div>
                                                <div className="text-[10px] md:text-xs text-white/85 leading-tight font-medium line-clamp-2 px-1">
                                                    {label}
                                                </div>
                                                
                                                {/* Puntos decorativos */}
                                                <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#e4b892]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-[#c89b7b]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City */}
                <section className="pb-12 md:pb-16 relative" aria-labelledby="clinica-principal-titulo">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#e4b892]/30 blur-3xl" />
                    </div>
                    <Container className="relative z-10">
                        <div id="clinica-principal-titulo">
                            <SectionTitle
                                eyebrow={t("eyebrowMainClinic")}
                                title={<span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">{t("titleMainClinic")}</span>}
                            />
                        </div>
                        <p className="text-center mt-4 text-white/80 max-w-2xl mx-auto">
                            Nuestro equipo de especialistas en la clínica principal de Dental City, ubicada en la Zona Real de Zapopan. Profesionales altamente capacitados en todas las áreas de la odontología moderna.
                        </p>
                        <div className="mt-8">
                            <Carousel
                                images={imagesDC}
                                ariaLabel={t("ariaMainCarousel")}
                                prevLabel={t("ariaPrev")}
                                nextLabel={t("ariaNext")}
                            />
                        </div>
                    </Container>
                </section>

                {/* Carrusel Dental City Kids */}
                <section className="pb-20 md:pb-24 relative" aria-labelledby="clinica-kids-titulo">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#c89b7b]/30 blur-3xl" />
                    </div>
                    <Container className="relative z-10">
                        <div id="clinica-kids-titulo">
                            <SectionTitle
                                eyebrow={t("eyebrowKids")}
                                title={<span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">{t("titleKids")}</span>}
                            />
                        </div>
                        <p className="text-center mt-4 text-white/80 max-w-2xl mx-auto">
                            Especialistas en odontopediatría y ortodoncia infantil en Dental City Kids & Family. Nuestro equipo está especialmente entrenado para brindar atención dental amigable y efectiva a niños y adolescentes en Zapopan, Jalisco.
                        </p>
                        <div className="mt-8">
                            <Carousel
                                images={imagesKids}
                                ariaLabel={t("ariaKidsCarousel")}
                                prevLabel={t("ariaPrev")}
                                nextLabel={t("ariaNext")}
                            />
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
            <FloatingCtaDoctores />

            {/* Estilos extra */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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

/* ============================ FloatingCta para página de doctores ============================ */
function FloatingCtaDoctores() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // Visibilidad condicional (solo móvil después del hero)
    const [isMobile, setIsMobile] = useState(false);
    const [showAfterHero, setShowAfterHero] = useState(true);

    useEffect(() => {
        const updateIsMobile = () => setIsMobile(window.innerWidth < 640);
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setShowAfterHero(true);
            return;
        }
        const onScroll = () => {
            const threshold = window.innerHeight * 0.8;
            const visible = window.scrollY > threshold;
            setShowAfterHero(visible);
            if (!visible) setOpen(false);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isMobile]);

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

        setOpen(false);
        
        // Navegar al home con hash de ubicaciones
        navigate("/#ubicacion");
        
        // Esperar a que la página cargue y luego activar el tab y hacer scroll
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const el = document.querySelector("#ubicacion");
                    if (!el) return;

                    const isMobile = window.innerWidth < 640;
                    if (isMobile) {
                        const extra = 195;
                        const y = el.getBoundingClientRect().top + window.scrollY + extra;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    } else {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                });
            });
        }, 100);
    };

    const visible = !isMobile || showAfterHero;

    return (
        <div
            ref={wrapRef}
            className={[
                "fixed bottom-5 right-5 z-50 transition-all duration-300",
                visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
            ].join(" ")}
        >
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
                {t("hero.book", { defaultValue: "Agendar cita" })}
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
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => go("Dental City Kids & Family")}
                            className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left transition hover:bg-[#d8a07b]/15"
                            role="menuitem"
                        >
                            <span>Dental City Kids & Family</span>
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}



   
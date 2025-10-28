﻿// src/components/TopBar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ IMPORTANTE
import logoPng from "../assets/download.avif";
const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

/* Helpers / Layout */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>
            {children}
        </div>
    );
}
function LogoImage({ className = "h-18 w-auto" }) {
    return (
        <div className="flex items-center">
            <img
                src={logoPng}
                alt="Dental City"
                className={className}
                loading="eager"
                decoding="async"
            />
        </div>
    );
}

/* Scroll helper para cuando ya estamos en "/" */
function scrollToId(hash) {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* Scroll a #ubicacion y selecciona pestaña */
function navigateToLocation(tabKey) {
    try { sessionStorage.setItem("initialTab", tabKey); } catch { }
    if (location.pathname !== "/") {
        window.location.assign("/#ubicacion");
        return;
    }
    const el = document.querySelector("#ubicacion");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (location.hash !== "#ubicacion") location.hash = "#ubicacion";
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent("select-location-tab", { detail: tabKey }));
    }, 0);
}

/* TOP BAR */
export default function TopBar({ bgOpacity }) {
    const hasMotion =
        bgOpacity &&
        typeof bgOpacity.get === "function" &&
        typeof bgOpacity.to === "function";

    const clamp = (v) => Math.max(0, Math.min(v ?? 1, 1));
    const raw = hasMotion ? bgOpacity.get() : 1;
    const headerBg = `rgba(21, 43, 83, ${clamp(raw)})`;

    // Si tenemos MotionValue, usamos .to(); si no, color plano
    const bgStyle = hasMotion
        ? { backgroundColor: bgOpacity.to((o) => `rgba(21, 43, 83, ${clamp(o)})`) }
        : { backgroundColor: headerBg };

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openGroup, setOpenGroup] = React.useState(null); // móvil
    const [openDesktop, setOpenDesktop] = React.useState(null); // 'clinicas' | 'recursos' | null

    // Refs para detectar clic fuera en desktop
    const clinicsRef = React.useRef(null);
    const recursosRef = React.useRef(null);

    React.useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
        if (mobileOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [mobileOpen]);

    // Esc para desktop dropdowns
    React.useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpenDesktop(null);
        if (openDesktop) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openDesktop]);

    // Cerrar dropdowns desktop al hacer clic fuera
    React.useEffect(() => {
        function handleClickOutside(e) {
            if (!openDesktop) return;
            const c = clinicsRef.current;
            const r = recursosRef.current;
            const clickedInsideClinics = c && c.contains(e.target);
            const clickedInsideRecursos = r && r.contains(e.target);
            if (!clickedInsideClinics && !clickedInsideRecursos) setOpenDesktop(null);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDesktop]);

    return (
        <motion.header
            style={bgStyle}
            className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.15)] relative"
        >
            {/* Líneas doradas animadas */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />

            <Container className="relative mx-auto flex max-w-7xl items-center justify-between py-5 md:py-6">
                {/* Logo */}
                <div className="relative inline-flex items-center justify-center rounded-full p-2 transition-transform duration-500 hover:scale-[1.03] hover:brightness-110">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg transition-all duration-500 hover:from-[#e4b89266]" />
                    <a href="/" className="relative z-10">
                        <LogoImage className="h-14 w-auto md:h-16 object-contain" />
                    </a>
                </div>

                {/* Botón hamburguesa (móvil) */}
                <button
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((v) => !v)}
                    className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-white/90 hover:bg-white/10 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        {mobileOpen ? (
                            <path d="M6 6l12 12M18 6L6 18" />
                        ) : (
                            <>
                                <path d="M3 6h18" />
                                <path d="M3 12h18" />
                                <path d="M3 18h18" />
                            </>
                        )}
                    </svg>
                </button>

                {/* Nav principal (desktop) */}
                <nav className="hidden items-center gap-8 md:flex text-[15px] font-medium tracking-wide">
                    {[
                        ["Nuestros tratamientos", "#servicios"],
                        ["Nuestras instalaciones", "#galeria"],
                    ].map(([label, hash]) => (
                        <a
                            key={hash}
                            href={`/${hash}`} // absoluto hacia home
                            onClick={(e) => {
                                if (location.pathname === "/") {
                                    e.preventDefault();
                                    if (location.hash !== hash) history.replaceState(null, "", hash);
                                    scrollToId(hash);
                                }
                            }}
                            className="text-white/80 transition hover:text-white hover:drop-shadow-[0_0_4px_rgba(228,184,146,0.6)]"
                        >
                            {label}
                        </a>
                    ))}

                    {/* Dropdown: Nuestras clínicas (desktop) */}
                    <div className="relative" ref={clinicsRef}>
                        <button
                            type="button"
                            onClick={() =>
                                setOpenDesktop((v) => (v === "clinicas" ? null : "clinicas"))
                            }
                            className="flex items-center gap-1 text-white/80 transition hover:text-white hover:drop-shadow-[0_0_4px_rgba(228,184,146,0.6)]"
                        >
                            Nuestras clínicas
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform duration-300 ${openDesktop === "clinicas" ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <div className={`absolute left-1/2 top-[120%] z-50 w-56 -translate-x-1/2 rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-[#e4b89266] ${openDesktop === "clinicas" ? "block" : "hidden"}`}>
                            <button
                                type="button"
                                onClick={() => { navigateToLocation("Dental City"); setOpenDesktop(null); }}
                                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                            >
                                Dental City
                            </button>
                            <button
                                type="button"
                                onClick={() => { navigateToLocation("Dental City Kids & Family"); setOpenDesktop(null); }}
                                className="mt-1 block w-full rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
                            >
                                Dental City Kids & Family
                            </button>
                        </div>
                    </div>

                    <a
                        href="/doctores"
                        className="text-white/80 transition hover:text-white hover:drop-shadow-[0_0_4px_rgba(228,184,146,0.6)]"
                    >
                        Nuestros doctores
                    </a>

                    {/* Dropdown: Recursos (desktop) */}
                    <div className="relative" ref={recursosRef}>
                        <button
                            type="button"
                            onClick={() =>
                                setOpenDesktop((v) => (v === "recursos" ? null : "recursos"))
                            }
                            className="flex items-center gap-1 text-white/80 transition hover:text-white hover:drop-shadow-[0_0_4px_rgba(228,184,146,0.6)]"
                        >
                            Recursos
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform duration-300 ${openDesktop === "recursos" ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        <div className={`absolute left-1/2 top-[120%] z-50 w-56 -translate-x-1/2 rounded-2xl border border-[#e4b89233] bg-[#11243a]/95 p-2 text-white/90 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-[#e4b89266] ${openDesktop === "recursos" ? "block" : "hidden"}`}>
                            <a href="/blog" className="block rounded-xl px-4 py-3 transition hover:bg-white/10">
                                Blog & Research
                            </a>
                            <a href="/edu" className="block rounded-xl px-4 py-3 transition hover:bg-white/10">
                                Dental City Edu
                            </a>
                        </div>
                    </div>

                    <a
                        href="/bolsa"
                        className="text-white/80 transition hover:text-white hover:drop-shadow-[0_0_4px_rgba(228,184,146,0.6)]"
                    >
                        Bolsa de trabajo
                    </a>
                </nav>
            </Container>

            {/* Menú móvil fullscreen */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-hidden="true"
                            onClick={() => setMobileOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black"
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            className="fixed inset-0 z-50 h-dvh w-full bg-[#11243a]/95 text-white/90 backdrop-blur"
                            role="dialog"
                            aria-label="Menú"
                        >
                            <div className="flex h-full w-full flex-col p-4">
                                {/* Cabecera */}
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm tracking-[.25em] text-white/60">MENÚ</span>
                                    <button
                                        type="button"
                                        aria-label="Cerrar menú"
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-full border border-white/15 bg-white/5 p-2 hover:bg-white/10 transition"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 6l12 12M18 6L6 18" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />

                                <div className="flex flex-col gap-2 py-3 flex-1">
                                    <a href="/#servicios" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-[15px] hover:bg-white/10">
                                        Nuestros tratamientos
                                    </a>
                                    <a href="/#galeria" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-[15px] hover:bg-white/10">
                                        Nuestras instalaciones
                                    </a>

                                    {/* Grupo: Nuestras clínicas */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setOpenGroup((g) => (g === "clinicas" ? null : "clinicas"))}
                                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] hover:bg-white/10"
                                        >
                                            <span>Nuestras clínicas</span>
                                            <svg viewBox="0 0 24 24"
                                                className={`h-4 w-4 transition-transform ${openGroup === "clinicas" ? "rotate-180" : ""}`}
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {openGroup === "clinicas" && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden pl-2"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => { navigateToLocation("Dental City"); setMobileOpen(false); }}
                                                        className="mt-1 block w-full rounded-lg px-4 py-2.5 text-left text-[14px] text-white/90 hover:bg-white/10"
                                                    >
                                                        Dental City
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { navigateToLocation("Dental City Kids & Family"); setMobileOpen(false); }}
                                                        className="mt-1 block w-full rounded-lg px-4 py-2.5 text-left text-[14px] text-white/90 hover:bg-white/10"
                                                    >
                                                        Dental City Kids & Family
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <a href="/doctores" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-[15px] hover:bg-white/10">
                                        Nuestros doctores
                                    </a>

                                    {/* Grupo: Recursos */}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setOpenGroup((g) => (g === "recursos" ? null : "recursos"))}
                                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] hover:bg-white/10"
                                        >
                                            <span>Recursos</span>
                                            <svg viewBox="0 0 24 24"
                                                className={`h-4 w-4 transition-transform ${openGroup === "recursos" ? "rotate-180" : ""}`}
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M6 9l6 6 6-6" />
                                            </svg>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {openGroup === "recursos" && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden pl-2"
                                                >
                                                    <a href="/blog" onClick={() => setMobileOpen(false)} className="mt-1 block rounded-lg px-4 py-2.5 text-[14px] text-white/90 hover:bg-white/10">
                                                        Blog & Research
                                                    </a>
                                                    <a href="/edu" onClick={() => setMobileOpen(false)} className="mt-1 block rounded-lg px-4 py-2.5 text-[14px] text-white/90 hover:bg-white/10">
                                                        Dental City Edu
                                                    </a>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* ✅ Link correcto a Bolsa */}
                                    <Link
                                        to="/bolsa"
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-[15px] hover:bg-white/10"
                                    >
                                        Bolsa de trabajo
                                    </Link>
                                </div>

                                <div className="h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] opacity-80" />
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>

            {/* Animación shimmer */}
            <style>{`
        @keyframes shimmer {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
          100% { filter: brightness(1); }
        }
      `}</style>
        </motion.header>
    );
}




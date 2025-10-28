// src/pages/blog/11.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";

/* --------- Assets --------- */
import atlas1 from "../../assets/atlas1.jpg";
import atlas2 from "../../assets/atlas2.jpg";
import atlas3 from "../../assets/atlas3.jpg";
import atlas4 from "../../assets/atlas4.jpg";

/* ------------------------- UI Helpers ------------------------- */
function Container({ children, className = "" }) {
    return (
        <div className={`mx-auto w-full max-w-4xl px-6 md:px-8 ${className}`}>
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

/* ------------------------- Carrusel con autoplay + progreso ------------------------- */
function Carousel({ images = [], caption = "" }) {
    const [i, setI] = useState(0);
    const trackRef = useRef(null);

    const DURATION_MS = 5000;
    const rafRef = useRef(null);
    const startRef = useRef(0);
    const [progress, setProgress] = useState(0);

    const go = (delta) =>
        setI((idx) => (idx + delta + images.length) % images.length);
    const goTo = (idx) => setI(idx);

    useEffect(() => {
        const parent = trackRef.current;
        if (!parent) return;
        const el = parent.querySelector(`[data-thumb="${i}"]`);
        if (!el) return;

        const center =
            el.offsetLeft - (parent.clientWidth - el.clientWidth) / 2;

        parent.scrollTo({
            left: Math.max(0, center),
            behavior: "smooth",
        });
    }, [i]);

    useEffect(() => {
        if (images.length < 2) return;
        startRef.current = performance.now();
        cancelAnimationFrame(rafRef.current);

        const step = (now) => {
            const elapsed = now - startRef.current;
            const pct = Math.min(100, (elapsed / DURATION_MS) * 100);
            setProgress(pct);
            if (elapsed >= DURATION_MS) {
                setProgress(100);
                go(1);
            } else {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i, images.length]);

    if (!images.length) return null;

    return (
        <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
            <div className="rounded-[26px] overflow-hidden bg-[#0f2237]/90 backdrop-blur">
                {/* Imagen principal (16/10, ajustada completa) */}
                <div className="relative w-full aspect-[16/10] md:aspect-[16/10]">
                    <img
                        src={images[i]}
                        alt={caption || `Foto ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-contain bg-black"
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => go(-1)}
                                aria-label="Anterior"
                                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                            >
                                ‹
                            </button>
                            <button
                                onClick={() => go(1)}
                                aria-label="Siguiente"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 hover:bg-black/45 text-white w-9 h-9 grid place-items-center"
                            >
                                ›
                            </button>

                            <div className="absolute right-4 bottom-3 text-white/85 text-sm bg-black/35 px-2 py-1 rounded-lg">
                                {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                            </div>

                            {/* Progreso dorado */}
                            <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/10">
                                <div
                                    className="h-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Miniaturas elegantes centradas y grandes */}
                {images.length > 1 && (
                    <div className="p-5 flex justify-center">
                        <div
                            ref={trackRef}
                            className="flex gap-5 justify-center flex-wrap md:flex-nowrap no-scrollbar"
                            style={{ scrollBehavior: "smooth" }}
                        >
                            {images.map((src, idx) => (
                                <button
                                    key={src + idx}
                                    data-thumb={idx}
                                    onClick={() => goTo(idx)}
                                    aria-label={`Ir a foto ${idx + 1}`}
                                    className={`shrink-0 rounded-2xl p-[2px] transition-transform duration-300 ${i === idx
                                        ? "scale-105 bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] shadow-[0_0_15px_rgba(228,184,146,0.5)]"
                                        : "bg-white/10 hover:scale-105"
                                        }`}
                                >
                                    <div className="rounded-2xl overflow-hidden bg-[#0f2237]">
                                        <img
                                            src={src}
                                            alt={`Miniatura ${idx + 1}`}
                                            className="h-28 w-44 md:h-32 md:w-52 object-cover transition-transform duration-300"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ------------------------- Página ------------------------- */
export default function BlogPost11() {
    useEffect(() => {
        document.title =
            "Alianza: Dental City, clínica dental oficial del Club Atlas FC | Dental City";
    }, []);

    const post = {
        id: "11",
        title: "Alianza: Dental City, clínica dental oficial del Club Atlas FC",
        excerpt:
            "Firmamos convenio con Atlas FC para convertimos en su clínica dental oficial. Jugadores profesionales —varonil y femenil, en todas las categorías— y personal administrativo confían su salud bucal a nuestro equipo.",
        category: "Alianza",
        tags: ["Atlas FC", "Deporte", "Prevención", "Rendimiento"],
        date: "2025-06-05",
    };

    const photos = useMemo(() => [atlas1, atlas2, atlas3, atlas4], []);

    return (
        <>
            <TopBar />

            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />

                    <Container className="py-8 md:py-10">
                        <nav className="text-sm text-white/70">
                            <a href="/blog" className="hover:underline">Blog & Research</a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <a href="/blog?cat=Alianza" className="hover:underline">Alianza</a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6 text-center">
                            <Eyebrow>ALIANZA</Eyebrow>
                            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                                <span className="relative inline-block">
                                    <span className="golden-sweep">{post.title}</span>
                                    <span className="absolute left-0 right-0 -bottom-2 h-[2px] rounded bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                </span>
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] tracking-[.18em] uppercase text-white/60">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </time>
                            </div>
                        </header>
                    </Container>

                    {/* Carrusel */}
                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <Carousel images={photos} caption="Alianza Atlas FC • Dental City" />
                        </Container>
                    </div>
                </section>

                {/* Body */}
                <section className="py-10 md:py-12">
                    <Container>
                        {/* Intro */}
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt} Nuestra alianza garantiza protocolos clínicos
                            de alto nivel, disponibilidad para casos urgentes y planes de
                            prevención personalizados que protegen el rendimiento deportivo.
                            En Dental City unimos experiencia clínica, tecnología y trato
                            humano para que cada consulta sea eficiente y confiable.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* Convenio y alcance */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">¿Qué incluye la alianza?</h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Atención integral a jugadores profesionales del Atlas FC (varonil y femenil) en todas las categorías.</li>
                                    <li>Recepción de cuerpo técnico y personal administrativo del club.</li>
                                    <li>Diagnóstico digital, emergencias odontológicas y tratamientos conservadores y de rehabilitación.</li>
                                    <li>Programas de prevención, guardas oclusales y seguimiento periodontal para optimizar el desempeño.</li>
                                </ul>
                            </article>

                            {/* ¿Quién es Atlas FC? */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Atlas FC en breve</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Atlas Fútbol Club es una de las instituciones históricas del balompié mexicano, con sede en Guadalajara, Jalisco.
                                    Reconocido por su cantera y por su arraigo en la afición rojinegra, el club compite en la Liga MX y cuenta con plantillas
                                    varoniles y femeniles, además de fuerzas básicas. Su cultura de disciplina y preparación constante se alinea con nuestra
                                    visión clínica y de prevención.
                                </p>
                            </article>

                            {/* Agenda y próximas acciones */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Próximos pasos</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En noviembre, los jugadores del Atlas visitarán Dental City para sesiones de <strong>limpieza profesional y revisión</strong>,
                                    reforzando la salud oral antes y durante la temporada. Estas visitas periódicas previenen lesiones orales, controlan la
                                    inflamación gingival y mejoran la respiración y la recuperación, impactando positivamente en el rendimiento deportivo.
                                </p>
                            </article>

                            {/* Calidad y confianza */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">Calidad que inspira confianza</h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    La elección de Dental City por parte del Atlas FC reafirma nuestro estándar de calidad:
                                    flujos digitales, materiales de alto desempeño y un equipo clínico entrenado para trabajar
                                    con atletas de élite y pacientes de todas las edades. ¡Gracias, Rojinegros, por su confianza!
                                </p>
                            </article>
                        </div>

                        {/* Tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full border border-[#e4b89233] bg-white/5 px-3 py-1 text-sm text-[#e4b892]"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>

                        {/* CTA de regreso */}
                        <div className="mt-10">
                            <a
                                href="/blog"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 transition"
                            >
                                ← Volver al blog
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Estilos utilitarios */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep{
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
      `}</style>
        </>
    );
}


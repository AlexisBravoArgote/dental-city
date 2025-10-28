﻿// src/pages/blog/13.jsx
import React, { useEffect } from "react";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import limpiezaDental from "../../assets/limpieza.jpg";

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

export default function BlogPost13() {
    useEffect(() => {
        document.title =
            "Guía definitiva de la limpieza dental profesional | Dental City";
    }, []);

    const post = {
        id: "13",
        title: "Guía definitiva de la limpieza dental profesional",
        excerpt:
            "¿Qué sucede realmente durante una limpieza dental profesional? Más allá de lo estético, esta rutina es clave para prevenir enfermedades, mantener encías sanas y prolongar la vida de tus dientes.",
        cover: limpiezaDental,
        category: "Prevención",
        tags: ["Limpieza dental", "Higiene oral", "Odontología preventiva", "Encías sanas"],
        date: "2025-10-21",
        readingMin: 6,
    };

    return (
        <>
            <TopBar />

            <main className="min-h-dvh bg-[#0f2237]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[radial-gradient(70%_70%_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-8 md:py-10">
                        <nav className="text-sm text-white/70">
                            <a href="/blog" className="hover:underline">
                                Blog & Research
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <a href="/blog?cat=Prevención" className="hover:underline">
                                Prevención
                            </a>{" "}
                            <span className="opacity-50">/</span>{" "}
                            <span className="text-white">{post.title}</span>
                        </nav>

                        <header className="mt-4 md:mt-6">
                            <Eyebrow>PREVENCIÓN</Eyebrow>
                            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
                                <span className="golden-sweep">{post.title}</span>
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-[.18em] uppercase text-white/60">
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    })}
                                </time>
                                <span className="text-white/30">•</span>
                                <span>{post.readingMin} min</span>
                            </div>
                        </header>
                    </Container>

                    {/* Hero image */}
                    <div className="mt-6">
                        <Container className="max-w-6xl">
                            <div className="rounded-[28px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] p-[1.5px] shadow-[0_18px_50px_rgba(0,0,0,.35)]">
                                <div className="rounded-[26px] overflow-hidden bg-[#0f2237]/90 backdrop-blur">
                                    <div className="relative w-full aspect-[16/9]">
                                        <img
                                            src={post.cover}
                                            alt={post.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </section>

                {/* Body */}
                <section className="py-10 md:py-12">
                    <Container>
                        {/* Intro */}
                        <p className="text-white/85 text-lg leading-relaxed">
                            {post.excerpt} En Dental City creemos que entender el proceso te
                            ayuda a cuidar mejor tu salud oral y a perder el miedo a este
                            procedimiento tan común como importante.
                        </p>

                        <div className="mt-8 grid gap-6">
                            {/* 1 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    1. Evaluación inicial
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Todo comienza con una inspección clínica y, si es necesario,
                                    radiográfica. El odontólogo evalúa la presencia de placa,
                                    sarro, inflamación o sangrado. Esta etapa permite personalizar
                                    la limpieza y detectar signos tempranos de gingivitis o
                                    periodontitis.
                                </p>
                            </article>

                            {/* 2 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    2. Ultrasonido: eliminación del sarro
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Usamos un instrumento que vibra suavemente para desprender el
                                    sarro y la placa endurecida sin dañar el esmalte. Este paso es
                                    indoloro y rápido, especialmente con equipos modernos como los
                                    que utilizamos en Dental City. El sonido puede ser curioso,
                                    pero el resultado es inmediato: encías más limpias y
                                    saludables.
                                </p>
                            </article>

                            {/* 3 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    3. Pulido con pasta profiláctica
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    Tras retirar el sarro, se aplica una pasta especial con una
                                    copa de goma que pule la superficie dental. Esto elimina
                                    pigmentaciones leves de café, té o vino, y deja la superficie
                                    lisa para evitar que las bacterias se adhieran con facilidad.
                                </p>
                            </article>

                            {/* 4 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    4. Aplicación de flúor (opcional pero recomendada)
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    El flúor fortalece el esmalte y reduce la sensibilidad dental.
                                    En adultos y niños, se puede aplicar en gel o barniz. Es un
                                    refuerzo que prolonga los beneficios de la limpieza y protege
                                    contra la aparición de nuevas caries.
                                </p>
                            </article>

                            {/* 5 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    5. Beneficios más allá de la estética
                                </h2>
                                <ul className="mt-3 list-disc pl-6 text-white/85 leading-relaxed">
                                    <li>Previene gingivitis y periodontitis.</li>
                                    <li>Elimina bacterias que causan mal aliento.</li>
                                    <li>Mejora la absorción de flúor y la salud general.</li>
                                    <li>
                                        Ayuda al diagnóstico temprano de otros problemas orales.
                                    </li>
                                </ul>
                            </article>

                            {/* 6 */}
                            <article className="rounded-3xl bg-white/[.04] border border-white/10 p-6">
                                <h2 className="text-2xl font-semibold text-[#e4b892]">
                                    6. Frecuencia recomendada
                                </h2>
                                <p className="mt-3 text-white/85 leading-relaxed">
                                    En la mayoría de los casos, una limpieza profesional cada{" "}
                                    <b>6 meses</b> es suficiente. Sin embargo, quienes usan
                                    ortodoncia, tienen implantes o antecedentes de enfermedad
                                    periodontal pueden requerir controles más frecuentes.
                                </p>
                            </article>
                        </div>

                        {/* Conclusión */}
                        <p className="mt-10 text-white/85 leading-relaxed text-lg">
                            La limpieza dental profesional no solo deja tu sonrisa más
                            brillante, sino que también protege tu salud general. En Dental
                            City combinamos tecnología avanzada, manos expertas y una
                            experiencia cómoda para que cada visita sea una inversión en tu
                            bienestar.
                        </p>

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

                        {/* CTA */}
                        <div className="mt-10 flex flex-wrap gap-3">
                            <a
                                href="/blog"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 transition"
                            >
                                ← Volver al blog
                            </a>
                            <a
                                href="/#ubicacion"
                                className="rounded-xl bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] px-4 py-2 text-[#0f2237] font-medium hover:brightness-110 transition"
                            >
                                Agendar limpieza dental
                            </a>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />

            {/* Golden shimmer */}
            <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .golden-sweep {
          color: transparent;
          background-image: linear-gradient(90deg,#c89b7b 0%,#e4b892 20%,#f4d3b3 35%,#e4b892 60%,#c89b7b 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
      `}</style>
        </>
    );
}

// src/pages/tratamientos/brackets.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar.jsx";
import Footer from "../../components/Footer.jsx";
import SEO from "../../components/SEO.jsx";
import StructuredData from "../../components/StructuredData.jsx";
import LanguageBoutique from "../../components/LanguageBoutique.jsx";

const __MOTION_USED = Boolean(motion); // eslint-disable-line no-unused-vars

function Container({ children, className = "" }) {
    return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export default function Brackets() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    const getWaUrl = (serviceKey, serviceTitle) => {
        const base = "https://wa.me/523333087833";
        const text = encodeURIComponent(`Hola me gustaria agendar una cita para ${serviceTitle || "brackets"}`);
        return `${base}?text=${text}`;
    };

    return (
        <>
            <SEO
                title="Brackets | Dental City"
                description="Ortodoncia con brackets en Zapopan, Guadalajara. Brackets metálicos o estéticos para corrección de mordida y alineación. Tratamiento completo. Consulta nuestros precios."
                keywords="brackets, ortodoncia fija, brackets metálicos, brackets estéticos, ortodoncia Zapopan, ortodoncia Guadalajara"
            />
            <StructuredData
                type="MedicalProcedure"
                data={{
                    name: "Brackets",
                    description: "Ortodoncia fija para corrección de mordida y alineación con opciones metálicos o estéticos según el caso",
                    provider: {
                        name: "Dental City",
                        address: {
                            addressLocality: "Zapopan",
                            addressRegion: "Jalisco",
                            addressCountry: "MX"
                        }
                    }
                }}
            />
            <TopBar />
            <LanguageBoutique />

            <main className="min-h-dvh bg-[#0f2237] overflow-x-hidden">
                <section className="relative overflow-hidden bg-gradient-to-b from-[#0f2237] via-[#0b1b2b] to-[#0f2237]">
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-[#e4b892]/10 blur-3xl" />
                        <div className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-[#c89b7b]/10 blur-3xl" />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                    <Container className="py-16 md:py-24 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-xs tracking-[0.35em] text-[#e4b892]/80 uppercase mb-4"
                            >
                                TRATAMIENTO DE ORTODONCIA
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mt-3 inline-block text-4xl md:text-6xl lg:text-7xl font-bold relative"
                            >
                                <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                    Brackets
                                </span>
                                <span className="absolute left-0 right-0 -bottom-3 h-[3px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mx-auto mt-10 max-w-3xl text-white/90 leading-relaxed text-lg md:text-xl"
                            >
                                Ortodoncia fija para corrección de mordida y alineación. Solución probada y efectiva para lograr una sonrisa perfecta.
                            </motion.p>
                        </div>
                    </Container>
                </section>

                <section className="py-16 md:py-20">
                    <Container>
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mb-16"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                                    <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                        ¿Qué son los brackets?
                                    </span>
                                </h2>
                                <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                                    <p>
                                        Los brackets son el sistema de ortodoncia fija más tradicional y efectivo. Consisten en pequeños brackets adheridos a los dientes que, junto con alambres y bandas elásticas, aplican fuerzas controladas para mover los dientes gradualmente a su posición correcta.
                                    </p>
                                    <p>
                                        En Dental City ofrecemos <strong className="text-[#e4b892]">brackets metálicos</strong> y <strong className="text-[#e4b892]">brackets estéticos</strong> (cerámicos o de zafiro) según las necesidades de cada caso. Este tratamiento es ideal para corregir problemas de mordida, alineación y espaciado dental.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mb-16"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                                    <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                        Proceso del Tratamiento
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            step: "1",
                                            title: "Evaluación y Diagnóstico",
                                            desc: "Análisis completo con radiografías y modelos para determinar el plan de tratamiento más adecuado."
                                        },
                                        {
                                            step: "2",
                                            title: "Colocación de Brackets",
                                            desc: "Se adhieren los brackets a los dientes y se colocan los alambres iniciales para comenzar el movimiento."
                                        },
                                        {
                                            step: "3",
                                            title: "Ajustes Periódicos",
                                            desc: "Citas mensuales para ajustar los alambres y bandas elásticas, controlando el progreso del tratamiento."
                                        },
                                        {
                                            step: "4",
                                            title: "Retención",
                                            desc: "Una vez completado el tratamiento, se colocan retenedores para mantener los resultados obtenidos."
                                        }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                                            className="relative pl-12 sm:pl-16 border-l-2 border-[#e4b892]/30 ml-4 sm:ml-0"
                                        >
                                            <div className="absolute -left-4 sm:-left-6 top-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e4b892] to-[#c89b7b] text-[#0f2237] font-bold text-base sm:text-lg shadow-lg">
                                                {item.step}
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/70 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-16"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                                    <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                        Tipos de Brackets
                                    </span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Brackets metálicos (tradicionales)",
                                        "Brackets estéticos (cerámicos o zafiro)",
                                        "Opciones según el caso",
                                        "Corrección de mordida y alineación",
                                        "Tratamiento completo incluido",
                                        "Citas mensuales de seguimiento"
                                    ].map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-[#e4b892]/20"
                                        >
                                            <svg className="h-6 w-6 text-[#e4b892] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <p className="text-white/80">{benefit}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-[#e4b892]/10 via-[#c89b7b]/5 to-transparent border border-[#e4b892]/30"
                            >
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                                    <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                        Información del Tratamiento
                                    </span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#e4b892] mb-2">Tiempo Estimado</h3>
                                        <p className="text-white/80">18-24 meses</p>
                                        <p className="text-white/80 text-sm">Citas mensuales</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#e4b892] mb-2">Precio Estimado</h3>
                                        <p className="text-white/80">$33,000 - $52,000 MXN</p>
                                        <p className="text-sm text-white/60 mt-1">*Precio del tratamiento completo</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <a
                                    href={getWaUrl("brackets", "Brackets")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-14 min-w-[260px] items-center justify-center gap-2 rounded-full bg-[#d8a07b] px-8 text-base font-semibold text-[#0b1b2b] shadow-[0_8px_24px_rgba(216,160,123,.25)] transition hover:brightness-110"
                                >
                                    Agendar por WhatsApp
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </a>
                                <button
                                    onClick={() => navigate("/#servicios")}
                                    className="inline-flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-base text-white/90 transition hover:bg-white/10"
                                >
                                    Ver otros tratamientos
                                </button>
                            </motion.div>
                        </div>
                    </Container>
                </section>
            </main>

            <Footer />
        </>
    );
}

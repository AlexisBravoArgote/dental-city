// src/pages/tratamientos/rehabilitacion-oral.jsx
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

export default function RehabilitacionOral() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    const getWaUrl = (serviceKey, serviceTitle) => {
        const base = "https://wa.me/523333087833";
        const text = encodeURIComponent(`Hola me gustaria agendar una cita para ${serviceTitle || "rehabilitación oral"}`);
        return `${base}?text=${text}`;
    };

    return (
        <>
            <SEO
                title="Rehabilitación Oral | Dental City"
                description="Rehabilitación oral completa en Zapopan, Guadalajara. Puentes dentales, coronas y soluciones fijas para reemplazo de dientes. Consulta nuestros precios."
                keywords="rehabilitación oral, puentes dentales, prótesis dental, restauración dental, rehabilitación Zapopan, rehabilitación Guadalajara"
            />
            <StructuredData
                type="MedicalProcedure"
                data={{
                    name: "Rehabilitación Oral",
                    description: "Soluciones fijas para reemplazo de uno o más dientes mediante puentes dentales con diseño y ajuste de oclusión para estabilidad",
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
                                TRATAMIENTO DENTAL
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mt-3 inline-block text-4xl md:text-6xl lg:text-7xl font-bold relative"
                            >
                                <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                    Rehabilitación Oral
                                </span>
                                <span className="absolute left-0 right-0 -bottom-3 h-[3px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mx-auto mt-10 max-w-3xl text-white/90 leading-relaxed text-lg md:text-xl"
                            >
                                Soluciones fijas para reemplazo de uno o más dientes. Restaura la funcionalidad y estética de tu sonrisa con puentes dentales de alta calidad.
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
                                        ¿Qué es la rehabilitación oral?
                                    </span>
                                </h2>
                                <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                                    <p>
                                        La rehabilitación oral es un conjunto de tratamientos que buscan restaurar la función masticatoria, la estética y la salud bucal mediante prótesis fijas como puentes dentales, coronas y otros dispositivos protésicos.
                                    </p>
                                    <p>
                                        Los puentes dentales son una solución fija que reemplaza uno o más dientes perdidos, utilizando los dientes adyacentes como soporte. En Dental City realizamos <strong className="text-[#e4b892]">diseño y ajuste de oclusión</strong> para garantizar estabilidad y funcionalidad óptima.
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
                                            title: "Evaluación y Planificación",
                                            desc: "Análisis completo de tu caso para determinar el tipo de puente más adecuado y la preparación necesaria."
                                        },
                                        {
                                            step: "2",
                                            title: "Preparación de los Dientes Pilares",
                                            desc: "Los dientes adyacentes se preparan para recibir el puente, asegurando un soporte sólido."
                                        },
                                        {
                                            step: "3",
                                            title: "Toma de Impresiones",
                                            desc: "Se toman impresiones precisas o se realiza un escaneo digital para fabricar el puente a medida."
                                        },
                                        {
                                            step: "4",
                                            title: "Puente Temporal",
                                            desc: "Se coloca un puente temporal mientras se fabrica el definitivo, protegiendo los dientes preparados."
                                        },
                                        {
                                            step: "5",
                                            title: "Colocación del Puente Definitivo",
                                            desc: "El puente definitivo se ajusta, se verifica la oclusión y se cementa de forma permanente."
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
                                        Beneficios de la Rehabilitación Oral
                                    </span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Diseño y ajuste de oclusión para estabilidad",
                                        "Restauración de la función masticatoria",
                                        "Mejora de la estética dental",
                                        "Solución fija y permanente",
                                        "Prevención de movimientos dentales",
                                        "Distribución adecuada de fuerzas masticatorias"
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
                                        <p className="text-white/80">2-3 citas de 60-90 minutos</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#e4b892] mb-2">Precio Estimado</h3>
                                        <p className="text-white/80">$27,000 - $30,000 MXN</p>
                                        <p className="text-white/80 text-sm">(puente de 3 unidades)</p>
                                        <p className="text-sm text-white/60 mt-1">*Precio puede variar según el caso</p>
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
                                    href={getWaUrl("rehabilitacion-oral", "Rehabilitación Oral")}
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

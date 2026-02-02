// src/pages/tratamientos/diseno-sonrisa.jsx
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

export default function DisenoSonrisa() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    const getWaUrl = (serviceKey, serviceTitle) => {
        const base = "https://wa.me/523333087833";
        const text = encodeURIComponent(`Hola me gustaria agendar una cita para ${serviceTitle || "diseño de sonrisa"}`);
        return `${base}?text=${text}`;
    };

    return (
        <>
            <SEO
                title="Diseño de Sonrisa | Dental City"
                description="Diseño de sonrisa en Zapopan, Guadalajara. Plan estético integral con mock-up digital y ejecución guiada. Fotografía clínica y análisis de proporciones. Consulta nuestros precios."
                keywords="diseño de sonrisa, mock-up digital, estética dental, diseño sonrisa Zapopan, diseño sonrisa Guadalajara, recontorneo gingival"
            />
            <StructuredData
                type="MedicalProcedure"
                data={{
                    name: "Diseño de Sonrisa",
                    description: "Plan estético integral con mock-up digital y ejecución guiada mediante fotografía clínica, análisis de proporciones y pruebas previas",
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
                                TRATAMIENTO ESTÉTICO INTEGRAL
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="mt-3 inline-block text-4xl md:text-6xl lg:text-7xl font-bold relative"
                            >
                                <span className="bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] bg-clip-text text-transparent">
                                    Diseño de Sonrisa
                                </span>
                                <span className="absolute left-0 right-0 -bottom-3 h-[3px] rounded-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b]" />
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mx-auto mt-10 max-w-3xl text-white/90 leading-relaxed text-lg md:text-xl"
                            >
                                Plan estético integral con mock-up digital y ejecución guiada. Logra una sonrisa armónica y personalizada diseñada específicamente para ti.
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
                                        ¿Qué es el diseño de sonrisa?
                                    </span>
                                </h2>
                                <div className="space-y-4 text-white/80 leading-relaxed text-lg">
                                    <p>
                                        El diseño de sonrisa es un proceso integral que combina arte, ciencia y tecnología para crear una sonrisa personalizada que se adapte perfectamente a tus características faciales, personalidad y necesidades estéticas.
                                    </p>
                                    <p>
                                        En Dental City realizamos un <strong className="text-[#e4b892]">plan estético integral</strong> que incluye <strong className="text-[#e4b892]">fotografía clínica</strong>, <strong className="text-[#e4b892]">análisis de proporciones</strong>, <strong className="text-[#e4b892]">mock-up digital</strong> y <strong className="text-[#e4b892]">pruebas previas</strong> para que puedas visualizar el resultado final antes de comenzar el tratamiento.
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
                                        Proceso del Diseño de Sonrisa
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            step: "1",
                                            title: "Fotografía Clínica y Análisis",
                                            desc: "Sesión de fotografía clínica profesional y análisis detallado de proporciones faciales y dentales."
                                        },
                                        {
                                            step: "2",
                                            title: "Diseño Digital",
                                            desc: "Creación de un mock-up digital que muestra cómo se verá tu nueva sonrisa, permitiéndote aprobar el diseño antes de comenzar."
                                        },
                                        {
                                            step: "3",
                                            title: "Pruebas Previas (Mock-up)",
                                            desc: "Aplicación de un mock-up temporal en tu boca para que puedas ver y sentir cómo será tu nueva sonrisa."
                                        },
                                        {
                                            step: "4",
                                            title: "Ejecución Guiada",
                                            desc: "Realización del tratamiento planificado con precisión, siguiendo el diseño aprobado para lograr los resultados deseados."
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
                                        Componentes del Diseño de Sonrisa
                                    </span>
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Fotografía clínica y análisis de proporciones",
                                        "Mock-up digital y pruebas previas",
                                        "Plan estético integral personalizado",
                                        "Ejecución guiada del tratamiento",
                                        "Recontorneo gingival disponible",
                                        "Resultados naturales y armónicos"
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
                                        <p className="text-white/80">1-3 citas para diagnóstico</p>
                                        <p className="text-white/80 text-sm">y mock-up</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#e4b892] mb-2">Precio Estimado</h3>
                                        <p className="text-white/80">$5,000 MXN (Estudio)</p>
                                        <p className="text-white/80">$10,000 - $60,000 MXN (Tratamiento)</p>
                                        <p className="text-white/80 text-sm">Recontorneo desde $5,000 MXN</p>
                                        <p className="text-sm text-white/60 mt-1">*Precio según plan final</p>
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
                                    href={getWaUrl("diseno-sonrisa", "Diseño de Sonrisa")}
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

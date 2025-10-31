// src/components/languageboutique.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

// ---------- Selector de idioma (🌐) ----------
export default function LanguageBoutique() {
    const { t } = useTranslation();

    const [openLang, setOpenLang] = useState(false);
    const langWrapRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (langWrapRef.current && !langWrapRef.current.contains(e.target)) {
                setOpenLang(false);
            }
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
        localStorage.setItem("lang", code); // (dejado tal cual)
        setOpenLang(false);
    };

    // Botón + menú de idioma (TOP-RIGHT; móvil mitad de tamaño)
    return (
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
                aria-label={t("languageLabel", { defaultValue: "Language" })}
                title={t("languageLabel", { defaultValue: "Language" })}
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
        //hi
    );
}




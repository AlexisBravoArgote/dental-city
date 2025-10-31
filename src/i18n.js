import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translation files
import esTranslation from "./locales/es/translation.json";
import enTranslation from "./locales/en/translation.json";
import frTranslation from "./locales/fr/translation.json";
import deTranslation from "./locales/de/translation.json";
import itTranslation from "./locales/it/translation.json";
import zhTranslation from "./locales/zh/translation.json";
import jaTranslation from "./locales/ja/translation.json";
import koTranslation from "./locales/ko/translation.json";

// Import home.json (second namespace)
import esHome from "./locales/es/home.json";
import enHome from "./locales/en/home.json";
import frHome from "./locales/fr/home.json";
import deHome from "./locales/de/home.json";
import itHome from "./locales/it/home.json";
import zhHome from "./locales/zh/home.json";
import jaHome from "./locales/ja/home.json";
import koHome from "./locales/ko/home.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            es: { translation: esTranslation, home: esHome },
            en: { translation: enTranslation, home: enHome },
            fr: { translation: frTranslation, home: frHome },
            de: { translation: deTranslation, home: deHome },
            it: { translation: itTranslation, home: itHome },
            zh: { translation: zhTranslation, home: zhHome },
            ja: { translation: jaTranslation, home: jaHome },
            ko: { translation: koTranslation, home: koHome }
        },
        ns: ["translation", "home"], // namespaces we’ll use
        defaultNS: "translation",
        supportedLngs: ["es", "en", "fr", "de", "it", "zh", "ja", "ko"],
        fallbackLng: "es",
        detection: {
            order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"],
            lookupLocalStorage: "i18nextLng"
        },
        returnEmptyString: false,
        interpolation: { escapeValue: false }
    });

// Keep <html lang="..."> in sync
i18n.on("languageChanged", (lng) => {
    if (typeof document !== "undefined") {
        document.documentElement.lang = lng;
    }
});

export default i18n;

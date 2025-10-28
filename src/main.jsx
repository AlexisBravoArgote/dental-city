// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";

/** ✅ Exportado para que Fast Refresh no marque warning */
export function HashScroll() {
    const { hash, pathname } = useLocation();

    React.useEffect(() => {
        if (!hash) return;

        const id = hash.slice(1);
        let tries = 0;

        const tryScroll = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
            if (tries < 20) {
                tries += 1;
                setTimeout(tryScroll, 50);
            }
        };

        // Espera a que cambie la página antes de buscar el anchor
        setTimeout(tryScroll, 0);
    }, [hash, pathname]);

    return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop />
            <HashScroll />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);


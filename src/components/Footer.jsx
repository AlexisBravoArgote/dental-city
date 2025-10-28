﻿// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import arquitectura from "../assets/arquitectura.png";
import logoPng from "../assets/download.avif";

// Helpers locales
function Container({ children, className = "" }) {
    return <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>;
}
function LogoImage({ className = "h-18 w-auto" }) {
    return (
        <div className="flex items-center">
            <img src={logoPng} alt="Dental City" className={className} loading="eager" decoding="async" />
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-[#152b53] pt-8 pb-6 overflow-hidden">
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#c89b7b] via-[#e4b892] to-[#c89b7b] animate-[shimmer_6s_linear_infinite]" />

            <Container className="mx-auto w-full max-w-7xl relative z-10">
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
                    <div className="flex justify-center md:justify-start">
                        <div className="relative inline-flex items-center justify-center rounded-full p-3 transition-transform duration-500 hover:scale-[1.03] hover:brightness-110">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg transition-all duration-500 hover:from-[#e4b89266]" />
                            <LogoImage className="relative z-10 h-14 w-auto md:h-16 object-contain opacity-95 transition-transform duration-500 hover:scale-[1.03]" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="relative inline-flex items-center justify-center rounded-full p-3 transition-transform duration-500 hover:scale-[1.03] hover:brightness-110">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d8a07b33] to-transparent blur-lg transition-all duration-500 hover:from-[#e4b89266]" />
                            <img src={arquitectura} alt="Arquitectura Dental City" className="relative z-10 h-14 w-auto md:h-18 object-contain opacity-95" loading="lazy" />
                        </div>
                        <div className="mt-3 text-[13px] text-white/80 italic" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.3px" }}>
                            © {new Date().getFullYear()} Dental City — Hecho con cuidado
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <div className="grid grid-cols-[auto_16px_auto] items-center gap-x-4 gap-y-2 text-[12px] text-white/75">
                            <Link to="/terminos" className="footer-link justify-self-end">TÉRMINOS Y CONDICIONES</Link>
                            <span className="justify-self-center leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                            <Link to="/privacidad" className="footer-link">AVISO DE PRIVACIDAD</Link>

                            <a href="https://argotelabs.com" target="_blank" rel="noopener noreferrer" className="footer-link justify-self-end">ArgoteLabs</a>
                            <span className="justify-self-center leading-none text-[#d8a07b]/90 text-[13px]">•</span>
                            <a href="mailto:dentalcity1@hotmail.com" className="footer-link">dentalcity1@hotmail.com</a>
                        </div>
                    </div>
                </div>
            </Container>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400&display=swap');
        @keyframes shimmer { 0%{filter:brightness(1)} 50%{filter:brightness(1.3)} 100%{filter:brightness(1)} }
        .footer-link { position:relative; color:rgba(255,255,255,0.8); text-decoration:none; transition:color .3s ease; }
        .footer-link::after { content:""; position:absolute; bottom:-2px; left:0; width:100%; height:1px;
          background:linear-gradient(90deg,#c89b7b,#e4b892,#c89b7b); transform:scaleX(0); transform-origin:left; transition:transform .4s ease; }
        .footer-link:hover { color:#e4b892; }
        .footer-link:hover::after { transform:scaleX(1); animation:shine 1.6s linear infinite; }
        @keyframes shine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
        </footer>
    );
}

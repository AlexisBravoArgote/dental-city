// src/components/SEO.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente SEO que actualiza meta tags dinámicamente
 */
export default function SEO({ 
    title, 
    description, 
    keywords, 
    image, 
    type = "website",
    noindex = false 
}) {
    const location = useLocation();
    const baseUrl = "https://dentalcity.mx";
    const currentUrl = `${baseUrl}${location.pathname}`;
    
    // Título por defecto
    const defaultTitle = "Dental City | Clínica Dental en Zapopan, Guadalajara";
    const defaultDescription = "Clínica dental integral en Zapopan, Jalisco. Especialidades: ortodoncia, implantes, odontopediatría, estética dental. Tecnología digital de vanguardia.";
    const defaultImage = `${baseUrl}/logo.png`;
    
    const finalTitle = title ? `${title} | Dental City` : defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalImage = image || defaultImage;
    const finalKeywords = keywords || "clínica dental, dentista Zapopan, ortodoncia Guadalajara, implantes dentales, odontopediatría, estética dental";

    useEffect(() => {
        // Actualizar título
        document.title = finalTitle;

        // Función helper para actualizar o crear meta tags
        const updateMetaTag = (name, content, attribute = "name") => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Meta tags básicos
        updateMetaTag("description", finalDescription);
        updateMetaTag("keywords", finalKeywords);
        updateMetaTag("author", "Dental City");
        updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

        // Open Graph (Facebook, LinkedIn)
        updateMetaTag("og:title", finalTitle, "property");
        updateMetaTag("og:description", finalDescription, "property");
        updateMetaTag("og:image", finalImage, "property");
        updateMetaTag("og:url", currentUrl, "property");
        updateMetaTag("og:type", type, "property");
        updateMetaTag("og:site_name", "Dental City", "property");
        updateMetaTag("og:locale", "es_MX", "property");

        // Twitter Card
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", finalTitle);
        updateMetaTag("twitter:description", finalDescription);
        updateMetaTag("twitter:image", finalImage);

        // Canonical URL - siempre sin parámetros de query para evitar duplicados
        const canonicalUrl = `${baseUrl}${location.pathname}`;
        let canonical = document.querySelector("link[rel='canonical']");
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", canonicalUrl);

        // NO agregar hreflang tags porque no hay rutas separadas por idioma
        // El sitio usa i18n con parámetros de query/localStorage, no URLs separadas
        // Eliminar cualquier hreflang existente para evitar confusión
        const existingHreflangs = document.querySelectorAll("link[rel='alternate'][hreflang]");
        existingHreflangs.forEach(link => link.remove());

    }, [finalTitle, finalDescription, finalImage, finalKeywords, currentUrl, type, noindex]);

    return null;
}

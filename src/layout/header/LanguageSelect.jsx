// components/LanguageSelect.jsx
import { useEffect, useMemo, useRef, useState } from "react";

export default function LanguageSelect() {
  const rootRef = useRef(null);
  const [pathname, setPathname] = useState("/");
  const [open, setOpen] = useState(false);

  // Path actual (evita SSR issues con window)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname || "/");
    }
  }, []);

  // ¿Estamos en inglés?
  const isEnglish = useMemo(() => pathname.startsWith("/en"), [pathname]);

  // URLs siempre en inglés: solo agregamos o quitamos /en
  const mapToEs = (p) => p.replace(/^\/en(?=\/|$)/, "") || "/";
  const mapToEn = (p) => (p === "/" ? "/en" : p.startsWith("/en") ? p : `/en${p}`);

  // Construcción de URLs destino conservando la página actual
  const toEs = useMemo(() => mapToEs(pathname), [pathname]);
  const toEn = useMemo(() => mapToEn(pathname), [pathname]);

  const navigate = (lang) => {
    const href = lang === "en" ? toEn : toEs;
    try {
      // Persistir preferencia del usuario por encima de la detección automática
      document.cookie = `ss_locale=${lang}; path=/; max-age=31536000; samesite=lax`;
    } catch {}
    try {
      window.location.assign(href);
    } catch {
      window.location.href = href;
    }
  };

  // Cerrar al hacer click afuera
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  const currentLabel = isEnglish ? "English" : "Español";

  return (
    <div className="lang-select" ref={rootRef}>
      {/* Select nativo oculto por accesibilidad básica */}
      <select
        name="language"
        id="language"
        aria-label="Language"
        value={isEnglish ? "en" : "es"}
        onChange={(e) => navigate(e.target.value)}
        style={{ display: "none" }}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>

      {/* UI al estilo nice-select */}
      <div className={`nice-select wide${open ? " open" : ""}`} onClick={() => setOpen(!open)} role="listbox" aria-expanded={open}>
        <ul className="list">
          <li className={`option${!isEnglish ? " selected" : ""}`} onClick={() => navigate("es")} role="option" aria-selected={!isEnglish}>Español</li>
          <li className={`option${isEnglish ? " selected" : ""}`} onClick={() => navigate("en")} role="option" aria-selected={isEnglish}>English</li>
        </ul>
        <span className="current">{currentLabel}</span>
      </div>
    </div>
  );
}

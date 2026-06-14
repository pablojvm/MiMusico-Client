import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Cada vez que cambia la ruta, hace scroll suave al inicio de la página.
 * Se monta una sola vez dentro del BrowserRouter.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;

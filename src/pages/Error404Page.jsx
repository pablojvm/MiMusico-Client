import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="error-page page-fade">
      <span className="eyebrow">Error 404</span>
      <h2 className="mt-2">Esta página se perdió en el escenario</h2>
      <p className="text-muted mt-2" style={{ maxWidth: 480 }}>
        Puede que el enlace esté roto o que la página haya cambiado de
        ubicación. Vuelve al inicio y sigamos haciendo música.
      </p>
      <img
        src="/error404si.png"
        alt="Página no encontrada"
        className="img-fluid mt-3"
        style={{ maxWidth: 420, width: "100%" }}
      />
      <Link to="/" className="btn btn-coral mt-4">
        Volver al inicio →
      </Link>
    </div>
  );
}

export default Error404Page;

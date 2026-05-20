import { Link } from "react-router-dom";

function Error404Page() {
  return (
    <div className="error-page text-center">
      <img
        src="/error404si.png"
        alt="Página no encontrada"
        className="img-fluid"
        style={{ maxWidth: 700, width: "100%" }}
      />
      <h2 className="mt-3">¡Ups! No encontramos esta página</h2>
      <p className="text-muted">
        Puede que el enlace esté roto o que la página haya cambiado de
        ubicación.
      </p>
      <Link to="/" className="btn btn-primary mt-2">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Error404Page;

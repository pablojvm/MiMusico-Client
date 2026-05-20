import { Link } from "react-router-dom";

function Error500Page() {
  return (
    <div className="error-page text-center">
      <img
        src="/error500.png"
        alt="Error del servidor"
        className="img-fluid"
        style={{ maxWidth: 700, width: "100%" }}
      />
      <h2 className="mt-3">Algo no fue bien</h2>
      <p className="text-muted">
        Estamos teniendo problemas en el servidor. Inténtalo de nuevo en unos
        minutos.
      </p>
      <Link to="/" className="btn btn-primary mt-2">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Error500Page;

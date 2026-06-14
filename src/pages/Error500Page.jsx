import { Link } from "react-router-dom";

function Error500Page() {
  return (
    <div className="error-page error-page--500 page-fade">
      <span className="eyebrow">Error 500</span>
      <h2 className="mt-2">Tocamos una nota desafinada</h2>
      <p className="text-muted mt-2" style={{ maxWidth: 480 }}>
        Estamos teniendo problemas en el servidor. Inténtalo de nuevo en unos
        minutos.
      </p>
      <img
        src="/error500.png"
        alt="Error del servidor"
        className="img-fluid mt-3"
        style={{ maxWidth: 420, width: "100%" }}
      />
      <Link to="/" className="btn btn-coral mt-4">
        Volver al inicio →
      </Link>
    </div>
  );
}

export default Error500Page;

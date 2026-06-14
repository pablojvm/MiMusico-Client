import { Form, InputGroup } from "react-bootstrap";

function BarraBusqueda({ busqueda, setBusqueda, placeholder }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text
        style={{
          backgroundColor: "#fff",
          border: "1px solid var(--mm-border)",
          borderRight: "none",
          borderRadius: "var(--mm-radius) 0 0 var(--mm-radius)",
          color: "var(--mm-text-muted)",
        }}
      >
        🔍
      </InputGroup.Text>
      <Form.Control
        type="search"
        placeholder={
          placeholder || "Buscar por título, marca o descripción..."
        }
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        size="lg"
        style={{
          borderLeft: "none",
          borderRadius: "0 var(--mm-radius) var(--mm-radius) 0",
        }}
      />
      {busqueda && (
        <InputGroup.Text
          as="button"
          type="button"
          onClick={() => setBusqueda("")}
          style={{
            backgroundColor: "#fff",
            border: "1px solid var(--mm-border)",
            borderLeft: "none",
            color: "var(--mm-text-muted)",
            cursor: "pointer",
          }}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </InputGroup.Text>
      )}
    </InputGroup>
  );
}

export default BarraBusqueda;

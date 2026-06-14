import { useState } from "react";
import { Card, Nav, Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function BannerHome() {
  const [activeBanner, setActiveBanner] = useState("comprar");

  const [marca, setMarca] = useState("Todos");
  const [estado, setEstado] = useState("");
  const [familia, setFamilia] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const navigate = useNavigate();

  const handleBuscar = () => {
    const queryParams = new URLSearchParams();
    if (marca !== "Todos") queryParams.append("marca", marca);
    if (estado) queryParams.append("estado", estado);
    if (familia) queryParams.append("familia", familia);
    if (precioMax) queryParams.append("precioMax", precioMax);
    navigate(`/ads/instruments?${queryParams.toString()}`);
  };

  return (
    <Card
      id="bannerHome"
      style={{
        borderRadius: "var(--mm-radius-xl)",
        border: "none",
        boxShadow: "var(--mm-shadow-lg)",
        backgroundColor: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "blur(8px)",
        padding: "1.25rem 1.25rem 1.5rem",
      }}
    >
      <Nav
        variant="tabs"
        defaultActiveKey="comprar"
        activeKey={activeBanner}
        onSelect={(selectedKey) => setActiveBanner(selectedKey)}
        className="mb-3 justify-content-center"
        style={{ borderBottom: "1px solid var(--mm-border)" }}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="comprar"
            className="px-3 py-2"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--mm-navy)",
            }}
          >
            Comprar
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="vender"
            className="px-3 py-2"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--mm-navy)",
            }}
          >
            Vender
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeBanner === "comprar" && (
        <>
          <div className="mb-3 d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
            {["Todos", "Yamaha", "Casio", "Roland"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarca(m)}
                className={`brand-pill ${marca === m ? "is-active" : ""}`}
              >
                {m}
              </button>
            ))}
          </div>

          <Form.Group className="mb-2">
            <Form.Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Estado del instrumento</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Seminuevo">Seminuevo</option>
              <option value="Bueno">Bueno</option>
              <option value="Correcto">Correcto</option>
            </Form.Select>
          </Form.Group>

          <Row className="mb-3 g-2">
            <Col xs={12} md={6}>
              <Form.Select
                value={familia}
                onChange={(e) => setFamilia(e.target.value)}
              >
                <option value="">Familia</option>
                <option value="Viento Madera">Viento Madera</option>
                <option value="Viento Metal">Viento Metal</option>
                <option value="Cuerda Frotada">Cuerda Frotada</option>
                <option value="Cuerda Percutida">Cuerda Percutida</option>
                <option value="Percusión">Percusión</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Select
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              >
                <option value="">Precio máximo</option>
                <option value="1000">Hasta 1000€</option>
                <option value="2000">Hasta 2000€</option>
                <option value="3000">Hasta 3000€</option>
                <option value="4000">Hasta 4000€</option>
                <option value="5000">Hasta 5000€</option>
              </Form.Select>
            </Col>
          </Row>

          <Button
            className="btn-coral w-100"
            onClick={handleBuscar}
            style={{ padding: "0.85rem", fontSize: "1rem" }}
          >
            Mostrar resultados →
          </Button>
        </>
      )}

      {activeBanner === "vender" && (
        <div className="d-flex flex-column align-items-center text-center py-3">
          <p
            style={{
              color: "var(--mm-text-muted)",
              maxWidth: 280,
              marginBottom: "1.25rem",
            }}
          >
            Publica tu instrumento o tu grupo en menos de un minuto.
          </p>
          <Button
            as={Link}
            to="/new-ad"
            className="btn-coral"
            style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
          >
            Crea tu anuncio →
          </Button>
          <img
            src="/pajaro.png"
            alt="Crear anuncio"
            style={{
              width: "min(140px, 60%)",
              marginTop: "1rem",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.12))",
            }}
          />
        </div>
      )}
    </Card>
  );
}

export default BannerHome;

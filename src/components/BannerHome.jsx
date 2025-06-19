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
    <div className="container mt-5">
      <Card className="p-4 shadow" id="bannerHome" style={{ borderRadius: "20px", maxWidth: "100%" }}>
        <Nav
          variant="tabs"
          defaultActiveKey="comprar"
          activeKey={activeBanner}
          onSelect={(selectedKey) => setActiveBanner(selectedKey)}
          className="mb-3"
        >
          <Nav.Item>
            <Nav.Link eventKey="comprar">Comprar</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="vender">Vender</Nav.Link>
          </Nav.Item>
        </Nav>

        {activeBanner === "comprar" && (
          <>
            <div className="mb-3 d-flex flex-wrap gap-2">
              {["Todos", "Yamaha", "Casio", "Roland"].map((m) => (
                <Button
                  key={m}
                  variant={marca === m ? "dark" : "outline-dark"}
                  size="sm"
                  onClick={() => setMarca(m)}
                >
                  {m}
                </Button>
              ))}
            </div>
            <Form.Group className="mb-3">
              <Form.Select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Seminuevo">Seminuevo</option>
                <option value="Bueno">Bueno</option>
                <option value="Correcto">Correcto</option>
              </Form.Select>
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Select
                  value={familia}
                  onChange={(e) => setFamilia(e.target.value)}
                >
                  <option value="">Familias</option>
                  <option value="Viento Madera">Viento Madera</option>
                  <option value="Viento Metal">Viento Metal</option>
                  <option value="Cuerda Frotada">Cuerda</option>
                  <option value="Cuerda Percutida">Cuerda Percutida</option>
                  <option value="Percusión">Percusión</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                >
                  <option value="">Precio</option>
                  <option value="1000">Hasta 1000€</option>
                  <option value="2000">Hasta 2000€</option>
                  <option value="3000">Hasta 3000€</option>
                  <option value="4000">Hasta 4000€</option>
                  <option value="5000">Hasta 5000€</option>
                </Form.Select>
              </Col>
            </Row>
            <Button variant="danger" className="w-100" onClick={handleBuscar}>
              Mostrar resultados
            </Button>
          </>
        )}

        {activeBanner === "vender" && (
          <Button
            as={Link}
            id="boton-vender"
            to="/new-ad"
            style={{
              width: "300px",
              height: "300px",
            }}
          >
            Crea tu Propio Anuncio
            <img src="/pajaro.png" width="250px"/>
          </Button>
        )}
      </Card>
    </div>
  );
}

export default BannerHome;


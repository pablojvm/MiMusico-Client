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
    <div className="container-fluid px-3 px-md-4 mt-3 mt-md-5">
      <Card 
        className="p-3 p-md-4 shadow" 
        id="bannerHome" 
        style={{ 
          borderRadius: "15px", 
          maxWidth: "100%",
          width: "100%"
        }}
      >
        <Nav
          variant="tabs"
          defaultActiveKey="comprar"
          activeKey={activeBanner}
          onSelect={(selectedKey) => setActiveBanner(selectedKey)}
          className="mb-3 justify-content-center"
          style={{ borderBottom: "1px solid #dee2e6" }}
        >
          <Nav.Item>
            <Nav.Link 
              eventKey="comprar"
              className="px-3 px-md-4 py-2"
              style={{ fontSize: "0.95rem" }}
            >
              Comprar
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              eventKey="vender"
              className="px-3 px-md-4 py-2"
              style={{ fontSize: "0.95rem" }}
            >
              Vender
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeBanner === "comprar" && (
          <>
            {/* Botones de marca - Responsivos */}
            <div className="mb-3 d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
              {["Todos", "Yamaha", "Casio", "Roland"].map((m) => (
                <Button
                  key={m}
                  variant={marca === m ? "dark" : "outline-dark"}
                  size="sm"
                  onClick={() => setMarca(m)}
                  className="px-3 py-1"
                  style={{ 
                    minWidth: "70px",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  {m}
                </Button>
              ))}
            </div>

            {/* Select de Estado */}
            <Form.Group className="mb-3">
              <Form.Select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                style={{ fontSize: "0.9rem", padding: "0.6rem" }}
              >
                <option value="">Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Seminuevo">Seminuevo</option>
                <option value="Bueno">Bueno</option>
                <option value="Correcto">Correcto</option>
              </Form.Select>
            </Form.Group>

            {/* Row responsiva para Familia y Precio */}
            <Row className="mb-3 g-2">
              <Col xs={12} md={6}>
                <Form.Select
                  value={familia}
                  onChange={(e) => setFamilia(e.target.value)}
                  style={{ fontSize: "0.9rem", padding: "0.6rem" }}
                >
                  <option value="">Familias</option>
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
                  style={{ fontSize: "0.9rem", padding: "0.6rem" }}
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

            {/* Botón de búsqueda responsivo */}
            <Button 
              variant="danger" 
              className="w-100" 
              onClick={handleBuscar}
              style={{ 
                padding: "0.75rem",
                fontSize: "1rem",
                fontWeight: "500"
              }}
            >
              Mostrar resultados
            </Button>
          </>
        )}

        {activeBanner === "vender" && (
          <div className="d-flex justify-content-center">
            <Button
              as={Link}
              id="boton-vender"
              to="/new-ad"
              variant="primary"
              className="d-flex flex-column align-items-center justify-content-center text-center p-4"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "250px",
                borderRadius: "15px",
                border: "2px dashed #007bff",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                color: "#007bff",
                fontSize: "1.1rem",
                fontWeight: "600",
                textDecoration: "none"
              }}
            >
              <span className="mb-3">Crea tu Propio Anuncio</span>
              <img 
                src="/pajaro.png" 
                alt="Crear anuncio"
                style={{
                  width: "min(150px, 60%)",
                  height: "auto",
                  maxHeight: "120px",
                  objectFit: "contain"
                }}
              />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default BannerHome;


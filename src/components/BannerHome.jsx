import { useState } from "react";
import { Card, Nav, Button, Form, Row, Col } from "react-bootstrap";

function BannerHome() {

    const [activeBanner, setActiveBanner] = useState("comprar")

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow" style={{ borderRadius: "20px", maxWidth: "500px" }}>
        <Nav variant="tabs" defaultActiveKey="comprar" activeKey={activeBanner} onSelect={(selectedKey) => setActiveBanner(selectedKey)} className="mb-3">
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
          <Button variant="dark" size="sm">
            Todos
          </Button>
          <Button variant="outline-dark" size="sm">
            Yamaha
          </Button>
          <Button variant="outline-dark" size="sm">
            Casio
          </Button>
          <Button variant="outline-dark" size="sm">
            Roland
          </Button>
        </div>

        {/* Selectores */}
        <Form.Group className="mb-3">
          <Form.Select>
            <option disabled selected>Estado</option>
            <option>Nuevo</option>
            <option>Seminuevo</option>
            <option>Bueno</option>
            <option>Correcto</option>
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Select title="Marca">
              <option disabled selected>Familias</option>
              <option>Viento</option>
              <option>Cuerda</option>
              <option>Percusión</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option disabled selected>Precio</option>
              <option>Hasta 300€</option>
              <option>Hasta 500€</option>
              <option>Hasta 700€</option>
              <option>Hasta 1000€</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Botón */}
        <Button variant="danger" className="w-100">
          Mostrar resultados
        </Button>
        </>
    )}
    {activeBanner === "vender" && (
        <Button style={{width:"300px", height:"300px", backgroundColor:"white", color:"black"}}>Crea tu Propio Anuncio</Button>
    )}
        
      </Card>
    </div>
  );
}

export default BannerHome;

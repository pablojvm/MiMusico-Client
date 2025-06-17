import { useState } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";

function BarraBusqueda({ ads, busqueda, setBusqueda }) {

  const adsFiltered = ads.filter(
    (ad) =>
      ad.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      ad.description.toLowerCase().includes(busqueda.toLowerCase()) ||
      ad.brand.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Buscar por título, marca o descripción..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4"
      />
      {busqueda.trim() !== "" && (
        <div>
          {adsFiltered.map((eachAd, idx) => (
            <Card
              className="mb-4 shadow-sm"
              key={idx}
              style={{ height: "200px" }}
            >
              <Row>
                <Col md={5}>
                  <Card.Img
                    variant="top"
                    src={eachAd.photos}
                    style={{ width: "190px" }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-start">
                      <div>
                        <strng>{eachAd.title}</strng>
                          <br></br>
                        <strong>
                          {eachAd.brand} {eachAd.model}
                        </strong>
                      </div>
                      <span className="text-danger fw-bold">
                        {eachAd.cost} €
                      </span>
                    </Card.Title>

                    <Card.Text className="mb-1">
                      Precio: <strong>{eachAd.cost} €</strong>
                      <br />
                    </Card.Text>
                    <Card.Text className="mb-1">
                      Descripcion: <strong>{eachAd.description}</strong>
                      <br />
                    </Card.Text>

                    <div className="d-flex justify-content-between mt-3">
                      <Button variant="outline-primary" size="sm">
                        Ver más
                      </Button>
                      {/* {puntuacion && (
                    <small className="text-muted">★ {puntuacion}</small>
                  )} */}
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

      {adsFiltered.length === 0 && <p>No se encontraron resultados.</p>}
    </div>
  );
}

export default BarraBusqueda;

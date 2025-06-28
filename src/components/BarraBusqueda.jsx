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
      {/* Campo de búsqueda */}
      <Form.Control
        type="text"
        placeholder="Buscar por título, marca o descripción..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-4"
        size="lg"
      />

      {/* Resultados de búsqueda */}
      {busqueda.trim() !== "" && (
        <div className="mb-4">
          <div className="mb-3">
            <small className="text-muted">
              {adsFiltered.length} resultado{adsFiltered.length !== 1 ? 's' : ''} encontrado{adsFiltered.length !== 1 ? 's' : ''}
            </small>
          </div>
          
          {adsFiltered.length === 0 ? (
            <div className="text-center py-5">
              <img 
                src="/coincidences.png" 
                className="img-fluid mb-3"
                style={{ maxWidth: "300px", width: "100%" }}
                alt="No hay coincidencias"
              />
              <p className="text-muted">No se encontraron resultados para tu búsqueda</p>
            </div>
          ) : (
            <Row className="g-3">
              {adsFiltered.map((eachAd, idx) => (
                <Col key={idx} lg={6} xl={4} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Row className="g-0 h-100">
                      <Col xs={12} sm={5}>
                        <div className="h-100 d-flex align-items-center justify-content-center p-2">
                          <img
                            src={eachAd.photos}
                            className="img-fluid rounded"
                            style={{ 
                              maxHeight: "150px",
                              maxWidth: "100%",
                              objectFit: "cover"
                            }}
                            alt={eachAd.title}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={7}>
                        <Card.Body className="d-flex flex-column h-100 p-3">
                          <div className="flex-grow-1">
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                              <div className="mb-2 mb-sm-0">
                                <h6 className="card-title mb-1">
                                  <strong>{eachAd.title}</strong>
                                </h6>
                                <div className="text-muted small">
                                  <strong>{eachAd.brand} {eachAd.model}</strong>
                                </div>
                              </div>
                              <span className="text-danger fw-bold h6 mb-0">
                                {eachAd.cost} €
                              </span>
                            </div>

                            <Card.Text className="small mb-2 text-muted">
                              <strong>Descripción:</strong> {eachAd.description.length > 60 
                                ? `${eachAd.description.substring(0, 60)}...` 
                                : eachAd.description}
                            </Card.Text>
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <Button variant="outline-primary" size="sm">
                              Ver más
                            </Button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

export default BarraBusqueda;
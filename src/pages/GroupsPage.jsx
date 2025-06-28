import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BarraBusqueda from "../components/BarraBusqueda";
import ModalFiltrosGrupos from "../components/ModalFiltrosGrupos";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function GroupsPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const sort = query.get("sort");

  const [ads, setAds] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precioMax, setPrecioMax] = useState(5000);
  const [familia, setFamilia] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/groups`);
      setAds(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const anunciosFiltrados = ads.filter((ad) => {
    const coincideBusqueda =
      busqueda.trim() === "" ||
      ad.title.toLowerCase().includes(busqueda.toLowerCase().trim()) ||
      ad.description.toLowerCase().includes(busqueda.toLowerCase().trim());

    const coincidePrecio = ad.cost <= precioMax;
    const coincideFamilia = familia === "" || ad.family === familia;

    return coincideBusqueda && coincidePrecio && coincideFamilia;
  });

  if (sort === "cost_asc") {
    anunciosFiltrados.sort((a, b) => a.cost - b.cost);
  } else if (sort === "cost_desc") {
    anunciosFiltrados.sort((a, b) => b.cost - a.cost);
  }

  return (
    <Container fluid className="px-2 px-md-4">
      <div className="d-flex flex-column">
        {/* Barra de búsqueda */}
        <div className="mb-3">
          <BarraBusqueda 
            ads={ads} 
            busqueda={busqueda} 
            setBusqueda={setBusqueda} 
          />
        </div>

        <Row className="g-3">
          {/* Panel de filtros - responsive */}
          <Col lg={3} md={4} className="mb-3 mb-md-0">
            <div className="sticky-top" style={{ top: '20px' }}>
              <ModalFiltrosGrupos
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
                familia={familia}
                setFamilia={setFamilia}
              />
            </div>
          </Col>

          {/* Contenido principal */}
          <Col lg={9} md={8}>
            {busqueda.trim() === "" && (
              <div>
                {anunciosFiltrados.length === 0 ? (
                  <Card className="mb-4 shadow-sm text-center">
                    <Card.Body className="py-5">
                      <img 
                        src="/coincidences.png" 
                        className="img-fluid"
                        style={{ maxWidth: "300px", width: "100%" }}
                        alt="No hay coincidencias"
                      />
                    </Card.Body>
                  </Card>
                ) : (
                  <Row className="g-3">
                    {anunciosFiltrados.map((eachAd, idx) => (
                      <Col key={idx} xl={6} className="mb-3">
                        <Card className="h-100 shadow-sm">
                          <Row className="g-0 h-100">
                            <Col xs={12} sm={5} md={4} lg={5}>
                              <div className="h-100 d-flex align-items-center justify-content-center p-2">
                                <img
                                  src={eachAd.photos}
                                  className="img-fluid rounded"
                                  style={{ 
                                    maxHeight: "200px",
                                    maxWidth: "100%",
                                    objectFit: "cover"
                                  }}
                                  alt={eachAd.title}
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={7} md={8} lg={7}>
                              <Card.Body className="d-flex flex-column h-100">
                                <div className="flex-grow-1">
                                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
                                    <div className="mb-2 mb-sm-0">
                                      <h6 className="card-title mb-1">
                                        <strong>{eachAd.title}</strong>
                                      </h6>
                                      <div className="text-muted small">
                                        <strong>{eachAd.brand} {eachAd.model}</strong>
                                      </div>
                                      <div className="text-muted small">
                                        <span className="badge bg-secondary me-1">
                                          {eachAd.family}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="text-danger fw-bold h5 mb-0">
                                      {eachAd.cost} €
                                    </span>
                                  </div>

                                  <Card.Text className="small mb-2">
                                    <strong>Descripción:</strong> {eachAd.description.length > 80 
                                      ? `${eachAd.description.substring(0, 80)}...` 
                                      : eachAd.description}
                                  </Card.Text>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    as={Link}
                                    to={`/ad/${eachAd._id}`}
                                  >
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

                {ads.length === 0 && (
                  <div className="text-center py-5">
                    <p className="lead">Aún no hay grupos publicados</p>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default GroupsPage;


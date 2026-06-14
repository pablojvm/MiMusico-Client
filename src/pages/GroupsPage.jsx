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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Container fluid className="px-2 px-md-4 page-fade">
      <header className="listing-header">
        <div className="listing-header-text">
          <h1>Grupos musicales</h1>
          <p className="listing-count">
            Contrata el grupo perfecto para tu próximo evento.
          </p>
        </div>
        <span className="listing-count-badge">
          {anunciosFiltrados.length} resultados
        </span>
      </header>

      <div className="d-flex flex-column">
        <div className="mb-3">
          <BarraBusqueda
            ads={ads}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />
        </div>

        <Row className="g-3">
          <Col lg={3} md={4} className="mb-3 mb-md-0">
            <div className="sticky-top" style={{ top: "20px" }}>
              <ModalFiltrosGrupos
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
                familia={familia}
                setFamilia={setFamilia}
              />
            </div>
          </Col>

          <Col lg={9} md={8}>
            {busqueda.trim() === "" && (
              <div>
                {anunciosFiltrados.length === 0 ? (
                  <div className="listing-empty">
                    <img
                      src="/coincidences.png"
                      className="img-fluid"
                      style={{ maxWidth: 260, width: "100%" }}
                      alt="No hay coincidencias"
                    />
                    <p className="text-muted mt-3 mb-0">
                      No encontramos grupos con esos filtros.
                    </p>
                  </div>
                ) : (
                  <Row className="g-3">
                    {anunciosFiltrados.map((eachAd) => (
                      <Col key={eachAd._id} xl={6} className="mb-3">
                        <Card className="listing-ad-card">
                          <Row className="g-0 h-100">
                            <Col xs={12} sm={5} md={4} lg={5}>
                              <div className="listing-ad-img-wrap h-100">
                                {eachAd.family && (
                                  <span className="listing-family-badge">
                                    {eachAd.family}
                                  </span>
                                )}
                                <img
                                  src={eachAd.photos?.[0]}
                                  className="listing-ad-img"
                                  alt={eachAd.title}
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={7} md={8} lg={7}>
                              <Card.Body className="d-flex flex-column h-100">
                                <div className="flex-grow-1">
                                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2 gap-2">
                                    <div>
                                      <h3 className="listing-ad-title">
                                        {eachAd.title}
                                      </h3>
                                      <p className="listing-ad-meta">
                                        Precio por hora
                                      </p>
                                    </div>
                                    <span className="listing-ad-price">
                                      {eachAd.cost}€
                                    </span>
                                  </div>

                                  <Card.Text className="small mb-2 text-muted">
                                    {eachAd.description?.length > 80
                                      ? `${eachAd.description.substring(0, 80)}...`
                                      : eachAd.description}
                                  </Card.Text>
                                </div>

                                <div className="mt-auto">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    as={Link}
                                    to={`/ad/${eachAd._id}`}
                                  >
                                    Ver detalles →
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

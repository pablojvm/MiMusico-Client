import service from "../services/service.config";
import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row, Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ModalFiltros from "../components/ModalFiltros";
import BarraBusqueda from "../components/BarraBusqueda";

function InstrumentsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [ads, setAds] = useState([]);
  const [busqueda, setBusqueda] = useState(searchParams.get("q") || "");
  const [precioMax, setPrecioMax] = useState(
    Number(searchParams.get("precioMax")) || 5000
  );
  const [marca, setMarca] = useState(searchParams.get("marca") || "");
  const [estado, setEstado] = useState(searchParams.get("estado") || "");
  const [familia, setFamilia] = useState(searchParams.get("familia") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  useEffect(() => {
    setBusqueda(searchParams.get("q") || "");
    setMarca(searchParams.get("marca") || "");
    setEstado(searchParams.get("estado") || "");
    setFamilia(searchParams.get("familia") || "");
    setPrecioMax(Number(searchParams.get("precioMax")) || 5000);
    setSort(searchParams.get("sort") || "");
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Persistir cambios de filtros en URL para que sean compartibles
  useEffect(() => {
    const params = new URLSearchParams();
    if (busqueda) params.set("q", busqueda);
    if (marca) params.set("marca", marca);
    if (estado) params.set("estado", estado);
    if (familia) params.set("familia", familia);
    if (precioMax && precioMax !== 5000) params.set("precioMax", precioMax);
    if (sort) params.set("sort", sort);
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda, marca, estado, familia, precioMax, sort]);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/instruments`);
      setAds(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  const anunciosFiltrados = useMemo(() => {
    const filtered = ads.filter((ad) => {
      const coincideBusqueda =
        busqueda.trim() === "" ||
        ad.title?.toLowerCase().includes(busqueda.toLowerCase().trim()) ||
        ad.description?.toLowerCase().includes(busqueda.toLowerCase().trim()) ||
        ad.brand?.toLowerCase().includes(busqueda.toLowerCase().trim());
      const coincidePrecio = ad.cost <= precioMax;
      const coincideMarca = marca === "" || ad.brand === marca;
      const coincideFamilia = familia === "" || ad.family === familia;
      const coincideEstado = estado === "" || ad.state === estado;

      return (
        coincideBusqueda &&
        coincideFamilia &&
        coincidePrecio &&
        coincideMarca &&
        coincideEstado
      );
    });

    if (sort === "cost_asc") filtered.sort((a, b) => a.cost - b.cost);
    else if (sort === "cost_desc") filtered.sort((a, b) => b.cost - a.cost);
    else if (sort === "recent")
      filtered.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    return filtered;
  }, [ads, busqueda, precioMax, marca, familia, estado, sort]);

  const clearFilters = () => {
    setBusqueda("");
    setMarca("");
    setEstado("");
    setFamilia("");
    setPrecioMax(5000);
    setSort("");
  };

  const hasActiveFilters =
    busqueda || marca || estado || familia || precioMax !== 5000 || sort;

  return (
    <Container fluid className="px-2 px-md-4 page-fade">
      <header className="listing-header">
        <div className="listing-header-text">
          <h1>Instrumentos</h1>
          <p className="listing-count">
            Encuentra el instrumento perfecto entre nuestros anuncios.
          </p>
        </div>
        <span className="listing-count-badge">
          {anunciosFiltrados.length} resultado
          {anunciosFiltrados.length === 1 ? "" : "s"}
        </span>
      </header>

      <div className="d-flex flex-column">
        <BarraBusqueda busqueda={busqueda} setBusqueda={setBusqueda} />

        <Row className="g-3">
          <Col lg={3} md={4} className="mb-3 mb-md-0">
            <div className="sticky-top" style={{ top: "20px" }}>
              <ModalFiltros
                precioMax={precioMax}
                setPrecioMax={setPrecioMax}
                marca={marca}
                setMarca={setMarca}
                estado={estado}
                setEstado={setEstado}
                familia={familia}
                setFamilia={setFamilia}
              />
              {hasActiveFilters && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="w-100 mt-2"
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </Col>

          <Col lg={9} md={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted small">
                Mostrando {anunciosFiltrados.length} de {ads.length}
              </span>
              <Form.Select
                size="sm"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="">Ordenar por</option>
                <option value="recent">Más recientes</option>
                <option value="cost_asc">Precio: menor primero</option>
                <option value="cost_desc">Precio: mayor primero</option>
              </Form.Select>
            </div>

            {anunciosFiltrados.length === 0 ? (
              <div className="listing-empty">
                <img
                  src="/coincidences.png"
                  className="img-fluid"
                  style={{ maxWidth: 260, width: "100%" }}
                  alt="No hay coincidencias"
                />
                <p className="text-muted mt-3 mb-3">
                  No encontramos anuncios con esos filtros.
                </p>
                {hasActiveFilters && (
                  <Button variant="outline-primary" onClick={clearFilters}>
                    Limpiar filtros
                  </Button>
                )}
              </div>
            ) : (
              <Row className="g-3">
                {anunciosFiltrados.map((eachAd) => (
                  <Col key={eachAd._id} xl={6} className="mb-3">
                    <Card className="listing-ad-card">
                      <Row className="g-0 h-100">
                        <Col xs={12} sm={5} md={4} lg={5}>
                          <div className="listing-ad-img-wrap h-100">
                            {eachAd.state && (
                              <span
                                className={`listing-state-badge is-${eachAd.state}`}
                              >
                                {eachAd.state}
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
                                    {eachAd.brand} · {eachAd.model}
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
          </Col>
        </Row>

        {ads.length === 0 && (
          <div className="text-center py-5">
            <p className="lead">Aún no hay instrumentos publicados</p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default InstrumentsPage;

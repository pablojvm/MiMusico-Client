import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalFiltros from "../components/ModalFiltros";
import BarraBusqueda from "../components/BarraBusqueda";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function InstrumentsPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  const [ads, setAds] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precioMax, setPrecioMax] = useState(5000);
  const [marca, setMarca] = useState("");
  const [estado, setEstado] = useState("");
  const [familia, setFamilia] = useState("");

  useEffect(() => {
    const qBrand = query.get("brand") || "";
    setMarca(qBrand);
    getData();
  }, [location.search]);

  const getData = async () => {
    try {
      const response = await service.get(`/ad/instruments`);
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
    const coincideMarca = marca === "" || ad.brand === marca;

    return coincideBusqueda && coincidePrecio && coincideMarca;
  });

  return (
    <div>
      <div style={{ marginTop: "80px", display: "block" }}>
        <div>
          <BarraBusqueda
            ads={ads}
            busqueda={busqueda}
            setBusqueda={setBusqueda}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div>
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
          </div>
          {busqueda.trim() === "" && (
            <div>
              {anunciosFiltrados.length === 0 ? (
                <Card className="mb-4 shadow-sm text-center">
                  <Card.Body>
                    <img src="/coincidences.png" width="400px" />
                  </Card.Body>
                </Card>
              ) : (
                anunciosFiltrados.map((eachAd, idx) => (
                  <Card
                    className="mb-4 shadow-sm"
                    key={idx}
                    style={{ height: "230px" }}
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
                              <strong>{eachAd.title}</strong>
                              <br />
                              <strong>
                                {eachAd.brand} {eachAd.model}
                              </strong>
                              <br />
                              <strong>Estado: {eachAd.state}</strong>
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
                            Descripción: <strong>{eachAd.description}</strong>
                            <br />
                          </Card.Text>

                          <div className="d-flex justify-content-between mt-3">
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
                ))
              )}
            </div>
          )}
        </div>
        {ads.length === 0 && <p>Aún no hay instrumentos publicados</p>}
      </div>
    </div>
  );
}

export default InstrumentsPage;

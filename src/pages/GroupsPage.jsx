import service from "../services/service.config";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
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
    <div>
      <BarraBusqueda ads={ads} busqueda={busqueda} setBusqueda={setBusqueda} />
      <div style={{ display: "flex" }}>
        <div>
          <ModalFiltrosGrupos
            precioMax={precioMax}
            setPrecioMax={setPrecioMax}
            familia={familia}
            setFamilia={setFamilia}
          />
        </div>
        {busqueda.trim() === "" && <div>
          {anunciosFiltrados.length === 0 ? (
            <Card className="mb-4 shadow-sm text-center">
              <Card.Body>
                <img src="/coincidences.png" width="400px" alt="No coincidencias" />
              </Card.Body>
            </Card>
          ) : (
            anunciosFiltrados.map((eachAd, idx) => (
              <Card
                id="cardsAds"
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
                      alt={eachAd.title}
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
                        </div>
                        <span className="text-danger fw-bold">{eachAd.cost} €</span>
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

          {ads.length === 0 && <p>Aún no hay instrumentos publicados</p>}
        </div>}
        
      </div>
    </div>
  );
}

export default GroupsPage;


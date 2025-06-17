import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalFiltros from "../components/ModalFiltros";
import BarraBusqueda from "../components/BarraBusqueda";

function InstrumentsPage() {
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/instruments`
      );
      setAds(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  return (
    <div>
      <div>
        <BarraBusqueda
          ads={ads}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <ModalFiltros />
        </div>
        {busqueda.trim() == "" && (
          <div>
            {ads.map((eachAd, idx) => (
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
                        <Button
                          variant="outline-primary"
                          size="sm"
                          as={Link}
                          to={`/ad/${eachAd._id}`}
                        >
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

        {ads.length === 0 && <p>Aun no hay instrumentos publicados</p>}
      </div>
    </div>
  );
}

export default InstrumentsPage;

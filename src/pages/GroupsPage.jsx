import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BarraBusqueda from "../components/BarraBusqueda";
import ModalFiltrosGrupos from "../components/ModalFiltrosGrupos";

function GroupsPage() {

  const navigate = useNavigate()

  const [ads, setAds] = useState([])
  const [busqueda, setBusqueda] = useState("");

  const [precioMax, setPrecioMax] = useState(5000);
  const [tipo, setTipo] = useState("");


  const anunciosFiltrados = ads.filter((ad) => {
    const coincideBusqueda =
      busqueda.trim() === "" ||
      ad.title.toLowerCase().includes(busqueda.toLowerCase().trim()) ||
      ad.description.toLowerCase().includes(busqueda.toLowerCase().trim());

    const coincidePrecio = ad.cost <= precioMax;
    const coincideTipo = tipo === "" || ad.type === tipo;

    return (
      coincideBusqueda && coincidePrecio  && coincideTipo
    );
  });

  useEffect(() => {
      getData();
    },[]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/ad/groups`
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
          <ModalFiltrosGrupos precioMax={precioMax} setPrecioMax={setPrecioMax} tipo={tipo} setTipo={setTipo}/>
        </div>
        {busqueda.trim() == "" && (
          <div>
            {anunciosFiltrados.length === 0 ? (
            <Card className="mb-4 shadow-sm text-center">
              <Card.Body>
                <img src="/coincidences.png" width="400px"/>
              </Card.Body>
            </Card>
          ) : (
            anunciosFiltrados.map((eachAd, idx) => (
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
            )))}
          </div>
        )}

        {ads.length === 0 && <p>Aun no hay instrumentos publicados</p>}
      </div>
    </div>
  )
}

export default GroupsPage

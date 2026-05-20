import service from "../services/service.config";
import { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function OwnAdsPage() {
  const navigate = useNavigate();
  const [adsById, setAdsById] = useState([]);

  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    if (loggedUserId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const getData = async () => {
    try {
      const response = await service.get(
        `/ad/own?objectId=${loggedUserId}`
      );
      setAdsById(response.data);
    } catch (error) {
      console.log(error);
      navigate("/500");
    }
  };

  return (
    <div className="own-ads-page">
      <h1 className="page-title text-center mb-4">Mis anuncios</h1>

      <div className="own-ads-grid">
        {adsById.length === 0 && (
          <div className="empty-state text-center">
            <img
              src="/coincidences.png"
              alt="Sin anuncios"
              style={{ maxWidth: 280, width: "100%" }}
            />
            <p className="text-muted mt-3">
              Aún no has publicado ningún anuncio.
            </p>
          </div>
        )}

        {adsById.map((ad) => (
          <Card key={ad._id} className="own-ad-card">
            <Card.Img
              variant="top"
              src={ad.photos?.[0] || "/coincidences.png"}
              alt={ad.title}
              className="own-ad-img"
            />
            <Card.Header className="own-ad-header">
              {ad.type === "instrument" ? "Instrumento" : "Grupo Musical"}
            </Card.Header>
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text className="text-muted small">
                {ad.description?.length > 100
                  ? `${ad.description.substring(0, 100)}...`
                  : ad.description}
              </Card.Text>
              <Button variant="primary" as={Link} to={`/ad/${ad._id}`}>
                Más detalles
              </Button>
            </Card.Body>
          </Card>
        ))}

        <Card
          as={Link}
          to="/new-ad"
          className="own-ad-card own-ad-card--add"
        >
          <div className="own-ad-add-inner">
            <span className="own-ad-add-plus">+</span>
            <p className="mb-0">
              {adsById.length === 0
                ? "Añade tu primer anuncio"
                : "Añadir nuevo anuncio"}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default OwnAdsPage;

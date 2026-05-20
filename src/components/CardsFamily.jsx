import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FAMILIES = [
  {
    name: "Viento Madera",
    image: "/vientomadera.png",
    slug: "Viento Madera",
  },
  {
    name: "Viento Metal",
    image: "/vientometal.png",
    slug: "Viento Metal",
  },
  {
    name: "Cuerda Frotada",
    image: "/cuerdafrotada.png",
    slug: "Cuerda Frotada",
  },
  {
    name: "Cuerda Percutida",
    image: "/cuerdapercutida.png",
    slug: "Cuerda Percutida",
  },
  {
    name: "Percusión",
    image: "/percusion.png",
    slug: "Percusión",
  },
];

function CardsFamily() {
  return (
    <div id="cardsFamily" className="cards-family-responsive">
      {FAMILIES.map((family) => (
        <Card
          key={family.slug}
          className="family-card"
          as={Link}
          to={`/ads/instruments?familia=${encodeURIComponent(family.slug)}`}
        >
          <div className="card-content">
            <Card.Body className="card-body-custom">
              <Card.Title className="card-title-custom">
                {family.name}
              </Card.Title>
            </Card.Body>
            <div className="card-image-container">
              <Card.Img
                variant="top"
                src={family.image}
                alt={family.name}
                className="card-image-custom"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CardsFamily;

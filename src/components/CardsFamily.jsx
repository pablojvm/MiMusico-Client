import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./CardsFamily.css"

function CardsFamily() {
  return (
    <div id="cardsFamily" className="cards-family-responsive">
      <Card className="family-card" as={Link} to="/ads/instruments?familia=Viento Madera">
        <div className="card-content">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">Viento Madera</Card.Title>
          </Card.Body>
          <div className="card-image-container">
            <Card.Img 
              variant="top" 
              src="vientomadera.png" 
              alt="Viento Madera"
              className="card-image-custom"
            />
          </div>
        </div>
      </Card>

      <Card className="family-card" as={Link} to="/ads/instruments?familia=Viento Metal">
        <div className="card-content">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">Viento Metal</Card.Title>
          </Card.Body>
          <div className="card-image-container">
            <Card.Img 
              variant="top" 
              src="vientometal.png" 
              alt="Viento Metal"
              className="card-image-custom"
            />
          </div>
        </div>
      </Card>

      <Card className="family-card" as={Link} to="/ads/instruments?familia=Cuerda Frotada">
        <div className="card-content">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">Cuerda Frotada</Card.Title>
          </Card.Body>
          <div className="card-image-container">
            <Card.Img 
              variant="top" 
              src="cuerdafrotada.png" 
              alt="Cuerda Frotada"
              className="card-image-custom"
            />
          </div>
        </div>
      </Card>

      <Card className="family-card" as={Link} to="/ads/instruments?familia=Cuerda Percutida">
        <div className="card-content">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">Cuerda Percutida</Card.Title>
          </Card.Body>
          <div className="card-image-container">
            <Card.Img 
              variant="top" 
              src="cuerdapercutida.png" 
              alt="Cuerda Percutida"
              className="card-image-custom"
            />
          </div>
        </div>
      </Card>

      <Card className="family-card" as={Link} to="/ads/instruments?familia=Percusión">
        <div className="card-content">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">Percusión</Card.Title>
          </Card.Body>
          <div className="card-image-container">
            <Card.Img 
              variant="top" 
              src="percusion.png" 
              alt="Percusión"
              className="card-image-custom"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CardsFamily
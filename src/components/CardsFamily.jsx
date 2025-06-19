import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./CardsFamily.css"

function CardsFamily() {
  return (
    <div id="cardsFamily">
      <Card id="Card" as={Link} to="/ads/instruments?familia=Viento Madera">
      <Card.Body>
        <Card.Title>Viento Madera</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientomadera.png" style={{width:"150px"}}/>
    </Card>
      <Card id="Card" as={Link} to="/ads/instruments?familia=Viento Metal">
      <Card.Body>
        <Card.Title>Viento Metal</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientometal.png" style={{width:"150px"}}/>
      </Card>
      <Card id="Card" as={Link} to="/ads/instruments?familia=Cuerda Frotada">
      <Card.Body>
        <Card.Title>Cuerda Frotada</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdafrotada.png" style={{width:"150px"}}/>
      </Card>
      <Card id="Card" as={Link} to="/ads/instruments?familia=Cuerda Percutida">
      <Card.Body>
        <Card.Title>Cuerda Percutida</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdapercutida.png" style={{width:"100px"}}/>
      </Card>
      <Card id="Card" as={Link} to="/ads/instruments?familia=Percusión">
      <Card.Body>
        <Card.Title>Percusión</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="percusion.png" style={{width:"100px"}} />
      </Card>
    </div>
  )
}

export default CardsFamily

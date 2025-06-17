import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./CardsFamily.css"

function CardsFamily() {
  return (
    <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around"}}>
      <Card style={{ width: '15%' }} id="Card" as={Link} to="/ads/instruments?family=Viento Madera">
      <Card.Body>
        <Card.Title>Viento Madera</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientomadera.png" style={{width:"150px"}}/>
    </Card>
      <Card style={{ width: '15%' }} id="Card" as={Link} to="/ads/instruments?family=Viento Metal">
      <Card.Body>
        <Card.Title>Viento Metal</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="vientometal.png" style={{width:"150px"}}/>
      </Card>
      <Card style={{ width: '15%' }} id="Card" as={Link} to="/ads/instruments?family=Cuerda Frotada">
      <Card.Body>
        <Card.Title>Cuerda Frotada</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdafrotada.png" style={{width:"150px"}}/>
      </Card>
      <Card style={{ width: '15%' }} id="Card" as={Link} to="/ads/instruments?family=Cuerda Percutida">
      <Card.Body>
        <Card.Title>Cuerda Percutida</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="cuerdapercutida.png" style={{width:"100px"}}/>
      </Card>
      <Card style={{ width: '15%' }} id="Card" as={Link} to="/ads/instruments?family=Percusión">
      <Card.Body>
        <Card.Title>Percusión</Card.Title>
      </Card.Body>
      <Card.Img variant="top" src="percusion.png" style={{width:"100px"}} />
      </Card>
    </div>
  )
}

export default CardsFamily
